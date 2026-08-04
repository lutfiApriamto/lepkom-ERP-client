import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';
import { useEffect } from 'react';
import BiodataAccessGuard from '@/features/biodata/shared/components/BiodataAccessGuard';
import FormPendidikan from './components/FormPendidikan';

const PendidikanPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Biodata', path: path.lepkom.biodata.default },
      { label: 'Data Pendidikan', path: path.lepkom.biodata.pendidikan.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Pendidikan</h1>
          <p className="text-gray-500 mt-1">Lengkapi informasi pendidikan dan akademik Anda di bawah ini.</p>
        </div>
        
        <BiodataAccessGuard>
          <FormPendidikan />
        </BiodataAccessGuard>
      </div>
    </ContentLayout>
  );
};

export default PendidikanPage;
