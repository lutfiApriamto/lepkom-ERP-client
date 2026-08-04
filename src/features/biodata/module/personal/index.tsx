import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';
import { useEffect } from 'react';
import BiodataAccessGuard from '@/features/biodata/shared/components/BiodataAccessGuard';
import FormDataPribadi from './components/FormDataPribadi';

const PersonalPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Biodata', path: path.lepkom.biodata.default },
      { label: 'Data Pribadi', path: path.lepkom.biodata.personal.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Pribadi</h1>
          <p className="text-gray-500 mt-1">Lengkapi informasi data pribadi Anda di bawah ini.</p>
        </div>
        
        <BiodataAccessGuard>
          <FormDataPribadi />
        </BiodataAccessGuard>
      </div>
    </ContentLayout>
  );
};

export default PersonalPage;
