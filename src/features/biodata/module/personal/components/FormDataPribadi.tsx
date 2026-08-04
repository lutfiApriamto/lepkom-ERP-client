import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/Card';
import { useGetMyBiodata, useUpdateBiodata } from '@/features/biodata/shared/api/biodata.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';

const personalSchema = z.object({
  npm: z.string().min(1, 'NPM wajib diisi'),
  namaCalas: z.string().min(2, 'Nama minimal 2 karakter'),
  jenisKelamin: z.enum(['L', 'P'], { message: 'Pilih jenis kelamin' } as any),
  noKtp: z.string().length(16, 'No KTP harus 16 digit'),
  noHp: z.string().min(10, 'No HP tidak valid'),
  emailCalas: z.string().email('Email tidak valid').optional().or(z.literal('')),
  tempatLahir: z.string().min(1, 'Tempat lahir wajib diisi'),
  tanggalLahir: z.string().min(1, 'Tanggal lahir wajib diisi'),
  alamatLengkap: z.string().min(5, 'Alamat wajib diisi dengan lengkap'),
  kemampuanPribadi: z.string().optional(),
  kemampuanIt: z.string().optional(),
  pengalamanOrganisasi: z.string().optional(),
  pengalamanKerja: z.string().optional(),
});

type PersonalFormData = z.infer<typeof personalSchema>;

const FormDataPribadi = () => {
  const { data: calasData } = useGetMyBiodata();
  const updateMutation = useUpdateBiodata();
  const { setAlert, resetAlert } = useDialogStore();

  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting, isDirty }, reset } = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
  });

  const resetFormToInitial = () => {
    if (calasData?.data) {
      const d = calasData.data;
      reset({
        npm: d.npm || '',
        namaCalas: d.namaCalas || '',
        jenisKelamin: (d.jenisKelamin as 'L' | 'P') || 'L',
        noKtp: d.noKtp || '',
        noHp: d.noHp || '',
        emailCalas: d.emailCalas || '',
        tempatLahir: d.tempatLahir || '',
        tanggalLahir: d.tanggalLahir || '',
        alamatLengkap: d.alamatLengkap || '',
        kemampuanPribadi: d.kemampuanPribadi || '',
        kemampuanIt: d.kemampuanIt || '',
        pengalamanOrganisasi: d.pengalamanOrganisasi || '',
        pengalamanKerja: d.pengalamanKerja || '',
      });
    }
  };

  useEffect(() => {
    resetFormToInitial();
  }, [calasData, reset]);

  const onSubmit = (data: PersonalFormData) => {
    updateMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Data Pribadi berhasil diperbarui');
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal memperbarui Data Pribadi');
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

  const idCalas = calasData?.data?.idCalas || '-';
  const hasEmail = Boolean(calasData?.data?.emailCalas);

  return (
    <Card className="p-6 border-gray-200">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ID Calas (Read Only) */}
          <div className="col-span-full md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">ID Calas</label>
            <input
              type="text"
              value={idCalas}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">ID Calas tidak dapat diubah</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">NPM</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.npm ? 'border-red-500' : 'border-gray-300'}`}
              {...register('npm')}
            />
            {errors.npm && <p className="text-red-500 text-xs mt-1">{errors.npm.message}</p>}
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap Calas</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.namaCalas ? 'border-red-500' : 'border-gray-300'}`}
              {...register('namaCalas')}
            />
            {errors.namaCalas && <p className="text-red-500 text-xs mt-1">{errors.namaCalas.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
            <select
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.jenisKelamin ? 'border-red-500' : 'border-gray-300'}`}
              {...register('jenisKelamin')}
            >
              <option value="L">Laki-Laki</option>
              <option value="P">Perempuan</option>
            </select>
            {errors.jenisKelamin && <p className="text-red-500 text-xs mt-1">{errors.jenisKelamin.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No KTP</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.noKtp ? 'border-red-500' : 'border-gray-300'}`}
              {...register('noKtp')}
            />
            {errors.noKtp && <p className="text-red-500 text-xs mt-1">{errors.noKtp.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.noHp ? 'border-red-500' : 'border-gray-300'}`}
              {...register('noHp')}
            />
            {errors.noHp && <p className="text-red-500 text-xs mt-1">{errors.noHp.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              disabled={!isEditing || hasEmail}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.emailCalas ? 'border-red-500' : 'border-gray-300'}`}
              {...register('emailCalas')}
            />
            {hasEmail && <p className="text-xs text-gray-400 mt-1">Email sudah terdaftar dan tidak dapat diubah</p>}
            {errors.emailCalas && <p className="text-red-500 text-xs mt-1">{errors.emailCalas.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.tempatLahir ? 'border-red-500' : 'border-gray-300'}`}
              {...register('tempatLahir')}
            />
            {errors.tempatLahir && <p className="text-red-500 text-xs mt-1">{errors.tempatLahir.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
            <input
              type="date"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.tanggalLahir ? 'border-red-500' : 'border-gray-300'}`}
              {...register('tanggalLahir')}
            />
            {errors.tanggalLahir && <p className="text-red-500 text-xs mt-1">{errors.tanggalLahir.message}</p>}
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
            <textarea
              rows={3}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green resize-none disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.alamatLengkap ? 'border-red-500' : 'border-gray-300'}`}
              {...register('alamatLengkap')}
            />
            {errors.alamatLengkap && <p className="text-red-500 text-xs mt-1">{errors.alamatLengkap.message}</p>}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kemampuan Pribadi</label>
              <textarea
                rows={2}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                {...register('kemampuanPribadi')}
              />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Kemampuan IT</label>
              <textarea
                rows={2}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                {...register('kemampuanIt')}
              />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman Organisasi</label>
              <textarea
                rows={2}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                {...register('pengalamanOrganisasi')}
              />
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pengalaman Kerja</label>
              <textarea
                rows={2}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                {...register('pengalamanKerja')}
              />
            </div>

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

export default FormDataPribadi;
