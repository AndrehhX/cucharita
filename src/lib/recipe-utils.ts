import type { BudgetBreakdown, Filters, IngredientBudgetItem, Recipe, RecipeIngredient } from '../types';

export const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export function scaleQuantity(qty: number, baseServings: number, servings: number): number {
  if (!qty || !baseServings) return qty;
  return (qty / baseServings) * servings;
}

export function formatQty(qty: number): string {
  if (qty === 0) return '0';
  const rounded = Math.round(qty * 100) / 100;
  if (Number.isInteger(rounded)) return String(rounded);
  const whole = Math.floor(rounded);
  const fracKey = (rounded - whole).toFixed(2);
  const map: Record<string, string> = {
    '0.25': '¼',
    '0.50': '½',
    '0.75': '¾',
    '0.33': '⅓',
    '0.66': '⅔',
    '0.67': '⅔',
  };
  const pretty = map[fracKey];
  if (pretty && whole > 0) return `${whole}${pretty}`;
  if (pretty && whole === 0) return pretty;
  return String(rounded);
}

export function formatIngredientLine(ing: RecipeIngredient, baseServings: number, servings: number): string {
  if (ing.scalable === false || ing.quantity === 0) return ing.unit ? `${ing.name} ${ing.unit}` : ing.name;
  const q = scaleQuantity(ing.quantity, baseServings, servings);
  return `${formatQty(q)} ${ing.unit} ${ing.name}`.trim();
}

export function estimatePrice(recipe: Recipe, servings: number): number {
  if (!recipe.baseServings || recipe.baseServings <= 0) return recipe.basePriceQ ?? 0;
  return Math.round(((recipe.basePriceQ ?? 0) / recipe.baseServings) * servings);
}

export function priceBand(priceQ: number): 'low' | 'mid' | 'high' {
  if (priceQ < 25) return 'low';
  if (priceQ <= 50) return 'mid';
  return 'high';
}

/**
 * Cálculo presupuestario detallado en Quetzales (GTQ).
 * Distingue entre coste proporcional por porciones e inversión en presentaciones comerciales completas.
 */
export function calculateBudgetBreakdown(recipe: Recipe, servings: number): BudgetBreakdown {
  const safeServings = Math.max(1, servings || recipe.baseServings || 1);
  const ratio = safeServings / (recipe.baseServings || 1);

  let proportionalTotalQ = 0;
  let packageTotalQ = 0;
  let hasUnavailablePrices = false;

  const items: IngredientBudgetItem[] = recipe.ingredients.map((ing) => {
    const isPriced = typeof ing.priceQ === 'number' && ing.priceQ >= 0;
    if (!isPriced) {
      hasUnavailablePrices = true;
    }

    const basePropPrice = ing.priceQ ?? 0;
    // Si no es escalable (e.g. sal al gusto), el coste proporcional no se multiplica linealmente
    const proportionalPriceQ = ing.scalable === false ? basePropPrice : Math.round(basePropPrice * ratio * 100) / 100;
    const packagePriceQ = ing.packagePriceQ ?? basePropPrice;
    const packageUnit = ing.packageUnit ?? ing.unit ?? 'presentación';
    const source = ing.priceSource ?? 'Mercado municipal / Precios de referencia Canasta Básica GT';

    proportionalTotalQ += proportionalPriceQ;
    packageTotalQ += packagePriceQ;

    const scaledQty = ing.scalable === false ? ing.quantity : scaleQuantity(ing.quantity, recipe.baseServings, safeServings);

    return {
      name: ing.name,
      quantity: Math.round(scaledQty * 100) / 100,
      unit: ing.unit,
      proportionalPriceQ,
      packagePriceQ,
      packageUnit,
      source,
      isEstimated: true,
    };
  });

  return {
    servings: safeServings,
    proportionalTotalQ: Math.round(proportionalTotalQ),
    packageTotalQ: Math.round(packageTotalQ),
    items,
    hasUnavailablePrices,
  };
}

export function filterRecipes(recipes: Recipe[], f: Filters): Recipe[] {
  const q = f.q.trim().toLowerCase();
  let out = recipes.filter((r) => {
    if (f.category !== 'todas') {
      if (f.category === 'vegetarianas') {
        if (!r.vegetarian) return false;
      } else if (!r.categories.includes(f.category)) return false;
    }
    if (f.onlyVeg && !r.vegetarian) return false;
    if (f.onlyDessert && !r.isDessert) return false;
    if (f.price !== 'all' && priceBand(r.basePriceQ) !== f.price) return false;
    if (f.servings !== 'all') {
      const s = r.baseServings;
      if (f.servings === '1-2' && !(s <= 2)) return false;
      if (f.servings === '3-4' && !(s >= 3 && s <= 4)) return false;
      if (f.servings === '5+' && !(s >= 5)) return false;
    }
    if (f.maxTime && r.timeMin > f.maxTime) return false;
    if (q) {
      const hay = `${r.name} ${r.description} ${r.ingredients.map((i) => i.name).join(' ')}`.toLowerCase();
      if (!q.split(/\s+/).every((tok) => hay.includes(tok))) return false;
    }
    return true;
  });
  switch (f.sort) {
    case 'time': out = [...out].sort((a, b) => a.timeMin - b.timeMin); break;
    case 'price': out = [...out].sort((a, b) => a.basePriceQ - b.basePriceQ); break;
    case 'name': out = [...out].sort((a, b) => a.name.localeCompare(b.name, 'es')); break;
    default: break;
  }
  return out;
}

