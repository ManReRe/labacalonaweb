import type { AllergenCode } from './allergens';

// Transcribed from Menu/Menu_Vino.jpeg.
//
// "Rioja de la Casa" (the only generic, unbranded house red on the source
// list) has been removed per CLAUDE.md 5.2.4: "Remove the 'tinto de la
// casa' from the wine list (it is no longer served)."
//
// All wines/generosos declare sulfitos at minimum, per CLAUDE.md 4: "wine
// and beer must at minimum declare sulfitos when present." Grape/origin
// notes are transcribed as printed; nothing else is inferred here.
const SULPHITES: AllergenCode[] = ['sulphites'];

export interface WineGlassBottle {
  glass?: string;
  bottle?: string;
}

export interface Wine {
  name: string;
  grape?: { es: string; en: string };
  origin?: { es: string; en: string };
  aging?: { es: string; en: string };
  prices: WineGlassBottle;
  allergens: AllergenCode[];
}

export interface WineSection {
  id: string;
  title: { es: string; en: string };
  wines: Wine[];
}

export const wineSections: WineSection[] = [
  {
    id: 'ribera-duero',
    title: { es: 'Tintos D.O. Ribera del Duero', en: 'Reds — D.O. Ribera del Duero' },
    wines: [
      {
        name: 'Rippa Dorii Roble',
        grape: { es: 'Tempranillo', en: 'Tempranillo' },
        aging: { es: '7 meses en barrica de roble', en: '7 months in oak barrel' },
        prices: { glass: '3,50 €', bottle: '19,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'Celeste Roble',
        grape: { es: 'Tinto Fino', en: 'Tinto Fino (Tempranillo)' },
        aging: { es: '3 meses en barrica de roble', en: '3 months in oak barrel' },
        prices: { glass: '3,60 €', bottle: '20,00 €' },
        allergens: SULPHITES,
      },
    ],
  },
  {
    id: 'rioja',
    title: { es: 'Tintos D.O.Ca. Rioja', en: 'Reds — D.O.Ca. Rioja' },
    wines: [
      {
        name: 'Ontañón Crianza',
        grape: { es: '90% Tempranillo, 10% Garnacha', en: '90% Tempranillo, 10% Garnacha' },
        aging: {
          es: '12 meses en barricas de roble americano (60%) y francés (40%)',
          en: '12 months in American (60%) and French (40%) oak barrels',
        },
        prices: { glass: '3,60 €', bottle: '20,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'Ontañón Antología',
        grape: { es: '75% Tempranillo, 15% Graciano, 10% Garnacha', en: '75% Tempranillo, 15% Graciano, 10% Garnacha' },
        aging: { es: 'Edición limitada. Larga crianza en barrica de roble.', en: 'Limited edition. Extended aging in oak barrel.' },
        prices: { bottle: '27,00 €' },
        allergens: SULPHITES,
      },
    ],
  },
  {
    id: 'ribera-guadiana',
    title: { es: 'Tintos D.O. Ribera del Guadiana', en: 'Reds — D.O. Ribera del Guadiana' },
    wines: [
      {
        name: 'Palacio Quemado Crianza',
        grape: { es: 'Tempranillo y Petit Verdot', en: 'Tempranillo and Petit Verdot' },
        aging: { es: '9 meses en barrica de roble americano', en: '9 months in American oak barrel' },
        prices: { glass: '3,80 €', bottle: '27,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'La Zarcita "Vino de Autor"',
        grape: { es: 'Garnacha Tintorera y Syrah', en: 'Garnacha Tintorera and Syrah' },
        aging: {
          es: '8 meses en fudres de roble francés de 500 L y 5000 L',
          en: '8 months in 500 L and 5000 L French oak vats',
        },
        prices: { bottle: '28,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'Habla del Silencio',
        grape: { es: 'Syrah, Cabernet Sauvignon y Tempranillo', en: 'Syrah, Cabernet Sauvignon, and Tempranillo' },
        aging: { es: '8 meses en barrica de roble francés', en: '8 months in French oak barrel' },
        prices: { bottle: '26,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'La Raya',
        origin: { es: 'V.T. Extremadura', en: 'V.T. Extremadura' },
        grape: { es: 'Trincadeira Preta', en: 'Trincadeira Preta' },
        aging: { es: '14 meses en barrica de fudre de roble francés', en: '14 months in French oak vat' },
        prices: { bottle: '42,00 €' },
        allergens: SULPHITES,
      },
    ],
  },
  {
    id: 'blancos',
    title: { es: 'Vinos blancos', en: 'White wines' },
    wines: [
      {
        name: 'Pampano Verdejo',
        grape: { es: '100% Verdejo', en: '100% Verdejo' },
        origin: { es: 'D.O. Rueda', en: 'D.O. Rueda' },
        prices: { glass: '3,40 €', bottle: '18,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'Rippa Dorii Verdejo',
        grape: { es: '100% Verdejo', en: '100% Verdejo' },
        origin: { es: 'D.O. Rueda', en: 'D.O. Rueda' },
        prices: { glass: '3,80 €', bottle: '21,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'Semidulce "La Mona"',
        grape: { es: 'Moscatel y Verdejo', en: 'Moscatel and Verdejo' },
        origin: { es: 'Ciudad Real. Ecológico.', en: 'Ciudad Real. Organic.' },
        prices: { glass: '3,40 €', bottle: '18,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'Albariño',
        prices: { glass: '3,80 €', bottle: '24,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'Frizante Tentazion',
        grape: { es: 'Sauvignon-Verdejo', en: 'Sauvignon Blanc–Verdejo' },
        prices: { glass: '3,40 €', bottle: '18,00 €' },
        allergens: SULPHITES,
      },
      {
        name: 'Triana Spritz 5,5º',
        grape: { es: 'Manzanilla La Gitana combinado con aromas de hierbabuena y notas cítricas', en: 'Manzanilla La Gitana sherry blended with mint aromas and citrus notes' },
        prices: { glass: '3,40 €', bottle: '18,00 €' },
        allergens: SULPHITES,
      },
    ],
  },
  {
    id: 'generosos',
    title: { es: 'Generosos', en: 'Fortified wines' },
    wines: [
      { name: 'Pedro Ximénez', prices: { glass: '2,80 €' }, allergens: SULPHITES },
      { name: 'Canasta Cream', prices: { glass: '3,00 €', bottle: '18,50 €' }, allergens: SULPHITES },
      { name: 'Manzanilla Elías', prices: { glass: '2,50 €', bottle: '15,00 €' }, allergens: SULPHITES },
      { name: 'Vermout Nº7', prices: { glass: '3,50 €' }, allergens: SULPHITES },
      { name: 'Fino Tío Pepe', prices: { glass: '2,90 €', bottle: '16,00 €' }, allergens: SULPHITES },
      { name: 'Solera 1947 Cream', prices: { glass: '3,20 €' }, allergens: SULPHITES },
      { name: 'Oloroso Seco', prices: { glass: '3,20 €' }, allergens: SULPHITES },
      { name: 'Palo Cortado', prices: { glass: '4,20 €' }, allergens: SULPHITES },
    ],
  },
];
