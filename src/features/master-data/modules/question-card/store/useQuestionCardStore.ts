import { create } from 'zustand';
import type { QuestionCard } from '../api/questionCard.api';

interface QCState {
  selectedQC: QuestionCard | null;
  setSelectedQC: (qc: QuestionCard | null) => void;
}

export const useQuestionCardStore = create<QCState>((set) => ({
  selectedQC: null,
  setSelectedQC: (qc) => set({ selectedQC: qc }),
}));
