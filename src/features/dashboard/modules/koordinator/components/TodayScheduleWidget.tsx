import { Card } from '@/components/ui/Card';
import { useKoordinatorDashboardStore } from '../../../shared/store';
import { KoordinatorQuickActionsWidget } from './KoordinatorQuickActionsWidget';
import { FiClock, FiUsers, FiMapPin } from 'react-icons/fi';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

export const TodayScheduleWidget = ({ isLoading }: { isLoading: boolean }) => {
  const data = useKoordinatorDashboardStore(state => state.koordinatorStats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="animate-pulse h-64" />
        <Card className="animate-pulse h-64" />
      </div>
    );
  }

  const schedules = data?.todaySchedule || [];
  const totalSoal = data?.totalSoal || 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card header="Jadwal Ujian Hari Ini">
          {schedules.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              Tidak ada jadwal ujian hari ini.
            </div>
          ) : (
            <div className="space-y-4">
              {schedules.map((sched: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50 hover:bg-green-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-md shadow-sm text-lepkom-green">
                      <FiMapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Ruangan {sched.ruangan}</h4>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          {dayjs(sched.waktu).format('HH:mm')}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium uppercase">
                          {sched.jenisUjian}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2 text-sm text-gray-600">
                      <FiUsers className="w-4 h-4" />
                      <span>{sched.kapasitasTerisi} Calas</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {sched.jumlahPenilai} Penilai Ditugaskan
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="space-y-6">
        <Card header="Statistik Cepat">
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800 font-medium">Ruangan Terpakai Hari Ini</p>
              <h3 className="text-3xl font-bold text-lepkom-green mt-1">{schedules.length}</h3>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-800 font-medium">Total Bank Soal</p>
              <h3 className="text-3xl font-bold text-purple-600 mt-1">{totalSoal}</h3>
            </div>
          </div>
        </Card>

        <KoordinatorQuickActionsWidget />
      </div>
    </div>
  );
};
