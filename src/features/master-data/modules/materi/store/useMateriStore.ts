import { create } from 'zustand';
import type { Materi } from '../api/materi.api';

interface MateriState {
  selectedMateri: Materi | null;
  setSelectedMateri: (materi: Materi | null) => void;
}

export const useMateriStore = create<MateriState>((set) => ({
  selectedMateri: null,
  setSelectedMateri: (materi) => set({ selectedMateri: materi }),
}));
