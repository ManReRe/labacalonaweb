export type Locale = 'es' | 'en';

// Path segments per locale. Spanish stays unprefixed at the root (CLAUDE.md 3.1).
export const routes = {
  home: { es: '/', en: '/en' },
  about: { es: '/sobre-nosotros', en: '/en/about' },
  menu: { es: '/menu', en: '/en/menu' },
  wines: { es: '/vinos', en: '/en/wines' },
  reservations: { es: '/reservas', en: '/en/reservations' },
  contact: { es: '/contacto', en: '/en/contact' },
  legalNotice: { es: '/aviso-legal', en: '/en/legal-notice' },
  privacy: { es: '/privacidad', en: '/en/privacy-policy' },
  cookies: { es: '/cookies', en: '/en/cookie-policy' },
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
      callUs: 'Llámanos',
      seeMenu: 'Ver la carta',
      seeWines: 'Ver los vinos',
      viewOnMap: 'Cómo llegar',
    },
    footer: {
      tagline: 'Come y bebe en el corazón de Sevilla.',
      linksTitle: 'Enlaces',
      legalTitle: 'Legal',
      followUs: 'Síguenos',
      legalNotice: 'Aviso legal',
      privacy: 'Política de privacidad',
      cookies: 'Política de cookies',
      rights: 'Todos los derechos reservados.',
      credit: 'Desarrollado por',
    },
    allergens: {
      title: 'Alérgenos',
      legend: 'Leyenda de alérgenos',
      disclaimer:
        'Los alérgenos indicados son una referencia orientativa pendiente de verificación final por parte de nuestro equipo de cocina. Ante cualquier alergia o intolerancia, consulta siempre con el personal de sala antes de pedir.',
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
      tagline: 'Eat and drink in the heart of Seville.',
      linksTitle: 'Links',
      legalTitle: 'Legal',
      followUs: 'Follow us',
      legalNotice: 'Legal notice',
      privacy: 'Privacy policy',
      cookies: 'Cookie policy',
      rights: 'All rights reserved.',
      credit: 'Developed by',
    },
    allergens: {
      title: 'Allergens',
      legend: 'Allergen legend',
      disclaimer:
        'The allergens listed are an indicative reference, pending final verification by our kitchen team. If you have any allergy or intolerance, always check with our staff before ordering.',
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
