import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetDetailCalas } from './api/detailCalas.api';
import DetailCalasProfileCard from './components/DetailCalasProfileCard';
import DetailCalasRoomPlacement from './components/DetailCalasRoomPlacement';
import DetailCalasAssessmentReport from './components/DetailCalasAssessmentReport';
import { FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';

const DetailCalas: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { data: calas, isLoading, isError } = useGetDetailCalas(id || '');

  // Setup Breadcrumbs
  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Master Data', path: path.lepkom.masterData.default },
      { label: 'Master Data Calas', path: path.lepkom.masterData.calas.default },
      { label: 'Detail Calas', path: `${path.lepkom.masterData.calas.detailCalas}/${id}` },
    ]);
    return () => {
      setBreadcrumbItems([]);
    };
  }, [setBreadcrumbItems, id]);

  if (isLoading) {
    return (
      <ContentLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      </ContentLayout>
    );
  }

  if (isError || !calas) {
    return (
      <ContentLayout>
        <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20 flex flex-col items-center justify-center min-h-[50vh]">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Data tidak ditemukan</h2>
          <p className="text-gray-500 mb-6">Calas yang Anda cari mungkin telah dihapus atau ID tidak valid.</p>
          <Button variant="outline" onClick={() => navigate(-1)} className="flex items-center gap-2">
            <FiArrowLeft className="w-4 h-4" /> Kembali
          </Button>
        </div>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout>
      <div className="max-w-6xl mx-auto p-4 space-y-6 pb-20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate(-1)} variant="outline" size="sm" className="rounded-full w-10 h-10 p-0 flex justify-center items-center">
              <FiArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Detail Calas</h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Bagian Atas: Profil Utama */}
          <DetailCalasProfileCard calas={calas} />
          
          {/* Bagian Tengah: Room Placement */}
          <DetailCalasRoomPlacement placements={calas.penempatanRuangan} />

          {/* Bagian Bawah: Laporan Penilaian Praktek & Project */}
          <DetailCalasAssessmentReport penilaian={calas.ringkasanPenilaian} />
        </div>
      </div>
    </ContentLayout>
  );
};

export default DetailCalas;
