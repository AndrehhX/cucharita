import { describe, expect, it } from 'vitest';
import {
  calculateBudgetBreakdown,
  estimatePrice,
  filterRecipes,
  formatClock,
  formatQty,
  getSynonymTokens,
  matchByIngredients,
  norm,
  scaleQuantity,
  timerRemaining,
} from '../src/lib/recipe-utils';
import { computeSummaryFromEntries } from '../src/repositories/ratings';
import type { Recipe } from '../src/types';

const base: Recipe = {
  id: 't',
  name: 'Test',
  description: '',
  image: '',
  categories: ['comidas'],
  timeMin: 20,
  difficulty: 'Fácil',
  baseServings: 4,
  basePriceQ: 40,
  vegetarian: false,
  isDessert: false,
  ingredients: [
    { name: 'Arroz', quantity: 2, unit: 'tazas', priceQ: 10, packagePriceQ: 12, packageUnit: 'bolsa 1 lb' },
    { name: 'Huevos', quantity: 4, unit: 'u', priceQ: 8, packagePriceQ: 18, packageUnit: 'cartón docena' },
    { name: 'Sal al gusto', quantity: 0, unit: '', priceQ: 2, scalable: false },
  ],
  steps: [{ instruction: 'Cocinar' }],
};

describe('porciones y presupuesto', () => {
  it('escala cantidades correctamente', () => {
    expect(scaleQuantity(250, 4, 2)).toBeCloseTo(125);
    expect(scaleQuantity(1, 2, 6)).toBeCloseTo(3);
  });

  it('formatea fracciones comunes de cocina', () => {
    expect(formatQty(0.25)).toBe('¼');
    expect(formatQty(0.5)).toBe('½');
    expect(formatQty(0.75)).toBe('¾');
    expect(formatQty(1.5)).toBe('1½');
    expect(formatQty(2)).toBe('2');
  });

  it('estima precio proporcional por porciones', () => {
    expect(estimatePrice(base, 2)).toBe(20);
    expect(estimatePrice(base, 8)).toBe(80);
  });

  it('calcula desglose presupuestario en Quetzales distinguiendo proporcional de presentación completa', () => {
    const budget = calculateBudgetBreakdown(base, 4);
    expect(budget.servings).toBe(4);
    expect(budget.proportionalTotalQ).toBe(20); // 10 + 8 + 2
    expect(budget.packageTotalQ).toBe(32); // 12 + 18 + 2
    expect(budget.items.length).toBe(3);
    expect(budget.items[0].source).toContain('Mercado');
    expect(budget.items[1].packageUnit).toBe('cartón docena');

    // Escalando a 2 porciones: los ingredientes escalables se reducen a la mitad, no escalables quedan fijos
    const scaledBudget = calculateBudgetBreakdown(base, 2);
    expect(scaledBudget.proportionalTotalQ).toBe(11); // 5 + 4 + 2
    expect(scaledBudget.items[0].quantity).toBe(1);
    expect(scaledBudget.items[1].quantity).toBe(2);
  });
});

describe('filtros de catálogo', () => {
  const veg: Recipe = { ...base, id: 'v', vegetarian: true, basePriceQ: 20, categories: ['vegetarianas'] };
  const postre: Recipe = { ...base, id: 'p', isDessert: true, basePriceQ: 60 };
  const list = [base, veg, postre];

  it('filtra vegetarianas', () => {
    const out = filterRecipes(list, {
      q: '',
      price: 'all',
      servings: 'all',
      onlyVeg: true,
      onlyDessert: false,
      category: 'todas',
      sort: 'relevance',
    });
    expect(out.map((r) => r.id)).toEqual(['v']);
  });

  it('filtra por precio y búsqueda de texto', () => {
    const out = filterRecipes(list, {
      q: 'test',
      price: 'low',
      servings: 'all',
      onlyVeg: false,
      onlyDessert: false,
      category: 'todas',
      sort: 'price',
    });
    expect(out[0].id).toBe('v');
  });
});

describe('búsqueda semántica por ingredientes y sinónimos', () => {
  it('normaliza acentos y mayúsculas', () => {
    expect(norm('Plátano MADURO')).toBe('platano maduro');
    expect(norm('Tomate de Cocina')).toBe('tomate de cocina');
  });

  it('expande sinónimos frecuentes (huevo/huevos, tomate/tomates)', () => {
    const tokens = getSynonymTokens('huevo');
    expect(tokens).toContain('huevos');
    expect(tokens).toContain('blanquillo');
  });

  it('encuentra receta con plural o singular de ingredientes', () => {
    const res = matchByIngredients([base], ['huevo', 'arroz'], []);
    expect(res.length).toBe(1);
    expect(res[0].have).toBe(2);
    expect(res[0].missing).toBe(1); // falta la sal
  });

  it('excluye rigurosamente recetas con ingredientes prohibidos', () => {
    const res = matchByIngredients([base], ['arroz', 'huevo'], ['arroz']);
    expect(res.length).toBe(0);
  });

  it('excluye con sinónimos (ej: excluir "huevos" bloquea receta con "Huevo")', () => {
    const res = matchByIngredients([base], ['arroz'], ['huevos']);
    expect(res.length).toBe(0);
  });
});

describe('calificaciones auténticas (1 a 5 estrellas)', () => {
  it('calcula promedio y desglose para cero calificaciones con honestidad', () => {
    const summary = computeSummaryFromEntries([], 'receta-vacia');
    expect(summary.totalRatings).toBe(0);
    expect(summary.averageRating).toBe(0);
    expect(summary.counts).toEqual({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  });

  it('calcula promedio ponderado real y recuento por estrellas', () => {
    const entries = [
      { rating: 5 },
      { rating: 5 },
      { rating: 4 },
      { rating: 3 },
    ];
    const summary = computeSummaryFromEntries(entries, 'receta-1');
    expect(summary.totalRatings).toBe(4);
    // (5 + 5 + 4 + 3) / 4 = 17 / 4 = 4.25 => redondeado a 4.3
    expect(summary.averageRating).toBe(4.3);
    expect(summary.counts[5]).toBe(2);
    expect(summary.counts[4]).toBe(1);
    expect(summary.counts[3]).toBe(1);
    expect(summary.counts[2]).toBe(0);
    expect(summary.counts[1]).toBe(0);
  });

  it('restringe límites de 1 a 5 estrellas estrictamente', () => {
    const entries = [{ rating: -2 }, { rating: 10 }, { rating: 3.8 }];
    const summary = computeSummaryFromEntries(entries, 'receta-2');
    expect(summary.totalRatings).toBe(3);
    // -2 clampa a 1, 10 clampa a 5, 3.8 redondea a 4
    expect(summary.counts[1]).toBe(1);
    expect(summary.counts[5]).toBe(1);
    expect(summary.counts[4]).toBe(1);
  });
});

describe('temporizadores con timestamp', () => {
  it('formatea reloj y calcula restante por timestamp de forma precisa', () => {
    expect(formatClock(600)).toBe('10:00');
    expect(formatClock(65)).toBe('01:05');
    const d = Date.now() + 5000;
    const left = timerRemaining(d);
    expect(left).toBeGreaterThan(4000);
    expect(left).toBeLessThanOrEqual(5000);
  });
});
