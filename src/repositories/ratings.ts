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
      if (user?.user) {
        const { data, error } = await sb
          .from('recipe_ratings')
          .select('rating, updated_at')
          .eq('recipe_id', recipeId)
          .eq('user_id', user.user.id)
          .maybeSingle();

        if (!error && data) {
          return {
            recipeId,
            rating: data.rating,
            updatedAt: new Date(data.updated_at).getTime(),
          };
        }
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

export interface RatingSubmissionResult {
  success: boolean;
  summary: RecipeRatingSummary;
  userRating: UserRating;
  isLocalOnly: boolean;
  message?: string;
}

/**
 * Guarda o edita la calificación de 1 a 5 estrellas para una receta.
 * SEGURIDAD (PostgreSQL / RLS):
 * - Los identificadores anónimos de localStorage NO se consideran prueba de identidad remota.
 * - En modo invitado (sin sesión auth verificada), la valoración se guarda estrictamente en el
 *   almacenamiento local del dispositivo para referencia personal del usuario.
 * - No se envían escrituras públicas no autenticadas a la base de datos remota para evitar manipulación
 *   de promedios o suplantación de identidades.
 * - Solo si existe una sesión autenticada con user_id válido, se sincroniza con el servidor.
 */
export async function submitRecipeRating(
  recipeId: string,
  rating: number,
): Promise<RatingSubmissionResult> {
  const validRating = Math.min(5, Math.max(1, Math.round(rating)));
  const clientId = getClientId();
  const now = Date.now();
  const userRating: UserRating = { recipeId, rating: validRating, updatedAt: now };

  // 1. Guardar localmente en el dispositivo
  const store = readLocalStore();
  if (!store[recipeId]) store[recipeId] = {};
  store[recipeId][clientId] = { rating: validRating, updatedAt: now };
  writeLocalStore(store);

  const localSummary = computeSummaryFromEntries(Object.values(store[recipeId]), recipeId);

  // 2. Verificar si hay sesión de usuario autenticada para persistencia remota
  const sb = getSupabase();
  if (sb) {
    try {
      const { data: userData } = await sb.auth.getUser();
      if (userData?.user) {
        // Usuario con sesión verificada: escritura remota autorizada bajo RLS
        const payload = {
          recipe_id: recipeId,
          user_id: userData.user.id,
          rating: validRating,
          updated_at: new Date(now).toISOString(),
        };

        await sb.from('recipe_ratings').upsert(payload, { onConflict: 'recipe_id,user_id' });
        const remoteSummary = await getRecipeRatingSummary(recipeId);
        return {
          success: true,
          summary: remoteSummary,
          userRating,
          isLocalOnly: false,
          message: 'Valoración guardada en tu cuenta.',
        };
      }
    } catch {
      // continuar en modo local
    }
  }

  // Modo invitado: la valoración se conserva segura en el dispositivo del usuario
  return {
    success: true,
    summary: localSummary,
    userRating,
    isLocalOnly: true,
    message: 'Valoración guardada en tu dispositivo (modo local).',
  };
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
  const [isLocalOnly, setIsLocalOnly] = useState<boolean>(true);
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
    setIsLocalOnly(res.isLocalOnly);
    return res;
  };

  return {
    summary,
    userRating,
    isLocalOnly,
    loading,
    rate,
    refresh,
  };
}
