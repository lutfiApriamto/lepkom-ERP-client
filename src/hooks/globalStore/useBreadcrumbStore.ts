import { create } from 'zustand';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  isClickAble?: boolean;
}

export interface BreadcrumbStoreState {
  breadcrumbItems: BreadcrumbItem[];
  isClickAble: boolean;
  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
  setIsClickAble: (value: boolean) => void;
  clearBreadcrumb: () => void;
}

export const useBreadcrumbStore = create<BreadcrumbStoreState>((set) => ({
  breadcrumbItems: [],
  isClickAble: true,
  setBreadcrumbItems: (items) => set({ breadcrumbItems: items }),
  setIsClickAble: (value) => set({ isClickAble: value }),
  clearBreadcrumb: () => set({ breadcrumbItems: [] }),
}));
