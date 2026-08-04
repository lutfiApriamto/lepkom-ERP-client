import { create } from 'zustand';
import type { Soal } from '../api/soal.api';

interface SoalState {
  selectedSoal: Soal | null;
  setSelectedSoal: (soal: Soal | null) => void;
}

export const useSoalStore = create<SoalState>((set) => ({
  selectedSoal: null,
  setSelectedSoal: (soal) => set({ selectedSoal: soal }),
}));
