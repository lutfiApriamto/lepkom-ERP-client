import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { useEffect } from 'react';
import { path } from '@/utils/consts';
import HeaderContent from './components/HeaderContent';
import PenilaianProjectTable from './components/PenilaianProjectTable';

const PenilaianProjectPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penugasan', path: path.lepkom.penugasan?.default || '/lepkom/penugasan' },
      { label: 'Penilaian Project', path: '/lepkom/penugasan/penilaian-project' },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="space-y-6">
        <HeaderContent />
        <PenilaianProjectTable />
      </div>
    </ContentLayout>
  );
};

export default PenilaianProjectPage;
