import type { AllergenCode } from './allergens';

// Transcribed from Menu/Menu_Comida.pdf.
//
// IMPORTANT — allergen data is INFERRED, not verified: the source PDF marks
// allergens with small printed icons that could not be reliably matched to
// each dish from the scanned/extracted document. Every `allergens` array
// below is a best-effort culinary inference from the dish's own ingredient
// list and MUST be checked against the kitchen's real allergen sheet before
// this page is treated as final (CLAUDE.md 3 & 7.5 — this is a legal
// requirement, not a formatting detail). See the banner on /menu and /vinos.
export const ALLERGENS_VERIFIED = false;

export interface PriceOption {
  label?: { es: string; en: string };
  price: string;
}

export interface Dish {
  name: string; // Dish names stay in Spanish in every locale (CLAUDE.md 3.1).
  description?: { es: string; en: string };
  prices: PriceOption[];
  allergens: AllergenCode[];
  dietary?: Array<'vegetariano' | 'vegano'>;
}

export interface MenuSection {
  id: string;
  title: { es: string; en: string };
  subtitle?: { es: string; en: string };
  dishes: Dish[];
}

const tapaRacion = (tapa: string, racion: string): PriceOption[] => [
  { label: { es: 'Tapa', en: 'Tapa' }, price: tapa },
  { label: { es: 'Ración', en: 'Full plate' }, price: racion },
];

const single = (price: string): PriceOption[] => [{ price }];

