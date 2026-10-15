import type { Recipe, RecipeIngredient, RecipeStep } from '../types';
import { RECIPES } from '../data/catalog';
import { getSupabase } from './supabase';
import { fetchOnlineRecipes } from './online-recipes';

export interface RecipeListResponse {
  recipes: Recipe[];
  source: 'remote' | 'local' | 'online';
  isFallback: boolean;
  error?: string;
}

/**
 * Normaliza y mapea una fila de base de datos PostgreSQL (snake_case) a la interfaz Recipe (camelCase).
 * Maneja datos mixtos con seguridad de tipos.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapDbRecipeToRecipe(row: any): Recipe {
  if (!row || typeof row !== 'object') {
    return RECIPES[0];
  }

  // Si ya viene en formato camelCase (catálogo local o ya transformado)
  if ('timeMin' in row && 'baseServings' in row) {
    return row as Recipe;
  }

  return {
    id: String(row.id || ''),
    name: String(row.name || ''),
    description: String(row.description || ''),
    image: String(row.image || ''),
    imageSource: row.image_source || row.imageSource,
    imageLicense: row.image_license || row.imageLicense,
    categories: Array.isArray(row.categories) ? row.categories : [],
    timeMin: Number(row.time_min ?? row.timeMin ?? 20),
    prepTimeMin: row.prep_time_min !== undefined ? Number(row.prep_time_min) : row.prepTimeMin,
    cookTimeMin: row.cook_time_min !== undefined ? Number(row.cook_time_min) : row.cookTimeMin,
    difficulty: (row.difficulty as Recipe['difficulty']) || 'Fácil',
    baseServings: Number(row.base_servings ?? row.baseServings ?? 4),
    basePriceQ: Number(row.base_price_q ?? row.basePriceQ ?? 0),
    vegetarian: Boolean(row.vegetarian),
    isDessert: Boolean(row.is_dessert ?? row.isDessert),
    isDrink: Boolean(row.is_drink ?? row.isDrink),
    verified: row.verified !== undefined ? Boolean(row.verified) : true,
    sourceName: row.source_name || row.sourceName,
    sourceUrl: row.source_url || row.sourceUrl,
    originCountry: row.origin_country || row.originCountry,
    ingredients: (Array.isArray(row.ingredients) ? row.ingredients : []) as RecipeIngredient[],
    steps: (Array.isArray(row.steps) ? row.steps : []) as RecipeStep[],
    tags: Array.isArray(row.tags) ? row.tags : [],
  };
}

/**
 * Obtiene el listado de recetas con metadatos explícitos del origen de datos.
 * No sustituye silenciosamente errores sin reportar el estado de contingencia.
 */
export async function listRecipesWithStatus(): Promise<RecipeListResponse> {
  const sb = getSupabase();
  if (!sb) {
    try {
      const online = await fetchOnlineRecipes();
      if (online.length > 0) {
        const existingIds = new Set(RECIPES.map((r) => r.id));
        const newOnline = online.filter((r) => !existingIds.has(r.id));
        return {
          recipes: [...RECIPES, ...newOnline],
          source: 'online',
          isFallback: false,
        };
      }
    } catch {
      // si falla internet, continúa con local
    }

    return {
      recipes: RECIPES,
      source: 'local',
      isFallback: false,
    };
  }

  try {
    const { data, error } = await sb.from('recipes').select('*').limit(100);
    if (error) {
      return {
        recipes: RECIPES,
        source: 'local',
        isFallback: true,
        error: `Error de consulta en Supabase: ${error.message}`,
      };
    }

    if (!data || data.length === 0) {
      return {
        recipes: RECIPES,
        source: 'local',
        isFallback: true,
        error: 'La tabla remota recipes no contiene registros. Mostrando catálogo local.',
      };
    }

    const mapped = data.map(mapDbRecipeToRecipe);
    return {
      recipes: mapped,
      source: 'remote',
      isFallback: false,
    };
  } catch (err: unknown) {
    return {
      recipes: RECIPES,
      source: 'local',
      isFallback: true,
      error: err instanceof Error ? err.message : 'Error inesperado de red al conectar con Supabase.',
    };
  }
}

/**
 * Obtiene el listado de recetas (compatible con llamadas directas existentes).
 */
export async function listRecipes(): Promise<Recipe[]> {
  const result = await listRecipesWithStatus();
  return result.recipes;
}
