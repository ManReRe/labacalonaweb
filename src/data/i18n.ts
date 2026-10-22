export type Locale = 'es' | 'en';

// Path segments per locale. Spanish stays unprefixed at the root (CLAUDE.md 3.1).
//
// Trailing slash on every path except "/" itself (2026-10-22 fix): with
// build.format "directory" (dist/menu/index.html, etc.), GitHub Pages always
// 301s a no-slash request ("/menu") to the slash version ("/menu/") — that's
// just how it serves a directory's index.html. Our canonical tag used to
// claim the no-slash URL was the official one, which meant it pointed at a
// URL that immediately redirected away from itself. Google flagged exactly
// that as a "redirect error" and refused to index 17 of our 18 pages over
// it (confirmed live via Search Console — only "/" was unaffected, since
// it's inherently slash-free either way). Astro's `trailingSlash: 'always'`
// (astro.config.mjs) only governs its own routing/sitemap generation — it
// doesn't rewrite these literal strings, so they have to carry the slash
// themselves for every canonical/hreflang/nav link built from this table to
// match what the server actually serves without a redirect.
export const routes = {
  home: { es: '/', en: '/en/' },
  about: { es: '/sobre-nosotros/', en: '/en/about/' },
  menu: { es: '/menu/', en: '/en/menu/' },
  wines: { es: '/vinos/', en: '/en/wines/' },
  reservations: { es: '/reservas/', en: '/en/reservations/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
  legalNotice: { es: '/aviso-legal/', en: '/en/legal-notice/' },
  privacy: { es: '/privacidad/', en: '/en/privacy-policy/' },
  cookies: { es: '/cookies/', en: '/en/cookie-policy/' },
} as const;

export type RouteKey = keyof typeof routes;

export const ui = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre nosotros',
      menu: 'Carta',
      wines: 'Vinos',
      reservations: 'Reservas',
      contact: 'Contacto',
    },
    cta: {
      reserve: 'Reservar mesa',
      reserveOnline: 'Reservar mesa online',
      callUs: 'Llamar',
      seeMenu: 'Ver la carta',
      seeWines: 'Ver los vinos',
      viewOnMap: 'Cómo llegar',
    },
    footer: {
      tagline: 'Chacinas, vino y buena mesa en Amador de los Ríos desde 2022.',
      linksTitle: 'Enlaces',
      legalTitle: 'Legal',
      followUs: 'Síguenos',
      legalNotice: 'Aviso legal',
      privacy: 'Política de privacidad',
      cookies: 'Política de cookies',
      rights: 'Todos los derechos reservados.',
      credit: 'Web diseñada y desarrollada por',
    },
    allergens: {
      title: 'Alérgenos',
      legend: 'Leyenda de alérgenos',
      // Which one shows depends on ALLERGENS_VERIFIED (src/data/menu.ts) —
      // see AllergenLegend.astro. Don't collapse these into one string: the
      // "pending" wording is load-bearing while the kitchen hasn't signed
      // off on the data (2026-10-20, client's explicit instruction).
      disclaimerPending:
        'Los alérgenos indicados son orientativos. Si tienes alguna alergia o intolerancia, consulta siempre con nuestro personal antes de pedir.',
      disclaimerVerified: 'Si tienes alguna alergia o intolerancia, consúltanos. Estaremos encantados de ayudarte.',
      contains: 'Contiene',
    },
    wine: {
      glass: 'Copa',
      bottle: 'Botella',
    },
    hours: 'Horario',
    address: 'Dirección',
    phone: 'Teléfono',
    languageSwitcher: 'Idioma',
    skipToContent: 'Saltar al contenido principal',
    openMenu: 'Abrir menú',
    googleReviews: {
      suffix: 'reseñas en Google',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About us',
      menu: 'Menu',
      wines: 'Wines',
      reservations: 'Reservations',
      contact: 'Contact',
    },
    cta: {
      reserve: 'Book a table',
      reserveOnline: 'Book a table online',
      callUs: 'Call us',
      seeMenu: 'See the menu',
      seeWines: 'See the wine list',
      viewOnMap: 'Get directions',
    },
    footer: {
      tagline: 'Cured meats, wine, and good food on Amador de los Ríos since 2022.',
      linksTitle: 'Links',
      legalTitle: 'Legal',
      followUs: 'Follow us',
      legalNotice: 'Legal notice',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
      rights: 'All rights reserved.',
      credit: 'Website designed and developed by',
    },
    allergens: {
      title: 'Allergens',
      legend: 'Allergen legend',
      disclaimerPending:
        'The allergens listed are indicative. If you have any allergy or intolerance, always check with our staff before ordering.',
      disclaimerVerified: "If you have any allergy or intolerance, just ask us — we're happy to help.",
      contains: 'Contains',
    },
    wine: {
      glass: 'Glass',
      bottle: 'Bottle',
    },
    hours: 'Hours',
    address: 'Address',
    phone: 'Phone',
    languageSwitcher: 'Language',
    skipToContent: 'Skip to main content',
    openMenu: 'Open menu',
    googleReviews: {
      suffix: 'Google reviews',
    },
  },
} as const;

export function t(locale: Locale) {
  return ui[locale];
}

export function localizedPath(route: RouteKey, locale: Locale): string {
  return routes[route][locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
