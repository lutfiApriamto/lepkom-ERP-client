import { useEffect } from 'react';
import { ContentLayout } from '@/components/layout/ContentLayout/index';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import HeaderContent from './components/HeaderContent';
import RequestResetTable from './components/RequestResetTable';
import { path } from '@/utils/consts';

const MasterDataRequestResetPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Master Data', path: path.lepkom.masterData.default },
      { label: 'Reset Password Asisten', path: '/master-data/reset-requests' },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="flex flex-col gap-6">
        <HeaderContent />
        <RequestResetTable />
      </div>
    </ContentLayout>
  );
};

export default MasterDataRequestResetPage;
