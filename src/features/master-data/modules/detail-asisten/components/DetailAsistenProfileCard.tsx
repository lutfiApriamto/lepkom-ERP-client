import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { DetailAsisten } from '../types/detailAsisten.types';

interface Props {
  asisten: DetailAsisten;
}

const DetailAsistenProfileCard: React.FC<Props> = ({ asisten }) => {
  return (
    <Card className="w-full bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden" bodyClassName="p-0">
      {/* Header Banner */}
      <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-700 w-full" />
      
      <div className="px-6 pb-6 pt-6 relative">
        {/* Info Area */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {asisten.nama}
            </h1>
            <p className="text-sm font-medium text-gray-500 mt-1">
              NPM: {asisten.npm} {asisten.kelasSaatIni && `• Kelas: ${asisten.kelasSaatIni}`}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={asisten.isActive ? 'success' : 'destructive'}>
              {asisten.isActive ? 'Aktif' : 'Nonaktif'}
            </Badge>
            <Badge variant="default" className="capitalize">
              {asisten.role.replace(/_/g, ' ')}
            </Badge>
          </div>
        </div>

        {/* Additional Info */}
        {(asisten.email || asisten.idAsisten) && (
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">Informasi Tambahan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {asisten.idAsisten && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">ID Asisten</p>
                  <p className="text-sm font-medium text-gray-900">{asisten.idAsisten}</p>
                </div>
              )}
              {asisten.email && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm font-medium text-gray-900">{asisten.email}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default DetailAsistenProfileCard;
