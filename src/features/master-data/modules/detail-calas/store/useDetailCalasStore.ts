import { create } from 'zustand';

interface DetailCalasState {
  activeTab: 'praktek' | 'project';
  setActiveTab: (tab: 'praktek' | 'project') => void;
}

export const useDetailCalasStore = create<DetailCalasState>((set) => ({
  activeTab: 'praktek',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