export const menuSections: MenuSection[] = [
  {
    id: 'entrantes',
    title: { es: 'Entrantes', en: 'Starters' },
    dishes: [
      {
        name: 'Aceitunas',
        description: { es: 'Selección de aceitunas aliñadas.', en: 'Selection of marinated olives.' },
        prices: single('1,5€'),
        allergens: ['sulphites'],
      },
      {
        name: 'Ensaladilla de langostinos',
        description: {
          es: 'Ensaladilla rusa casera con langostinos.',
          en: 'Homemade Russian salad with langoustines.',
        },
        prices: tapaRacion('4,5€', '10,5€'),
        allergens: ['crustaceans', 'eggs', 'dairy'],
      },
      {
        name: 'Ensaladilla de ahumados',
        description: { es: 'Ensaladilla rusa casera con pescados ahumados.', en: 'Homemade Russian salad with smoked fish.' },
        prices: tapaRacion('4,5€', '11€'),
        allergens: ['fish', 'eggs', 'dairy'],
      },
      {
        name: 'Tortilla de patatas',
        description: { es: 'Clásica tortilla de patatas hecha en casa.', en: 'Classic homemade Spanish potato omelette.' },
        prices: single('4,5€'),
        allergens: ['eggs'],
      },
      {
        name: 'Tortilla de patatas bañada en salmorejo',
        description: { es: 'Nuestra tortilla de patatas cubierta de salmorejo casero.', en: 'Our potato omelette topped with homemade salmorejo.' },
        prices: tapaRacion('', '7,5€').filter((p) => p.price),
        allergens: ['eggs', 'gluten', 'dairy'],
      },
      {
        name: 'Salmorejo casero',
        description: {
          es: 'Con taquitos de jamón y AOVE.',
          en: 'With diced Iberian ham and extra virgin olive oil.',
        },
        prices: single('5€'),
        allergens: ['gluten'],
      },
      {
        name: 'Tomate aliñado con ventresca',
        description: { es: 'Tomate de la tierra aliñado con ventresca de atún.', en: 'Local tomato dressed with tuna belly (ventresca).' },
        prices: single('9€'),
        allergens: ['fish'],
      },
      {
        name: 'Ensalada caprese',
        description: { es: 'Tomate, mozzarella, pesto y albahaca.', en: 'Tomato, mozzarella, pesto, and basil.' },
        prices: single('9€'),
        allergens: ['dairy', 'nuts'],
      },
      {
        name: 'Tartar de atún',
        description: { es: 'Atún fresco picado a cuchillo al estilo de la casa.', en: "Hand-cut fresh tuna tartare, house style." },
        prices: single('12,5€'),
        allergens: ['fish', 'soy', 'sesame', 'eggs'],
      },
      {
        name: 'Patatas bravas',
        description: { es: 'Con salsa brava y alioli.', en: "With spicy brava sauce and garlic aioli." },
        prices: single('7€'),
        allergens: ['eggs', 'mustard'],
      },
    ],
  },
  {
    id: 'panes',
    title: { es: 'Panes', en: 'Toasts' },
    dishes: [
      {
        name: 'Tosta lomo mechado con queso viejo y guacamole',
        prices: single('11,5€'),
        allergens: ['gluten', 'dairy'],
      },
      {
        name: 'Tosta jamón ibérico con queso viejo y salmorejo',
        prices: single('12€'),
        allergens: ['gluten', 'dairy'],
      },
      {
        name: 'Tosta sardina anchoada con tomate natural y guacamole',
        prices: [
          { label: { es: 'Unidad', en: 'Single' }, price: '2,5€' },
          { label: { es: 'Ración', en: 'Full plate' }, price: '12,5€' },
        ],
        allergens: ['gluten', 'fish'],
      },
    ],
  },
  {
    id: 'freidora',
    title: { es: 'Freidora', en: 'From the fryer' },
    dishes: [
      {
        name: 'Tiras de pollo empanado casero',
        prices: single('12,5€'),
        allergens: ['gluten', 'eggs', 'dairy'],
      },
      {
        name: 'Buñuelos de wakame con gambas de cristal',
        prices: single('12,5€'),
        allergens: ['gluten', 'crustaceans', 'eggs', 'soy'],
      },
      {
        name: 'Croquetas cremosas del chef',
        description: { es: '6 unidades. Consultar variedad del día.', en: '6 pieces. Ask about today’s flavor.' },
        prices: single('11€'),
        allergens: ['gluten', 'dairy', 'eggs'],
      },
    ],
  },
  {
    id: 'abaceria',
    title: { es: 'De nuestra abacería extremeña', en: 'From our Extremadura grocer' },
    subtitle: { es: 'Chacinas de bellota', en: 'Acorn-fed cured meats' },
    dishes: [
      {
        name: 'Panceta',
        prices: [
          { label: { es: 'Tapa (25g)', en: 'Tapa (25g)' }, price: '3,8€' },
          { label: { es: 'Ración (80g)', en: 'Full plate (80g)' }, price: '9€' },
        ],
        allergens: ['sulphites'],
      },
      {
        name: 'Salchichón',
        prices: [
          { label: { es: 'Tapa (25g)', en: 'Tapa (25g)' }, price: '3,8€' },
          { label: { es: 'Ración (80g)', en: 'Full plate (80g)' }, price: '9€' },
        ],
        allergens: ['sulphites'],
      },
      {
        name: 'Chorizo',
        prices: [
          { label: { es: 'Tapa (25g)', en: 'Tapa (25g)' }, price: '3,8€' },
          { label: { es: 'Ración (80g)', en: 'Full plate (80g)' }, price: '9€' },
        ],
        allergens: ['sulphites'],
      },
      {
        name: 'Caña de lomo',
        prices: [
          { label: { es: 'Tapa (25g)', en: 'Tapa (25g)' }, price: '4,5€' },
          { label: { es: 'Ración (80g)', en: 'Full plate (80g)' }, price: '14€' },
        ],
        allergens: ['sulphites'],
      },
      {
        name: 'Queso viejo',
        prices: [
          { label: { es: 'Tapa (30g)', en: 'Tapa (30g)' }, price: '4€' },
          { label: { es: 'Ración (100g)', en: 'Full plate (100g)' }, price: '14€' },
        ],
        allergens: ['dairy'],
      },
      {
        name: 'Queso ahumado',
        prices: [
          { label: { es: 'Tapa (30g)', en: 'Tapa (30g)' }, price: '4€' },
          { label: { es: 'Ración (100g)', en: 'Full plate (100g)' }, price: '14€' },
        ],
        allergens: ['dairy'],
      },
      {
        name: 'Queso al pimentón',
        prices: [
          { label: { es: 'Tapa (30g)', en: 'Tapa (30g)' }, price: '4€' },
          { label: { es: 'Ración (100g)', en: 'Full plate (100g)' }, price: '14€' },
        ],
        allergens: ['dairy'],
      },
      {
        name: 'Queso en manteca',
        prices: [
          { label: { es: 'Tapa (30g)', en: 'Tapa (30g)' }, price: '4€' },
          { label: { es: 'Ración (100g)', en: 'Full plate (100g)' }, price: '14€' },
        ],
        allergens: ['dairy'],
      },
      {
        name: 'Torta del Casar D.O.P',
        prices: single('13€'),
        allergens: ['dairy'],
      },
      {
        name: 'Tabla de quesos',
        prices: single('14,5€'),
        allergens: ['dairy'],
      },
      {
        name: 'Sabores de bellota',
        description: {
          es: 'Chorizo, salchichón, panceta y caña de lomo. 25g por producto.',
          en: 'Chorizo, salchichón, pork belly, and cured pork loin. 25g per item.',
        },
        prices: single('17€'),
        allergens: ['sulphites'],
      },
      {
        name: 'Selección de ibéricos y quesos',
        description: {
          es: 'Salchichón, caña de lomo, chorizo, queso en manteca y ahumado. 25g por producto.',
          en: 'Salchichón, cured pork loin, chorizo, lard-cured cheese, and smoked cheese. 25g per item.',
        },
        prices: single('17€'),
        allergens: ['dairy', 'sulphites'],
      },
    ],
  },
  {
    id: 'guisos',
    title: { es: 'Guisos y platos calientes', en: 'Stews & hot dishes' },
    dishes: [
      { name: 'Huevos rotos con jamón', prices: single('13,9€'), allergens: ['eggs'] },
      {
        name: 'Revuelto de patatera',
        description: { es: 'Con chorizo extremeño de bellota.', en: 'With acorn-fed Extremadura chorizo.' },
        prices: single('12,5€'),
        allergens: ['eggs', 'sulphites'],
      },
      { name: 'Crema de calabaza y puerros', prices: single('5€'), allergens: ['dairy'] },
      { name: 'Espinacas con garbanzos', prices: single('6€'), allergens: [] },
      {
        name: 'Carrillá ibérica en salsa',
        prices: [
          { label: { es: 'Tapa', en: 'Tapa' }, price: '5€' },
          { label: { es: 'Ración', en: 'Full plate' }, price: '14€' },
        ],
        allergens: ['gluten', 'sulphites'],
      },
      { name: 'Revuelto de verduras', prices: single('10,5€'), allergens: ['eggs'] },
      {
        name: 'Arroz al wok con secreto y verduras',
        prices: single('13€'),
        allergens: ['soy', 'gluten', 'sesame'],
      },
    ],
  },
  {
    id: 'plancha',
    title: { es: 'De la plancha', en: 'From the grill' },
    subtitle: { es: 'Especialidad en carnes de la dehesa extremeña', en: 'Specialists in Extremadura dehesa meats' },
    dishes: [
      { name: 'Lomo de atún', prices: single('14€'), allergens: ['fish'] },
      { name: 'Cigarritos de secreto ibérico', prices: single('12€'), allergens: ['gluten'] },
      {
        name: 'Solomillo ibérico al whisky / mojo picón',
        prices: single('10,5€'),
        allergens: [],
      },
      { name: 'Pluma ibérica de bellota', prices: single('19,5€'), allergens: [] },
      {
        name: 'Lagarto ibérico al limón con mayonesa de fino',
        prices: single('16,5€'),
        allergens: ['eggs', 'sulphites'],
      },
    ],
  },
  {
    id: 'sugerencias',
    title: { es: 'Sugerencias de la casa', en: "Chef's suggestions" },
    dishes: [
      {
        name: 'Taco de chicharrón deshilachado',
        description: { es: 'Aliño de la casa, guacamole y lima rayada.', en: "House dressing, guacamole, and grated lime." },
        prices: single('5€'),
        allergens: ['gluten'],
      },
      {
        name: 'Mini brioche de pulled pork casero',
        description: {
          es: 'Cerdo a baja temperatura con miel mostaza, bbq y ali oli de pimiento de piquillo.',
          en: 'Slow-cooked pork with honey mustard, BBQ sauce, and piquillo pepper aioli.',
        },
        prices: single('5,5€'),
        allergens: ['gluten', 'eggs', 'mustard'],
      },
      {
        name: 'Bacalona fries',
        description: {
          es: 'Patatas, crema de Torta del Casar y cheddar con tacos de jamón.',
          en: 'Fries with Torta del Casar cheese cream, cheddar, and diced Iberian ham.',
        },
        prices: single('8€'),
        allergens: ['dairy'],
      },
      {
        name: 'Carpaccio de panceta de bellota',
        description: {
          es: 'Lima, parmesano, emulsión de aceite con pimentón y alcaparras.',
          en: 'Lime, parmesan, paprika-oil emulsion, and capers.',
        },
        prices: single('12,5€'),
        allergens: ['dairy'],
      },
      {
        name: 'Huevos rotos con tartar de atún',
        prices: single('16,9€'),
        allergens: ['eggs', 'fish', 'soy', 'sesame'],
      },
      {
        name: 'Alcachofitas con jamón, parmesano y aceite de albahaca',
        prices: single('15€'),
        allergens: ['dairy'],
      },
      {
        name: 'Patatas arrieras',
        description: {
          es: 'Salteado de langostinos, ajo, manzanilla y pimentón con base de patatas panaderas y ali oli.',
          en: 'Sautéed langoustines with garlic, manzanilla wine, and paprika, over pan-fried potatoes with aioli.',
        },
        prices: single('15,9€'),
        allergens: ['crustaceans', 'sulphites', 'eggs'],
      },
      {
        name: 'Risotto de selección de setas y parmesano',
        prices: single('13,5€'),
        allergens: ['dairy'],
      },
      {
        name: 'Risotto de calabaza, queso brie y parmesano',
        prices: single('14€'),
        allergens: ['dairy'],
      },
      {
        name: 'Flamenquín Bacalona',
        description: {
          es: 'Solomillo, caña de lomo, panceta y queso crema curado.',
          en: 'Pork tenderloin, cured pork loin, pork belly, and aged cream cheese, breaded and fried.',
        },
        prices: single('18,9€'),
        allergens: ['gluten', 'dairy', 'eggs'],
      },
      {
        name: 'Cachopazo Bacalona',
        description: { es: 'Aprox. 600 g. Para compartir.', en: 'Approx. 600 g (21 oz). To share.' },
        prices: single('24€'),
        allergens: ['gluten', 'dairy', 'eggs'],
      },
    ],
  },
  {
    id: 'postres',
    title: { es: 'Postres', en: 'Desserts' },
    subtitle: { es: 'Tartas caseras al horno', en: 'Homemade baked cakes' },
    dishes: [
      { name: 'Coulant de chocolate', prices: single('6€'), allergens: ['gluten', 'eggs', 'dairy'] },
      { name: 'Tarta de queso', prices: single('6€'), allergens: ['gluten', 'eggs', 'dairy'] },
      { name: 'Tarta de galleta lotus', prices: single('6€'), allergens: ['gluten', 'eggs', 'dairy'] },
      {
        name: 'Torrija brioche con helado de vainilla',
        prices: single('6,5€'),
        allergens: ['gluten', 'eggs', 'dairy'],
      },
    ],
  },
];

