import { create } from 'zustand';
import type { Asisten } from '../api/asisten.api';

interface AsistenState {
  selectedAsisten: Asisten | null;
  setSelectedAsisten: (asisten: Asisten | null) => void;
}

export const useAsistenStore = create<AsistenState>((set) => ({
  selectedAsisten: null,
  setSelectedAsisten: (asisten) => set({ selectedAsisten: asisten }),
}));
