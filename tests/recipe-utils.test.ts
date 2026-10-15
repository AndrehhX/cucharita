import { describe, expect, it } from 'vitest';
import {
  estimatePrice,
  filterRecipes,
  formatClock,
  formatQty,
  matchByIngredients,
  scaleQuantity,
  timerRemaining,
} from '../src/lib/recipe-utils';
import type { Recipe } from '../src/types';

const base: Recipe = {
  id: 't', name: 'Test', description: '', image: '',
  categories: ['comidas'], timeMin: 20, difficulty: 'Fácil',
  baseServings: 4, basePriceQ: 40, vegetarian: false, isDessert: false,
  ingredients: [{ name: 'Arroz', quantity: 2, unit: 'tazas' }],
  steps: [{ instruction: 'Cocinar' }],
};

describe('porciones', () => {
  it('escala cantidades', () => {
    expect(scaleQuantity(250, 4, 2)).toBeCloseTo(125);
    expect(scaleQuantity(1, 2, 6)).toBeCloseTo(3);
  });
  it('formatea fracciones comunes', () => {
    expect(formatQty(0.5)).toBe('½');
    expect(formatQty(1.5)).toBe('1½');
  });
  it('estima precio proporcional', () => {
    expect(estimatePrice(base, 2)).toBe(20);
    expect(estimatePrice(base, 8)).toBe(80);
  });
});

describe('filtros', () => {
  const veg: Recipe = { ...base, id: 'v', vegetarian: true, basePriceQ: 20, categories: ['vegetarianas'] };
  const postre: Recipe = { ...base, id: 'p', isDessert: true, basePriceQ: 60 };
  const list = [base, veg, postre];
  it('filtra vegetarianas', () => {
    const out = filterRecipes(list, { q: '', price: 'all', servings: 'all', onlyVeg: true, onlyDessert: false, category: 'todas', sort: 'relevance' });
    expect(out.map((r) => r.id)).toEqual(['v']);
  });
  it('filtra por precio y búsqueda', () => {
    const out = filterRecipes(list, { q: 'test', price: 'low', servings: 'all', onlyVeg: false, onlyDessert: false, category: 'todas', sort: 'price' });
    expect(out[0].id).toBe('v');
  });
});

describe('búsqueda por ingredientes', () => {
  it('ordena por coincidencia e indica faltantes', () => {
    const r = matchByIngredients([base], ['arroz'], []);
    expect(r[0].score).toBe(1);
    expect(r[0].missing).toBe(0);
    const r2 = matchByIngredients([base], ['huevo'], []);
    expect(r2[0].missing).toBe(1);
  });
  it('respeta excluidos', () => {
    const r = matchByIngredients([base], ['arroz'], ['arroz']);
    expect(r.length).toBe(0);
  });
});

describe('temporizadores', () => {
  it('formatea reloj y calcula restante por timestamp', () => {
    expect(formatClock(600)).toBe('10:00');
    expect(formatClock(65)).toBe('01:05');
    const d = Date.now() + 5000;
    const left = timerRemaining(d);
    expect(left).toBeGreaterThan(4000);
    expect(left).toBeLessThanOrEqual(5000);
  });
});
