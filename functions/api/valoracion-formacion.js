// ════════════════════════════════════════════════════════════════════
// Cloudflare Pages Function · POST /api/valoracion-formacion
// Recibe el formulario de valoración post-formación y lo guarda en Airtable
// (tabla "Valoraciones post-formación"). El token vive solo en el servidor.
//
// Variables de entorno (Cloudflare Pages → Settings → Environment variables):
//   AIRTABLE_API_KEY              Personal Access Token (data.records:write)
//   AIRTABLE_BASE_ID              appjBVElF81S92Hxj
//   AIRTABLE_VALORACIONES_TABLE   tblsQD1TTfI1GLbo7  (o "Valoraciones post-formación")
//
// Si faltan las variables → MODO DEMO: responde éxito sin guardar nada.
// ════════════════════════════════════════════════════════════════════

export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'JSON inválido' }, 400);
  }

  const v = data.valoracion || {};
  const f = v.formador || {};
  const empresa = String(data.empresa || '').trim();
  const formacion = String(data.formacion || '').trim();

  // Validación mínima: que el formulario no esté completamente vacío.
  if (!empresa && !formacion && !v.general && data.nps == null) {
    return json({ ok: false, error: 'El formulario está vacío' }, 422);
  }

  const apiKey = env.AIRTABLE_API_KEY;
  const baseId = env.AIRTABLE_BASE_ID;
  const table = env.AIRTABLE_VALORACIONES_TABLE;

  // Modo demo: Airtable aún no configurado.
  if (!apiKey || !baseId || !table) {
    return json({ ok: true, demo: true });
  }

  const joinList = (x) => (Array.isArray(x) ? x.join('\n') : String(x || ''));
  const num = (x) =>
    x === null || x === undefined || x === '' ? undefined : Number(x);

  const fields = {
    'Empresa': empresa,
    'Fecha envío': data.enviadoEn || new Date().toISOString(),
    'Formación realizada': formacion,
    'Fecha formación': data.fecha || undefined,
    'Valoración general': num(v.general),
    'Utilidad': num(v.utilidad),
    'Contenido': num(v.contenido),
    'Dinamismo': num(v.dinamismo),
    'Claridad formador': num(f.claridad),
    'Dominio formador': num(f.dominio),
    'Cercanía formador': num(f.cercania),
    'Práctico formador': num(f.practico),
    'Aplicabilidad': String(data.aplicabilidad || '').trim(),
    'Impacto percibido': joinList(data.impacto),
    'Qué fue más útil': String(data.mas_util || '').trim(),
    'Qué echó en falta': String(data.en_falta || '').trim(),
    'Mejoras sugeridas': String(data.mejora || '').trim(),
    'Necesidades del equipo': joinList(data.necesidades),
    'Servicios recurrentes': joinList(data.servicios_recurrentes),
    'Interés fisioterapia in company': String(data.fisio_inco || '').trim(),
    'Actividades futuras': joinList(data.actividades),
    'Formaciones futuras': joinList(data.formaciones_futuras),
    'Experiencia global': num(data.experiencia_global),
    'Extras valorados': joinList(data.extras),
    'NPS': num(data.nps),
    'Testimonio': String(data.testimonio || '').trim(),
    'Autorización testimonio': String(data.autorizacion || '').trim(),
    'Nombre participante': String(data.nombre || '').trim(),
    'Página origen': data.pagina || '',
  };
  // No enviamos claves vacías/undefined.
  for (const k of Object.keys(fields)) {
    if (fields[k] === undefined || fields[k] === '') delete fields[k];
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: [{ fields }], typecast: true }),
      }
    );
    if (!res.ok) {
      const detail = await res.text();
      return json({ ok: false, error: 'Airtable rechazó el registro', detail }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) }, 500);
  }
}

export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return json({ ok: false, error: 'Método no permitido' }, 405);
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
