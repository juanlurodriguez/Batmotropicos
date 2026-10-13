// ════════════════════════════════════════════════════════════
// FICHA DE PACIENTE — textos y opciones en ES / EN
// `val` es el valor canónico en español: es lo que se guarda en Airtable
// ("Fichas de pacientes") y debe coincidir con sus opciones, sea cual sea
// el idioma en que el paciente rellena la ficha.
// ════════════════════════════════════════════════════════════

export type Lang = 'es' | 'en';

export const LANGS: { code: Lang; label: string; href: string; airtable: string }[] = [
  { code: 'es', label: 'ES', href: '/paciente', airtable: 'Español' },
  { code: 'en', label: 'EN', href: '/paciente/en', airtable: 'English' },
];

type Opt = { val: string; en: string };
const o = (val: string, en: string): Opt => ({ val, en });

export const ZONAS: Opt[] = [
  o('Cuello', 'Neck'),
  o('Hombro', 'Shoulder'),
  o('Espalda alta', 'Upper back'),
  o('Zona lumbar', 'Lower back'),
  o('Codo / muñeca / mano', 'Elbow / wrist / hand'),
  o('Cadera', 'Hip'),
  o('Rodilla', 'Knee'),
  o('Tobillo / pie', 'Ankle / foot'),
  o('Cabeza / mandíbula', 'Head / jaw'),
  o('Otra', 'Other'),
];

export const DESDE: Opt[] = [
  o('Menos de 1 semana', 'Less than 1 week'),
  o('1 a 4 semanas', '1–4 weeks'),
  o('1 a 3 meses', '1–3 months'),
  o('3 a 6 meses', '3–6 months'),
  o('Más de 6 meses', 'More than 6 months'),
];

export const INICIO: Opt[] = [
  o('Golpe o caída', 'A knock or fall'),
  o('Esfuerzo o mal gesto', 'Strain or awkward movement'),
  o('Haciendo deporte', 'During sport'),
  o('Poco a poco, sin causa clara', 'Gradually, no clear cause'),
  o('Tras una cirugía', 'After surgery'),
  o('No lo sé', 'Not sure'),
];

export const EVOLUCION: Opt[] = [
  o('Va a mejor', 'Getting better'),
  o('Igual', 'About the same'),
  o('Va a peor', 'Getting worse'),
  o('Va y viene', 'Comes and goes'),
];

export const ENFERMEDADES: Opt[] = [
  o('Hipertensión', 'High blood pressure'),
  o('Problemas cardíacos', 'Heart problems'),
  o('Diabetes', 'Diabetes'),
  o('Problemas respiratorios', 'Breathing problems'),
  o('Tiroides', 'Thyroid problems'),
  o('Osteoporosis', 'Osteoporosis'),
  o('Artritis o enfermedad reumática', 'Arthritis or rheumatic disease'),
  o('Migrañas', 'Migraines'),
  o('Ansiedad o depresión', 'Anxiety or depression'),
  o('Ninguna', 'None'),
];

export const CONTRAINDICACIONES: Opt[] = [
  o('Anticoagulantes o problemas de coagulación', 'Blood thinners or clotting problems'),
  o('Marcapasos u otro dispositivo implantado', 'Pacemaker or other implanted device'),
  o('Embarazo o posibilidad de estarlo', 'Pregnant or could be pregnant'),
  o('Epilepsia o convulsiones', 'Epilepsy or seizures'),
  o('Mareo o desmayo con agujas', 'Dizziness or fainting with needles'),
  o('Miedo a las agujas', 'Fear of needles'),
  o('Alergia a metales, látex o adhesivo', 'Allergy to metals, latex or tape adhesive'),
  o('Cáncer actual o antecedentes', 'Current or past cancer'),
  o('Linfedema o extirpación de ganglios', 'Lymphoedema or lymph nodes removed'),
  o('Diabetes', 'Diabetes'),
  o('Inmunodepresión o corticoides', 'Weakened immune system or steroid treatment'),
  o('Infección o problema de piel en la zona', 'Infection or skin problem in the area'),
  o('Osteoporosis', 'Osteoporosis'),
  o('Cirugía en los últimos 6 meses', 'Surgery in the last 6 months'),
  o('Implantes metálicos o prótesis', 'Metal implants or joint replacements'),
  o('Fiebre o malestar general', 'Fever or feeling unwell'),
  o('Ninguna', 'None'),
];

