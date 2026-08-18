// Central source of truth for restaurant identity (NAP, hours, links).
// Update here once and every page/JSON-LD block stays in sync.

export const restaurant = {
  name: 'La Bacalona',
  // Real registered legal name (razón social) is pending — see aviso-legal.
  // "Come & Bebe" under the logo is the tagline, not part of the name.
  legalName: 'La Bacalona',
  tagline: {
    es: 'Come y bebe en el corazón de Sevilla',
    en: 'Eat and drink in the heart of Seville',
  },
  shortDescription: {
    es: 'Abacería y taberna sevillana con producto de temporada, ibéricos, quesos y una carta pensada para compartir.',
    en: 'A Seville tavern and grocer-style restaurant built on seasonal produce, Iberian cured meats, cheeses, and a menu made for sharing.',
  },
  address: {
    streetAddress: 'C. Amador de los Ríos, 38',
    postalCode: '41003',
    addressLocality: 'Sevilla',
    addressRegion: 'Sevilla',
    addressCountry: 'ES',
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
  openingHours: {
    // Continuous service every day, no midday closure (CLAUDE.md 5.1).
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '12:30',
    closes: '00:30',
    display: {
      es: 'Todos los días, 12:30 – 00:30',
      en: 'Every day, 12:30 PM – 12:30 AM',
    },
  },
  priceRange: '€€',
  cuisineTypes: ['Spanish', 'Andalusian', 'Tapas'],
} as const;