export const menuNotes = {
  es: [
    'IVA incluido en todos nuestros productos.',
    'Servicio de pan y picos: 1 €/comensal.',
    'Para eventos y celebraciones en La Bacalona, contactar al 683 37 33 39.',
  ],
  en: [
    'VAT included in all our prices.',
    'Bread and picos service: €1 per guest.',
    'For events and celebrations at La Bacalona, call +34 683 37 33 39.',
  ],
};

// First price found in a "X,XX€" style string, as a plain number for Offer.price.
function parsePrice(raw: string): string | undefined {
  const match = raw.match(/(\d+(?:,\d+)?)/);
  return match ? match[1].replace(',', '.') : undefined;
}

// Schema.org Menu/MenuSection/MenuItem/Offer JSON-LD for the /menu page
// (CLAUDE.md 3: "Implement structured data — Menu and Offer where relevant").
export function buildMenuJsonLd(locale: 'es' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: locale === 'es' ? 'Carta' : 'Menu',
    hasMenuSection: menuSections.map((section) => ({
      '@type': 'MenuSection',
      name: section.title[locale],
      hasMenuItem: section.dishes.map((dish) => {
        const price = parsePrice(dish.prices[0]?.price ?? '');
        return {
          '@type': 'MenuItem',
          name: dish.name,
          ...(dish.description ? { description: dish.description[locale] } : {}),
          ...(price
            ? { offers: { '@type': 'Offer', price, priceCurrency: 'EUR' } }
            : {}),
        };
      }),
    })),
  } as const;
}
