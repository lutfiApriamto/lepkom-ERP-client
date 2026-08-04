import React from 'react';
import type { AsistenHistory, HistoryUploadMateri, HistoryUploadSoal, HistoryUploadQuestionCard, HistoryPengumuman, HistoryRuangan } from '../types/detailAsisten.types';

interface Props {
  history: AsistenHistory;
}

const DetailAsistenHistoryTabs: React.FC<Props> = ({ history }) => {
  const formatDateTime = (isoDate: string) => {
    const d = new Date(isoDate);
    return new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(d);
  };

  const EmptyState = ({ message }: { message: string }) => (
    <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-200 rounded-lg">
      <p className="text-gray-500">{message}</p>
    </div>
  );

  const TimelineItem = ({ title, desc, date, color = 'bg-blue-500' }: { title: string, desc: string, date: string, color?: string }) => (
    <div className="relative pl-6 py-4 border-l-2 border-gray-100 group">
      <div className={`absolute -left-1.5 top-5 w-3 h-3 rounded-full ${color} ring-4 ring-white group-hover:scale-125 transition-transform`}></div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-50">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
        <span className="text-xs font-medium text-gray-400 block mt-2">{formatDateTime(date)}</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Kolom 1: Konten */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Riwayat Konten & Soal</h3>
        
        {(!history.historyUploadMateri?.length && !history.historyUploadSoal?.length && !history.historyUploadQuestionCard?.length) && (
          <EmptyState message="Belum ada riwayat pembuatan konten." />
        )}

        <div className="space-y-0">
          {history.historyUploadMateri?.map((m: HistoryUploadMateri) => (
            <TimelineItem 
              key={m._id} 
              title={`Upload Materi: ${m.namaMateri}`} 
              desc={`Tingkat ${m.tingkat}, Pertemuan ${m.pertemuan}`} 
              date={m.createdAt} 
              color="bg-emerald-500" 
            />
          ))}

          {history.historyUploadSoal?.map((s: HistoryUploadSoal) => (
            <TimelineItem 
              key={s._id} 
              title={`Upload Soal: ${s.judulSoal}`} 
              desc={`Jenis: ${s.jenisSoal}`} 
              date={s.createdAt} 
              color="bg-amber-500" 
            />
          ))}

          {history.historyUploadQuestionCard?.map((q: HistoryUploadQuestionCard) => (
            <TimelineItem 
              key={q._id} 
              title={`Upload Question Card: ${q.judul}`} 
              desc={`Tingkat ${q.tingkat}, Pertemuan ${q.pertemuan}`} 
              date={q.createdAt} 
              color="bg-purple-500" 
            />
          ))}
        </div>
      </div>

      {/* Kolom 2: Ruangan & Pengumuman */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Riwayat Ruangan</h3>
        
        {(!history.historyRuangan?.length && !history.historyPengumuman?.length) && (
          <EmptyState message="Belum ada riwayat ruangan atau pengumuman." />
        )}

        <div className="space-y-0">
          {history.historyRuangan?.map((p: HistoryRuangan) => (
            <TimelineItem 
              key={p._id} 
              title={`${p.rolePenugasan} Ruangan ${p.ruangan}`} 
              desc={`Ujian ${p.jenisUjian?.toUpperCase() || '-'} - ${new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(p.tanggal))}`} 
              date={p.createdAt} 
              color={p.rolePenugasan.includes('PJ') ? 'bg-indigo-500' : 'bg-rose-500'} 
            />
          ))}

          {history.historyPengumuman?.map((a: HistoryPengumuman) => (
            <TimelineItem 
              key={a._id} 
              title={`Membuat Pengumuman`} 
              desc={a.judul} 
              date={a.createdAt} 
              color="bg-blue-500" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailAsistenHistoryTabs;
