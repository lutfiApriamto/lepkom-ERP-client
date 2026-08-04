import { create } from 'zustand';
import { path } from '@/utils/consts';

const initialState = {
  breadcrumbItems: [
    { label: 'Dashboard', path: path.lepkom.dashboard }
  ],
  calasStats: null,
};

export const useCalasDashboardStore = create<any>((set) => ({
  ...initialState,
  setState: (option: string, value: any) => {
    set(() => ({
      [option]: value
    }));
  },
  resetStore: () => set(() => ({ ...initialState })),
}));
