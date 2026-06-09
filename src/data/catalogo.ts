// ════════════════════════════════════════════════════════════
// CATÁLOGO BATMOTRÓPICOS
// Fuente única de verdad para el catálogo de formación y servicios.
// Editar aquí actualiza /catalogo y la home automáticamente.
// ════════════════════════════════════════════════════════════

export interface CatalogItem {
  /** Nombre de la acción formativa o servicio */
  name: string;
  /** Duración orientativa (ej. "2–8h", "Recurrente") */
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
      { name: 'Ergonomía aplicada al puesto de trabajo', dur: '2–8h' },
      { name: 'Pausas activas y movilidad laboral', dur: '2–4h' },
      { name: 'Prevención de molestias musculoesqueléticas', dur: '2–4h' },
      { name: 'Técnicas de masaje y terapias manuales', dur: '2–3h' },
      { name: 'Movilidad y estiramientos adaptados al puesto', dur: '2h' },
      { name: 'Acondicionamiento físico aplicado al trabajo', dur: '2–3h' },
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
      { name: 'Gestión del estrés en equipos de alta exigencia', dur: '2–3h' },
      { name: 'Regulación emocional y autocontrol', dur: '2–3h' },
      { name: 'Técnicas de respiración y regulación del sistema nervioso', dur: '2h' },
      { name: 'Comunicación asertiva y gestión de conflictos', dur: '3h' },
      { name: 'Liderazgo y gestión de equipos', dur: '3–6h' },
      { name: 'Productividad sostenible y gestión del tiempo', dur: '2–3h' },
      { name: 'Hábitos saludables en la jornada laboral', dur: '2h' },
      { name: 'Mindfulness aplicado al entorno de trabajo', dur: '2–3h' },
      { name: 'Yoga laboral', dur: '2–3h' },
      { name: 'Pilates corporativo adaptado', dur: '2–3h' },
      { name: 'Alimentación y nutrición en el trabajo', dur: '2h' },
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
      { name: 'Prevención de riesgos laborales — básico y específico por puesto', dur: 'Según curso' },
      { name: 'Primeros auxilios, soporte vital básico y DEA', dur: '4–8h' },
      { name: 'Manipulación de alimentos e información sobre alérgenos', dur: '6–8h' },
      { name: 'Igualdad, diversidad e inclusión en la empresa', dur: 'Según plan' },
      { name: 'Inglés profesional y comunicación en entornos laborales', dur: 'Según nivel' },
      { name: 'Ofimática, inteligencia artificial y herramientas digitales', dur: '8–20h' },
      { name: 'Ciberseguridad básica para equipos de trabajo', dur: '4–8h' },
      { name: 'Técnicas de venta, negociación y atención al cliente', dur: '6–12h' },
    ],
  },
  {
    id: 'team-building',
    letter: 'D',
    tab: 'Team building',
    title: 'Team building y cohesión de equipos',
    desc: 'Experiencias de cohesión diseñadas para activar, conectar y reforzar el sentido de equipo. Formato adaptable al tamaño del grupo, el espacio disponible y los objetivos de la empresa.',
    bonif: 'Parcialmente bonificable según estructura',
    items: [
      { name: 'Jornada de bienestar corporativo', dur: '2,5–3h' },
      { name: 'La Fábrica de Ideas — taller de innovación colaborativa', dur: '3h' },
      { name: 'Reto de comunicación en equipo', dur: '2h' },
      { name: 'Dinámica de activación y desbloqueo', dur: '2h' },
      { name: 'Competición interna y sentido de pertenencia', dur: '2h' },
      { name: 'Actividades de cohesión grupal', dur: '2–3h' },
      { name: 'Taller creativo corporativo', dur: '2–3h', extra: true },
      { name: 'Jornada deportiva corporativa', dur: '2–3h', extra: true },
    ],
  },
  {
    id: 'wellness-in-company',
    letter: 'E',
    tab: 'Wellness in company',
    title: 'Servicios wellness in company',
    desc: 'Bienestar recurrente integrado en la jornada laboral, prestado en las instalaciones del cliente. Sin desplazamientos para el equipo, sin fricción para RRHH.',
    bonif: 'Parcialmente bonificable según estructura',
    items: [
      { name: 'Fisioterapia in company', dur: 'Recurrente' },
      { name: 'Wellness Point — punto de bienestar en empresa', dur: 'Recurrente' },
      { name: 'Yoga, pilates y mindfulness en la empresa', dur: 'Recurrente' },
      { name: 'Masajes y terapias de recuperación en empresa', dur: 'Puntual' },
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
      { name: 'Cumplimiento formativo RRHH', note: 'Formación técnica y obligatoria agrupada, documentada y gestionada con una sola interlocución.' },
      { name: 'Plan de bienestar semestral', note: 'Seis acciones en seis meses: una intervención mensual con hilo conductor, seguimiento y memoria de resultados.' },
      { name: 'Plan de bienestar anual', note: 'Doce acciones a lo largo del año, con evaluación semestral y propuesta de continuidad basada en resultados.' },
      { name: 'Plan integral anual', note: 'Formación, bienestar y team building integrados en un único programa anual: diagnóstico inicial, diseño a medida, ejecución y medición de impacto.' },
      { name: 'Programa de prevención en hostelería', note: 'Ergonomía, autocuidado físico y hábitos saludables aplicados a los puestos de trabajo del sector hostelero.' },
    ],
  },
];

/** Nota legal recurrente sobre bonificación FUNDAE. */
export const BONIF_NOTE =
  'Muchas acciones pueden bonificarse mediante el crédito formativo disponible de la empresa, siempre sujeto a crédito disponible, modalidad, plazos y cumplimiento de requisitos.';
