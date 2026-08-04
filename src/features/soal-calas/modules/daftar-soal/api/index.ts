import axiosInstance from "@/utils/interceptors";

export interface SoalCalas {
  _id: string;
  judulSoal: string;
  tingkat: 1 | 2 | 3;
  materiRef: {
    _id: string;
    namaMateri: string;
    tingkat: 1 | 2 | 3;
  };
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  totalData: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface GetSoalCalasResponse {
  success: boolean;
  data: SoalCalas[];
  message: string;
  meta?: PaginationMeta;
}

interface GetSoalCalasParams {
  page: number;
  limit: number;
  search?: string;
  tingkat?: number | '';
}

export const getSoalCalas = async (params: GetSoalCalasParams): Promise<GetSoalCalasResponse> => {
  const { data } = await axiosInstance.get('/api/soal-calas', { params });
  return data;
};

export const downloadSoalCalas = async (id: string): Promise<{ url: string }> => {
  const { data } = await axiosInstance.get(`/api/soal-calas/${id}/download`);
  return data.data;
};
