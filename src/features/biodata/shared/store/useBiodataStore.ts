import { create } from 'zustand';

interface BiodataStoreState {
  isEditingPersonal: boolean;
  isEditingPendidikan: boolean;
  isEditingKeluarga: boolean;
  setIsEditingPersonal: (value: boolean) => void;
  setIsEditingPendidikan: (value: boolean) => void;
  setIsEditingKeluarga: (value: boolean) => void;
}

export const useBiodataStore = create<BiodataStoreState>((set) => ({
  isEditingPersonal: false,
  isEditingPendidikan: false,
  isEditingKeluarga: false,
  setIsEditingPersonal: (value) => set({ isEditingPersonal: value }),
  setIsEditingPendidikan: (value) => set({ isEditingPendidikan: value }),
  setIsEditingKeluarga: (value) => set({ isEditingKeluarga: value }),
}));
