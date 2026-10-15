import { describe, expect, it, beforeEach } from 'vitest';
import {
  computeSummaryFromEntries,
  getClientId,
  submitRecipeRating,
  getRecipeRatingSummary,
  getCurrentUserRating,
} from '../src/repositories/ratings';
import { syncLocalDataToRemote } from '../src/repositories/sync';

describe('sistema de calificaciones auténticas y persistencia', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('genera un identificador de cliente estable y persistente para modo invitado', () => {
    const id1 = getClientId();
    const id2 = getClientId();
    expect(id1).toBeTruthy();
    expect(id1).toBe(id2);
    expect(id1).toContain('cucharita_guest_');
  });

  it('guarda y edita la calificación de un usuario para una misma receta sin duplicar registros', async () => {
    const recipeId = 'pepian-pollo';

    // Primera valoración: 4 estrellas
    const res1 = await submitRecipeRating(recipeId, 4);
    expect(res1.success).toBe(true);
    expect(res1.isLocalOnly).toBe(true);
    expect(res1.summary.totalRatings).toBe(1);
    expect(res1.summary.averageRating).toBe(4);
    expect(res1.summary.counts[4]).toBe(1);

    // Consulta de valoración del usuario actual
    const userRating1 = await getCurrentUserRating(recipeId);
    expect(userRating1?.rating).toBe(4);

    // Edición a 5 estrellas (el usuario actualiza su valoración previa)
    const res2 = await submitRecipeRating(recipeId, 5);
    expect(res2.success).toBe(true);
    // Debe mantenerse 1 sola valoración del usuario, no 2
    expect(res2.summary.totalRatings).toBe(1);
    expect(res2.summary.averageRating).toBe(5);
    expect(res2.summary.counts[5]).toBe(1);
    expect(res2.summary.counts[4]).toBe(0);

    const userRating2 = await getCurrentUserRating(recipeId);
    expect(userRating2?.rating).toBe(5);
  });

  it('calcula promedios fieles con múltiples entradas simuladas', () => {
    const entries = [
      { rating: 5 },
      { rating: 4 },
      { rating: 5 },
      { rating: 3 },
      { rating: 5 },
    ];
    // sum = 22, avg = 4.4
    const summary = computeSummaryFromEntries(entries, 'tacos-pollo');
    expect(summary.totalRatings).toBe(5);
    expect(summary.averageRating).toBe(4.4);
    expect(summary.counts[5]).toBe(3);
    expect(summary.counts[4]).toBe(1);
    expect(summary.counts[3]).toBe(1);
  });

  it('retorna estado vacío cuando no hay calificaciones registradas', async () => {
    const summary = await getRecipeRatingSummary('receta-sin-calificar');
    expect(summary.totalRatings).toBe(0);
    expect(summary.averageRating).toBe(0);
  });
});

describe('estrategia de sincronización segura (no destructiva)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('maneja con elegancia la ausencia de credenciales de Supabase sin lanzar excepciones', async () => {
    // Sin Supabase configurado, debe retornar informe seguro sin romper el flujo local
    const report = await syncLocalDataToRemote('test-user-id');
    expect(report.success).toBe(false);
    expect(report.migratedFavoritesCount).toBe(0);
    expect(report.error).toContain('Supabase no está configurado');
  });

  it('preserva datos locales en caso de fallo o modo sin conexión', async () => {
    const localFavs = {
      state: { ids: ['pepian-pollo', 'rellenitos-platano'] },
      version: 0,
    };
    localStorage.setItem('cucharita:favs:v1', JSON.stringify(localFavs));

    // Ejecución de sync en modo local
    await syncLocalDataToRemote('user-123');

    // Comprobar que los datos en localStorage permanecen intactos
    const persisted = JSON.parse(localStorage.getItem('cucharita:favs:v1')!);
    expect(persisted.state.ids).toEqual(['pepian-pollo', 'rellenitos-platano']);
  });
});
