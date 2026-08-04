import { create } from 'zustand';
import dayjs from 'dayjs';
import type { CalasToScore } from '../api/penilaianProject.api';

interface PenilaianProjectState {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedCalas: CalasToScore | null;
  setSelectedCalas: (calas: CalasToScore | null) => void;
}

export const usePenilaianProjectStore = create<PenilaianProjectState>((set) => ({
  selectedDate: dayjs().format('YYYY-MM-DD'),
  setSelectedDate: (date) => set({ selectedDate: date }),
  selectedCalas: null,
  setSelectedCalas: (calas) => set({ selectedCalas: calas }),
}));
