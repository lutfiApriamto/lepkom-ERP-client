import { create } from 'zustand';

interface CalasTableState {
  search: string;
  page: number;
  limit: number;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  reset: () => void;
}

export const useCalasTableStore = create<CalasTableState>((set) => ({
  search: '',
  page: 1,
  limit: 10,
  setSearch: (search) => set({ search, page: 1 }), // reset to page 1 when search changes
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit, page: 1 }),
  reset: () => set({ search: '', page: 1, limit: 10 })
}));
