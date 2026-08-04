import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/interceptors';

export const useGetKoordinatorStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'koordinatorStats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/dashboard/koordinator');
      return response.data.data;
    }
  });
};
