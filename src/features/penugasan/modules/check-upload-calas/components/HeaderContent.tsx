import React from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface HeaderContentProps {
  columnFilters: { id: string; value: string }[];
  setColumnFilters: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ columnFilters, setColumnFilters }) => {
  const getFilterValue = (id: string) => columnFilters.find((f) => f.id === id)?.value || '';

  const handleFilterChange = (id: string, value: string) => {
    setColumnFilters((prev) => {
      const existing = prev.find((f) => f.id === id);
      if (existing) {
        if (!value) return prev.filter((f) => f.id !== id);
        return prev.map((f) => (f.id === id ? { ...f, value } : f));
      }
      if (!value) return prev;
      return [...prev, { id, value }];
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pantau Upload Jawaban</h1>
        <p className="text-sm text-gray-500 mt-1">
          Pantau dan unduh file jawaban ujian calas secara langsung dan realtime.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-end justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-48">
            <Input
              type="date"
              value={getFilterValue('tanggal')}
              onChange={(e) => handleFilterChange('tanggal', e.target.value)}
              className="bg-gray-50/50 border-gray-200 focus:bg-white transition-colors text-gray-600"
            />
          </div>
        </div>

        {columnFilters.length > 0 && (
          <Button 
            variant="ghost" 
            onClick={() => setColumnFilters([])}
            className="text-gray-500 hover:text-gray-900"
          >
            Reset Filter
          </Button>
        )}
      </div>
    </div>
  );
};

export default HeaderContent;
