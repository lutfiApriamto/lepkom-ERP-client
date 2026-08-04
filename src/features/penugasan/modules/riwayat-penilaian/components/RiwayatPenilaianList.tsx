import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import PaginationPage from '@/components/pagination/PaginationPage';
import { useRiwayatPenilaianStore } from '../store/useRiwayatPenilaianStore';
import { useGetAllHistoryPenilaian } from '../api/riwayatPenilaian.api';

const formatKriteriaName = (key: string) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const RiwayatPenilaianList: React.FC = () => {
  const { page, limit, searchAsisten, tanggal, setPage, setLimit } = useRiwayatPenilaianStore();

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(page));
  queryParams.set('limit', String(limit));
  
  if (searchAsisten) queryParams.set('search', searchAsisten);
  if (tanggal) queryParams.set('tanggal', tanggal);

  const queryString = `?${queryParams.toString()}`;
  const { data, isLoading, isError, error } = useGetAllHistoryPenilaian(queryString);

  const totalData = data?.totalData ?? 0;
  const listData = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="p-8 text-center bg-red-50 border-red-200">
        <p className="text-red-500 font-medium">Terjadi kesalahan saat memuat data: {(error as any)?.message}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {listData.length === 0 ? (
        <Card className="p-8 text-center bg-gray-50 border-dashed border-2">
          <p className="text-gray-500 font-medium">Tidak ada data riwayat penilaian yang ditemukan.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {listData.map((item) => (
            <Card key={item._id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200" bodyClassName="p-0 flex flex-col h-full">
              {/* Header Section (Asisten Info) */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-5 border-b border-gray-100 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {item.penilaiRef?.nama?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">Penilai: {item.penilaiRef?.nama}</h3>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{item.penilaiRef?.npm}</p>
                  </div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                {/* Target Section (Calas Info & Meta) */}
                <div className="mb-6 bg-gray-50 rounded-lg p-4 border border-gray-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Calon Asisten</p>
                      <h4 className="text-base font-bold text-gray-900">{item.calasRef?.namaCalas}</h4>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{item.calasRef?.npm}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-0.5">Skor Akhir</p>
                      <p className="text-xl font-black text-gray-900 leading-none">
                        {item.skorKeseluruhan ? Number(item.skorKeseluruhan).toFixed(1) : '-'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-gray-200">
                    <Badge variant="outline" className={`font-medium ${item.jenisUjian === 'praktek' ? 'border-blue-200 text-blue-700 bg-blue-50' : 'border-purple-200 text-purple-700 bg-purple-50'}`}>
                      Ujian {item.jenisUjian === 'praktek' ? 'Praktek' : 'Project'}
                    </Badge>
                    <Badge variant="outline" className="border-gray-200 text-gray-700 bg-white">
                      Ruangan {item.roomPlacementRef?.ruangan || '-'}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      • {new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(item.examSessionRef?.tanggal))}
                    </span>
                  </div>
                </div>

                {/* Kriteria Grid */}
                {item.kriteria && Object.keys(item.kriteria).length > 0 && (
                  <div className="mb-6 flex-1">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Detail Nilai Kriteria</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {Object.entries(item.kriteria).map(([key, value]) => (
                        <div key={key} className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm flex flex-col items-center text-center">
                          <span className="text-[10px] text-gray-500 leading-tight mb-1 line-clamp-2 min-h-[24px]" title={formatKriteriaName(key)}>
                            {formatKriteriaName(key)}
                          </span>
                          <span className={`text-lg font-bold ${value >= 80 ? 'text-green-600' : value >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Deskripsi */}
                {item.deskripsi && (
                  <div className="mt-auto">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Catatan Penilai</p>
                    <div className="bg-blue-50/50 text-blue-900 p-4 rounded-xl text-sm leading-relaxed border border-blue-100 italic">
                      "{item.deskripsi}"
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {totalData > 0 && (
        <PaginationPage
            currentPage={page}
            pageSize={limit}
            totalData={totalData}
            setPageSize={(key, value) => {
              if (key === 'currentPage') setPage(value);
              if (key === 'pageSize') setLimit(value);
            }}
          />
      )}
    </div>
  );
};

export default RiwayatPenilaianList;
