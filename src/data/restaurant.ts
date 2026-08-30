// Central source of truth for restaurant identity (NAP, hours, links).
// Update here once and every page/JSON-LD block stays in sync.
import openingHours from './opening-hours.json';

export const restaurant = {
  name: 'La Bacalona',
  // Real registered legal name (razón social) is pending — see aviso-legal.
  // "Come & Bebe" under the logo is the tagline, not part of the name.
  legalName: 'La Bacalona',
  // Client asked to withhold the owner's personal name/NIF for now (set to
  // "N/A") despite the LSSI-CE art. 10 requirement to publish it — flagged
  // as a compliance risk before this change; their call to make, not ours.
  legalOwner: {
    name: 'N/A',
    nif: 'N/A',
  },
  tagline: {
    es: 'Comé, bebé, viví…',
    en: 'Eat, drink, live…',
  },
  shortDescription: {
    es: 'Taberna extremeña-andaluza con producto de temporada, ibéricos, quesos y una carta pensada para compartir.',
    en: 'An Extremaduran-Andalusian tavern built on seasonal produce, Iberian cured meats, cheeses, and a menu made for sharing.',
  },
  address: {
    streetAddress: 'C. Amador de los Ríos, 38',
    postalCode: '41003',
    addressLocality: 'Sevilla',
    addressRegion: 'Sevilla',
    addressCountry: 'ES',
    // Byte-for-byte match to the Google Business Profile listing's own
    // formattedAddress per language (checked via Places API, 2026-08-27),
    // for NAP consistency — Google omits the country on its ES listing but
    // includes it on the EN one, so we mirror that rather than picking one.
    formatted: {
      es: 'C. Amador de los Ríos, 38, 41003 Sevilla',
      en: 'C. Amador de los Ríos, 38, 41003 Sevilla, Spain',
    },
  },
  phone: '683373339',
  phoneDisplay: '683 37 33 39',
  email: null as string | null,
  instagram: 'https://www.instagram.com/labacalona/',
  // Real CoverManager widget iframe (confirmed on restaurante.covermanager.com/la-bacalona,
  // which embeds this same URL) — used directly on /reservas so booking never leaves the site.
  coverManagerWidgetSrc: {
    es: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-la-bacalona/spanish',
    en: 'https://www.covermanager.com/reservation/module_restaurant/restaurante-la-bacalona/english',
  },
  // Kept only as a fallback deep-link (e.g. JSON-LD `reservations`), never as the primary CTA.
  coverManagerUrl: 'https://restaurante.covermanager.com/la-bacalona/',
  // Google Maps embed needs no API key for a basic place query iframe.
  mapEmbedSrc:
    'https://maps.google.com/maps?q=C.%20Amador%20de%20los%20R%C3%ADos%2038%2C%2041003%20Sevilla&output=embed',
  mapLink: 'https://maps.app.goo.gl/Z5rtY84MpPB6qqTJ6',
  // Fallback/first-paint value (also feeds JSON-LD aggregateRating, which
  // doesn't need to be literally live). GoogleRatingBadge.astro refreshes the
  // on-page number from the Places API client-side when configured — see
  // .env.example — but keep this reasonably current by hand as a backstop.
  googleRating: {
    value: 4.5,
    count: 623,
  },
  // Continuous service every day, no midday closure (CLAUDE.md 5.1). Kept in
  // its own JSON file so the scheduled sync workflow (see
  // scripts/sync-opening-hours.mjs) can overwrite it from the Google Business
  // Profile listing without touching this file.
  openingHours,
  priceRange: '€€',
  cuisineTypes: ['Spanish', 'Andalusian', 'Extremaduran', 'Tapas'],
} as const;
