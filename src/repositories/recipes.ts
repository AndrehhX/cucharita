import type { Recipe } from '../types';
import { RECIPES } from '../data/catalog';
import { getSupabase } from './supabase';

// Capa de repositorios: local primero, Supabase opcional cuando hay env.
export async function listRecipes(): Promise<Recipe[]> {
  const sb = getSupabase();
  if (!sb) return RECIPES;
  try {
    const { data, error } = await sb.from('recipes').select('*').limit(100);
    if (error || !data || data.length === 0) return RECIPES;
    return data as Recipe[];
  } catch {
    return RECIPES;
  }
}
