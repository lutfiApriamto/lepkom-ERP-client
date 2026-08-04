import { Card } from '@/components/ui/Card';
import { useAdminDashboardStore } from '../../../shared/store';
import { FiUsers, FiBarChart2, FiAward } from 'react-icons/fi';

export const AdminGlobalStatsWidget = ({ isLoading }: { isLoading: boolean }) => {
  const data = useAdminDashboardStore(state => state.adminStats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="animate-pulse h-32" />
        <Card className="animate-pulse h-32" />
        <Card className="animate-pulse h-32" />
      </div>
    );
  }

  const funnel = data?.funnel || {};
  const totalCalas = Object.values(funnel).reduce((a, b) => Number(a) + Number(b), 0);
  
  const praktek = Number(data?.globalScore?.praktek || 0).toFixed(2);
  const project = Number(data?.globalScore?.project || 0).toFixed(2);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="relative overflow-hidden group">
        <div className="absolute right-0 top-0 h-full w-2 bg-lepkom-green" />
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 text-lepkom-green rounded-lg">
            <FiUsers className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Pendaftar</p>
            <h3 className="text-3xl font-bold text-gray-900">{String(totalCalas)}</h3>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute right-0 top-0 h-full w-2 bg-blue-500" />
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
            <FiBarChart2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Nilai Rata-Rata Praktek</p>
            <h3 className="text-3xl font-bold text-gray-900">{praktek}</h3>
          </div>
        </div>
      </Card>

      <Card className="relative overflow-hidden group">
        <div className="absolute right-0 top-0 h-full w-2 bg-purple-500" />
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-500 rounded-lg">
            <FiAward className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Nilai Rata-Rata Project</p>
            <h3 className="text-3xl font-bold text-gray-900">{project}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
};
