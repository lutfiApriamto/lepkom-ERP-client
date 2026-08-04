import { create } from 'zustand';
import { path } from '@/utils/consts';

const initialState = {
  breadcrumbItems: [
    { label: 'Dashboard', path: path.lepkom.dashboard }
  ],
  penilaiStats: null,
};

export const usePenilaiDashboardStore = create<any>((set) => ({
  ...initialState,
  setState: (option: string, value: any) => {
    set(() => ({
      [option]: value
    }));
  },
  resetStore: () => set(() => ({ ...initialState })),
}));
