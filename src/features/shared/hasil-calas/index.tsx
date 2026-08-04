import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHasilCalasMe } from './api/hasilCalas.api';
import HasilCalasProfileCard from './components/HasilCalasProfileCard';
import HasilCalasRoomPlacement from './components/HasilCalasRoomPlacement';
import HasilCalasAssessmentReport from './components/HasilCalasAssessmentReport';
import { FiArrowLeft } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { path } from '@/utils/consts';

const HasilCalasPage: React.FC = () => {
  const navigate = useNavigate();
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { data: calas, isLoading, isError } = useGetHasilCalasMe();

  // Setup Breadcrumbs
  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Hasil Penilaian', path: path.lepkom.biodata.hasil.default },
    ]);
    return () => {
      setBreadcrumbItems([]);
    };
  }, [setBreadcrumbItems]);

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
          <p className="text-gray-500 mb-6">Data hasil penilaian tidak ditemukan atau Anda belum berhak mengakses halaman ini.</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Hasil Penilaian</h1>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Bagian Atas: Profil Utama */}
          <HasilCalasProfileCard calas={calas} />
          
          {/* Bagian Tengah: Room Placement */}
          <HasilCalasRoomPlacement placements={calas.penempatanRuangan} />

          {/* Bagian Bawah: Laporan Penilaian Praktek & Project */}
          {calas.ringkasanPenilaian ? (
             <HasilCalasAssessmentReport penilaian={calas.ringkasanPenilaian} />
          ) : (
            <div className="text-center py-12 bg-gray-50/50 rounded-xl border border-dashed border-gray-300">
              <p className="text-sm text-gray-500 font-medium">Data penilaian belum tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
};

export default HasilCalasPage;
