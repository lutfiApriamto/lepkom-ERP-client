import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateAsisten } from '../api/asisten.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

const createSchema = z.object({
  idAsisten: z.string().min(1, 'ID Asisten wajib diisi'),
  npm: z.string().min(1, 'NPM wajib diisi'),
  nama: z.string().min(2, 'Nama minimal 2 karakter'),
  kelasSaatIni: z.string().optional(),
});

type CreateFormData = z.infer<typeof createSchema>;

const FormCreateAsisten = () => {
  const { setOpenDialog } = useDialogStore();
  const createMutation = useCreateAsisten();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      idAsisten: '',
      npm: '',
      nama: '',
      kelasSaatIni: '',
    },
  });

  const onSubmit = (data: CreateFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Asisten berhasil ditambahkan');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal menambahkan asisten');
      }
    });
  };

  return (
    <form id="form-create-asisten" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID Asisten</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.idAsisten ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Misal: A-1234"
          {...register('idAsisten')}
        />
        {errors.idAsisten && <p className="text-red-500 text-xs mt-1">{errors.idAsisten.message}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">NPM</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.npm ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="NPM"
          {...register('npm')}
        />
        {errors.npm && <p className="text-red-500 text-xs mt-1">{errors.npm.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.nama ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Nama Lengkap"
          {...register('nama')}
        />
        {errors.nama && <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kelas Saat Ini (Opsional)</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.kelasSaatIni ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Misal: 3KA21"
          {...register('kelasSaatIni')}
        />
        {errors.kelasSaatIni && <p className="text-red-500 text-xs mt-1">{errors.kelasSaatIni.message}</p>}
      </div>
      
      <p className="text-xs text-gray-500 italic mt-2">
        * Asisten yang ditambahkan manual akan mendapatkan role default 'asisten' dan password dari sistem.
      </p>
    </form>
  );
};

export default FormCreateAsisten;
