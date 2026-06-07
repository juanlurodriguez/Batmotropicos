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
    desc: 'Prevención y cuidado del cuerpo en el puesto: postura, movilidad y reducción de molestias.',
    bonif: 'Bonificable según crédito y requisitos',
    items: [
      { name: 'Espalda saludable y ergonomía laboral', dur: '2–8h' },
      { name: 'Pausas activas y prevención de lesiones', dur: '2–4h' },
      { name: 'Técnicas de masaje y terapias', dur: '2–3h' },
      { name: 'Movilidad y estiramientos adaptados', dur: '2h' },
      { name: 'Entrenamiento físico adaptado al trabajo', dur: '2–3h' },
    ],
  },
  {
    id: 'salud-mental',
    letter: 'B',
    tab: 'Salud mental y habilidades',
    title: 'Salud mental, habilidades y equilibrio',
    desc: 'Equilibrio mental, habilidades y hábitos para sostener el rendimiento sin desgaste.',
    bonif: 'Bonificable según crédito y requisitos',
    items: [
      { name: 'Gestión del estrés laboral', dur: '2–3h' },
      { name: 'Autocontrol y gestión emocional', dur: '2–3h' },
      { name: 'Respiración consciente y regulación', dur: '2h' },
      { name: 'Comunicación asertiva y conflictos', dur: '3h' },
      { name: 'Gestión de equipos y liderazgo', dur: '3–6h' },
      { name: 'Productividad y gestión del tiempo', dur: '2–3h' },
      { name: 'Autoconciencia laboral', dur: '2h' },
      { name: 'Mindfulness y meditación aplicada', dur: '2–3h' },
      { name: 'Yoga laboral', dur: '2–3h' },
      { name: 'Pilates suave corporativo', dur: '2–3h' },
      { name: 'Alimentación saludable en el trabajo', dur: '2h' },
    ],
  },
  {
    id: 'tecnica-obligatoria',
    letter: 'C',
    tab: 'Técnica y obligatoria',
    title: 'Formación técnica y obligatoria',
    desc: 'Cumplimiento normativo y capacitación técnica, con la documentación gestionada.',
    bonif: 'Bonificable según crédito y requisitos',
    items: [
      { name: 'PRL básico y específico por puesto', dur: 'Según curso' },
      { name: 'Primeros auxilios, SVB y DEA', dur: '4–8h' },
      { name: 'Manipulación de alimentos y alérgenos', dur: '6–8h' },
      { name: 'Igualdad, diversidad e inclusión', dur: 'Según plan' },
      { name: 'Inglés profesional y comunicación', dur: 'Según nivel' },
      { name: 'Ofimática, IA y herramientas digitales', dur: '8–20h' },
      { name: 'Ciberseguridad básica para empleados', dur: '4–8h' },
      { name: 'Ventas, negociación y atención al cliente', dur: '6–12h' },
    ],
  },
  {
    id: 'team-building',
    letter: 'D',
    tab: 'Team building',
    title: 'Team building y cohesión',
    desc: 'Experiencias de cohesión para activar, conectar y energizar a los equipos.',
    bonif: 'Parcialmente bonificable según estructura',
    items: [
      { name: 'Wellness / Bienestar Integral', dur: '2,5–3h' },
      { name: 'La Fábrica de Ideas', dur: '3h' },
      { name: 'Escape Room en la Oficina', dur: '2h' },
      { name: 'Risoterapia', dur: '2h' },
      { name: 'Quiz Show Corporativo', dur: '2h' },
      { name: 'Juegos en Equipo', dur: '2–3h' },
      { name: 'Art & Wine', dur: '2–3h', extra: true },
      { name: 'Sport Day', dur: '2–3h', extra: true },
    ],
  },
  {
    id: 'wellness-in-company',
    letter: 'E',
    tab: 'Wellness in company',
    title: 'Servicios wellness in company',
    desc: 'Bienestar recurrente integrado en la jornada, en las instalaciones del cliente.',
    bonif: 'Parcialmente bonificable según estructura',
    items: [
      { name: 'Fisioterapia in company', dur: 'Recurrente' },
      { name: 'Wellness Point', dur: 'Recurrente' },
      { name: 'Sesiones de Yoga / Pilates / Mindfulness', dur: 'Recurrente' },
      { name: 'Masajes y terapias en empresa', dur: 'Puntual' },
    ],
  },
  {
    id: 'programas',
    letter: 'F',
    tab: 'Programas',
    title: 'Programas recomendados',
    desc: 'Combinaciones diseñadas para cubrir necesidades habituales por sector o calendario.',
    bonif: 'Parcialmente bonificable según estructura',
    items: [
      { name: 'Acción puntual', note: 'Una intervención concreta para una necesidad específica.' },
      { name: 'Pack Cumplimiento RRHH', note: 'Formación obligatoria agrupada y gestionada.' },
      { name: 'Plan Bienestar Semestral', note: 'Programa continuado de bienestar durante seis meses.' },
      { name: 'Plan Bienestar Anual', note: 'Acompañamiento de bienestar a lo largo del año.' },
      { name: 'Pack Hostelería Sin Lesiones', note: 'Prevención física orientada al sector hostelero.' },
      { name: 'Pack Gran Consumo', note: 'Bienestar y prevención para equipos de gran consumo.' },
    ],
  },
];

/** Nota legal recurrente sobre bonificación FUNDAE. */
export const BONIF_NOTE =
  'Muchas acciones pueden bonificarse mediante el crédito formativo disponible de la empresa, siempre sujeto a crédito, modalidad, plazos y cumplimiento de requisitos.';
