import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Collection } from '../../types';

interface ColState {
  collections: Collection[];
  create: (name: string) => string;
  rename: (id: string, name: string) => void;
  remove: (id: string) => void;
  toggleRecipe: (collectionId: string, recipeId: string) => void;
}

const PALETTE = [
  { icon: 'heart', color: '#F9C6C0' },
  { icon: 'bowl', color: '#D6E7F7' },
  { icon: 'cup', color: '#FDE4B5' },
];

export const useCollections = create<ColState>()(
  persist(
    (set, get) => ({
      collections: [
        { id: 'fav', name: 'Favoritas', icon: 'heart', color: '#F9C6C0', recipeIds: [], createdAt: Date.now() },
        { id: 'comidas', name: 'Comidas', icon: 'bowl', color: '#D6E7F7', recipeIds: [], createdAt: Date.now() },
        { id: 'postres', name: 'Postres', icon: 'cup', color: '#FDE4B5', recipeIds: [], createdAt: Date.now() },
      ],
      create: (name) => {
        const id = `c_${Date.now()}`;
        const p = PALETTE[get().collections.length % PALETTE.length];
        set({ collections: [...get().collections, { id, name, icon: p.icon, color: p.color, recipeIds: [], createdAt: Date.now() }] });
        return id;
      },
      rename: (id, name) =>
        set({ collections: get().collections.map((c) => (c.id === id ? { ...c, name } : c)) }),
      remove: (id) => set({ collections: get().collections.filter((c) => c.id !== id) }),
      toggleRecipe: (collectionId, recipeId) =>
        set({
          collections: get().collections.map((c) =>
            c.id !== collectionId
              ? c
              : {
                  ...c,
                  recipeIds: c.recipeIds.includes(recipeId)
                    ? c.recipeIds.filter((r) => r !== recipeId)
                    : [...c.recipeIds, recipeId],
                },
          ),
        }),
    }),
    { name: 'cucharita:cols:v1' },
  ),
);
