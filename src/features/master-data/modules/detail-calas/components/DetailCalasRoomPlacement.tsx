import React from 'react';
import { Card } from '@/components/ui/Card';
import { FiMap, FiCalendar, FiClock } from 'react-icons/fi';
import type { RoomPlacementItem } from '../types/detailCalas.types';

interface Props {
  placements: RoomPlacementItem[];
}

const DetailCalasRoomPlacement: React.FC<Props> = ({ placements }) => {
  return (
    <Card className="w-full bg-white shadow-sm border border-gray-100 rounded-xl" bodyClassName="p-6">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider flex items-center gap-2">
        <FiMap className="w-4 h-4 text-gray-500" />
        Riwayat Penempatan Ruangan
      </h3>

      {placements && placements.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {placements.map((p, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-emerald-200 transition-colors shadow-sm flex flex-col gap-2 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-100 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="flex items-center justify-between mb-1 relative z-10">
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md uppercase tracking-wider">
                  {p.examSession.jenisUjian.replace(/_/g, ' ')}
                </span>
                <span className="text-sm font-bold text-gray-900">Ruang {p.ruangan}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 relative z-10">
                <FiCalendar className="w-4 h-4 text-gray-400" />
                {new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(p.examSession.tanggal))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 relative z-10">
                <FiClock className="w-4 h-4 text-gray-400" />
                {p.examSession.jamMulai} - {p.examSession.jamSelesai}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-sm text-gray-500 font-medium">Belum ada penempatan ruangan untuk Calas ini.</p>
        </div>
      )}
    </Card>
  );
};

export default DetailCalasRoomPlacement;
