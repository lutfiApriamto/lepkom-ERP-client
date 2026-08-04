import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';

export interface JawabanUpload {
  _id: string;
  namaCalas: string;
  npm: string;
  jenisUjian: 'praktek' | 'project';
  ruangan: number | null;
  uploadedAt: string;
  fileUrl: string;
}

export interface JawabanUploadListResponse {
  errorStatus: boolean;
  message: string;
  data: JawabanUpload[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const UPLOAD_KEYS = {
  all: ['jawaban-upload'] as const,
  lists: () => [...UPLOAD_KEYS.all, 'list'] as const,
  list: (filters: string) => [...UPLOAD_KEYS.lists(), { filters }] as const,
};

export const useGetListJawaban = (queryString: string = '') => {
  return useQuery({
    queryKey: UPLOAD_KEYS.list(queryString),
    queryFn: async () => {
      const res = await api.get<JawabanUploadListResponse>(`/api/ujian/jawaban-asisten/list${queryString}`);
      return res.data;
    }
  });
};

export const downloadJawabanFile = async (calasId: string, jenisUjian: string, fileName: string) => {
  const res = await api.get<{ data: { signedUrl: string } }>(`/api/ujian/jawaban-asisten/download`, {
    params: { calasId, jenisUjian }
  });
  const downloadUrl = res.data.data.signedUrl;
  
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
};
