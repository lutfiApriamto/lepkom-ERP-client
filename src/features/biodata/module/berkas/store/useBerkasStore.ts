import { create } from 'zustand';

interface BerkasState {
  isEditing: boolean;
  tempCv: string | null;
  tempKrs: string | null;
  tempRangkumanNilai: string | null;
  setIsEditing: (val: boolean) => void;
  setTempCv: (url: string | null) => void;
  setTempKrs: (url: string | null) => void;
  setTempRangkumanNilai: (url: string | null) => void;
  resetState: () => void;
}

export const useBerkasStore = create<BerkasState>((set) => ({
  isEditing: false,
  tempCv: null,
  tempKrs: null,
  tempRangkumanNilai: null,
  setIsEditing: (val) => set({ isEditing: val }),
  setTempCv: (url) => set({ tempCv: url }),
  setTempKrs: (url) => set({ tempKrs: url }),
  setTempRangkumanNilai: (url) => set({ tempRangkumanNilai: url }),
  resetState: () => set({ 
    isEditing: false, 
    tempCv: null, 
    tempKrs: null, 
    tempRangkumanNilai: null 
  }),
}));
