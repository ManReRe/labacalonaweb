// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Real domain, live since 2026-08-27 (CLAUDE.md 5.1) — served at the root via
// GitHub Pages + a custom domain (see public/CNAME), no path prefix needed.
const SITE_URL = 'https://labacalona.es';

export default defineConfig({
  site: SITE_URL,
  // Spanish is the default, unprefixed locale; English lives under /en/.
  // prefixDefaultLocale: false keeps ES at the root per CLAUDE.md 3.1.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
  trailingSlash: 'never',
  build: {
    format: 'directory',
    // The whole site is one small compiled CSS file; inlining it into every
    // page's <head> removes a render-blocking network round trip (PageSpeed
    // flagged ~1s of it) at the cost of not caching CSS across page loads —
    // a fine trade here given the file's size and the page count.
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
