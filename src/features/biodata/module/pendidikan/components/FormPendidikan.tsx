import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui/Card';
import { useGetMyBiodata, useUpdateBiodata } from '@/features/biodata/shared/api/biodata.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';

const pendidikanSchema = z.object({
  kelas: z.string().min(1, 'Kelas wajib diisi'),
  asalSekolah: z.string().min(1, 'Asal sekolah wajib diisi'),
  wilayah: z.enum(['SALEMBA', 'DEPOK', 'KALIMALANG'], { message: 'Pilih wilayah' } as any),
  jurusan: z.string().min(1, 'Jurusan wajib diisi'),
  ipk: z.number({ message: 'IPK harus berupa angka' } as any).min(0).max(4, 'IPK maksimal 4.00'),
  kursusSemester: z.object({
    semester1: z.string().nullable().optional(),
    semester2: z.string().nullable().optional(),
    semester3: z.string().nullable().optional(),
    semester4: z.string().nullable().optional(),
    semester5: z.string().nullable().optional(),
    semester6: z.string().nullable().optional(),
    semester7: z.string().nullable().optional(),
  }),
  isKursusDelete: z.boolean(),
  SemesterKursusDel: z.string().optional(),
});

type PendidikanFormData = z.infer<typeof pendidikanSchema>;

const FormPendidikan = () => {
  const { data: calasData } = useGetMyBiodata();
  const updateMutation = useUpdateBiodata();
  const { setAlert, resetAlert } = useDialogStore();

  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, control, formState: { errors, isSubmitting, isDirty }, reset } = useForm<PendidikanFormData>({
    resolver: zodResolver(pendidikanSchema),
    defaultValues: {
      isKursusDelete: false,
    }
  });

  const isKursusDelete = useWatch({
    control,
    name: 'isKursusDelete',
  });

  const resetFormToInitial = () => {
    if (calasData?.data) {
      const d = calasData.data;
      reset({
        kelas: d.kelas || '',
        asalSekolah: d.asalSekolah || '',
        wilayah: (d.wilayah as 'SALEMBA' | 'DEPOK' | 'KALIMALANG') || 'DEPOK',
        jurusan: d.jurusan || '',
        ipk: d.ipk || 0,
        kursusSemester: {
          semester1: d.kursusSemester?.semester1 || '',
          semester2: d.kursusSemester?.semester2 || '',
          semester3: d.kursusSemester?.semester3 || '',
          semester4: d.kursusSemester?.semester4 || '',
          semester5: d.kursusSemester?.semester5 || '',
          semester6: d.kursusSemester?.semester6 || '',
          semester7: d.kursusSemester?.semester7 || '',
        },
        isKursusDelete: d.isKursusDelete || false,
        SemesterKursusDel: d.SemesterKursusDel || '',
      });
    }
  };

  useEffect(() => {
    resetFormToInitial();
  }, [calasData, reset]);

  const onSubmit = (data: PendidikanFormData) => {
    if (!data.isKursusDelete) {
      data.SemesterKursusDel = '';
    }
    
    updateMutation.mutate(data as any, {
      onSuccess: () => {
        toast.success('Data Pendidikan berhasil diperbarui');
        setIsEditing(false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal memperbarui Data Pendidikan');
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
        
        <h3 className="text-base font-semibold text-gray-900 mb-4">Informasi Akademik Utama</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.kelas ? 'border-red-500' : 'border-gray-300'}`}
              {...register('kelas')}
            />
            {errors.kelas && <p className="text-red-500 text-xs mt-1">{errors.kelas.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.asalSekolah ? 'border-red-500' : 'border-gray-300'}`}
              {...register('asalSekolah')}
            />
            {errors.asalSekolah && <p className="text-red-500 text-xs mt-1">{errors.asalSekolah.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wilayah Kampus</label>
            <select
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.wilayah ? 'border-red-500' : 'border-gray-300'}`}
              {...register('wilayah')}
            >
              <option value="DEPOK">DEPOK</option>
              <option value="KALIMALANG">KALIMALANG</option>
              <option value="SALEMBA">SALEMBA</option>
            </select>
            {errors.wilayah && <p className="text-red-500 text-xs mt-1">{errors.wilayah.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
            <input
              type="text"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.jurusan ? 'border-red-500' : 'border-gray-300'}`}
              {...register('jurusan')}
            />
            {errors.jurusan && <p className="text-red-500 text-xs mt-1">{errors.jurusan.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">IPK Terakhir</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.ipk ? 'border-red-500' : 'border-gray-300'}`}
              {...register('ipk', { valueAsNumber: true })}
            />
            {errors.ipk && <p className="text-red-500 text-xs mt-1">{errors.ipk.message}</p>}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900">Mata Kursus Per Semester</h3>
            <p className="text-sm text-gray-500 mt-1">
              Harap isi semua jenis kursus yang pernah Anda ikuti (contoh: FUNDAMENTAL WEB, FUNDAMENTAL NETWORKING, dll.). Jika ada semester yang belum terbuka (misalnya Anda masih di Semester 3, maka untuk Semester 4 ke atas), mohon isi dengan <strong>TIDAK IKUT KURSUS</strong>.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={`semester${num}`}>
                <label className="block text-sm font-medium text-gray-700 mb-1">Semester {num}</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  placeholder={num > 3 ? 'TIDAK IKUT KURSUS' : ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                  {...register(`kursusSemester.semester${num}` as any)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Informasi kursus lepkom yang di delete</h3>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isKursusDelete"
                disabled={!isEditing}
                className="h-4 w-4 text-lepkom-green focus:ring-lepkom-green border-gray-300 rounded disabled:opacity-50"
                {...register('isKursusDelete')}
              />
              <label htmlFor="isKursusDelete" className="text-sm font-medium text-gray-700">
                Pernah terdelete Kursus lepkom ?
              </label>
            </div>

            {isKursusDelete && (
              <div className="md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kursus/Semester yang diDelete
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  placeholder="Contoh: Kursus A (Semester 3)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lepkom-green disabled:bg-gray-100 disabled:cursor-not-allowed"
                  {...register('SemesterKursusDel')}
                />
              </div>
            )}
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

export default FormPendidikan;
