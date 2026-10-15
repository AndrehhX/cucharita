import { useEffect, useState, useCallback } from 'react';
import type { RecipeRatingSummary, UserRating } from '../types';
import { getSupabase } from './supabase';

const CLIENT_ID_KEY = 'cucharita:client_id:v1';
const LOCAL_RATINGS_KEY = 'cucharita:ratings:v1';

export function getClientId(): string {
  let id = localStorage.getItem(CLIENT_ID_KEY);
  if (!id) {
    id = `cucharita_guest_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
    localStorage.setItem(CLIENT_ID_KEY, id);
  }
  return id;
}

interface LocalRatingsStore {
  // [recipeId]: { [clientId]: { rating: number; updatedAt: number } }
  [recipeId: string]: Record<string, { rating: number; updatedAt: number }>;
}

function readLocalStore(): LocalRatingsStore {
  try {
    const raw = localStorage.getItem(LOCAL_RATINGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeLocalStore(store: LocalRatingsStore): void {
  try {
    localStorage.setItem(LOCAL_RATINGS_KEY, JSON.stringify(store));
  } catch {
    // ignore quota errors
  }
}

export function computeSummaryFromEntries(entries: { rating: number }[], recipeId: string): RecipeRatingSummary {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!entries || entries.length === 0) {
    return {
      recipeId,
      totalRatings: 0,
      averageRating: 0,
      counts,
    };
  }

  let sum = 0;
  for (const entry of entries) {
    const r = Math.min(5, Math.max(1, Math.round(entry.rating))) as 1 | 2 | 3 | 4 | 5;
    counts[r]++;
    sum += r;
  }

  const averageRating = Math.round((sum / entries.length) * 10) / 10;

  return {
    recipeId,
    totalRatings: entries.length,
    averageRating,
    counts,
  };
}

/**
 * Obtiene el resumen de calificaciones reales para una receta dada.
 * Si Supabase está disponible, consulta la vista `recipe_rating_summary` o `recipe_ratings`.
 * En modo local o fallo, lee de `cucharita:ratings:v1`.
 */
export async function getRecipeRatingSummary(recipeId: string): Promise<RecipeRatingSummary> {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('recipe_ratings')
        .select('rating')
        .eq('recipe_id', recipeId);

      if (!error && data) {
        return computeSummaryFromEntries(data as { rating: number }[], recipeId);
      }
    } catch {
      // fallback a local
    }
  }

  // Fallback a almacenamiento local auténtico
  const store = readLocalStore();
  const recipeRatings = store[recipeId] ? Object.values(store[recipeId]) : [];
  return computeSummaryFromEntries(recipeRatings, recipeId);
}

/**
 * Obtiene la calificación enviada por el usuario/dispositivo actual para una receta dada.
 */
export async function getCurrentUserRating(recipeId: string): Promise<UserRating | null> {
  const clientId = getClientId();
  const sb = getSupabase();

  if (sb) {
    try {
      const { data: user } = await sb.auth.getUser();
      const query = sb.from('recipe_ratings').select('rating, updated_at').eq('recipe_id', recipeId);
      if (user?.user) {
        query.eq('user_id', user.user.id);
      } else {
        query.eq('client_id', clientId);
      }
      const { data, error } = await query.maybeSingle();
      if (!error && data) {
        return {
          recipeId,
          rating: data.rating,
          updatedAt: new Date(data.updated_at).getTime(),
        };
      }
    } catch {
      // fallback a local
    }
  }

  const store = readLocalStore();
  const entry = store[recipeId]?.[clientId];
  if (entry) {
    return {
      recipeId,
      rating: entry.rating,
      updatedAt: entry.updatedAt,
    };
  }
  return null;
}

/**
 * Envía o edita la calificación auténtica de 1 a 5 estrellas para una receta.
 */
export async function submitRecipeRating(
  recipeId: string,
  rating: number,
): Promise<{ success: boolean; summary: RecipeRatingSummary; userRating: UserRating }> {
  const validRating = Math.min(5, Math.max(1, Math.round(rating)));
  const clientId = getClientId();
  const now = Date.now();
  const userRating: UserRating = { recipeId, rating: validRating, updatedAt: now };

  // Siempre persistir localmente primero para consistencia y offline
  const store = readLocalStore();
  if (!store[recipeId]) store[recipeId] = {};
  store[recipeId][clientId] = { rating: validRating, updatedAt: now };
  writeLocalStore(store);

  const localSummary = computeSummaryFromEntries(Object.values(store[recipeId]), recipeId);

  const sb = getSupabase();
  if (sb) {
    try {
      const { data: userData } = await sb.auth.getUser();
      const payload: Record<string, unknown> = {
        recipe_id: recipeId,
        client_id: clientId,
        rating: validRating,
        updated_at: new Date(now).toISOString(),
      };
      if (userData?.user) {
        payload.user_id = userData.user.id;
      }

      await sb.from('recipe_ratings').upsert(payload, { onConflict: 'recipe_id,client_id' });
      // Si tuvo éxito, recalcular resumen remoto
      const remoteSummary = await getRecipeRatingSummary(recipeId);
      return { success: true, summary: remoteSummary, userRating };
    } catch {
      // guardado local completado
    }
  }

  return { success: true, summary: localSummary, userRating };
}

/**
 * Hook React para leer y gestionar calificaciones en componentes
 */
export function useRecipeRating(recipeId: string) {
  const [summary, setSummary] = useState<RecipeRatingSummary>({
    recipeId,
    totalRatings: 0,
    averageRating: 0,
    counts: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [userRating, setUserRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [sum, user] = await Promise.all([
        getRecipeRatingSummary(recipeId),
        getCurrentUserRating(recipeId),
      ]);
      setSummary(sum);
      setUserRating(user?.rating ?? null);
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const rate = async (score: number) => {
    const res = await submitRecipeRating(recipeId, score);
    setSummary(res.summary);
    setUserRating(res.userRating.rating);
    return res;
  };

  return {
    summary,
    userRating,
    loading,
    rate,
    refresh,
  };
}