export interface IngredientMatch {
  recipe: Recipe;
  have: number;
  missing: number;
  missingList: string[];
  haveList: string[];
  score: number;
}

export const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

// Tabla semántica de sinónimos comunes para cocina y despensa
const SYNONYM_GROUPS: string[][] = [
  ['huevo', 'huevos', 'blanquillo', 'blanquillos'],
  ['tomate', 'tomates', 'jitomate', 'jitomates'],
  ['cebolla', 'cebollas', 'cebolla blanca', 'cebolla morada'],
  ['papa', 'papas', 'patata', 'patatas'],
  ['pollo', 'pechuga de pollo', 'muslos de pollo', 'carne de pollo', 'pollo cocido'],
  ['leche', 'leche entera', 'leche descremada', 'leche fluida'],
  ['arroz', 'arroz blanco', 'arroz cocido', 'arroz frio'],
  ['frijol', 'frijoles', 'frijoles negros', 'frijoles volteados', 'frijoles parados'],
  ['platano', 'platanos', 'platano maduro', 'platanos maduros'],
  ['banano', 'bananos', 'guineo', 'banana', 'bananas'],
  ['limon', 'limones', 'jugo de limon'],
  ['aguacate', 'aguacates', 'palta'],
  ['queso', 'queso mozzarella', 'queso fresco', 'queso duro', 'queso parmesano', 'queso de capas'],
  ['tortilla', 'tortillas', 'tortillas de maiz', 'tortillas de harina', 'totopos'],
  ['fresa', 'fresas', 'frutilla', 'frutillas'],
  ['harina', 'harina de trigo', 'harina para panqueques'],
  ['ajo', 'ajos', 'diente de ajo', 'dientes de ajo'],
  ['mantequilla', 'margarina'],
  ['zanahoria', 'zanahorias'],
];

/**
 * Obtiene todos los términos equivalentes para una palabra o frase de ingrediente
 */
export function getSynonymTokens(raw: string): string[] {
  const n = norm(raw);
  if (!n) return [];
  const found = new Set<string>([n]);

  // Si tiene paréntesis ej: "Pasta (espagueti o fetuccini)", desglosar
  const parenMatch = n.match(/\((.*?)\)/);
  if (parenMatch) {
    parenMatch[1].split(/\s+o\s+|\s*,\s*/).forEach((sub) => {
      const sn = norm(sub);
      if (sn) found.add(sn);
    });
  }

  // Buscar en grupos semánticos
  for (const group of SYNONYM_GROUPS) {
    const matchGroup = group.some((g) => n.includes(g) || g.includes(n));
    if (matchGroup) {
      group.forEach((member) => found.add(member));
    }
  }

  return Array.from(found);
}

/**
 * Algoritmo determinista de coincidencia de ingredientes:
 * - Normaliza términos y evalúa sinónimos.
 * - Excluye rigurosamente recetas que contengan ingredientes excluidos.
 * - Calcula porcentaje de coincidencia exacta y ponderada.
 * - Ordena por posibilidad de preparación (mayor score, menor faltantes, menor tiempo).
 */
export function matchByIngredients(
  recipes: Recipe[],
  available: string[],
  excluded: string[] = [],
): IngredientMatch[] {
  const normAvailable = available.map(norm).filter(Boolean);
  const normExcluded = excluded.map(norm).filter(Boolean);

  // Expansión con sinónimos
  const availableTerms = new Set<string>();
  normAvailable.forEach((a) => {
    getSynonymTokens(a).forEach((t) => availableTerms.add(t));
  });

  const excludedTerms = new Set<string>();
  normExcluded.forEach((e) => {
    getSynonymTokens(e).forEach((t) => excludedTerms.add(t));
  });

  const res: IngredientMatch[] = [];

  for (const recipe of recipes) {
    const rawNames = recipe.ingredients.map((i) => i.name);

    // 1. Verificación de exclusión estricta
    let hasExcluded = false;
    for (const name of rawNames) {
      const ingSynonyms = getSynonymTokens(name);
      if (ingSynonyms.some((syn) => Array.from(excludedTerms).some((ex) => syn.includes(ex) || ex.includes(syn)))) {
        hasExcluded = true;
        break;
      }
    }
    if (hasExcluded) continue;

    // 2. Coincidencia de ingredientes
    const haveList: string[] = [];
    const missingList: string[] = [];

    for (const name of rawNames) {
      const ingSynonyms = getSynonymTokens(name);
      const hit = ingSynonyms.some((syn) =>
        Array.from(availableTerms).some((av) => syn.includes(av) || av.includes(syn))
      );
      if (hit) {
        haveList.push(name);
      } else {
        missingList.push(name);
      }
    }

    const total = rawNames.length;
    const score = total > 0 ? haveList.length / total : 0;

    res.push({
      recipe,
      have: haveList.length,
      missing: missingList.length,
      missingList,
      haveList,
      score,
    });
  }

  // Ordenamiento determinista: mayor score primero, menor faltantes después, menor tiempo de preparación
  return res.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.missing !== b.missing) return a.missing - b.missing;
    return a.recipe.timeMin - b.recipe.timeMin;
  });
}

// Timer utils — timestamp based so background/minimize keeps precision
export function timerRemaining(deadlineMs: number): number {
  return Math.max(0, deadlineMs - Date.now());
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.ceil(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`;
}
