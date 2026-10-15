import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile } from '../../types';

interface ProfileState extends UserProfile {
  audioEnabled: boolean;
  setName: (n: string) => void;
  setAudio: (v: boolean) => void;
  incCooked: () => void;
  resetLocal: () => void;
}

export const useProfile = create<ProfileState>()(
  persist(
    (set) => ({
      name: 'Cocinera Feliz',
      tagline: 'Pequeña chef, grandes ideas',
      cookedCount: 0,
      audioEnabled: true,
      setName: (name) => set({ name }),
      setAudio: (v) => set({ audioEnabled: v }),
      incCooked: () => set((s) => ({ cookedCount: s.cookedCount + 1 })),
      resetLocal: () => {
        localStorage.removeItem('cucharita:favs:v1');
        localStorage.removeItem('cucharita:cols:v1');
        set({ cookedCount: 0 });
      },
    }),
    { name: 'cucharita:profile:v1' },
  ),
);
