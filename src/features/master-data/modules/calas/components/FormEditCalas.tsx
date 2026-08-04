import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUpdateCalas } from '../api/calas.api';
import { useCalasStore } from '../store/useCalasStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

// Sesuai PRD, yang bisa di edit hanya field tertentu, 
// namun di backend createSchema/updateSchema mengharapkan format serupa. 
// Saya akan sesuaikan dengan requirement PRD: idCalas, npm, namaCalas, kelas, emailCalas dan required lainnya.
const editSchema = z.object({
  idCalas: z.string().min(1, 'ID Calas wajib diisi'),
  npm: z.string().min(1, 'NPM wajib diisi'),
  namaCalas: z.string().min(2, 'Nama minimal 2 karakter'),
  kelas: z.string().min(1, 'Kelas wajib diisi'),
  emailCalas: z.string().email('Format email tidak valid').min(1, 'Email wajib diisi'),
});

type EditFormData = z.infer<typeof editSchema>;

const FormEditCalas = () => {
  const { setOpenDialog } = useDialogStore();
  const { selectedCalas } = useCalasStore();
  const updateMutation = useUpdateCalas();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      idCalas: '',
      npm: '',
      namaCalas: '',
      kelas: '',
      emailCalas: '',
    },
  });

  useEffect(() => {
    if (selectedCalas) {
      reset({
        idCalas: selectedCalas.idCalas,
        npm: selectedCalas.npm,
        namaCalas: selectedCalas.namaCalas,
        kelas: selectedCalas.kelas,
        emailCalas: selectedCalas.emailCalas,
      });
    }
  }, [selectedCalas, reset]);

  const onSubmit = (data: EditFormData) => {
    if (!selectedCalas) return;
    updateMutation.mutate({ id: selectedCalas._id, data }, {
      onSuccess: () => {
        toast.success('Data Calas berhasil diubah');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal mengubah data calas');
      }
    });
  };

  return (
    <form id="form-edit-calas" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ID Calas</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.idCalas ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="ID Calas"
          {...register('idCalas')}
        />
        {errors.idCalas && <p className="text-red-500 text-xs mt-1">{errors.idCalas.message}</p>}
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
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.namaCalas ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Nama Lengkap Calas"
          {...register('namaCalas')}
        />
        {errors.namaCalas && <p className="text-red-500 text-xs mt-1">{errors.namaCalas.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kelas</label>
        <input
          type="text"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.kelas ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Misal: 3KA21"
          {...register('kelas')}
        />
        {errors.kelas && <p className="text-red-500 text-xs mt-1">{errors.kelas.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.emailCalas ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Email Aktif"
          {...register('emailCalas')}
        />
        {errors.emailCalas && <p className="text-red-500 text-xs mt-1">{errors.emailCalas.message}</p>}
      </div>
    </form>
  );
};

export default FormEditCalas;
