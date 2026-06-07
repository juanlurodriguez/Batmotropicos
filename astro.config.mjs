// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Sitio estático orientado a Cloudflare Pages.
// Build command: `npm run build`  ·  Output directory: `dist`
export default defineConfig({
  site: 'https://batmotropicos.com',
  output: 'static',
  build: {
    format: 'directory',
  },
  trailingSlash: 'ignore',
});
