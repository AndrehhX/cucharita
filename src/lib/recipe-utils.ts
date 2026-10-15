import type { Filters, Recipe, RecipeIngredient } from '../types';

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
  return Math.round((recipe.basePriceQ / recipe.baseServings) * servings);
}

export function priceBand(priceQ: number): 'low' | 'mid' | 'high' {
  if (priceQ < 25) return 'low';
  if (priceQ <= 50) return 'mid';
  return 'high';
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

const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

export function matchByIngredients(
  recipes: Recipe[],
  available: string[],
  excluded: string[] = [],
): IngredientMatch[] {
  const avail = new Set(available.map(norm).filter(Boolean));
  const excl = new Set(excluded.map(norm).filter(Boolean));
  const res: IngredientMatch[] = [];
  for (const recipe of recipes) {
    const names = recipe.ingredients.map((i) => i.name);
    if (names.some((n) => [...excl].some((e) => norm(n).includes(e)))) continue;
    const haveList: string[] = [];
    const missingList: string[] = [];
    for (const n of names) {
      const nn = norm(n);
      const hit = [...avail].some((a) => nn.includes(a) || a.includes(nn));
      if (hit) haveList.push(n);
      else missingList.push(n);
    }
    const score = names.length ? haveList.length / names.length : 0;
    res.push({ recipe, have: haveList.length, missing: missingList.length, missingList, haveList, score });
  }
  return res.sort((a, b) => b.score - a.score || a.missing - b.missing);
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
