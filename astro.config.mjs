// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Placeholder domain until the real one is purchased — trivial find-and-replace later (see CLAUDE.md 5.1).
const SITE_URL = 'https://labacalona.es';

// GitHub Pages serves this repo as a project page at /labacalonaweb/ until the
// real domain is live — only the CI build needs that path prefix; local/production
// builds for the real domain stay at the root. See src/utils/paths.ts.
const BASE_PATH = process.env.GITHUB_ACTIONS ? '/labacalonaweb' : '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
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
