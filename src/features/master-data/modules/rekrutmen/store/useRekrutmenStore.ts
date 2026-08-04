import { create } from 'zustand';
import type { Recruitment } from '../api/rekrutmen.api';

interface RekrutmenStore {
  // Modal states
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;

  // Selected Data for Edit
  selectedRekrutmen: Recruitment | null;

  // Actions
  setSelectedRekrutmen: (rekrutmen: Recruitment | null) => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (rekrutmen: Recruitment) => void;
  closeEditModal: () => void;
}

export const useRekrutmenStore = create<RekrutmenStore>((set) => ({
  isCreateModalOpen: false,
  isEditModalOpen: false,
  selectedRekrutmen: null,

  setSelectedRekrutmen: (rekrutmen) => set({ selectedRekrutmen: rekrutmen }),
  
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),

  openEditModal: (rekrutmen) => set({ isEditModalOpen: true, selectedRekrutmen: rekrutmen }),
  closeEditModal: () => set({ isEditModalOpen: false, selectedRekrutmen: null }),
}));
