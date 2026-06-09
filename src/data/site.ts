// ════════════════════════════════════════════════════════════
// CONFIGURACIÓN GLOBAL DEL SITIO
// Datos de contacto, enlaces y navegación. Fuente única de verdad.
// ════════════════════════════════════════════════════════════

export const site = {
  name: 'Batmotrópicos',
  tagline: 'Health Services',
  claim: 'Activamos personas para que los equipos funcionen mejor.',
  subclaim:
    'Formación corporativa, bienestar laboral y experiencias de cohesión para empresas que quieren cuidar, formar y retener talento.',
  url: 'https://batmotropicos.com',
};

export const contacto = {
  nombre: 'Juan Luis Rodríguez Ávila',
  telefono: '640 761 701',
  telefonoIntl: '+34640761701',
  email: 'contacto@juanlurodriguez.com',
  ubicacion: 'Palma de Mallorca',
  linkedin: 'https://www.linkedin.com/in/juanlurodriguez',
  linkedinLabel: 'juanlurodriguez',
};

// WhatsApp con mensaje predefinido
const WA_TEXT =
  'Hola, quiero solicitar información sobre programas de bienestar corporativo para mi empresa.';
export const WHATSAPP = `https://wa.me/34640761701?text=${encodeURIComponent(WA_TEXT)}`;

// Navegación principal (orden del header)
export const nav: { href: string; label: string }[] = [
  { href: '/que-hacemos', label: 'Qué hacemos' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/team-building', label: 'Team building' },
  { href: '/fundae', label: 'FUNDAE' },
  { href: '/quienes-somos', label: 'Quiénes somos' },
];

// Opciones del formulario de contacto
export const NEEDS = [
  'Diagnóstico 360º',
  'Formación FUNDAE',
  'Team building',
  'Wellness in company',
  'No lo tengo claro',
];

export const SIZES = ['1–10', '11–50', '51–200', 'Más de 200'];
