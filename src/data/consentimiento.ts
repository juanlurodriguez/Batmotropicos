// ════════════════════════════════════════════════════════════
// CONSENTIMIENTO INFORMADO · FISIOTERAPIA INVASIVA (ES / EN)
// Fuente única del texto: lo usan la página /consentimiento (lo que lee
// el paciente) y functions/api/consentimiento.js (el PDF que se guarda en
// su ficha). Si se cambia el texto, sube VERSION para que cada PDF diga
// qué redacción se firmó.
// Redactado conforme a la Ley 41/2002 (información y consentimiento).
// ════════════════════════════════════════════════════════════

export const VERSION = 'v1 · octubre 2026';

export type ConsentLang = 'es' | 'en';

// `val` es el valor que se guarda en Airtable ("Técnicas consentidas").
export const TECNICAS: { val: string; en: string }[] = [
  { val: 'Punción seca', en: 'Dry needling' },
  { val: 'Electropunción', en: 'Electro-acupuncture (electrical needling)' },
  { val: 'Neuromodulación percutánea', en: 'Percutaneous neuromodulation' },
];

// p: texto antes de la lista · after: texto después de la lista
type Section = { h: string; p?: string; list?: string[]; after?: string };

type Texts = {
  title: string;
  intro: string;
  sections: Section[];
  declarations: string[];
  ui: {
    lang: string;
    patient: string;
    nombre: string;
    documento: string;
    documentoHint: string;
    telefono: string;
    telefonoHint: string;
    tecnicas: string;
    tecnicasHint: string;
    info: string;
    declare: string;
    firmaPaciente: string;
    firmaProfesional: string;
    borrar: string;
    firmaHint: string;
    enviar: string;
    enviando: string;
    errCampos: string;
    errFirma: string;
    errEnvio: string;
    doneH: string;
    doneP: string;
    otro: string;
  };
  pdf: {
    patient: string;
    documento: string;
    telefono: string;
    fecha: string;
    tecnicas: string;
    declara: string;
    firmaPaciente: string;
    firmaProfesional: string;
    pie: string;
  };
};

const es: Texts = {
  title: 'Consentimiento informado para fisioterapia invasiva',
  intro:
    'Lee esta información con calma. Si tienes cualquier duda, pregúntame antes de firmar. Puedes cambiar de opinión en cualquier momento.',
  sections: [
    {
      h: '1. En qué consiste',
      p: 'La fisioterapia invasiva utiliza agujas muy finas, sin inyectar ninguna sustancia, que se introducen en la piel y el músculo o cerca de un nervio para tratar el dolor y la disfunción. Según tu caso, se puede aplicar:',
      list: [
        'Punción seca: la aguja se introduce en puntos gatillo del músculo.',
        'Electropunción: se aplica una corriente eléctrica de baja intensidad a través de las agujas.',
        'Neuromodulación percutánea: se aplica corriente eléctrica a través de una aguja situada cerca de un nervio periférico.',
      ],
    },
    {
      h: '2. Para qué sirve',
      p: 'Reducir el dolor, mejorar la movilidad y la función, y facilitar la recuperación, siempre como parte de un tratamiento de fisioterapia que normalmente incluye ejercicio.',
    },
    {
      h: '3. Molestias frecuentes (leves y pasajeras)',
      list: [
        'Dolor durante la punción y molestias musculares o agujetas en las 24 a 72 horas siguientes.',
        'Pequeño hematoma o sangrado en el punto de punción.',
        'Cansancio o somnolencia después de la sesión.',
        'Aumento transitorio de los síntomas.',
      ],
    },
    {
      h: '4. Riesgos poco frecuentes',
      list: [
        'Mareo, sudoración o desmayo (reacción vasovagal).',
        'Reacción alérgica al metal de la aguja.',
        'Infección local.',
        'Lesión de un nervio o de un vaso sanguíneo.',
        'Rotura de la aguja (excepcional).',
        'En el tórax y la parte alta de la espalda, riesgo muy poco frecuente de neumotórax (entrada de aire en la pleura), que se minimiza con una técnica adecuada.',
      ],
      after: 'Si después de la sesión notas dificultad para respirar, dolor en el pecho, fiebre o una zona enrojecida que aumenta, contacta conmigo o acude a urgencias.',
    },
    {
      h: '5. Precauciones',
      p: 'Debes avisarme si tomas anticoagulantes o tienes problemas de coagulación, llevas marcapasos u otro dispositivo implantado, estás o podrías estar embarazada, tienes epilepsia, miedo intenso a las agujas o te has mareado con ellas, alergia a metales, cáncer, infecciones o heridas en la zona, diabetes o el sistema inmunitario debilitado. Algunas de estas situaciones impiden aplicar la técnica o la corriente eléctrica.',
    },
    {
      h: '6. Alternativas',
      p: 'Existen otras técnicas de fisioterapia no invasivas, como la terapia manual, el ejercicio terapéutico o la electroterapia de superficie. Rechazar la fisioterapia invasiva no te impide recibir tratamiento.',
    },
    {
      h: '7. Puedes cambiar de opinión',
      p: 'Puedes retirar este consentimiento en cualquier momento, antes o durante el tratamiento, sin dar explicaciones y sin que afecte a tu atención.',
    },
  ],
  declarations: [
    'He leído y comprendido esta información, he podido hacer preguntas y me han sido respondidas.',
    'He informado al fisioterapeuta de mis antecedentes de salud y de las situaciones del apartado 5.',
    'Doy mi consentimiento para recibir las técnicas marcadas.',
  ],
  ui: {
    lang: 'Idioma',
    patient: 'Datos del paciente',
    nombre: 'Nombre y apellidos',
    documento: 'DNI, NIE o pasaporte',
    documentoHint: 'Opcional',
    telefono: 'Teléfono',
    telefonoHint: 'El mismo que pusiste en tu ficha de paciente',
    tecnicas: 'Técnicas que vas a recibir',
    tecnicasHint: 'Marca las que hayamos hablado',
    info: 'Información',
    declare: 'Declaro que',
    firmaPaciente: 'Firma del paciente',
    firmaProfesional: 'Firma del fisioterapeuta',
    borrar: 'Borrar',
    firmaHint: 'Firma con el dedo o el lápiz dentro del recuadro',
    enviar: 'Firmar y guardar',
    enviando: 'Guardando…',
    errCampos: 'Revisa los campos marcados en rojo.',
    errFirma: 'Faltan las firmas.',
    errEnvio: 'No se ha podido guardar. Revisa la conexión e inténtalo de nuevo.',
    doneH: 'Consentimiento guardado',
    doneP: 'El documento firmado se ha añadido a la ficha del paciente.',
    otro: 'Nuevo consentimiento',
  },
  pdf: {
    patient: 'Paciente',
    documento: 'Documento',
    telefono: 'Teléfono',
    fecha: 'Fecha y hora de la firma',
    tecnicas: 'Técnicas consentidas',
    declara: 'El paciente declara que',
    firmaPaciente: 'Firma del paciente',
    firmaProfesional: 'Firma del fisioterapeuta',
    pie: 'Firmado de forma manuscrita en tablet a través de batmotropicos.com/consentimiento',
  },
};

