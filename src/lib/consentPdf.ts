// ════════════════════════════════════════════════════════════
// Genera el PDF del consentimiento informado firmado (pdf-lib, JS puro:
// funciona igual en Cloudflare Pages Functions y en Node para probarlo).
// El texto sale de src/data/consentimiento.ts: lo que se guarda es
// exactamente lo que el paciente leyó.
// ════════════════════════════════════════════════════════════
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';
import { CONSENT, TECNICAS, VERSION, type ConsentLang } from '../data/consentimiento.ts';
import { titular } from '../data/site.ts';

export interface ConsentInput {
  lang: ConsentLang;
  nombre: string;
  documento?: string;
  telefono: string;
  tecnicas: string[]; // valores canónicos en español
  // Firmas en JPEG: se insertan sin decodificar (barato en CPU en Cloudflare).
  firmaPaciente: Uint8Array;
  firmaProfesional: Uint8Array;
  fecha: Date;
}

const GREEN = rgb(0.102, 0.361, 0.102);
const TEXT = rgb(0.067, 0.067, 0.067);
const SEC = rgb(0.37, 0.37, 0.37);
const LINE = rgb(0.86, 0.88, 0.86);

const W = 595.28;
const H = 841.89;
const M = 50;

export function formatFecha(d: Date, lang: ConsentLang): string {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-GB' : 'es-ES', {
    timeZone: 'Europe/Madrid',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export async function buildConsentPdf(input: ConsentInput): Promise<Uint8Array> {
  const t = CONSENT[input.lang];
  const pdf = await PDFDocument.create();
  pdf.setTitle(t.title);
  pdf.setAuthor(titular.nombre);
  pdf.setCreationDate(input.fecha);

  const reg = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const sigP = await pdf.embedJpg(input.firmaPaciente);
  const sigF = await pdf.embedJpg(input.firmaProfesional);

  const prof =
    input.lang === 'en'
      ? `${titular.nombre} · Physiotherapist, registration no. ${titular.colegiado} (COFIB)`
      : `${titular.nombre} · Fisioterapeuta colegiado nº ${titular.colegiado} (COFIB)`;

  let page: PDFPage = pdf.addPage([W, H]);
  let y = H - M;

  function header() {
    page.drawText('BATMOTRÓPICOS · HEALTH SERVICES', { x: M, y: H - 38, size: 8, font: bold, color: GREEN });
    page.drawText(prof, { x: M, y: H - 50, size: 7.5, font: reg, color: SEC });
    page.drawLine({ start: { x: M, y: H - 60 }, end: { x: W - M, y: H - 60 }, thickness: 0.6, color: LINE });
    y = H - 84;
  }

  function ensure(space: number) {
    if (y - space < 70) {
      page = pdf.addPage([W, H]);
      header();
    }
  }

  function lines(text: string, font: PDFFont, size: number, width: number): string[] {
    const out: string[] = [];
    let cur = '';
    for (const word of text.split(/\s+/)) {
      const trial = cur ? cur + ' ' + word : word;
      if (font.widthOfTextAtSize(trial, size) <= width) cur = trial;
      else {
        if (cur) out.push(cur);
        cur = word;
      }
    }
    if (cur) out.push(cur);
    return out;
  }

  function para(text: string, opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; indent?: number; gap?: number } = {}) {
    const font = opts.font ?? reg;
    const size = opts.size ?? 9.5;
    const indent = opts.indent ?? 0;
    const lead = size * 1.4;
    for (const ln of lines(text, font, size, W - 2 * M - indent)) {
      ensure(lead);
      page.drawText(ln, { x: M + indent, y, size, font, color: opts.color ?? TEXT });
      y -= lead;
    }
    y -= opts.gap ?? 4;
  }

  function bullet(text: string, mark = '•') {
    ensure(14);
    page.drawText(mark, { x: M + 4, y, size: 9.5, font: bold, color: GREEN });
    para(text, { indent: 18, gap: 2 });
  }

  // ── Cabecera y título
  header();
  para(t.title, { font: bold, size: 16, gap: 10 });

  // ── Datos del paciente
  const rows: [string, string][] = [
    [t.pdf.patient, input.nombre],
    [t.pdf.documento, input.documento || '—'],
    [t.pdf.telefono, input.telefono],
    [t.pdf.fecha, formatFecha(input.fecha, input.lang)],
  ];
  for (const [k, v] of rows) {
    ensure(15);
    page.drawText(k, { x: M, y, size: 9.5, font: bold, color: GREEN });
    page.drawText(v, { x: M + 150, y, size: 9.5, font: reg, color: TEXT });
    y -= 15;
  }
  y -= 8;

  // ── Información (lo que leyó el paciente)
  for (const s of t.sections) {
    ensure(30);
    para(s.h, { font: bold, size: 10.5, gap: 3 });
    if (s.p) para(s.p);
    if (s.list) s.list.forEach((li) => bullet(li));
    if (s.after) para(s.after, { color: SEC });
    y -= 4;
  }

  // ── Técnicas consentidas
  ensure(70);
  para(t.pdf.tecnicas, { font: bold, size: 10.5, gap: 3 });
  for (const tec of TECNICAS) {
    const on = input.tecnicas.includes(tec.val);
    bullet(input.lang === 'en' ? tec.en : tec.val, on ? '[X]' : '[  ]');
  }
  y -= 4;

  // ── Declaraciones
  ensure(60);
  para(t.pdf.declara, { font: bold, size: 10.5, gap: 3 });
  t.declarations.forEach((d) => bullet(d, '[X]'));
  y -= 10;

  // ── Firmas
  const boxW = (W - 2 * M - 20) / 2;
  const boxH = 90;
  ensure(boxH + 50);
  const top = y;
  const sigs: [string, typeof sigP, string][] = [
    [t.pdf.firmaPaciente, sigP, input.nombre],
    [t.pdf.firmaProfesional, sigF, `${titular.nombre} · nº ${titular.colegiado}`],
  ];
  sigs.forEach(([label, img, name], i) => {
    const x = M + i * (boxW + 20);
    page.drawText(label, { x, y: top, size: 9, font: bold, color: GREEN });
    page.drawRectangle({ x, y: top - 8 - boxH, width: boxW, height: boxH, borderColor: LINE, borderWidth: 0.8 });
    const scale = Math.min((boxW - 16) / img.width, (boxH - 12) / img.height);
    const iw = img.width * scale;
    const ih = img.height * scale;
    page.drawImage(img, { x: x + (boxW - iw) / 2, y: top - 8 - boxH + (boxH - ih) / 2, width: iw, height: ih });
    page.drawText(name, { x, y: top - 8 - boxH - 13, size: 8.5, font: reg, color: TEXT });
  });

  // ── Pie en todas las páginas
  const pages = pdf.getPages();
  pages.forEach((p, i) => {
    p.drawLine({ start: { x: M, y: 48 }, end: { x: W - M, y: 48 }, thickness: 0.6, color: LINE });
    p.drawText(`${t.pdf.pie} · ${VERSION}`, { x: M, y: 36, size: 7, font: reg, color: SEC });
    const n = `${i + 1}/${pages.length}`;
    p.drawText(n, { x: W - M - reg.widthOfTextAtSize(n, 7), y: 36, size: 7, font: reg, color: SEC });
  });

  return pdf.save();
}
