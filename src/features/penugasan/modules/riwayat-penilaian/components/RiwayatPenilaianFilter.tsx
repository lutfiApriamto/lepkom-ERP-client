import { FiSearch, FiRefreshCw } from 'react-icons/fi';
import { Button } from '@/components/ui/Button';
import { useRiwayatPenilaianStore } from '../store/useRiwayatPenilaianStore';

const RiwayatPenilaianFilter = () => {
  const { searchAsisten, tanggal, setSearchAsisten, setTanggal, resetFilters } = useRiwayatPenilaianStore();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto flex-1">
        
        {/* Search Asisten */}
        <div className="relative w-full sm:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50/50"
            placeholder="Cari nama atau NPM asisten..."
            value={searchAsisten}
            onChange={(e) => setSearchAsisten(e.target.value)}
          />
        </div>

        {/* Date Filter */}
        <div className="w-full sm:w-auto">
          <input
            type="date"
            className="block w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors bg-gray-50/50 text-gray-700"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>

      </div>

      <div className="w-full sm:w-auto flex justify-end">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 border-gray-200"
          onClick={resetFilters}
          disabled={!searchAsisten && !tanggal}
        >
          <FiRefreshCw className={`w-4 h-4 ${searchAsisten || tanggal ? 'text-green-600' : ''}`} />
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default RiwayatPenilaianFilter;
