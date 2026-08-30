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
npm run dev               # http://localhost:4321
npm run build             # static output in dist/
npm run preview           # serve the built output locally
npm run check             # astro check (TypeScript + template diagnostics)
npm run test:links        # broken internal links/images in dist/ (build first)
npm run test:links:external  # same, but also hits external links for real
npm run lhci              # Lighthouse CI against dist/ — see lighthouserc.json
```

## Quality gates on deploy

`.github/workflows/deploy.yml` runs an `audit` job before every deploy, alongside the
build:

- **Internal links/images** (`npm run test:links`) — crawls `dist/` and fails the deploy
  on any broken internal href, `src`, or `srcset`. External domains (CoverManager,
  Google Maps, Instagram, mekriva.com) are skipped here so this never fails because of
  someone else's downtime; `npm run test:links:external` re-checks those too but only as
  an informational, non-blocking step.
- **Lighthouse CI** (`npm run lhci`, config in `lighthouserc.json`) — runs against a
  representative page from each template (home, menu, reservations, contact, ES + EN).
  Blocks the deploy on accessibility or SEO regressions (both should realistically stay
  at 1.0 — this project has shipped WCAG contrast bugs to production before); only warns
  on performance/best-practices, since those are noisier in CI and partly outside our
  control (the CoverManager iframe's own third-party cookies currently cost the
  `/reservas` pages a best-practices point neither page's own code can fix).

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

## Opening hours sync

`.github/workflows/sync-opening-hours.yml` runs daily (and on manual dispatch), reads
the current hours from the Google Business Profile listing via the Places API, and
overwrites `src/data/opening-hours.json` — then rebuilds and redeploys — if they've
changed. The listing is always the source of truth, including when it reports
different hours on different days of the week: `scripts/sync-opening-hours.mjs` groups
days that share identical hours together, and that grouping feeds both the displayed
text and an array of `OpeningHoursSpecification` entries in the JSON-LD (`Layout.astro`)
— one per group, rather than assuming a single set of hours for the whole week.

It needs a repository secret of its own, **`GOOGLE_PLACES_SERVER_API_KEY`** — deliberately
separate from `PUBLIC_GOOGLE_PLACES_API_KEY` above, because that one is restricted by
HTTP referrer (safe to ship to the browser) and a server-to-server call from a GitHub
Actions runner has no real referrer to present. Create a second key in Google Cloud
Console restricted only by API (Places API (New)) — no referrer or IP restriction, since
Actions runner IPs aren't stable — and never give it the `PUBLIC_` prefix, or Astro would
bundle it into client-side JS.

## Content structure

- `src/data/restaurant.ts` — NAP, hours, links, and other restaurant identity (single
  source of truth, feeds JSON-LD too). `address.formatted` is kept byte-for-byte
  identical (per language) to the address text on the Google Business Profile
  listing — if that listing's formatting ever changes, re-check it via the Places
  API (`formattedAddress` field, fetched once with `languageCode=es`/`en`) rather
  than editing this by hand from memory.
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
(`labacalona.es`). To trigger a rebuild without a new commit, run the workflow
manually from the **Actions** tab (it has `workflow_dispatch` enabled).

### Custom domain DNS

Registrar: IONOS. Required records:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<github-username>.github.io` |

The apex (`@`) must use `A` records — DNS doesn't allow `CNAME` at the zone root.
`www` should be a `CNAME`, not hardcoded `A` records, so it keeps tracking GitHub
Pages if those IPs ever change. GitHub's **Settings → Pages → Custom domain** field
must be set to the apex (`labacalona.es`, no `www`) to match `public/CNAME` — GitHub
then handles the `www` → apex redirect and issues one certificate covering both.

## Accessibility

Color tokens live in `src/styles/global.css` (`@theme` block). Any new or edited
color must clear WCAG AA contrast — **4.5:1** for normal text, **3:1** for large
text/UI components — against **every** background it's actually used on, not just
the one being edited at the time. A token used in two places (e.g. as both body
text and button-background-with-white-text) needs checking against both; PageSpeed
Insights/Lighthouse's accessibility score only reports that *a* violation exists,
not which color pair caused it.
