// Ficha de contacto (vCard 3.0) que descarga el botón "Guardar mi contacto" de /hola.
// Se genera en el build a partir de los datos de site.ts, con la foto incrustada
// para que aparezca en la agenda del móvil.
import fs from 'node:fs';
import path from 'node:path';
import { site, contacto } from '../data/site';

const FOTO = path.join(process.cwd(), 'public/assets/img/real/juanlu-vcard.jpg');

// Escapa los caracteres reservados de vCard en valores de texto.
const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1');

// Pliega las líneas largas a 75 caracteres (continuación con espacio inicial).
const fold = (line: string) => line.match(/.{1,74}/g)!.join('\r\n ');

export function GET() {
  const foto = fs.readFileSync(FOTO).toString('base64');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc('Rodríguez Ávila')};${esc('Juan Luis')};;;`,
    `FN:${esc(contacto.nombre)}`,
    'NICKNAME:Juanlu',
    `ORG:${esc(`${site.name} ${site.tagline}`)}`,
    `TITLE:${esc('Fisioterapeuta · Fundador')}`,
    `TEL;TYPE=CELL,VOICE:${contacto.telefonoIntl}`,
    'EMAIL;TYPE=INTERNET,WORK:juanluis@batmotropicos.com',
    `URL:${site.url}`,
    `X-SOCIALPROFILE;TYPE=linkedin:${contacto.linkedin}`,
    `ADR;TYPE=WORK:;;;${esc(contacto.ubicacion)};Illes Balears;;España`,
    `NOTE:${esc('Formación en bienestar corporativo, ergonomía y pausas activas. Bonificable por FUNDAE.')}`,
    `PHOTO;ENCODING=b;TYPE=JPEG:${foto}`,
    'END:VCARD',
  ];
  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/vcard; charset=utf-8' },
  });
}
