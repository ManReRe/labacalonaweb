// The 14 EU-regulated allergens (Reglamento UE 1169/2011 + RD 126/2015).
// CLAUDE.md 3: every dish/wine must declare these; icons + legend required.

export type AllergenCode =
  | 'gluten'
  | 'crustaceans'
  | 'eggs'
  | 'fish'
  | 'peanuts'
  | 'soy'
  | 'dairy'
  | 'nuts'
  | 'celery'
  | 'mustard'
  | 'sesame'
  | 'sulphites'
  | 'lupin'
  | 'molluscs';

export const allergens: Record<AllergenCode, { es: string; en: string; icon: string }> = {
  gluten: { es: 'Gluten', en: 'Gluten', icon: '🌾' },
  crustaceans: { es: 'Crustáceos', en: 'Crustaceans', icon: '🦐' },
  eggs: { es: 'Huevos', en: 'Eggs', icon: '🥚' },
  fish: { es: 'Pescado', en: 'Fish', icon: '🐟' },
  peanuts: { es: 'Cacahuetes', en: 'Peanuts', icon: '🥜' },
  soy: { es: 'Soja', en: 'Soy', icon: '🫘' },
  dairy: { es: 'Lácteos', en: 'Dairy', icon: '🧀' },
  nuts: { es: 'Frutos de cáscara', en: 'Tree nuts', icon: '🌰' },
  celery: { es: 'Apio', en: 'Celery', icon: '🥬' },
  mustard: { es: 'Mostaza', en: 'Mustard', icon: '🟡' },
  sesame: { es: 'Granos de sésamo', en: 'Sesame', icon: '⚪' },
  sulphites: { es: 'Sulfitos', en: 'Sulphites', icon: '🍷' },
  lupin: { es: 'Altramuces', en: 'Lupin', icon: '🫛' },
  molluscs: { es: 'Moluscos', en: 'Molluscs', icon: '🐚' },
};

export const allergenOrder: AllergenCode[] = [
  'gluten',
  'crustaceans',
  'eggs',
  'fish',
  'peanuts',
  'soy',
  'dairy',
  'nuts',
  'celery',
  'mustard',
  'sesame',
  'sulphites',
  'lupin',
  'molluscs',
];
