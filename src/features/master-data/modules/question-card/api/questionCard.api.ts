import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';

export interface QuestionCard {
  _id: string;
  judulPertanyaan: string;
  deskripsi?: string | null;
  kategori: 'materi' | 'teknis' | 'kepribadian' | 'motivasi';
  tingkat: 1 | 2 | 3;
  namaMateri?: string | null;
  dibuatOleh?: {
    _id: string;
    nama: string;
    idAsisten: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionCardListResponse {
  errorStatus: boolean;
  message: string;
  data: QuestionCard[];
  totalData?: number;
  totalPage?: number;
}

export const QC_KEYS = {
  all: ['questionCard'] as const,
  lists: () => [...QC_KEYS.all, 'list'] as const,
  list: (filters: string) => [...QC_KEYS.lists(), { filters }] as const,
  details: () => [...QC_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...QC_KEYS.details(), id] as const,
};

export const useGetAllQuestionCards = (queryString: string = '') => {
  return useQuery({
    queryKey: QC_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<QuestionCardListResponse>(`/api/question-card${queryString}`);
      return res.data;
    }
  });
};

export interface QuestionCardPayload {
  judulPertanyaan: string;
  deskripsi?: string;
  kategori: string;
  tingkat: number;
  namaMateri?: string | null;
}

export const useCreateQuestionCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: QuestionCardPayload) => {
      const res = await api.post('/api/question-card', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QC_KEYS.lists() });
    },
  });
};

export const useUpdateQuestionCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<QuestionCardPayload> }) => {
      const res = await api.patch(`/api/question-card/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QC_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: QC_KEYS.detail(variables.id) });
    },
  });
};

export const useDeleteQuestionCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`/api/question-card/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QC_KEYS.lists() });
    },
  });
};
