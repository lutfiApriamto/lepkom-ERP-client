import { create } from 'zustand';

interface JawabanState {
  tempPraktek: string | null;
  filePraktek: File | null;
  tempProject: string | null;
  fileProject: File | null;
  setTempPraktek: (url: string | null) => void;
  setFilePraktek: (file: File | null) => void;
  setTempProject: (url: string | null) => void;
  setFileProject: (file: File | null) => void;
  clearAll: () => void;
}

export const useJawabanStore = create<JawabanState>((set) => ({
  tempPraktek: null,
  filePraktek: null,
  tempProject: null,
  fileProject: null,
  setTempPraktek: (url) => set({ tempPraktek: url }),
  setFilePraktek: (file) => set({ filePraktek: file }),
  setTempProject: (url) => set({ tempProject: url }),
  setFileProject: (file) => set({ fileProject: file }),
  clearAll: () => set({ tempPraktek: null, filePraktek: null, tempProject: null, fileProject: null }),
}));

