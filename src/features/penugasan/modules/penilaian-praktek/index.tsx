import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { useEffect } from 'react';
import { path } from '@/utils/consts';
import HeaderContent from './components/HeaderContent';
import PenilaianPraktekTable from './components/PenilaianPraktekTable';

const PenilaianPraktekPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penugasan', path: path.lepkom.penugasan?.default || '/lepkom/penugasan' },
      { label: 'Penilaian Praktek', path: path.lepkom.penugasan.praktek.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <HeaderContent />
        <PenilaianPraktekTable />
      </div>
    </ContentLayout>
  );
};

export default PenilaianPraktekPage;
