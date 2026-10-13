// ════════════════════════════════════════════════════════════════════
// Cloudflare Pages Function · POST /api/consentimiento
// Recibe el consentimiento de fisioterapia invasiva firmado en la tablet
// (/consentimiento), genera el PDF y lo adjunta a la ficha del paciente en
// Airtable ("Fichas de pacientes"), que se localiza por el teléfono.
// Si no hay ficha con ese teléfono, crea una para no perder el documento.
//
// Reutiliza AIRTABLE_API_KEY y AIRTABLE_BASE_ID (ya en Cloudflare Pages).
// Sin ellas → MODO DEMO: genera el PDF pero no guarda nada.
// ════════════════════════════════════════════════════════════════════
import { buildConsentPdf } from '../../src/lib/consentPdf.ts';
import { TECNICAS } from '../../src/data/consentimiento.ts';

const TABLE = 'tbljCHrMYSDF6V2Bw'; // "Fichas de pacientes"
const PDF_FIELD = 'fldJqnoW3NWylTW7f'; // "Consentimiento invasiva (PDF)"
const VALID_TECNICAS = TECNICAS.map((t) => t.val);
const MAX_SIG_BYTES = 600_000;

export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400);
  }
  if (data._gotcha) return json({ ok: true, skipped: 'spam' });

  const lang = data.lang === 'en' ? 'en' : 'es';
  const nombre = text(data.nombre, 200);
  const documento = text(data.documento, 40);
  const telefono = text(data.telefono, 40);
  const tecnicas = Array.isArray(data.tecnicas)
    ? data.tecnicas.filter((t) => VALID_TECNICAS.includes(t))
    : [];
  const digits = telefono.replace(/\D/g, '');

  if (!nombre || digits.length < 6 || tecnicas.length === 0 || data.declaraciones !== true) {
    return json({ ok: false, error: 'Faltan datos obligatorios' }, 422);
  }

  const firmaPaciente = jpeg(data.firmaPaciente);
  const firmaProfesional = jpeg(data.firmaProfesional);
  if (!firmaPaciente || !firmaProfesional) {
    return json({ ok: false, error: 'Faltan las firmas' }, 422);
  }

  const fecha = new Date();
  let pdf;
  try {
    pdf = await buildConsentPdf({ lang, nombre, documento, telefono, tecnicas, firmaPaciente, firmaProfesional, fecha });
  } catch (err) {
    console.error('Error generando el PDF', String(err));
    return json({ ok: false, error: 'No se pudo generar el documento' }, 500);
  }

  const apiKey = env.AIRTABLE_API_KEY;
  const baseId = env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return json({ ok: true, demo: true, bytes: pdf.length });

  const auth = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };
  const api = `https://api.airtable.com/v0/${baseId}/${TABLE}`;

  try {
    // 1 · Buscar la ficha más reciente con ese teléfono (últimos 9 dígitos).
    const last = digits.slice(-9);
    const formula = `RIGHT(REGEX_REPLACE({Teléfono} & '', '[^0-9]', ''), ${last.length}) = '${last}'`;
    const q = new URLSearchParams({
      filterByFormula: formula,
      maxRecords: '1',
      'sort[0][field]': 'Fecha envío',
      'sort[0][direction]': 'desc',
    });
    const found = await fetch(`${api}?${q}`, { headers: auth });
    if (!found.ok) throw new Error('búsqueda ' + found.status + ' ' + (await found.text()));
    const foundJson = await found.json();
    let recordId = foundJson.records?.[0]?.id;

    // 2 · Si no existe, crear una ficha mínima para no perder el documento.
    if (!recordId) {
      const created = await fetch(api, {
        method: 'POST',
        headers: auth,
        body: JSON.stringify({
          typecast: true,
          records: [
            {
              fields: {
                'Nombre': nombre,
                'Teléfono': telefono,
                'Estado': 'Nueva',
                'Idioma': lang === 'en' ? 'English' : 'Español',
                'Fecha envío': fecha.toISOString(),
                'Observaciones del paciente':
                  'Ficha creada automáticamente al firmar el consentimiento (no había ficha con este teléfono).',
              },
            },
          ],
        }),
      });
      if (!created.ok) throw new Error('creación ' + created.status + ' ' + (await created.text()));
      recordId = (await created.json()).records[0].id;
    }

    // 3 · Marcar el consentimiento en la ficha.
    const upd = await fetch(`${api}/${recordId}`, {
      method: 'PATCH',
      headers: auth,
      body: JSON.stringify({
        typecast: true,
        fields: {
          'Consentimiento invasiva firmado': true,
          'Fecha consentimiento': fecha.toISOString(),
          'Técnicas consentidas': tecnicas,
        },
      }),
    });
    if (!upd.ok) throw new Error('actualización ' + upd.status + ' ' + (await upd.text()));

    // 4 · Adjuntar el PDF firmado.
    const dia = fecha.toISOString().slice(0, 10);
    const up = await fetch(
      `https://content.airtable.com/v0/${baseId}/${recordId}/${PDF_FIELD}/uploadAttachment`,
      {
        method: 'POST',
        headers: auth,
        body: JSON.stringify({
          contentType: 'application/pdf',
          filename: `Consentimiento invasiva - ${nombre.replace(/[^\p{L}\p{N} .-]/gu, '')} - ${dia}.pdf`,
          file: base64(pdf),
        }),
      }
    );
    if (!up.ok) throw new Error('adjunto ' + up.status + ' ' + (await up.text()));

    return json({ ok: true });
  } catch (err) {
    // El detalle va solo al log del servidor: puede contener datos de salud.
    console.error('Error guardando el consentimiento', String(err));
    return json({ ok: false, error: 'No se pudo guardar el consentimiento' }, 502);
  }
}

export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return json({ ok: false, error: 'Método no permitido' }, 405);
}

function text(v, max) {
  return String(v ?? '').trim().slice(0, max);
}

// data:image/jpeg;base64,... → bytes (o null si no es un JPEG válido y razonable)
function jpeg(dataUrl) {
  const m = /^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ''));
  if (!m) return null;
  const bin = atob(m[1]);
  if (bin.length < 500 || bin.length > MAX_SIG_BYTES) return null;
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function base64(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  }
  return btoa(bin);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
