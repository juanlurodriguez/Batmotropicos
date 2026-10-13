// ════════════════════════════════════════════════════════════════════
// Cloudflare Pages Function · POST /api/consentimiento
// Recibe el consentimiento de fisioterapia invasiva firmado en la tablet
// (/consentimiento) con el PDF ya generado en el navegador (generarlo aquí
// supera el límite de CPU del plan gratuito) y lo adjunta a la ficha del
// paciente en Airtable ("Fichas de pacientes"), localizada por teléfono.
// Si no hay ficha con ese teléfono, crea una para no perder el documento.
//
// Reutiliza AIRTABLE_API_KEY y AIRTABLE_BASE_ID (ya en Cloudflare Pages).
// Sin ellas → MODO DEMO: genera el PDF pero no guarda nada.
// ════════════════════════════════════════════════════════════════════
import { TECNICAS } from '../../src/data/consentimiento.ts';

const TABLE = 'tbljCHrMYSDF6V2Bw'; // "Fichas de pacientes"
const PDF_FIELD = 'fldJqnoW3NWylTW7f'; // "Consentimiento invasiva (PDF)"
const VALID_TECNICAS = TECNICAS.map((t) => t.val);
const MAX_PDF_BYTES = 3_000_000;

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

  const pdf = pdfBytes(data.pdf);
  if (!pdf) return json({ ok: false, error: 'Falta el documento firmado' }, 422);
  const fecha = new Date();

  const apiKey = env.AIRTABLE_API_KEY;
  const baseId = env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return json({ ok: true, demo: true, bytes: pdf.length });

  const auth = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };
  const api = `https://api.airtable.com/v0/${baseId}/${TABLE}`;

  let paso = 'busqueda';
  try {
    // 1 · Buscar la ficha más reciente con ese teléfono (últimos 9 dígitos).
    //     Necesita el permiso data.records:read en el token. Si la búsqueda
    //     falla, se sigue igualmente creando una ficha: el documento firmado
    //     nunca debe perderse.
    const last = digits.slice(-9);
    const formula = `RIGHT(REGEX_REPLACE({Teléfono} & '', '[^0-9]', ''), ${last.length}) = '${last}'`;
    const q = new URLSearchParams({
      filterByFormula: formula,
      maxRecords: '1',
      'sort[0][field]': 'Fecha envío',
      'sort[0][direction]': 'desc',
    });
    let recordId;
    let busqueda = 'ok';
    const found = await fetch(`${api}?${q}`, { headers: auth });
    if (found.ok) {
      recordId = (await found.json()).records?.[0]?.id;
    } else {
      busqueda = 'error ' + found.status;
      console.error('Búsqueda de ficha fallida', found.status, await found.text());
    }

    // 2 · Si no existe (o no se pudo buscar), crear una ficha mínima.
    paso = 'creacion';
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
    paso = 'actualizacion';
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
    paso = 'adjunto';
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

    return json({ ok: true, busqueda });
  } catch (err) {
    // El detalle va solo al log del servidor: puede contener datos de salud.
    // Al navegador solo se le dice el paso y el código HTTP de Airtable.
    // (500 y no 502: Cloudflare sustituye las respuestas 502 por su página genérica.)
    console.error('Error guardando el consentimiento', paso, String(err));
    const code = /\b(\d{3})\b/.exec(String(err));
    return json({ ok: false, error: 'No se pudo guardar el consentimiento', paso, status: code ? code[1] : null }, 500);
  }
}

export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return json({ ok: false, error: 'Método no permitido' }, 405);
}

function text(v, max) {
  return String(v ?? '').trim().slice(0, max);
}

// base64 → bytes del PDF (o null si no parece un PDF de tamaño razonable)
function pdfBytes(b64) {
  if (typeof b64 !== 'string' || !/^[A-Za-z0-9+/=]+$/.test(b64)) return null;
  const bin = atob(b64);
  if (bin.length < 1000 || bin.length > MAX_PDF_BYTES || !bin.startsWith('%PDF-')) return null;
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
