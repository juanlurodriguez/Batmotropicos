// ════════════════════════════════════════════════════════════════════
// Cloudflare Pages Function · POST /api/contacto
// Recibe el formulario de contacto comercial y lo guarda en Airtable
// (tabla "Leads comerciales"). El token de Airtable vive solo aquí, en el
// servidor — nunca se expone en el navegador.
//
// Variables de entorno (Cloudflare Pages → Settings → Environment variables):
//   AIRTABLE_API_KEY        Personal Access Token con scope data.records:write
//   AIRTABLE_BASE_ID        appjBVElF81S92Hxj
//   AIRTABLE_LEADS_TABLE    tblfGxSG8GycPZcKT  (o el nombre "Leads comerciales")
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

  // Honeypot anti-spam: si viene relleno, fingimos éxito y descartamos.
  if (data._gotcha) return json({ ok: true, skipped: 'spam' });

  // Validación mínima de campos.
  const nombre = String(data.nombre || '').trim();
  const email = String(data.email || '').trim();
  const telefono = String(data.telefono || '').trim();
  if (!nombre || (!email && !telefono)) {
    return json({ ok: false, error: 'Faltan campos obligatorios (nombre y email o teléfono)' }, 422);
  }

  const apiKey = env.AIRTABLE_API_KEY;
  const baseId = env.AIRTABLE_BASE_ID;
  const table = env.AIRTABLE_LEADS_TABLE;

  // Modo demo: Airtable aún no configurado.
  if (!apiKey || !baseId || !table) {
    return json({ ok: true, demo: true });
  }

  const fields = {
    'Nombre': nombre,
    'Fecha envío': data.enviadoEn || new Date().toISOString(),
    'Empresa': String(data.empresa || '').trim(),
    'Teléfono': telefono,
    'Email': email,
    'Nº trabajadores': data.trabajadores || undefined,
    'Necesidad': data.necesidad || undefined,
    'Mensaje': String(data.mensaje || '').trim(),
    'Página origen': data.pagina || '',
    'Estado lead': 'Nuevo',
    'Fuente': 'Web formulario',
  };
  // No enviamos claves vacías/undefined (evita errores en campos select).
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

// Cualquier método distinto de POST.
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
