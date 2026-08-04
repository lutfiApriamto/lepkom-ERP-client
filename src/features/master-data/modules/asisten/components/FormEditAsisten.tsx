import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUpdateAsisten } from '../api/asisten.api';
import { useAsistenStore } from '../store/useAsistenStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

const editSchema = z.object({
  idAsisten: z.string().min(1, 'ID Asisten wajib diisi'),
  npm: z.string().min(1, 'NPM wajib diisi'),
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  kelasSaatIni: z.string().optional(),
});

type EditFormData = z.infer<typeof editSchema>;

const FormEditAsisten = () => {
  const { setOpenDialog } = useDialogStore();
  const { selectedAsisten } = useAsistenStore();
  const updateMutation = useUpdateAsisten();

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      idAsisten: '',
      npm: '',
      nama: '',
      kelasSaatIni: '',
    },
  });

  useEffect(() => {
    if (selectedAsisten) {
      reset({
        idAsisten: selectedAsisten.idAsisten || '',
        npm: selectedAsisten.npm || '',
        nama: selectedAsisten.nama || '',
        kelasSaatIni: selectedAsisten.kelasSaatIni || '',
      });
    }
  }, [selectedAsisten, reset]);

  const onSubmit = (data: EditFormData) => {
    if (!selectedAsisten) return;
    
    updateMutation.mutate({ id: selectedAsisten._id, data }, {
      onSuccess: () => {
        toast.success('Data asisten berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal memperbarui data');
      }
    });
  };

  if (!selectedAsisten) return null;

  return (
    <form id="form-edit-asisten" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-3 text-sm mb-4">
        Anda sedang mengubah data (Hard Update) untuk asisten: <span className="font-bold">{selectedAsisten.nama}</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID Asisten</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.idAsisten ? 'border-red-500' : 'border-gray-300'}`}
          {...register('idAsisten')}
        />
        {errors.idAsisten && <p className="text-red-500 text-xs mt-1">{errors.idAsisten.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">NPM</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.npm ? 'border-red-500' : 'border-gray-300'}`}
          {...register('npm')}
        />
        {errors.npm && <p className="text-red-500 text-xs mt-1">{errors.npm.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nama ? 'border-red-500' : 'border-gray-300'}`}
          {...register('nama')}
        />
        {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kelas Saat Ini</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.kelasSaatIni ? 'border-red-500' : 'border-gray-300'}`}
          {...register('kelasSaatIni')}
        />
        {errors.kelasSaatIni && <p className="text-red-500 text-xs mt-1">{errors.kelasSaatIni.message}</p>}
      </div>
    </form>
  );
};

export default FormEditAsisten;
