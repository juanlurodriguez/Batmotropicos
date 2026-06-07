// ════════════════════════════════════════════════════════════
// EXPERIENCIAS DE TEAM BUILDING
// Detalle ampliado de las experiencias de cohesión de equipo.
// ════════════════════════════════════════════════════════════

export interface TeamBuildingExperience {
  /** Identificador único y estable */
  id: string;
  /** Nombre de la experiencia */
  name: string;
  /** Duración orientativa */
  dur: string;
  /** Descripción de la dinámica y su objetivo */
  desc: string;
  /** Objetivo principal en una línea (clima, energía, creatividad…) */
  objetivo: string;
  /** Indica si puede requerir coste adicional de espacio / materiales / proveedor */
  extra?: boolean;
}

export const teamBuilding: TeamBuildingExperience[] = [
  {
    id: 'wellness-integral',
    name: 'Wellness / Bienestar Integral',
    dur: '2,5–3h',
    objetivo: 'Reconexión y energía',
    desc: 'Una experiencia que combina cuerpo y mente: movilidad, respiración y dinámicas de grupo para que el equipo desconecte de la rutina y vuelva con más energía.',
  },
  {
    id: 'fabrica-de-ideas',
    name: 'La Fábrica de Ideas',
    dur: '3h',
    objetivo: 'Creatividad y colaboración',
    desc: 'Dinámica de innovación colaborativa donde los equipos prototipan soluciones a retos reales. Activa el pensamiento creativo y refuerza la colaboración entre áreas.',
  },
  {
    id: 'escape-room',
    name: 'Escape Room en la Oficina',
    dur: '2h',
    objetivo: 'Comunicación bajo presión',
    desc: 'Un reto contrarreloj que obliga al equipo a comunicarse, repartir roles y resolver problemas juntos. Diversión y aprendizaje sobre cómo funciona el grupo.',
  },
  {
    id: 'risoterapia',
    name: 'Risoterapia',
    dur: '2h',
    objetivo: 'Clima y desbloqueo',
    desc: 'Sesión guiada de risa consciente para liberar tensión, romper barreras y mejorar el clima. Ideal para arrancar jornadas o cerrar etapas intensas.',
  },
  {
    id: 'quiz-show',
    name: 'Quiz Show Corporativo',
    dur: '2h',
    objetivo: 'Energía y pertenencia',
    desc: 'Un concurso dinámico y competitivo que mezcla cultura general con preguntas sobre la propia empresa. Energía alta y sentido de pertenencia.',
  },
  {
    id: 'juegos-en-equipo',
    name: 'Juegos en Equipo',
    dur: '2–3h',
    objetivo: 'Cohesión activa',
    desc: 'Circuito de retos cooperativos y lúdicos diseñados para que todo el equipo participe, independientemente de su condición física. Cohesión en estado puro.',
  },
  {
    id: 'art-wine',
    name: 'Art & Wine',
    dur: '2–3h',
    objetivo: 'Distensión creativa',
    extra: true,
    desc: 'Experiencia relajada que combina creatividad artística y un ambiente distendido. Una forma diferente de conectar fuera del marco habitual de trabajo.',
  },
  {
    id: 'sport-day',
    name: 'Sport Day',
    dur: '2–3h',
    objetivo: 'Energía y competición sana',
    extra: true,
    desc: 'Jornada deportiva con pruebas por equipos. Activa el cuerpo, fomenta la competición sana y crea recuerdos compartidos que refuerzan al grupo.',
  },
];

/** Nota sobre experiencias que pueden requerir coste adicional. */
export const EXTRA_NOTE =
  'Puede requerir coste adicional de espacio, materiales o proveedor externo.';
