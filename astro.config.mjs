// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Placeholder domain until the real one is purchased — trivial find-and-replace later (see CLAUDE.md 5.1).
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
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [sitemap()],
});
