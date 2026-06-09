// ════════════════════════════════════════════════════════════
// CATÁLOGO BATMOTRÓPICOS
// Fuente única de verdad para el catálogo de formación y servicios.
// Editar aquí actualiza /catalogo y la home automáticamente.
// ════════════════════════════════════════════════════════════

export interface CatalogItem {
  /** Nombre de la acción formativa o servicio */
  name: string;
  /** Formato orientativo (ej. "Sesión", "Jornada", "Formato adaptable") */
  dur?: string;
  /** Descripción breve para programas o servicios sin duración fija */
  note?: string;
  /** Marca acciones que pueden requerir coste adicional de espacio/materiales */
  extra?: boolean;
}

export interface CatalogCategory {
  /** Identificador único y estable de la categoría */
  id: string;
  /** Letra de referencia visual */
  letter: string;
  /** Etiqueta corta para pestañas / chips */
  tab: string;
  /** Título completo de la categoría */
  title: string;
  /** Descripción de la categoría */
  desc: string;
  /** Nota sobre bonificación de esta área */
  bonif: string;
  /** Acciones incluidas */
  items: CatalogItem[];
}

export const catalogo: CatalogCategory[] = [
  {
    id: 'salud-fisica',
    letter: 'A',
    tab: 'Salud física',
    title: 'Salud física, ergonomía y prevención',
    desc: 'Intervenciones orientadas al cuidado del cuerpo en el puesto: postura, movilidad, ergonomía aplicada y reducción de molestias musculoesqueléticas.',
    bonif: 'Bonificable según crédito y requisitos',
    items: [
      { name: 'Ergonomía aplicada al puesto de trabajo', dur: 'Sesión / jornada' },
      { name: 'Pausas activas y movilidad laboral', dur: 'Sesión' },
      { name: 'Prevención de molestias musculoesqueléticas', dur: 'Sesión' },
      { name: 'Terapia manual y técnicas de recuperación', dur: 'Sesión' },
      { name: 'Movilidad y estiramientos adaptados al puesto', dur: 'Sesión' },
      { name: 'Acondicionamiento físico aplicado al trabajo', dur: 'Sesión' },
    ],
  },
  {
    id: 'salud-mental',
    letter: 'B',
    tab: 'Salud mental y habilidades',
    title: 'Salud mental, habilidades y equilibrio',
    desc: 'Formación para gestionar el estrés, mejorar la comunicación y sostener el rendimiento sin desgaste. Habilidades blandas con aplicación directa al entorno laboral.',
    bonif: 'Bonificable según crédito y requisitos',
    items: [
      { name: 'Gestión del estrés en equipos de alta exigencia', dur: 'Sesión' },
      { name: 'Regulación emocional y autocontrol', dur: 'Sesión' },
      { name: 'Técnicas de respiración y regulación del sistema nervioso', dur: 'Sesión' },
      { name: 'Comunicación asertiva y gestión de conflictos', dur: 'Jornada' },
      { name: 'Liderazgo y gestión de equipos', dur: 'Programa' },
      { name: 'Productividad sostenible y gestión del tiempo', dur: 'Sesión / jornada' },
      { name: 'Hábitos saludables en la jornada laboral', dur: 'Sesión' },
      { name: 'Mindfulness aplicado al entorno de trabajo', dur: 'Sesión' },
      { name: 'Yoga y movilidad corporativa', dur: 'Sesión' },
      { name: 'Pilates corporativo adaptado', dur: 'Sesión' },
      { name: 'Alimentación y nutrición en el trabajo', dur: 'Sesión' },
    ],
  },
  {
    id: 'tecnica-obligatoria',
    letter: 'C',
    tab: 'Técnica y obligatoria',
    title: 'Formación técnica y obligatoria',
    desc: 'Cumplimiento normativo y capacitación técnica, con la documentación conforme a la legislación vigente gestionada en cada paso.',
    bonif: 'Bonificable según crédito y requisitos',
    items: [
      { name: 'Prevención de riesgos laborales — básico y específico por puesto', dur: 'Según normativa' },
      { name: 'Primeros auxilios, soporte vital básico y DEA', dur: 'Jornada' },
      { name: 'Manipulación de alimentos e información sobre alérgenos', dur: 'Jornada' },
      { name: 'Igualdad, diversidad e inclusión en la empresa', dur: 'Según plan' },
      { name: 'Inglés profesional y comunicación en entornos laborales', dur: 'Según nivel' },
      { name: 'Ofimática, inteligencia artificial y herramientas digitales', dur: 'Programa' },
      { name: 'Ciberseguridad básica para equipos de trabajo', dur: 'Jornada' },
      { name: 'Técnicas de venta, negociación y atención al cliente', dur: 'Programa' },
    ],
  },
  {
    id: 'team-building',
    letter: 'D',
    tab: 'Team building',
    title: 'Team building y cohesión de equipos',
    desc: 'Experiencias de cohesión diseñadas para activar, conectar y reforzar el sentimiento de equipo. Formato adaptable al tamaño del grupo, el espacio disponible y los objetivos de la organización.',
    bonif: 'Parcialmente bonificable según estructura',
    items: [
      { name: 'Jornada de bienestar corporativo', dur: 'Medio día' },
      { name: 'La Fábrica de Ideas — taller de innovación colaborativa', dur: 'Jornada' },
      { name: 'Reto de comunicación en equipo', dur: 'Sesión' },
      { name: 'Dinámica de activación y desbloqueo', dur: 'Sesión' },
      { name: 'Pádel corporativo', dur: 'Medio día', extra: true },
      { name: 'Jornada deportiva corporativa', dur: 'Medio día', extra: true },
      { name: 'Jornada wellness outdoor', dur: 'Medio día', extra: true },
      { name: 'Taller creativo corporativo', dur: 'Sesión', extra: true },
      { name: 'Evento y cena de empresa', dur: 'Noche', extra: true },
    ],
  },
  {
    id: 'wellness-in-company',
    letter: 'E',
    tab: 'Wellness in company',
    title: 'Servicios wellness in company',
    desc: 'Bienestar integrado en la jornada, en las instalaciones de la empresa. Incluye fisioterapia, psicología, yoga, pausas activas, movilidad y recuperación. Modelos flexibles: sesiones recurrentes, bolsa de horas mensual o copago empresa-trabajador.',
    bonif: 'Parcialmente bonificable según estructura',
    items: [
      { name: 'Fisioterapia in company', dur: 'Recurrente' },
      { name: 'Psicología y apoyo emocional en empresa', dur: 'Recurrente' },
      { name: 'Yoga, pilates y movilidad en la empresa', dur: 'Recurrente' },
      { name: 'Pausas activas y recuperación física', dur: 'Recurrente' },
      { name: 'Punto de bienestar — intervención puntual en campaña', dur: 'Puntual' },
    ],
  },
  {
    id: 'programas',
    letter: 'F',
    tab: 'Programas',
    title: 'Programas y estructuras de contratación',
    desc: 'Estructuras diseñadas para dar profundidad y continuidad al trabajo de bienestar en la empresa. Desde una acción puntual hasta un programa integral a lo largo del año.',
    bonif: 'Parcialmente bonificable según estructura',
    items: [
      { name: 'Acción puntual', note: 'Intervención específica para una necesidad concreta del equipo o la organización.' },
      { name: 'Cumplimiento formativo anual', note: 'Formación técnica y obligatoria agrupada, documentada y gestionada por un solo equipo. Sin necesidad de coordinar varios proveedores.' },
      { name: 'Plan de bienestar semestral', note: 'Seis acciones en seis meses: una intervención mensual con hilo conductor, seguimiento y memoria de resultados.' },
      { name: 'Plan de bienestar anual', note: 'Doce acciones a lo largo del año, con evaluación semestral y propuesta de continuidad basada en resultados.' },
      { name: 'Plan integral anual', note: 'Formación, bienestar y cohesión integrados en un único programa anual, con diagnóstico inicial, diseño a medida, ejecución y medición de impacto. Pensado para empresas con mayor volumen, varias sedes o necesidades combinadas.' },
      { name: 'Programa de prevención en hostelería', note: 'Ergonomía, autocuidado físico y hábitos saludables aplicados a los puestos del sector hostelero.' },
    ],
  },
];

/** Nota legal recurrente sobre bonificación FUNDAE. */
export const BONIF_NOTE =
  'Muchas acciones pueden bonificarse mediante el crédito formativo disponible de la empresa, siempre sujeto a crédito disponible, modalidad, plazos y cumplimiento de requisitos.';
