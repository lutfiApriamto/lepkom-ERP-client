import { useEffect } from 'react';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';
import FormBerkas from './components/FormBerkas';

const BerkasModule = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Biodata', path: path.lepkom.biodata.default },
      { label: 'Berkas Pendukung', path: path.lepkom.biodata.berkas.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Berkas Pendukung</h1>
          <p className="text-sm text-gray-500 mt-1">Unggah berkas-berkas yang diperlukan untuk proses rekrutmen LEPKOM.</p>
        </div>
        <FormBerkas />
      </div>
    </ContentLayout>
  );
};

export default BerkasModule;
