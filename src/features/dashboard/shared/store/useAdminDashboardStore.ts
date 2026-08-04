import { create } from 'zustand';
import { path } from '@/utils/consts';

const initialState = {
  breadcrumbItems: [
    { label: 'Dashboard', path: path.lepkom.dashboard },
  ],
  adminStats: null,
};

export const useAdminDashboardStore = create<any>((set) => ({
  ...initialState,
  setState: (option: string, value: any) => {
    set(() => ({
      [option]: value
    }));
  },
  resetStore: () => set(() => ({ ...initialState })),
}));