export const SENALES: Opt[] = [
  o('Dolor nocturno intenso que no cambia con la postura', "Severe night pain that doesn't change with position"),
  o('Pérdida de peso sin causa', 'Unexplained weight loss'),
  o('Hormigueo o pérdida de fuerza', 'Tingling or loss of strength'),
  o('Cambios en orina o heces', 'Changes in urine or bowel habits'),
  o('Golpe o caída fuerte reciente', 'Recent hard knock or fall'),
  o('Ninguna', 'None'),
];

export function label(opt: Opt, lang: Lang): string {
  return lang === 'es' ? opt.val : opt[lang];
}

const es = {
  metaTitle: 'Ficha de paciente',
  metaDesc: 'Ficha previa a la primera sesión de fisioterapia con Juan Luis Rodríguez.',
  eyebrow: 'Fisioterapia · Juan Luis Rodríguez',
  h1: 'Ficha de paciente',
  lead: 'Antes de la primera sesión necesito saber qué te pasa y si hay algo de tu salud que deba tener en cuenta. Así aprovechamos la consulta desde el primer minuto.',
  facts: [['4 min', 'aprox.'], ['5 pasos', 'cortos'], ['Confidencial', 'solo lo leo yo']],
  start: 'Empezar',
  startNote: 'Si dudas en alguna pregunta, déjala en blanco o márcalo y lo vemos juntos en consulta.',
  steps: ['Tus datos', 'Qué te pasa', 'Tu salud', 'Seguridad', 'Último paso'],
  of: 'de',
  s1: {
    h2: 'Tus datos',
    nombre: 'Nombre y apellidos',
    telefono: 'Teléfono',
    email: 'Email',
    nacimiento: 'Fecha de nacimiento',
    profesion: 'Profesión o actividad principal',
    profesionPh: 'Ej. camarera de piso, oficina, estudiante',
  },
  s2: {
    h2: '¿Qué te pasa?',
    zona: '¿Dónde te duele o qué zona quieres tratar?',
    desde: '¿Desde cuándo?',
    inicio: '¿Cómo empezó?',
    intensidad: '¿Cuánto te duele ahora, de 0 a 10?',
    min: '0 · nada',
    max: '10 · insoportable',
    evolucion: '¿Cómo va evolucionando?',
    empeora: '¿Qué lo empeora?',
    empeoraPh: 'Posturas, movimientos, horas del día…',
    alivia: '¿Qué lo alivia?',
    aliviaPh: 'Reposo, calor, moverte, medicación…',
    pruebas: '¿Tienes pruebas o informes? (radiografía, resonancia, diagnóstico médico…)',
    pruebasPh: 'Cuéntame cuáles y qué dicen, si lo sabes',
  },
  s3: {
    h2: 'Tu salud en general',
    enfermedades: '¿Tienes alguna de estas condiciones?',
    cirugias: 'Operaciones o lesiones importantes que hayas tenido',
    cirugiasPh: 'Qué y cuándo, aproximadamente',
    medicacion: 'Medicación que tomas ahora',
    medicacionPh: 'Nombre y para qué, si lo sabes',
    actividad: '¿Haces actividad física? ¿Cuál y cuántas veces por semana?',
    actividadPh: 'Ej. gimnasio 3 días, caminar a diario',
  },
  s4: {
    h2: 'Para tratarte con seguridad',
    note: 'Algunas técnicas, como la punción seca o la electropunción, no son adecuadas en ciertos casos. Marca todo lo que se aplique a ti. Lo revisamos juntos en consulta.',
    contra: '¿Algo de esto te aplica?',
    implantes: '¿Dónde tienes el implante o la prótesis?',
    implantesPh: 'Ej. placa en el tobillo derecho',
    senales: '¿Has notado alguna de estas señales?',
  },
  s5: {
    h2: 'Lo que quieres conseguir',
    objetivo: '¿Qué te gustaría conseguir con el tratamiento?',
    objetivoPh: 'Ej. volver a correr sin dolor, dormir mejor, trabajar sin molestias',
    fisioPrevia: '¿Has ido antes al fisio por esto? ¿Qué te funcionó y qué no?',
    observaciones: '¿Algo más que deba saber?',
    consent:
      'Doy mi consentimiento para que Juan Luis Rodríguez Ávila trate estos datos de salud con el único fin de valorar y planificar mi tratamiento de fisioterapia.',
    privacyLink: 'Política de privacidad',
    veraz: 'La información que he dado es correcta y avisaré si algo cambia.',
  },
  done: {
    h: 'Ficha recibida',
    p: 'Gracias. La revisaré antes de tu cita para tenerlo todo preparado. Si mientras tanto algo cambia (te encuentras peor, empiezas una medicación…), escríbeme.',
    wa: 'Escribir por WhatsApp',
    waText: 'Hola Juanlu, ya he rellenado la ficha de paciente y quería comentarte algo antes de la cita.',
  },
  js: {
    next: 'Siguiente',
    send: 'Enviar ficha',
    sending: 'Enviando…',
    back: 'Paso anterior',
    errFields: 'Revisa los campos marcados con * antes de seguir.',
    errConsent: 'Para enviar la ficha necesito que marques las dos casillas.',
    errSend: 'No se ha podido enviar. Revisa tu conexión e inténtalo de nuevo; si sigue fallando, escríbeme por WhatsApp.',
  },
};

