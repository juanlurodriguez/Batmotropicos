# Batmotrópicos — Web corporativa

Web corporativa multipágina de **Batmotrópicos**: bienestar corporativo, formación bonificable
FUNDAE, team building y wellness in company para empresas.

Construida con [Astro](https://astro.build) como sitio estático, lista para desplegar en
**Cloudflare Pages**.

---

## 🚀 Stack

- **Astro 4** (output estático, sin framework de cliente)
- **Montserrat** (Google Fonts)
- CSS propio con variables de branding (sin dependencias de UI)
- JavaScript mínimo e _inline_ (menú móvil, reveal en scroll, buscador y formulario)

## 📁 Estructura

```
public/
  assets/
    logo/    batmotropicos-stacked.svg · batmotropicos-icon-outline.svg
    video/   batmotropicos-logo-animation.mp4
src/
  components/   Header · Footer · WhatsAppWidget · CatalogCard · CTASection · Icon
  data/         catalogo.ts · teamBuilding.ts · casos.ts · site.ts
  layouts/      BaseLayout.astro
  pages/        index · que-hacemos · catalogo · team-building ·
                fundae · casos-de-exito · quienes-somos · contacto
  styles/       global.css
```

## 🧩 Páginas

| Ruta               | Contenido                                              |
| ------------------ | ------------------------------------------------------ |
| `/`                | Home: claim, qué hacemos, catálogo, beneficios, método |
| `/que-hacemos`     | Enfoque, beneficios y proceso de trabajo               |
| `/catalogo`        | Catálogo completo con buscador y categorías            |
| `/team-building`   | Experiencias de cohesión de equipo                     |
| `/fundae`          | Bonificación FUNDAE, proceso y FAQ                      |
| `/casos-de-exito`  | Casos reales (ampliable con vídeo/imágenes)            |
| `/quienes-somos`   | Origen de la marca, equipo y Empresa Saludable         |
| `/contacto`        | Formulario de diagnóstico + datos de contacto          |

## ✏️ Editar contenido

- **Catálogo:** `src/data/catalogo.ts`
- **Team building:** `src/data/teamBuilding.ts`
- **Casos de éxito:** `src/data/casos.ts`
- **Contacto, WhatsApp y navegación:** `src/data/site.ts`

## 🔌 Formulario de contacto (webhook Make / n8n)

El formulario está preparado para enviar los datos a un webhook. Edita la constante en
`src/pages/contacto.astro`:

```js
const WEBHOOK_URL = ''; // ← pega aquí la URL del webhook de Make / n8n / Airtable
```

Si se deja vacía, el formulario funciona en **modo demo** (muestra el mensaje de éxito sin enviar).
El payload enviado es JSON:

```json
{
  "nombre": "…",
  "empresa": "…",
  "telefono": "…",
  "email": "…",
  "trabajadores": "11–50",
  "necesidad": "Diagnóstico 360º",
  "origen": "web-batmotropicos",
  "pagina": "/contacto",
  "enviadoEn": "2026-01-01T00:00:00.000Z"
}
```

Incluye un campo _honeypot_ (`_gotcha`) básico contra spam.

## 🧪 Desarrollo local

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run build    # build de producción → ./dist
npm run preview  # previsualizar el build
```

## ☁️ Despliegue en Cloudflare Pages

| Ajuste                | Valor           |
| --------------------- | --------------- |
| **Framework preset**  | Astro           |
| **Build command**     | `npm run build` |
| **Build output dir.** | `dist`          |

No requiere variables de entorno.

---

### Nota sobre FUNDAE

La web **no promete gratuidad**. La fórmula usada en todo el sitio es:

> Muchas acciones pueden bonificarse mediante el crédito formativo disponible de la empresa,
> siempre sujeto a crédito, modalidad, plazos y cumplimiento de requisitos.

Batmotrópicos no es un organismo oficial ni partner de FUNDAE.
