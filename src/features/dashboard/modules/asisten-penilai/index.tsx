import { useEffect } from 'react';
import { EvaluationWidget } from './components/EvaluationWidget';
import { useGetPenilaiStats } from '../../shared/api';
import { usePenilaiDashboardStore } from '../../shared/store';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';

const PenilaiDashboard = () => {
  const { data, isLoading } = useGetPenilaiStats();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  
  const setState = usePenilaiDashboardStore(state => state.setState);
  const breadcrumbItems = usePenilaiDashboardStore(state => state.breadcrumbItems);

  useEffect(() => {
    // Only set on mount
    setBreadcrumbItems(breadcrumbItems);
    return () => setBreadcrumbItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      setState('penilaiStats', data);
    }
  }, [data, setState]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Penilai</h1>
        <p className="text-gray-500 mt-1">Pantau target penilaian Anda dan calon asisten yang masih mengantre.</p>
      </div>
      
      <EvaluationWidget isLoading={isLoading} />
    </div>
  );
};

export default PenilaiDashboard;
