# La Bacalona — website

Marketing website for La Bacalona, a restaurant in Seville. Static, content-first Astro
site: Spanish at the root, English under `/en/`, zero client JS beyond a few small
progressive-enhancement scripts (language redirect, scroll reveal, CoverManager
reservation widget, live Google rating).

Live at [labacalona.es](https://labacalona.es), deployed automatically to GitHub Pages on
every push to `main` (see `.github/workflows/deploy.yml`).

## Stack

- [Astro](https://astro.build) (SSG) — see `astro.config.mjs`
- Tailwind CSS (`@tailwindcss/vite`)
- Astro's built-in i18n routing (`es` default/unprefixed, `en` under `/en/`)
- No analytics/tracking scripts by default

## Requirements

- Node 22 (matches the version used in the deploy workflow)

## Getting started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the built output locally
npm run check     # astro check (TypeScript + template diagnostics)
```

## Environment variables

Copy `.env.example` to `.env` for local development. All variables are optional —
the site works fully without them.

| Variable | Purpose |
| --- | --- |
| `PUBLIC_GOOGLE_PLACES_API_KEY` | Google Places API (New) key, restricted by HTTP referrer, used client-side to refresh the homepage Google rating badge live. |
| `PUBLIC_GOOGLE_PLACE_ID` | Place ID for La Bacalona, used by the same badge. |

Without these two set, the homepage falls back to the static rating in
`src/data/restaurant.ts`. For production, set both as repository secrets
(**Settings → Secrets and variables → Actions**) — the deploy workflow passes them
through at build time.

## Content structure

- `src/data/restaurant.ts` — NAP, hours, links, and other restaurant identity (single
  source of truth, feeds JSON-LD too).
- `src/data/menu.ts` / `src/data/wines.ts` — structured menu and wine list content
  (never sourced from a linked/embedded PDF — see `Menu/` for the original source files).
- `src/data/allergens.ts` — the 14 EU-regulated allergens used for dish/wine tagging.
- `src/data/i18n.ts` — routes and UI strings per locale.

To update the menu, wine list, or restaurant details, edit the relevant data file (and
its Spanish/English content together, so the two locales never drift out of sync).

## i18n

Spanish pages live at the root (`src/pages/*.astro`); English equivalents live under
`src/pages/en/*.astro`. Every page pair should stay in sync in structure, and each
declares `hreflang` alternates (handled centrally in `src/layouts/Layout.astro`).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages under the custom domain in `public/CNAME`
(`labacalona.es`).
