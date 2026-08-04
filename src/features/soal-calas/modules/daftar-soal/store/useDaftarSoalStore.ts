import { create } from 'zustand';

interface DaftarSoalState {
  search: string;
  tingkat: number | '';
  page: number;
  limit: number;
  setSearch: (search: string) => void;
  setTingkat: (tingkat: number | '') => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  resetFilter: () => void;
}

export const useDaftarSoalStore = create<DaftarSoalState>((set) => ({
  search: '',
  tingkat: '',
  page: 1,
  limit: 12,
  setSearch: (search) => set({ search, page: 1 }), // reset page when search changes
  setTingkat: (tingkat) => set({ tingkat, page: 1 }), // reset page when filter changes
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  resetFilter: () => set({ search: '', tingkat: '', page: 1 }),
}));
