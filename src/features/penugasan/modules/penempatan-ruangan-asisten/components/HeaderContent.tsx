import { FiPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { usePenempatanAsistenActions } from '../hooks/usePenempatanAsistenActions';

const HeaderContent = () => {
  const { handleCreate } = usePenempatanAsistenActions();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-t-2xl border-b">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Data Penempatan Asisten</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola data penempatan ruangan untuk Asisten Penilai dan PJ Ruangan.</p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          <span>Buat Penugasan Baru</span>
        </Button>
      </div>
    </div>
  );
};

export default HeaderContent;
