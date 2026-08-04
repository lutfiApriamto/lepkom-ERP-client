import React from 'react';
import { useGetSoalCalas } from '../hooks/useDaftarSoalQuery';
import DaftarSoalCard from './DaftarSoalCard';
import { FileQuestion, AlertCircle } from 'lucide-react';
import PaginationPage from '@/components/pagination/PaginationPage';
import { useDaftarSoalStore } from '../store/useDaftarSoalStore';
import { Skeleton } from '@/components/ui/Skeleton';
import type { SoalCalas } from '../api';

const DaftarSoalGrid: React.FC = () => {
  const { data: response, isLoading, isError, error } = useGetSoalCalas();
  const { page, limit, setPage, setLimit } = useDaftarSoalStore();

  const handlePaginationChange = (key: string, value: number) => {
    if (key === 'currentPage') {
      setPage(value);
    } else if (key === 'pageSize') {
      setLimit(value);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="h-64 rounded-xl border border-gray-100 bg-white p-5 flex flex-col gap-4 shadow-sm">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-6 w-1/4 rounded-full" />
            </div>
            <Skeleton className="h-14 w-full rounded-md mt-2" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
            <div className="mt-auto pt-4 border-t border-gray-100">
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-red-50/50 rounded-xl border border-red-100">
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
        <h3 className="text-lg font-semibold text-red-800">Gagal Memuat Data</h3>
        <p className="text-red-600 text-center max-w-md mt-1">
          Terjadi kesalahan saat memuat daftar soal: {(error as Error)?.message}
        </p>
      </div>
    );
  }

  const soals = response?.data || [];
  const meta = response?.meta;

  if (soals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-50/50 rounded-xl border border-gray-100 border-dashed">
        <div className="bg-white p-4 rounded-full shadow-sm mb-4">
          <FileQuestion className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Belum Ada Soal</h3>
        <p className="text-gray-500 text-center max-w-md mt-1">
          Tidak ditemukan soal yang sesuai dengan filter atau pencarian Anda. Coba ubah kata kunci atau bersihkan filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {soals.map((soal: SoalCalas) => (
          <DaftarSoalCard key={soal._id} soal={soal} />
        ))}
      </div>

      {meta && meta.totalPages > 1 && (
        <div className="flex justify-center mt-8 pt-6 border-t border-gray-100">
          <PaginationPage
            currentPage={page}
            pageSize={limit}
            totalData={meta.totalData}
            setPageSize={handlePaginationChange}
          />
        </div>
      )}
    </div>
  );
};

export default DaftarSoalGrid;