const en: Texts = {
  title: 'Informed consent for invasive physiotherapy',
  intro:
    "Please read this information carefully. If you have any questions, ask me before signing. You can change your mind at any time.",
  sections: [
    {
      h: '1. What it involves',
      p: 'Invasive physiotherapy uses very fine needles, without injecting any substance, which are inserted into the skin and muscle or close to a nerve to treat pain and dysfunction. Depending on your case, it may include:',
      list: [
        'Dry needling: the needle is inserted into trigger points in the muscle.',
        'Electro-acupuncture: a low-intensity electrical current is applied through the needles.',
        'Percutaneous neuromodulation: an electrical current is applied through a needle placed close to a peripheral nerve.',
      ],
    },
    {
      h: '2. What it is for',
      p: 'To reduce pain, improve movement and function, and support recovery, always as part of a physiotherapy treatment that usually includes exercise.',
    },
    {
      h: '3. Common effects (mild and temporary)',
      list: [
        'Pain during needling and muscle soreness for 24 to 72 hours afterwards.',
        'A small bruise or bleeding at the needling point.',
        'Tiredness or drowsiness after the session.',
        'A temporary increase in symptoms.',
      ],
    },
    {
      h: '4. Uncommon risks',
      list: [
        'Dizziness, sweating or fainting (vasovagal reaction).',
        'Allergic reaction to the metal of the needle.',
        'Local infection.',
        'Injury to a nerve or blood vessel.',
        'Needle breakage (exceptional).',
        'Over the chest and upper back, a very rare risk of pneumothorax (air entering the pleura), minimised by correct technique.',
      ],
      after: 'If after the session you notice difficulty breathing, chest pain, fever or a red area that keeps spreading, contact me or go to A&E.',
    },
    {
      h: '5. Precautions',
      p: 'You must tell me if you take blood thinners or have clotting problems, have a pacemaker or other implanted device, are or could be pregnant, have epilepsy, a strong fear of needles or have fainted with them, an allergy to metals, cancer, infections or wounds in the area, diabetes or a weakened immune system. Some of these situations prevent the use of the technique or of electrical current.',
    },
    {
      h: '6. Alternatives',
      p: 'There are other non-invasive physiotherapy techniques, such as manual therapy, therapeutic exercise or surface electrotherapy. Declining invasive physiotherapy does not prevent you from receiving treatment.',
    },
    {
      h: '7. You can change your mind',
      p: 'You can withdraw this consent at any time, before or during treatment, without giving reasons and without it affecting your care.',
    },
  ],
  declarations: [
    'I have read and understood this information, I have been able to ask questions and they have been answered.',
    'I have told the physiotherapist about my medical history and the situations listed in section 5.',
    'I consent to receive the techniques ticked.',
  ],
  ui: {
    lang: 'Language',
    patient: 'Patient details',
    nombre: 'Full name',
    documento: 'ID card or passport',
    documentoHint: 'Optional',
    telefono: 'Phone',
    telefonoHint: 'The same one you used in your patient form',
    tecnicas: 'Techniques you will receive',
    tecnicasHint: "Tick the ones we've discussed",
    info: 'Information',
    declare: 'I declare that',
    firmaPaciente: "Patient's signature",
    firmaProfesional: "Physiotherapist's signature",
    borrar: 'Clear',
    firmaHint: 'Sign with your finger or the pen inside the box',
    enviar: 'Sign and save',
    enviando: 'Saving…',
    errCampos: 'Please check the fields marked in red.',
    errFirma: 'Both signatures are needed.',
    errEnvio: "It couldn't be saved. Check the connection and try again.",
    doneH: 'Consent saved',
    doneP: "The signed document has been added to the patient's record.",
    otro: 'New consent',
  },
  pdf: {
    patient: 'Patient',
    documento: 'ID',
    telefono: 'Phone',
    fecha: 'Date and time of signature',
    tecnicas: 'Techniques consented to',
    declara: 'The patient declares that',
    firmaPaciente: "Patient's signature",
    firmaProfesional: "Physiotherapist's signature",
    pie: 'Signed by hand on a tablet via batmotropicos.com/consentimiento',
  },
};

export const CONSENT: Record<ConsentLang, Texts> = { es, en };
