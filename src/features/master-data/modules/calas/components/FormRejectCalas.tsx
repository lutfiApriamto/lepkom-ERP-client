import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRejectCalas } from '../api/calas.api';
import { useCalasStore } from '../store/useCalasStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

const rejectSchema = z.object({
  alasanTidakLolos: z.enum([
    "tidak_lolos_screening",
    "tidak_hadir_ujian",
    "tidak_lolos_penilaian",
    "ditolak_rapat_akhir",
    "lainnya"
  ], { message: "Pilih salah satu alasan yang valid" }),
  deskripsiPenolakan: z.string().optional(),
}).refine(data => {
  if (data.alasanTidakLolos === 'lainnya' && (!data.deskripsiPenolakan || data.deskripsiPenolakan.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "Deskripsi penolakan wajib diisi jika memilih 'Lainnya'",
  path: ["deskripsiPenolakan"],
});

type RejectFormData = z.infer<typeof rejectSchema>;

const FormRejectCalas = () => {
  const { selectedCalas } = useCalasStore();
  const { setOpenDialog } = useDialogStore();
  const rejectMutation = useRejectCalas();
  const [showDeskripsi, setShowDeskripsi] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RejectFormData>({
    resolver: zodResolver(rejectSchema),
    defaultValues: {
      alasanTidakLolos: undefined,
      deskripsiPenolakan: '',
    },
  });

  const selectedAlasan = watch('alasanTidakLolos');

  React.useEffect(() => {
    setShowDeskripsi(selectedAlasan === 'lainnya');
  }, [selectedAlasan]);

  const onSubmit = (data: RejectFormData) => {
    if (!selectedCalas) return;
    
    rejectMutation.mutate({
      id: selectedCalas._id,
      data: {
        alasanTidakLolos: data.alasanTidakLolos,
        deskripsiPenolakan: data.alasanTidakLolos === 'lainnya' ? data.deskripsiPenolakan : undefined,
      }
    }, {
      onSuccess: () => {
        toast.success(`Berhasil menolak calas ${selectedCalas.namaCalas}`);
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal menolak calas');
      }
    });
  };

  if (!selectedCalas) return null;

  return (
    <form id="form-reject-calas" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-4">
        <p className="text-sm text-red-800">
          Anda akan menolak <strong>{selectedCalas.namaCalas}</strong> dari tahapan rekrutmen. Calas akan mendapatkan email notifikasi secara otomatis berisi alasan penolakan ini.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Alasan Penolakan</label>
        <select
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.alasanTidakLolos ? 'border-red-500' : 'border-gray-300'}`}
          {...register('alasanTidakLolos')}
        >
          <option value="">Pilih alasan...</option>
          <option value="tidak_lolos_screening">Tidak Lolos Screening Dokumen</option>
          <option value="tidak_hadir_ujian">Tidak Hadir Ujian</option>
          <option value="tidak_lolos_penilaian">Tidak Lolos Penilaian Ujian</option>
          <option value="ditolak_rapat_akhir">Ditolak pada Rapat Keputusan Akhir</option>
          <option value="lainnya">Lainnya (Tulis Deskripsi Manual)</option>
        </select>
        {errors.alasanTidakLolos && <p className="text-red-500 text-xs mt-1">{errors.alasanTidakLolos.message}</p>}
      </div>

      {showDeskripsi && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Penolakan Tambahan</label>
          <textarea
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.deskripsiPenolakan ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tuliskan deskripsi/alasan penolakan khusus..."
            {...register('deskripsiPenolakan')}
          ></textarea>
          {errors.deskripsiPenolakan && <p className="text-red-500 text-xs mt-1">{errors.deskripsiPenolakan.message}</p>}
          <p className="text-xs text-gray-500 mt-1">Pesan ini akan disisipkan dalam email yang diterima calas.</p>
        </div>
      )}
    </form>
  );
};

export default FormRejectCalas;
