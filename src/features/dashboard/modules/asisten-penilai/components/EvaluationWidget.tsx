import { Card } from '@/components/ui/Card';
import { usePenilaiDashboardStore } from '../../../shared/store';
import { FiCheckCircle, FiEdit3 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { PenilaiQuickActionsWidget } from './PenilaiQuickActionsWidget';

export const EvaluationWidget = ({ isLoading }: { isLoading: boolean }) => {
  const data = usePenilaiDashboardStore(state => state.penilaiStats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="animate-pulse h-64" />
        <Card className="animate-pulse h-64" />
      </div>
    );
  }

  const waitingList = data?.waitingList || [];
  const total = data?.totalToEvaluate || 0;
  const evaluated = data?.evaluated || 0;
  const percentage = total > 0 ? Math.round((evaluated / total) * 100) : 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-6">
        <Card header="Progress Penilaian Anda">
          <div className="flex flex-col items-center py-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-lepkom-green transition-all duration-1000 ease-out"
                  strokeDasharray={`${percentage}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
              </div>
            </div>
            
            <div className="mt-8 w-full grid grid-cols-2 gap-4 text-center">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 font-medium">Telah Dinilai</p>
                <p className="text-lg font-bold text-lepkom-green mt-1">{evaluated}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500 font-medium">Total Target</p>
                <p className="text-lg font-bold text-gray-700 mt-1">{total}</p>
              </div>
            </div>
          </div>
        </Card>

        <PenilaiQuickActionsWidget />
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card header="Antrean Penilaian">
          {waitingList.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-gray-500">
              <FiCheckCircle className="w-12 h-12 text-green-300 mb-3" />
              <p>Kerja bagus! Tidak ada daftar antrean penilaian.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {waitingList.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                      {item.namaCalas.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.namaCalas}</h4>
                      <p className="text-sm text-gray-500">{item.calasId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        Ruang {item.ruangan}
                      </span>
                      <p className="text-xs text-gray-400 mt-1 uppercase">{item.jenisUjian}</p>
                    </div>
                    <Link
                      to={item.jenisUjian.toLowerCase() === 'praktek' 
                        ? `/lepkom/penugasan/penilaian-praktek/form/${item.examSessionId}/${item.calasRef}` 
                        : `/lepkom/penugasan/penilaian-project/form/${item.examSessionId}/${item.calasRef}`}
                      className="p-2 text-lepkom-green bg-green-50 hover:bg-lepkom-green hover:text-white rounded-lg transition-colors"
                      title="Mulai Menilai"
                    >
                      <FiEdit3 className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
