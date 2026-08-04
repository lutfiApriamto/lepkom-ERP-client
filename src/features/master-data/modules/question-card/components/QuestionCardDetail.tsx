import React from 'react';
import type { QuestionCard } from '../api/questionCard.api';
import { Badge } from '@/components/ui/Badge';
import { EmptyCellText } from '@/components/shared/EmptyCellText';

interface QuestionCardDetailProps {
  data: QuestionCard;
}

const QuestionCardDetail: React.FC<QuestionCardDetailProps> = ({ data }) => {
  const colorMap: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
    materi: 'default',
    teknis: 'info',
    kepribadian: 'warning',
    motivasi: 'success',
  };

  return (
    <div className="space-y-6 text-sm text-gray-800 p-2">
      <div className="space-y-1">
        <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Judul Pertanyaan</p>
        <p className="text-base font-medium text-gray-900 leading-relaxed">{data.judulPertanyaan}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Kategori</p>
          <div>
            <Badge variant={colorMap[data.kategori] || 'default'} className="capitalize">
              {data.kategori}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Tingkat</p>
          <div>
            <Badge variant="info">Tingkat {data.tingkat}</Badge>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Materi Terkait</p>
        <p className="text-sm">
          {data.namaMateri ? <span className="font-medium">{data.namaMateri}</span> : <EmptyCellText />}
        </p>
      </div>

      <div className="space-y-1">
        <p className="font-semibold text-gray-500 text-xs uppercase tracking-wider">Deskripsi / Ekspektasi Jawaban</p>
        <div className="text-sm bg-gray-50 p-3 rounded-md border border-gray-100 min-h-20 whitespace-pre-wrap">
          {data.deskripsi || <EmptyCellText />}
        </div>
      </div>
    </div>
  );
};

export default QuestionCardDetail;
