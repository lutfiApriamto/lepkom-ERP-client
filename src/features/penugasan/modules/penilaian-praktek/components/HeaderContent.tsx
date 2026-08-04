import { usePenilaianPraktekStore } from '../store/usePenilaianPraktekStore';
import { Input } from '@/components/ui/Input';

const HeaderContent = () => {
  const { selectedDate, setSelectedDate } = usePenilaianPraktekStore();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-t-2xl border-b">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Penilaian Ujian Praktek</h1>
        <p className="text-sm text-gray-500 mt-1">Daftar calon asisten yang ditugaskan kepada Anda untuk dinilai.</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter Tanggal:</span>
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-40 bg-white"
        />
      </div>
    </div>
  );
};

export default HeaderContent;
