import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/Card';
import { useGetMyBiodata, useUpdateBiodata } from '@/features/biodata/shared/api/biodata.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';

const keluargaSchema = z.object({
  namaIbu: z.string().min(2, 'Nama Ibu wajib diisi (minimal 2 karakter)'),
  namaAyah: z.string().min(2, 'Nama Ayah wajib diisi (minimal 2 karakter)'),
  noHpOrtu: z.string()
    .min(10, 'Nomor HP tidak valid (terlalu pendek)')
    .regex(/^[0-9+]+$/, 'Hanya boleh berisi angka dan tanda tambah (+)'),
});

type KeluargaFormData = z.infer<typeof keluargaSchema>;

const FormKeluarga = () => {
  const { data: calasData } = useGetMyBiodata();
  const updateMutation = useUpdateBiodata();
  const { setAlert, resetAlert } = useDialogStore();

  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty }, reset } = useForm<KeluargaFormData>({
    resolver: zodResolver(keluargaSchema),
  });

  const resetFormToInitial = () => {
    if (calasData?.data) {
      const d = calasData.data;
      reset({
        namaIbu: d.namaIbu || '',
        namaAyah: d.namaAyah || '',
        noHpOrtu: d.noHpOrtu || '',
      });
    }
  };

  useEffect(() => {
    resetFormToInitial();
  }, [calasData, reset]);

  const onSubmit = (data: KeluargaFormData) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Data Keluarga berhasil diperbarui');
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal memperbarui Data Keluarga');
      }
    });
  };

  const handleCancel = () => {
    if (isDirty) {
      setAlert({
        type: 'confirm',
        text: {
          heading: 'Konfirmasi Batal',
          body: 'Terdapat perubahan pada formulir. Apakah Anda yakin ingin membatalkannya?',
        },
        btnTrue: { text: 'Ya, Batalkan' },
        onTrueCallback: () => {
          resetFormToInitial();
          setIsEditing(false);
          resetAlert();
        }
      });
    } else {
      setIsEditing(false);
    }
  };

  return (
    <Card className="p-6 border-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ayah</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.namaAyah ? 'border-red-500' : 'border-gray-300'}`}
              {...register('namaAyah')}
            />
            {errors.namaAyah && <p className="text-red-500 text-xs mt-1">{errors.namaAyah.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Ibu</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.namaIbu ? 'border-red-500' : 'border-gray-300'}`}
              {...register('namaIbu')}
            />
            {errors.namaIbu && <p className="text-red-500 text-xs mt-1">{errors.namaIbu.message}</p>}
          </div>

          <div className="col-span-full md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Handphone Orang Tua / Wali</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.noHpOrtu ? 'border-red-500' : 'border-gray-300'}`}
              {...register('noHpOrtu')}
            />
            {errors.noHpOrtu && <p className="text-red-500 text-xs mt-1">{errors.noHpOrtu.message}</p>}
            <p className="text-xs text-gray-400 mt-1">Gunakan format yang benar (contoh: 08123456789 atau +628123456789)</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-3">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
            >
              Edit Data
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={updateMutation.isPending || isSubmitting}
                className="px-6 py-2 bg-lepkom-green hover:bg-lepkom-green/90 text-white rounded-md transition-colors disabled:opacity-50"
              >
                {updateMutation.isPending ? 'Menyimpan...' : 'Submit'}
              </button>
            </>
          )}
        </div>
      </form>
    </Card>
  );
};

export default FormKeluarga;
