import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDetailAsisten } from './api/detailAsisten.api';
import DetailAsistenProfileCard from './components/DetailAsistenProfileCard';
import DetailAsistenHistoryTabs from './components/DetailAsistenHistoryTabs';
import DetailAsistenPenilaianList from './components/DetailAsistenPenilaianList';
import { useDetailAsistenStore } from './store/useDetailAsistenStore';
import { Button } from '@/components/ui/Button';
import { path } from '@/utils/consts';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';

const DetailAsistenPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activeTab, setActiveTab } = useDetailAsistenStore();
  const { setBreadcrumbItems } = useBreadcrumbStore();

  const { data: res, isLoading, error } = useGetDetailAsisten(id || '');

  // Setup Breadcrumbs
  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Master Data', path: path.lepkom.masterData.default },
      { label: 'Master Data Asisten', path: path.lepkom.masterData.asisten.default },
      { label: 'Detail Asisten', path: `${path.lepkom.masterData.asisten.detailAsisten}/${id}` },
    ]);
    return () => {
      setBreadcrumbItems([]);
      setActiveTab('content'); // clean up tab state
    };
  }, [setBreadcrumbItems, id, setActiveTab]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !res?.data) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-bold text-gray-800">Asisten tidak ditemukan</h2>
        <Button onClick={() => navigate(-1)} className="mt-4" variant="outline">
          Kembali
        </Button>
      </div>
    );
  }

  const asisten = res.data;

  return (
    <ContentLayout>
      <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20">
        <div className="flex items-center gap-4 mb-2">
          <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex justify-center items-center">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Detail Asisten</h1>
        </div>

        <DetailAsistenProfileCard asisten={asisten} />

        {/* Tabs Controller */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 inline-flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'content' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Riwayat Aktivitas
          </button>
          <button
            onClick={() => setActiveTab('penilaian')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'penilaian' ? 'bg-blue-600 text-white shadow' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Riwayat Penilaian Calas
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'content' && <DetailAsistenHistoryTabs history={asisten.history || {}} />}
          {activeTab === 'penilaian' && <DetailAsistenPenilaianList asistenId={asisten._id} />}
        </div>
      </div>
    </ContentLayout>
  );
};

export default DetailAsistenPage;
