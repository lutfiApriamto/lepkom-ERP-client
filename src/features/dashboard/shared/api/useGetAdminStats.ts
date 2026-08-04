import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/interceptors';

export const useGetAdminStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'adminStats'],
    queryFn: async () => {
      const response = await axiosInstance.get('/api/dashboard/admin');
      return response.data.data;
    }
  });
};
