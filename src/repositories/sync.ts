import { getSupabase } from './supabase';

export interface SyncReport {
  success: boolean;
  migratedFavoritesCount: number;
  migratedCollectionsCount: number;
  error?: string;
}

/**
 * Estrategia de sincronización no destructiva:
 * - Lee los favoritos y colecciones locales de localStorage.
 * - Compara con los registros existentes en Supabase para el usuario autenticado.
 * - Realiza una unión matemática (SET union): no borra datos previos ni duplica IDs.
 * - Sube las colecciones locales que no existan previamente.
 * - Preserva siempre una copia de seguridad local.
 */
export async function syncLocalDataToRemote(userId: string): Promise<SyncReport> {
  const sb = getSupabase();
  if (!sb || !userId) {
    return {
      success: false,
      migratedFavoritesCount: 0,
      migratedCollectionsCount: 0,
      error: 'Supabase no está configurado o no hay usuario autenticado.',
    };
  }

  try {
    // 1. Sincronización de Favoritos
    let localFavIds: string[] = [];
    try {
      const raw = localStorage.getItem('cucharita:favs:v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.state?.ids)) {
          localFavIds = parsed.state.ids;
        }
      }
    } catch {
      // fallo al leer local
    }

    let migratedFavoritesCount = 0;
    if (localFavIds.length > 0) {
      // Obtener favoritos remotos existentes para evitar duplicados
      const { data: remoteFavs } = await sb
        .from('favorites')
        .select('recipe_id')
        .eq('user_id', userId);

      const existingRemoteSet = new Set((remoteFavs || []).map((f) => f.recipe_id));
      const newToUpload = localFavIds.filter((id) => !existingRemoteSet.has(id));

      if (newToUpload.length > 0) {
        const payload = newToUpload.map((recipe_id) => ({
          user_id: userId,
          recipe_id,
        }));
        const { error: favError } = await sb.from('favorites').upsert(payload, { onConflict: 'user_id,recipe_id' });
        if (!favError) {
          migratedFavoritesCount = newToUpload.length;
        }
      }
    }

    // 2. Sincronización de Colecciones / Carpetas
    let localCols: { name: string; recipeIds: string[] }[] = [];
    try {
      const raw = localStorage.getItem('cucharita:cols:v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.state?.collections)) {
          localCols = parsed.state.collections;
        }
      }
    } catch {
      // fallo al leer local
    }

    let migratedCollectionsCount = 0;
    if (localCols.length > 0) {
      const { data: remoteCols } = await sb
        .from('collections')
        .select('id, name')
        .eq('user_id', userId);

      const remoteNameMap = new Map((remoteCols || []).map((c) => [c.name.toLowerCase().trim(), c.id]));

      for (const col of localCols) {
        const colKey = col.name.toLowerCase().trim();
        let targetColId = remoteNameMap.get(colKey);

        if (!targetColId) {
          const { data: insertedCol, error: colCreateErr } = await sb
            .from('collections')
            .insert({ user_id: userId, name: col.name })
            .select('id')
            .single();

          if (!colCreateErr && insertedCol) {
            targetColId = insertedCol.id;
            remoteNameMap.set(colKey, targetColId);
            migratedCollectionsCount++;
          }
        }

        // Asociar recetas a la colección
        if (targetColId && col.recipeIds && col.recipeIds.length > 0) {
          const recipePayload = col.recipeIds.map((rId) => ({
            collection_id: targetColId,
            recipe_id: rId,
          }));
          await sb.from('collection_recipes').upsert(recipePayload, { onConflict: 'collection_id,recipe_id' });
        }
      }
    }

    return {
      success: true,
      migratedFavoritesCount,
      migratedCollectionsCount,
    };
  } catch (err: unknown) {
    return {
      success: false,
      migratedFavoritesCount: 0,
      migratedCollectionsCount: 0,
      error: err instanceof Error ? err.message : 'Error desconocido de sincronización.',
    };
  }
}