type Dict = typeof es;

const en: Dict = {
  metaTitle: 'Patient form',
  metaDesc: 'Form to fill in before your first physiotherapy session with Juan Luis Rodríguez.',
  eyebrow: 'Physiotherapy · Juan Luis Rodríguez',
  h1: 'Patient form',
  lead: "Before your first session I need to know what's going on and whether there's anything about your health I should take into account. That way we make the most of the appointment from the very first minute.",
  facts: [['4 min', 'approx.'], ['5 steps', 'short'], ['Confidential', 'only I read it']],
  start: 'Start',
  startNote: "If you're unsure about a question, leave it blank and we'll go through it together at the appointment.",
  steps: ['Your details', "What's wrong", 'Your health', 'Safety', 'Last step'],
  of: 'of',
  s1: {
    h2: 'Your details',
    nombre: 'Full name',
    telefono: 'Phone',
    email: 'Email',
    nacimiento: 'Date of birth',
    profesion: 'Occupation or main activity',
    profesionPh: 'E.g. housekeeper, office work, student',
  },
  s2: {
    h2: "What's wrong?",
    zona: 'Where does it hurt, or which area would you like treated?',
    desde: 'Since when?',
    inicio: 'How did it start?',
    intensidad: 'How much does it hurt right now, from 0 to 10?',
    min: '0 · none',
    max: '10 · unbearable',
    evolucion: 'How is it progressing?',
    empeora: 'What makes it worse?',
    empeoraPh: 'Positions, movements, time of day…',
    alivia: 'What makes it better?',
    aliviaPh: 'Rest, heat, moving, medication…',
    pruebas: 'Do you have any scans or reports? (X-ray, MRI, medical diagnosis…)',
    pruebasPh: 'Tell me which ones and what they say, if you know',
  },
  s3: {
    h2: 'Your general health',
    enfermedades: 'Do you have any of these conditions?',
    cirugias: 'Operations or major injuries you have had',
    cirugiasPh: 'What and roughly when',
    medicacion: 'Medication you currently take',
    medicacionPh: "Name and what it's for, if you know",
    actividad: 'Do you exercise? What, and how many times a week?',
    actividadPh: 'E.g. gym 3 days, walking every day',
  },
  s4: {
    h2: 'Treating you safely',
    note: "Some techniques, such as dry needling or electro-acupuncture, aren't suitable in certain cases. Tick everything that applies to you. We'll go through it together at the appointment.",
    contra: 'Does any of this apply to you?',
    implantes: 'Where is the implant or joint replacement?',
    implantesPh: 'E.g. plate in the right ankle',
    senales: 'Have you noticed any of these signs?',
  },
  s5: {
    h2: 'What you want to achieve',
    objetivo: 'What would you like to achieve with the treatment?',
    objetivoPh: 'E.g. run again without pain, sleep better, work without discomfort',
    fisioPrevia: 'Have you seen a physio for this before? What worked and what didn\'t?',
    observaciones: 'Anything else I should know?',
    consent:
      'I consent to Juan Luis Rodríguez Ávila processing this health information solely to assess and plan my physiotherapy treatment. I can ask for it to be corrected or deleted at contacto@juanlurodriguez.com.',
    privacyLink: 'Privacy policy (in Spanish)',
    veraz: "The information I've given is correct and I'll let you know if anything changes.",
  },
  done: {
    h: 'Form received',
    p: "Thank you. I'll review it before your appointment so everything is ready. If anything changes in the meantime (you feel worse, you start a new medication…), just message me.",
    wa: 'Message me on WhatsApp',
    waText: "Hi Juanlu, I've filled in the patient form and wanted to mention something before the appointment.",
  },
  js: {
    next: 'Next',
    send: 'Send form',
    sending: 'Sending…',
    back: 'Previous step',
    errFields: 'Please check the fields marked with * before continuing.',
    errConsent: 'To send the form, please tick both boxes.',
    errSend: "It couldn't be sent. Check your connection and try again; if it still fails, message me on WhatsApp.",
  },
};

export const TEXTS: Record<Lang, Dict> = { es, en };
