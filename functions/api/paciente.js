// ════════════════════════════════════════════════════════════════════
// Cloudflare Pages Function · POST /api/paciente
// Recibe la ficha de paciente de fisioterapia (/paciente) y la guarda en
// Airtable (tabla "Fichas de pacientes"). Contiene DATOS DE SALUD: el token
// vive solo aquí, en el servidor, y nunca se expone en el navegador.
//
// Reutiliza las variables de entorno ya configuradas en Cloudflare Pages:
//   AIRTABLE_API_KEY          Personal Access Token con scope data.records:write
//   AIRTABLE_BASE_ID          appjBVElF81S92Hxj
//   AIRTABLE_PACIENTES_TABLE  (opcional) por defecto la tabla de abajo
//
// Si faltan las variables → MODO DEMO: responde éxito sin guardar nada.
// ════════════════════════════════════════════════════════════════════

const DEFAULT_TABLE = 'tbljCHrMYSDF6V2Bw'; // "Fichas de pacientes" (el ID no es secreto)

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

  const nombre = text(data.nombre);
  const telefono = text(data.telefono);
  if (!nombre || !telefono) {
    return json({ ok: false, error: 'Faltan nombre o teléfono' }, 422);
  }
  // Datos de salud: sin consentimiento explícito no se guarda nada.
  if (data.consentimiento !== true) {
    return json({ ok: false, error: 'Falta el consentimiento para tratar datos de salud' }, 422);
  }

  const apiKey = env.AIRTABLE_API_KEY;
  const baseId = env.AIRTABLE_BASE_ID;
  const table = env.AIRTABLE_PACIENTES_TABLE || DEFAULT_TABLE;

  if (!apiKey || !baseId) {
    return json({ ok: true, demo: true });
  }

  const intensidad = Number(data.intensidad);

  const fields = {
    'Nombre': nombre,
    'Estado': 'Nueva',
    'Fecha envío': data.enviadoEn || new Date().toISOString(),
    'Teléfono': telefono,
    'Email': text(data.email),
    'Fecha de nacimiento': isoDate(data.nacimiento),
    'Profesión': text(data.profesion),
    'Zona': list(data.zona),
    'Desde cuándo': text(data.desde),
    'Cómo empezó': text(data.inicio),
    'Intensidad (0-10)': Number.isFinite(intensidad) ? Math.min(10, Math.max(0, Math.round(intensidad))) : undefined,
    'Evolución': text(data.evolucion),
    'Qué lo empeora': text(data.empeora),
    'Qué lo alivia': text(data.alivia),
    'Pruebas e informes': text(data.pruebas),
    'Enfermedades': list(data.enfermedades),
    'Cirugías': text(data.cirugias),
    'Medicación': text(data.medicacion),
    'Actividad física': text(data.actividad),
    'Contraindicaciones': list(data.contraindicaciones),
    'Señales a vigilar': list(data.senales),
    'Implantes (dónde)': text(data.implantes),
    'Objetivo': text(data.objetivo),
    'Fisio previa': text(data.fisioPrevia),
    'Observaciones del paciente': text(data.observaciones),
    'Consentimiento salud': true,
  };
  // No enviamos claves vacías (evita errores en campos select/fecha).
  for (const k of Object.keys(fields)) {
    const v = fields[k];
    if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) delete fields[k];
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
      // No devolvemos el detalle de Airtable al navegador (podría contener datos de salud).
      console.error('Airtable rechazó la ficha', res.status, await res.text());
      return json({ ok: false, error: 'No se pudo guardar la ficha' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('Error guardando ficha', String(err));
    return json({ ok: false, error: 'No se pudo guardar la ficha' }, 500);
  }
}

// Cualquier método distinto de POST.
export async function onRequest(context) {
  if (context.request.method === 'POST') return onRequestPost(context);
  return json({ ok: false, error: 'Método no permitido' }, 405);
}

function text(v) {
  return String(v ?? '').trim().slice(0, 5000);
}

function list(v) {
  return Array.isArray(v) ? v.map((x) => text(x)).filter(Boolean) : [];
}

// Acepta "AAAA-MM-DD" (input type=date); cualquier otra cosa se descarta.
function isoDate(v) {
  const s = text(v);
  return /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : undefined;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
