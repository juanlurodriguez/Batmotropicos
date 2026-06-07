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
  /** Enlace al post de LinkedIn. Vacío si pendiente. */
  linkedin?: string;
}

export const casos: Caso[] = [
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
