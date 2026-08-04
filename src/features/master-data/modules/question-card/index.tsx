import { useEffect } from 'react';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { Lock } from 'lucide-react';
import HeaderContent from './components/HeaderContent';
import QuestionCardTable from './components/QuestionCardTable';
import QuestionCardGrid from './components/QuestionCardGrid';
import { useGetAllRekrutmen } from '../rekrutmen/api/rekrutmen.api';
import { path } from '@/utils/consts';
import { useAuthStore } from '@/features/auth/shared/store';

const QuestionCardModule = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { data: rekrutmenData, isLoading } = useGetAllRekrutmen('?isActive=true');
  const { user } = useAuthStore();

  const isAllowedToManage = user?.role === 'super_admin' || user?.role === 'pj_soal_materi';
  const hasActiveRecruitment = Array.isArray(rekrutmenData?.data) && rekrutmenData.data.length > 0;

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Master Data', path: path.lepkom.masterData.default },
      { label: 'Master Data Question Card', path: path.lepkom.masterData.questionCard.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  if (isLoading) {
    return (
      <ContentLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
        </div>
      </ContentLayout>
    );
  }

  if (!hasActiveRecruitment) {
    return (
      <ContentLayout>
        <div className=" bg-white rounded-lg border border-gray-200">
          <div className="max-w-2xl mx-auto text-center mt-20 mb-20">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Akses Terkunci</h2>
            <p className="text-gray-500 mb-8">
              Fitur Question Card hanya dapat diakses ketika terdapat <strong>Gelombang Rekrutmen</strong> yang sedang aktif. 
              Silakan aktifkan gelombang rekrutmen terlebih dahulu di menu Data Rekrutmen.
            </p>
          </div>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      <div className="space-y-6">
        {isAllowedToManage && <HeaderContent />}
        {isAllowedToManage ? <QuestionCardTable /> : <QuestionCardGrid />}
      </div>
    </ContentLayout>
  );
};

export default QuestionCardModule;
