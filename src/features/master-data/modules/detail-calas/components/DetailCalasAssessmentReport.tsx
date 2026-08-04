import React from 'react';
import { Card } from '@/components/ui/Card';
import type { RingkasanPenilaian, RingkasanTipeUjian } from '../types/detailCalas.types';
import { FiAward, FiStar, FiUserCheck, FiMessageSquare } from 'react-icons/fi';
import { Badge } from '@/components/ui/Badge';

interface Props {
  penilaian: RingkasanPenilaian;
}

const ProgressBar: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  // Warna bar bergantung pada skor
  let colorClass = 'bg-emerald-500';
  if (value < 60) colorClass = 'bg-red-500';
  else if (value < 75) colorClass = 'bg-warning';
  else if (value < 85) colorClass = 'bg-blue-500';

  return (
    <div className="mb-3">
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs font-semibold text-gray-700 capitalize">{label.replace(/_/g, ' ')}</span>
        <span className="text-xs font-bold text-gray-900">{(value || 0).toFixed(1)}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full ${colorClass} transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
    </div>
  );
};

const AssessmentTab: React.FC<{ data: RingkasanTipeUjian; title: string }> = ({ data, title }) => {
  if (!data || data.detailPenilai.length === 0) {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Laporan Penilaian Ujian {title}</h3>
        <div className="text-center py-12 bg-gray-50/50 rounded-xl border border-dashed border-gray-300">
          <p className="text-sm text-gray-500 font-medium">Belum ada penilaian Ujian {title} untuk Calas ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2 flex items-center gap-2">
        <FiAward className="w-5 h-5 text-indigo-600" />
        Laporan Penilaian Ujian {title}
      </h3>
      
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Rata-Rata Keseluruhan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-linear-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-3">
            <FiAward className="w-8 h-8 text-indigo-600" />
          </div>
          <p className="text-sm font-semibold text-indigo-900 uppercase tracking-wider mb-1">Skor Akhir {title}</p>
          <p className="text-4xl font-bold text-indigo-700">{(data.rataRataKeseluruhan || 0).toFixed(1)}</p>
          <p className="text-xs text-indigo-600 mt-2 font-medium">
            Rata-rata dari {data.detailPenilai.length} penilai
          </p>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiStar className="w-4 h-4 text-amber-500" /> Rata-Rata Per Kriteria
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {Object.entries(data.rataRataKriteria).map(([key, val]) => (
              <ProgressBar key={key} label={key} value={val} />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Penilai */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2 border-b border-gray-100 pb-2">
          <FiUserCheck className="w-4 h-4 text-gray-500" /> Detail Evaluasi Asisten
        </h4>
        <div className="grid grid-cols-1 gap-4">
          {data.detailPenilai.map((p, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                    {p.penilai.nama.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{p.penilai.nama}</p>
                    <p className="text-xs text-gray-500 font-medium">Asisten ID: {p.penilai.idAsisten}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100">
                    Skor: {(p.skorKeseluruhan || 0).toFixed(1)}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-4">
                  {Object.entries(p.kriteria).map(([k, v]) => (
                    <div key={k}>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">{k.replace(/_/g, ' ')}</p>
                      <p className="text-sm font-semibold text-gray-900">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  "{p.deskripsi}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

const DetailCalasAssessmentReport: React.FC<Props> = ({ penilaian }) => {
  return (
    <Card className="w-full bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden" bodyClassName="p-0">
      <div className="p-8">
        <AssessmentTab data={penilaian?.praktek} title="Praktek" />
        
        {/* Divider if both exist or just spacing */}
        <AssessmentTab data={penilaian?.project} title="Project" />
      </div>
    </Card>
  );
};

export default DetailCalasAssessmentReport;
