import { create } from 'zustand';
import type { Calas } from '../api/calas.api';

interface CalasState {
  selectedCalas: Calas | null;
  setSelectedCalas: (calas: Calas | null) => void;
}

export const useCalasStore = create<CalasState>((set) => ({
  selectedCalas: null,
  setSelectedCalas: (calas) => set({ selectedCalas: calas }),
}));
