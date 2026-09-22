// ════════════════════════════════════════════════════════════
// CASOS DE ÉXITO
// Programas reales implantados en empresas. Conforme haya material
// audiovisual, rellenar `videoSrc`, `linkedin` e imágenes.
// ════════════════════════════════════════════════════════════

export interface Caso {
  /** Identificador único y estable */
  id: string;
  /** Nombre del caso / empresa */
  empresa: string;
  /** Sector o contexto */
  sector: string;
  /** Estado de publicación */
  estado: 'publicado' | 'proximamente';
  /** Objetivo del programa */
  objetivo: string;
  /** Acción implantada */
  accion: string;
  /** Feedback o resultado */
  feedback: string;
  /** Ruta a vídeo local (/assets/video/...) o URL de embed. Vacío si pendiente. */
  videoSrc?: string;
  /** Imagen de portada del vídeo */
  poster?: string;
  /** Vídeo en formato vertical (9:16) */
  vertical?: boolean;
  /** Testimonio breve con autoría */
  cita?: { texto: string; autor: string };
  /** Enlace al post de LinkedIn. Vacío si pendiente. */
  linkedin?: string;
}

export const casos: Caso[] = [
  {
    id: 'club-mac-alcudia',
    empresa: 'Club Mac Alcúdia · Mac Hotels',
    sector: 'Hotelería · Equipo de pisos',
    estado: 'publicado',
    objetivo: 'Reducir la carga física del equipo de pisos: hombro, espalda y agotamiento.',
    accion:
      'Semana del Housekeeping: formación práctica en autocuidado preventivo, higiene postural y calentamiento para 73 personas. Programa piloto de salud laboral.',
    feedback: 'Mac Hotels lo presentó como su mejor inversión: cuidar desde dentro a quienes sostienen el hotel.',
    videoSrc: '/assets/casos/club-mac-housekeeping.mp4',
    poster: '/assets/casos/club-mac-housekeeping-poster.jpg',
    vertical: true,
    cita: {
      texto: 'Bueno, pues yo recomendaría realmente esta formación.',
      autor: 'Marga Munar · Responsable de Pisos, Club Mac',
    },
    linkedin: '',
  },
  {
    id: 'kokomo',
    empresa: 'Caso Kokomo',
    sector: 'Hostelería · Restauración',
    estado: 'proximamente',
    objetivo: 'Activar al equipo y reducir molestias físicas durante la temporada.',
    accion: 'Programa de bienestar y autocuidado in company (4 sesiones).',
    feedback: 'Pendiente de publicación junto al material audiovisual.',
    videoSrc: '',
    linkedin: '',
  },
];
