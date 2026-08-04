import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/interceptors';

export const useGetPenilaiStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'penilaiStats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/dashboard/penilai');
      return response.data.data;
    }
  });
};
