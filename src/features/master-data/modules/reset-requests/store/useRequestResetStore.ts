import { create } from 'zustand';

interface RequestResetState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
}

export const useRequestResetStore = create<RequestResetState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  statusFilter: '',
  setStatusFilter: (status) => set({ statusFilter: status }),
}));
