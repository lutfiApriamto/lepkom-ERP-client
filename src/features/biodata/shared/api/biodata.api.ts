import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/interceptors';
import type { ApiResponse } from '@/types';

export interface CalasProfile {
  _id: string;
  idCalas: string;
  npm: string;
  namaCalas: string;
  jenisKelamin: string;
  noKtp: string;
  noHp: string;
  emailCalas: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamatLengkap: string;
  kemampuanPribadi: string;
  kemampuanIt: string;
  pengalamanOrganisasi: string;
  pengalamanKerja: string;
  kelas: string;
  asalSekolah: string;
  wilayah: string;
  jurusan: string;
  ipk: number;
  isKursusDelete: boolean;
  SemesterKursusDel: string;
  kursusSemester: {
    semester1: string | null;
    semester2: string | null;
    semester3: string | null;
    semester4: string | null;
    semester5: string | null;
    semester6: string | null;
    semester7: string | null;
  };
  namaIbu: string;
  namaAyah: string;
  noHpOrtu: string;
  statusRekrutmen: {
    tahapSaatIni: string;
    hasil: string;
  };
  cv?: string | null;
  krs?: string | null;
  rangkumanNilai?: string | null;
  jawabanPraktek?: string | null;
  jawabanProject?: string | null;
}

export const BIODATA_KEYS = {
  all: ['biodata'] as const,
  profile: () => [...BIODATA_KEYS.all, 'profile'] as const,
};

export const useGetMyBiodata = () => {
  return useQuery({
    queryKey: BIODATA_KEYS.profile(),
    queryFn: async () => {
      const res = await api.get<ApiResponse<CalasProfile>>('/api/calas/me');
      return res.data;
    },
  });
};

export const useUpdateBiodata = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<CalasProfile>) => {
      const res = await api.patch<ApiResponse<CalasProfile>>('/api/calas/me/biodata', data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BIODATA_KEYS.profile() });
    },
  });
};

export const useUploadTempDokumen = () => {
  return useMutation({
    mutationFn: async ({ jenisDokumen, file }: { jenisDokumen: 'cv' | 'krs' | 'rangkumanNilai', file: File }) => {
      const formData = new FormData();
      formData.append('file', file);
      const urlParam = jenisDokumen === 'rangkumanNilai' ? 'rangkuman-nilai' : jenisDokumen;
      const res = await api.post<ApiResponse<{ fileUrl: string }>>(`/api/calas/me/biodata/dokumen/${urlParam}/temp`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.data;
    },
  });
};

export const useDeleteTempDokumen = () => {
  return useMutation({
    mutationFn: async (fileUrl: string) => {
      const res = await api.delete<ApiResponse<null>>(`/api/calas/me/biodata/dokumen/temp`, {
        data: { fileUrl },
      });
      return res.data;
    },
  });
};

export const useDeletePermanentDokumen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (jenisDokumen: 'cv' | 'krs' | 'rangkumanNilai') => {
      const urlParam = jenisDokumen === 'rangkumanNilai' ? 'rangkuman-nilai' : jenisDokumen;
      const res = await api.delete<ApiResponse<CalasProfile>>(`/api/calas/me/biodata/dokumen/${urlParam}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BIODATA_KEYS.profile() });
    },
  });
};

export const downloadDokumen = async (jenisDokumen: 'cv' | 'krs' | 'rangkumanNilai', filename?: string) => {
  const urlParam = jenisDokumen === 'rangkumanNilai' ? 'rangkuman-nilai' : jenisDokumen;
  const res = await api.get<ApiResponse<{ signedUrl: string }>>(`/api/calas/me/biodata/dokumen/${urlParam}/download`);
  const downloadUrl = res.data.data?.signedUrl;
  if (!downloadUrl) throw new Error('Gagal mendapatkan URL dokumen dari server');
  
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  if (filename) link.download = filename;
  
  document.body.appendChild(link);
  link.click();
  link.remove();
};
