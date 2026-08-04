import { Card } from '@/components/ui/Card';
import { useCalasDashboardStore } from '../../../shared/store';
import { FiCalendar, FiMapPin, FiCheck, FiX, FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { path } from '@/utils/consts';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

const STATUS_MAPPING: Record<string, { label: string, color: string, step: number }> = {
  'registrasi': { label: 'Tahap Registrasi', color: 'bg-blue-500', step: 1 },
  'screening': { label: 'Tahap Screening', color: 'bg-indigo-500', step: 2 },
  'biodata_dokumen': { label: 'Biodata & Dokumen', color: 'bg-teal-500', step: 3 },
  'ujian_praktek': { label: 'Ujian Praktek', color: 'bg-purple-500', step: 4 },
  'ujian_project': { label: 'Ujian Project', color: 'bg-orange-500', step: 5 },
  'keputusan_akhir': { label: 'Keputusan Akhir', color: 'bg-pink-500', step: 6 },
  'selesai': { label: 'Selesai', color: 'bg-lepkom-green', step: 7 },
};

export const CalasStatusWidget = ({ isLoading }: { isLoading: boolean }) => {
  const data = useCalasDashboardStore(state => state.calasStats);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="animate-pulse h-40" />
        <Card className="animate-pulse h-64" />
      </div>
    );
  }

  const tahapSaatIni = data?.statusRekrutmen?.tahapSaatIni || 'registrasi';
  const hasil = data?.statusRekrutmen?.hasil || 'proses';
  const statusInfo = STATUS_MAPPING[tahapSaatIni] || STATUS_MAPPING['registrasi'];
  const upcomingExams = data?.upcomingExams || [];

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full ${hasil === 'tidak_lolos' ? 'bg-red-500' : statusInfo.color}`} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500 font-medium">Status Rekrutmen Anda Saat Ini</p>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              {hasil === 'tidak_lolos' ? 'Tidak Lolos' : statusInfo.label}
            </h2>
          </div>
          {statusInfo.step > 0 && statusInfo.step < 7 && (
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-700">
              Tahap {statusInfo.step} dari 7
            </div>
          )}
        </div>
        
        {/* Timeline Progress */}
        <div className="mt-12 mb-4 relative px-2 sm:px-6 pb-12">
          <div className="absolute top-4 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full z-0" />
          <div 
            className={`absolute top-4 left-0 h-1 transition-all duration-1000 ${hasil === 'tidak_lolos' ? 'bg-red-500' : 'bg-lepkom-green'} -translate-y-1/2 rounded-full z-0`} 
            style={{ width: `${((statusInfo.step - 1) / 6) * 100}%` }}
          />
          <div className="relative flex justify-between w-full z-10">
            {Object.values(STATUS_MAPPING).sort((a, b) => a.step - b.step).map((info) => {
              const isCompleted = info.step <= statusInfo.step;
              const isCurrent = info.step === statusInfo.step;
              const isFailed = hasil === 'tidak_lolos';

              let dotColor = 'bg-white border-gray-200 text-gray-400';
              if (isFailed && isCompleted) {
                dotColor = isCurrent 
                  ? 'bg-red-500 border-red-500 text-white shadow-md scale-110 ring-4 ring-red-50' 
                  : 'bg-red-400 border-red-400 text-white';
              } else if (isCurrent) {
                dotColor = 'bg-lepkom-green border-lepkom-green text-white shadow-md scale-110 ring-4 ring-green-50';
              } else if (isCompleted) {
                dotColor = 'bg-lepkom-green border-lepkom-green text-white';
              }

              return (
                <div key={info.step} className="flex flex-col items-center relative group">
                  <div 
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${dotColor}`}
                  >
                     {isFailed && isCurrent ? <FiX className="w-4 h-4" /> : 
                      isCompleted ? <FiCheck className="w-4 h-4" /> : 
                      <span className="text-[10px] font-bold">{info.step}</span>}
                  </div>
                  <div className={`absolute top-10 text-center w-20 sm:w-24 -ml-10 sm:-ml-12 left-1/2 transition-colors duration-300 ${isCurrent ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-700 font-semibold' : 'text-gray-400 font-medium'} text-[10px] sm:text-xs leading-tight`}>
                    {info.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button for Selesai */}
        {tahapSaatIni === 'selesai' && ['lolos', 'tidak_lolos'].includes(hasil) && (
          <div className="flex justify-center border-t border-gray-100 pt-6 mt-2 pb-2 px-6 relative z-10">
            <Button 
              onClick={() => navigate(path.lepkom.biodata.hasil.default)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              Lihat Hasil Penilaian <FiArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card header="Jadwal Mendatang">
          {upcomingExams.length === 0 ? (
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <FiCalendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">Belum ada jadwal ujian/kegiatan dalam waktu dekat.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingExams.map((exam: any, idx: number) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-white hover:border-lepkom-green hover:shadow-md transition-all">
                  <div className="flex flex-col items-center justify-center w-16 h-16 bg-green-50 rounded-lg text-lepkom-green shrink-0">
                    <span className="text-xs font-bold uppercase">{dayjs(exam.waktu).format('MMM')}</span>
                    <span className="text-2xl font-bold leading-none">{dayjs(exam.waktu).format('DD')}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-lg capitalize">Ujian {exam.jenisUjian}</h4>
                    <div className="flex flex-col gap-1 mt-1">

                      <span className="flex items-center gap-2 text-sm text-gray-600">
                        <FiMapPin className="w-4 h-4" />
                        Ruangan {exam.ruangan}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card header="Tugas & Pengingat" bodyClassName="bg-gray-50">
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-lepkom-green shrink-0" />
              Pastikan Anda membawa kartu identitas (KTM) saat ujian berlangsung.
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0" />
              Datanglah 15 menit sebelum waktu ujian dimulai.
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-700">
              <span className="w-2 h-2 mt-1.5 rounded-full bg-purple-500 shrink-0" />
              Pakaian hitam putih formal dengan almamater wajib dikenakan saat wawancara.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};
