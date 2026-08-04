import React from 'react';
import PaginationPage from '@/components/pagination/PaginationPage';
import { Card } from '@/components/ui/Card';
import { useDetailAsistenStore } from '../store/useDetailAsistenStore';
import { useGetHistoryPenilaian } from '../api/detailAsisten.api';
import { Badge } from '@/components/ui/Badge';

interface Props {
  asistenId: string;
}

const formatKriteriaName = (key: string) => {
  // Convert camelCase to Title Case (e.g., 'penguasaanMateri' -> 'Penguasaan Materi')
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const DetailAsistenPenilaianList: React.FC<Props> = ({ asistenId }) => {
  const { penilaianPage, penilaianLimit, setPenilaianPage, setPenilaianLimit } = useDetailAsistenStore();

  const queryString = `?page=${penilaianPage}&limit=${penilaianLimit}`;
  const { data, isLoading } = useGetHistoryPenilaian(asistenId, queryString);

  const totalData = data?.meta?.totalData ?? 0;
  const listData = data?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {listData.length === 0 ? (
        <Card className="p-8 text-center bg-gray-50 border-dashed border-2">
          <p className="text-gray-500 font-medium">Belum ada riwayat penilaian dari asisten ini.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {listData.map((item) => (
            <Card key={item._id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200" bodyClassName="p-0">
              {/* Header Section */}
              <div className="bg-gray-50/80 p-5 border-b border-gray-100 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{item.calasRef?.namaCalas}</h3>
                  <p className="text-sm text-gray-500 font-mono mt-0.5">{item.calasRef?.npm}</p>
                </div>
                {item.status !== 'Menunggu' && (
                  <Badge variant={item.status === 'Lulus' ? 'success' : 'destructive'} className="px-3 py-1 text-xs">
                    {item.status}
                  </Badge>
                )}
              </div>

              <div className="p-5">
                {/* Meta Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`font-medium ${item.jenisUjian === 'praktek' ? 'border-blue-200 text-blue-700 bg-blue-50' : 'border-purple-200 text-purple-700 bg-purple-50'}`}>
                      Ujian {item.jenisUjian === 'praktek' ? 'Praktek' : 'Project'}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      • {new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.createdAt))}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-0.5">Skor Akhir</p>
                    <p className="text-2xl font-black text-gray-900 leading-none">
                      {item.nilaiAkhir ? Number(item.nilaiAkhir).toFixed(1) : '-'}
                    </p>
                  </div>
                </div>

                {/* Kriteria Grid */}
                {item.kriteria && Object.keys(item.kriteria).length > 0 && (
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Detail Nilai Kriteria</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {Object.entries(item.kriteria).map(([key, value]) => (
                        <div key={key} className="bg-white border border-gray-100 rounded-lg p-2.5 shadow-sm flex flex-col items-center text-center">
                          <span className="text-[10px] text-gray-500 leading-tight mb-1 line-clamp-1" title={formatKriteriaName(key)}>
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
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Catatan Penilai</p>
                    <div className="bg-blue-50/50 text-blue-900 p-4 rounded-xl text-sm leading-relaxed border border-blue-100">
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
            currentPage={penilaianPage}
            pageSize={penilaianLimit}
            totalData={totalData}
            setPageSize={(key, value) => {
              if (key === 'currentPage') setPenilaianPage(value);
              if (key === 'pageSize') setPenilaianLimit(value);
            }}
          />
      )}
    </div>
  );
};

export default DetailAsistenPenilaianList;
