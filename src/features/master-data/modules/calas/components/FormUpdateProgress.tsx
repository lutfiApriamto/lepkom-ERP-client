import React from 'react';
import { useCalasStore } from '../store/useCalasStore';
import { useUpdateTimeline } from '../api/calas.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

const STAGES = [
  "registrasi",
  "screening",
  "biodata_dokumen",
  "ujian_praktek",
  "ujian_project",
  "keputusan_akhir",
  "selesai",
];

const getNextStage = (currentStage: string) => {
  const currentIndex = STAGES.indexOf(currentStage);
  if (currentIndex >= 0 && currentIndex < STAGES.length - 1) {
    return STAGES[currentIndex + 1];
  }
  return null;
};

const formatStageName = (stage: string) => {
  return stage.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const FormUpdateProgress = () => {
  const { selectedCalas } = useCalasStore();
  const { setOpenDialog } = useDialogStore();
  const updateTimelineMutation = useUpdateTimeline();

  if (!selectedCalas) return null;

  const currentStage = selectedCalas.statusRekrutmen?.tahapSaatIni || 'registrasi';
  const nextStage = getNextStage(currentStage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nextStage) return;

    toast.promise(
      updateTimelineMutation.mutateAsync({
        id: selectedCalas._id,
        data: {
          tahapSaatIni: nextStage,
          hasil: 'proses',
        }
      }),
      {
        loading: 'Memperbarui progres rekrutmen...',
        success: () => {
          setOpenDialog('defaultDialog', false);
          return `Berhasil pindah ke tahap ${formatStageName(nextStage)}`;
        },
        error: (error: any) => error?.response?.data?.message || 'Gagal mengubah progres calas',
      }
    ).catch(() => {}); // Catch error to prevent unhandled promise rejection in console
  };

  if (!nextStage) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">Calas sudah berada di tahap akhir pendaftaran.</p>
      </div>
    );
  }

  return (
    <form id="form-update-progress" onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-sm text-blue-800 mb-2">
          Anda akan memperbarui progres rekrutmen untuk <strong>{selectedCalas.namaCalas}</strong>.
        </p>
        <div className="flex items-center gap-3 justify-center my-4">
          <div className="text-center">
            <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Tahap Saat Ini</span>
            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              {formatStageName(currentStage)}
            </span>
          </div>
          <div className="text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </div>
          <div className="text-center">
            <span className="block text-xs text-blue-500 uppercase tracking-wider mb-1">Tahap Berikutnya</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {formatStageName(nextStage)}
            </span>
          </div>
        </div>
        <p className="text-xs text-blue-600 mt-2 text-center">
          * Catatan: Sistem membatasi pembaruan progres harus berurutan secara sistematis. Email notifikasi terkait akan dikirimkan.
        </p>
      </div>
    </form>
  );
};

export default FormUpdateProgress;
