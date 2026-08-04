import React, { useEffect, useState } from 'react';
import { useDaftarSoalStore } from '../store/useDaftarSoalStore';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Search, SlidersHorizontal } from 'lucide-react';

const tingkatOptions = [
  { value: '', label: 'Semua Tingkat' },
  { value: '1', label: 'Tingkat 1 (Mudah)' },
  { value: '2', label: 'Tingkat 2 (Sedang)' },
  { value: '3', label: 'Tingkat 3 (Sulit)' },
];

const DaftarSoalFilter: React.FC = () => {
  const { search, tingkat, setSearch, setTingkat } = useDaftarSoalStore();
  const [localSearch, setLocalSearch] = useState(search);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(localSearch);
    }, 500);
    return () => clearTimeout(timer);
  }, [localSearch, setSearch]);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1 w-full relative">
        <label className="text-sm font-medium text-gray-700 mb-1.5 block flex items-center gap-2">
          <Search className="w-4 h-4 text-lepkom-green" />
          Cari Judul Soal
        </label>
        <Input
          type="text"
          placeholder="Ketik judul soal yang ingin dicari..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="w-full md:w-64">
        <label className="text-sm font-medium text-gray-700 mb-1.5 block flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-lepkom-green" />
          Filter Tingkat
        </label>
        <Select
          options={tingkatOptions}
          value={tingkat.toString()}
          onChange={(e) => {
            const val = e.target.value;
            setTingkat(val === '' ? '' : Number(val));
          }}
          placeholder="Filter berdasarkan tingkat"
        />
      </div>
    </div>
  );
};

export default DaftarSoalFilter;
