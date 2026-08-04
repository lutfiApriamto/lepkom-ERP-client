import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Download, BookOpen, Layers } from 'lucide-react';
import type { SoalCalas } from '../api';
import { useDownloadSoal } from '../hooks/useDaftarSoalQuery';

interface DaftarSoalCardProps {
  soal: SoalCalas;
}

const DaftarSoalCard: React.FC<DaftarSoalCardProps> = ({ soal }) => {
  const { mutate: downloadSoal, isPending } = useDownloadSoal();

  const getTingkatColor = (tingkat: number) => {
    switch (tingkat) {
      case 1:
        return 'bg-green-100 text-green-700 border-green-200';
      case 2:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 3:
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTingkatLabel = (tingkat: number) => {
    switch (tingkat) {
      case 1: return 'Mudah (Tingkat 1)';
      case 2: return 'Sedang (Tingkat 2)';
      case 3: return 'Sulit (Tingkat 3)';
      default: return `Tingkat ${tingkat}`;
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-lepkom-green/40 border-gray-100/80 group">
      <div className="p-5 flex-1 flex flex-col">
        {/* Header (Materi & Tingkat) */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
            <BookOpen className="w-4 h-4 text-lepkom-green" />
            <span className="font-medium line-clamp-1">{soal.materiRef.namaMateri}</span>
          </div>
          <Badge className={`whitespace-nowrap border ${getTingkatColor(soal.tingkat)} hover:${getTingkatColor(soal.tingkat)}`}>
            {getTingkatLabel(soal.tingkat)}
          </Badge>
        </div>

        {/* Title */}
        <div className="flex-1 mt-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-lepkom-green transition-colors line-clamp-3">
            {soal.judulSoal}
          </h3>
          <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
            <Layers className="w-3.5 h-3.5" />
            <span>ID: {soal._id.slice(-6).toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="p-4 bg-gray-50/80 border-t border-gray-100">
        <Button
          onClick={() => downloadSoal(soal._id)}
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-lepkom-green hover:bg-lepkom-green/90 text-white transition-all shadow-sm group-hover:shadow"
        >
          {isPending ? (
            <span className="animate-pulse">Memproses...</span>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Unduh File Soal
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default DaftarSoalCard;
