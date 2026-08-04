import { create } from 'zustand';

interface DetailAsistenState {
  activeTab: 'content' | 'room' | 'penilaian';
  penilaianPage: number;
  penilaianLimit: number;
  setActiveTab: (tab: 'content' | 'room' | 'penilaian') => void;
  setPenilaianPage: (page: number) => void;
  setPenilaianLimit: (limit: number) => void;
}

export const useDetailAsistenStore = create<DetailAsistenState>((set) => ({
  activeTab: 'content',
  penilaianPage: 1,
  penilaianLimit: 10,
  setActiveTab: (tab) => set({ activeTab: tab }),
  setPenilaianPage: (page) => set({ penilaianPage: page }),
  setPenilaianLimit: (limit) => set({ penilaianLimit: limit }),
}));
