import { describe, expect, it } from 'vitest';
import { RECIPES, getRecipe, POPULAR_IDS, GUATEMALAN_IDS, QUICK_IDS, DRINK_IDS } from '../src/data/catalog';
import { calculateBudgetBreakdown } from '../src/lib/recipe-utils';

describe('Auditoría Integral del Catálogo de Recetas', () => {
  it('contiene al menos 48 recetas completas y válidas', () => {
    expect(RECIPES.length).toBeGreaterThanOrEqual(48);
  });

  it('no contiene identificadores duplicados', () => {
    const ids = RECIPES.map((r) => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('cada receta tiene campos requeridos, porciones e instrucciones coherentes', () => {
    for (const r of RECIPES) {
      expect(r.id.trim()).not.toBe('');
      expect(r.name.trim()).not.toBe('');
      expect(r.description.trim()).not.toBe('');
      expect(r.timeMin).toBeGreaterThan(0);
      expect(r.baseServings).toBeGreaterThan(0);
      expect(r.basePriceQ).toBeGreaterThan(0);
      expect(['Fácil', 'Media', 'Avanzada']).toContain(r.difficulty);
      expect(r.categories.length).toBeGreaterThan(0);

      // Ingredientes
      expect(r.ingredients.length).toBeGreaterThan(0);
      for (const ing of r.ingredients) {
        expect(ing.name.trim()).not.toBe('');
        expect(typeof ing.quantity).toBe('number');
        if (ing.scalable !== false) {
          expect(ing.quantity).toBeGreaterThan(0);
        }
        if (ing.priceQ !== undefined) {
          expect(ing.priceQ).toBeGreaterThanOrEqual(0);
        }
      }

      // Pasos de preparación
      expect(r.steps.length).toBeGreaterThan(0);
      for (const step of r.steps) {
        expect(step.instruction.trim()).not.toBe('');
      }
    }
  });

  it('cada fotografía corresponde a un recurso HTTPS autorizado y optimizado de Unsplash', () => {
    for (const r of RECIPES) {
      expect(r.image).toMatch(/^https:\/\/images\.unsplash\.com\/photo-/);
      expect(r.image).toContain('auto=format');
      expect(r.image).toContain('fit=crop');
    }
  });

  it('distingue procedencia, fuentes y licencias adecuadamente', () => {
    for (const r of RECIPES) {
      expect(r.originCountry).toBeTruthy();
      expect(r.imageSource).toBeTruthy();
      expect(r.imageLicense).toBeTruthy();
    }
  });

  it('las recetas guatemaltecas emblemáticas existen y tienen datos consistentes', () => {
    expect(GUATEMALAN_IDS.length).toBeGreaterThanOrEqual(5);
    for (const id of GUATEMALAN_IDS) {
      const recipe = getRecipe(id);
      expect(recipe).toBeDefined();
      expect(recipe?.originCountry).toBe('Guatemala');
    }
  });

  it('los presupuestos en Quetzales se calculan de manera coherente para cada receta', () => {
    for (const r of RECIPES) {
      const budget = calculateBudgetBreakdown(r, r.baseServings);
      expect(budget.proportionalTotalQ).toBeGreaterThan(0);
      expect(budget.packageTotalQ).toBeGreaterThanOrEqual(budget.proportionalTotalQ);
      expect(budget.items.length).toBe(r.ingredients.length);
    }
  });

  it('las colecciones destacadas (popular, rápidas, bebidas) apuntan a IDs válidos', () => {
    for (const id of POPULAR_IDS) {
      expect(getRecipe(id)).toBeDefined();
    }
    for (const id of QUICK_IDS) {
      const r = getRecipe(id);
      expect(r).toBeDefined();
      expect(r!.timeMin).toBeLessThanOrEqual(20);
    }
    for (const id of DRINK_IDS) {
      const r = getRecipe(id);
      expect(r).toBeDefined();
      expect(r!.isDrink).toBe(true);
    }
  });
});
