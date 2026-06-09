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
  /** Agrupación para presentación en página */
  group: 'cohesion' | 'activo' | 'evento';
  /** Indica si puede requerir coste adicional de espacio / materiales / proveedor */
  extra?: boolean;
}

export const teamBuilding: TeamBuildingExperience[] = [
  // ── DINÁMICAS DE COHESIÓN ─────────────────────────────────
  {
    id: 'fabrica-de-ideas',
    name: 'La Fábrica de Ideas',
    dur: '3h',
    group: 'cohesion',
    objetivo: 'Creatividad y colaboración',
    desc: 'Dinámica de innovación colaborativa donde los equipos trabajan sobre retos reales de la organización. Activa el pensamiento creativo, rompe silos y refuerza la colaboración entre áreas.',
  },
  {
    id: 'reto-comunicacion',
    name: 'Reto de comunicación en equipo',
    dur: '2h',
    group: 'cohesion',
    objetivo: 'Comunicación y resolución bajo presión',
    desc: 'Actividad contrarreloj que obliga al equipo a comunicarse con claridad, repartir roles y resolver problemas de forma conjunta. Revela cómo funciona el grupo en situaciones de presión.',
  },
  {
    id: 'activacion-desbloqueo',
    name: 'Dinámica de activación y desbloqueo',
    dur: '2h',
    group: 'cohesion',
    objetivo: 'Clima, desbloqueo y apertura',
    desc: 'Sesión estructurada para liberar tensión acumulada, romper barreras interpersonales y mejorar el clima del equipo. Especialmente útil tras periodos de alta exigencia o cambios organizativos.',
  },
  {
    id: 'actividades-cohesion',
    name: 'Actividades de cohesión grupal',
    dur: '2–3h',
    group: 'cohesion',
    objetivo: 'Cohesión y sentido de equipo',
    desc: 'Circuito de retos cooperativos diseñados para que todo el equipo participe, independientemente de su condición física. Fomenta la confianza mutua y el sentido de pertenencia.',
  },
  {
    id: 'taller-creativo',
    name: 'Taller creativo corporativo',
    dur: '2–3h',
    group: 'cohesion',
    objetivo: 'Expresión, distensión y conexión',
    desc: 'Espacio de creación colectiva —cerámica, arte, escritura u otras disciplinas— que favorece la expresión personal y el encuentro fuera del contexto habitual de trabajo.',
    extra: true,
  },

  // ── EXPERIENCIAS ACTIVAS ──────────────────────────────────
  {
    id: 'wellness-corporativo',
    name: 'Jornada de bienestar corporativo',
    dur: '2,5–3h',
    group: 'activo',
    objetivo: 'Reconexión y energía',
    desc: 'Experiencia que integra movilidad, respiración y dinámicas de grupo para que el equipo desconecte de la rutina operativa y regrese con energía y foco renovados.',
  },
  {
    id: 'jornada-deportiva',
    name: 'Jornada deportiva corporativa',
    dur: 'Medio día',
    group: 'activo',
    objetivo: 'Energía, competición sana y equipo',
    desc: 'Circuito de pruebas deportivas por equipos con formato competitivo adaptado. Activa el cuerpo, fomenta una competición sana y genera recuerdos compartidos que refuerzan el grupo.',
    extra: true,
  },
  {
    id: 'padel-corporativo',
    name: 'Pádel corporativo',
    dur: 'Medio día',
    group: 'activo',
    objetivo: 'Red, competición y conexión informal',
    desc: 'Torneo de pádel con formato por parejas rotativas y categorías adaptadas al nivel del grupo. Genera conversaciones y conexiones que difícilmente ocurren dentro de la oficina.',
    extra: true,
  },
  {
    id: 'wellness-outdoor',
    name: 'Jornada wellness outdoor',
    dur: 'Medio día',
    group: 'activo',
    objetivo: 'Bienestar, naturaleza y desconexión activa',
    desc: 'Sesión de movimiento, respiración y conexión con el entorno natural en exteriores. Para equipos que necesitan salir de la rutina y volver con energía renovada y perspectiva más amplia.',
    extra: true,
  },
  {
    id: 'reto-orientacion',
    name: 'Reto de orientación en equipo',
    dur: '3–4h',
    group: 'activo',
    objetivo: 'Colaboración y toma de decisiones',
    desc: 'Actividad outdoor estructurada en etapas donde cada equipo debe colaborar, decidir bajo presión y adaptarse a lo inesperado. Trabaja el liderazgo situacional y la comunicación en campo.',
    extra: true,
  },

  // ── EVENTOS Y CELEBRACIONES ───────────────────────────────
  {
    id: 'competicion-interna',
    name: 'Competición interna y sentido de pertenencia',
    dur: '2h',
    group: 'evento',
    objetivo: 'Energía y pertenencia',
    desc: 'Concurso dinámico que mezcla cultura corporativa, conocimiento de la empresa y retos en equipo. Alta energía, formato adaptable a cualquier espacio y muy fácil de trasladar a eventos internos.',
  },
  {
    id: 'taller-creativo-art',
    name: 'Experiencia creativa y gastronómica',
    dur: '2–3h',
    group: 'evento',
    objetivo: 'Distensión, conversación y disfrute',
    desc: 'Combinación de una actividad creativa ligera con un contexto distendido. Una forma diferente de conectar fuera del entorno de trabajo, ideal para equipos que rara vez comparten tiempo informal.',
    extra: true,
  },
  {
    id: 'cena-show',
    name: 'Evento y cena de empresa',
    dur: 'Noche',
    group: 'evento',
    objetivo: 'Celebración, reconocimiento y cierre de etapa',
    desc: 'Evento corporativo de fin de temporada o celebración de hitos, con producción adaptada al tamaño del grupo: dinámicas de apertura, música, show o DJ según el formato elegido. Diseñado para que el equipo cierre un ciclo sintiéndose reconocido.',
    extra: true,
  },
];

/** Nota sobre experiencias que pueden requerir coste adicional. */
export const EXTRA_NOTE =
  'Puede requerir coste adicional de espacio, materiales o proveedor externo.';

export const GROUP_LABELS: Record<TeamBuildingExperience['group'], string> = {
  cohesion: 'Dinámicas de cohesión',
  activo: 'Experiencias activas',
  evento: 'Eventos y celebraciones',
};
