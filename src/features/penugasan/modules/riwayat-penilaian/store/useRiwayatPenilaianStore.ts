import { create } from 'zustand';

interface RiwayatPenilaianState {
  page: number;
  limit: number;
  searchAsisten: string;
  tanggal: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearchAsisten: (search: string) => void;
  setTanggal: (tanggal: string) => void;
  resetFilters: () => void;
}

export const useRiwayatPenilaianStore = create<RiwayatPenilaianState>((set) => ({
  page: 1,
  limit: 10,
  searchAsisten: '',
  tanggal: '',
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }), // reset to page 1 on limit change
  setSearchAsisten: (searchAsisten) => set({ searchAsisten, page: 1 }),
  setTanggal: (tanggal) => set({ tanggal, page: 1 }),
  resetFilters: () => set({ searchAsisten: '', tanggal: '', page: 1 }),
}));
