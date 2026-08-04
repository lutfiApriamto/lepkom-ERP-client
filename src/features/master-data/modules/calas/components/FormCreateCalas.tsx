import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateCalas } from '../api/calas.api';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

const createSchema = z.object({
  idCalas: z.string().min(1, 'ID Calas wajib diisi'),
  npm: z.string().min(1, 'NPM wajib diisi'),
  namaCalas: z.string().min(2, 'Nama minimal 2 karakter'),
  kelas: z.string().min(1, 'Kelas wajib diisi'),
  jenisKelamin: z.enum(['L', 'P'], { message: 'Jenis Kelamin wajib dipilih' }),
  emailCalas: z.string().email('Format email tidak valid').min(1, 'Email wajib diisi'),
  noKtp: z.string().min(1, 'No KTP wajib diisi'),
  noHp: z.string().min(1, 'No HP wajib diisi'),
  tempatLahir: z.string().min(1, 'Tempat Lahir wajib diisi'),
  tanggalLahir: z.string().min(1, 'Tanggal Lahir wajib diisi'),
  alamatLengkap: z.string().min(1, 'Alamat Lengkap wajib diisi'),
  asalSekolah: z.string().min(1, 'Asal Sekolah wajib diisi'),
  jurusan: z.string().min(1, 'Jurusan wajib diisi'),
  ipk: z.number({ message: 'IPK harus berupa angka dan wajib diisi' }).min(0).max(4),
  noHpOrtu: z.string().min(1, 'No HP Orang Tua wajib diisi'),
});

type CreateFormData = z.infer<typeof createSchema>;

const FormCreateCalas = () => {
  const { setOpenDialog } = useDialogStore();
  const createMutation = useCreateCalas();

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      idCalas: '',
      npm: '',
      namaCalas: '',
      kelas: '',
      emailCalas: '',
      noKtp: '',
      noHp: '',
      tempatLahir: '',
      tanggalLahir: '',
      alamatLengkap: '',
      asalSekolah: '',
      jurusan: '',
      noHpOrtu: '',
    },
  });

  const onSubmit = (data: CreateFormData) => {
    // Pada backend, ia menerima tempatLahirTanggalLahir sbg satu string atau field biasa. 
    // Berdasarkan request sebelumnya, tetap dipisah secara form tapi backend menerimanya terpisah karena kita tidak merubah mongoose.
    // Di backend, management.schema.js mengharapkan tempatLahir dan tanggalLahir secara terpisah! (sesuai request)
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Calas berhasil ditambahkan');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal menambahkan calas');
      }
    });
  };

  return (
    <form id="form-create-calas" onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

        <div className="col-span-2">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Jurusan</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.jurusan ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Jurusan"
            {...register('jurusan')}
          />
          {errors.jurusan && <p className="text-red-500 text-xs mt-1">{errors.jurusan.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
          <select
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.jenisKelamin ? 'border-red-500' : 'border-gray-300'}`}
            {...register('jenisKelamin')}
          >
            <option value="">Pilih...</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          {errors.jenisKelamin && <p className="text-red-500 text-xs mt-1">{errors.jenisKelamin.message}</p>}
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">No KTP</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.noKtp ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="NIK KTP"
            {...register('noKtp')}
          />
          {errors.noKtp && <p className="text-red-500 text-xs mt-1">{errors.noKtp.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">No HP</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.noHp ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="No. WhatsApp"
            {...register('noHp')}
          />
          {errors.noHp && <p className="text-red-500 text-xs mt-1">{errors.noHp.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tempat Lahir</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.tempatLahir ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Tempat Lahir"
            {...register('tempatLahir')}
          />
          {errors.tempatLahir && <p className="text-red-500 text-xs mt-1">{errors.tempatLahir.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
          <input
            type="date"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.tanggalLahir ? 'border-red-500' : 'border-gray-300'}`}
            {...register('tanggalLahir')}
          />
          {errors.tanggalLahir && <p className="text-red-500 text-xs mt-1">{errors.tanggalLahir.message}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
          <textarea
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.alamatLengkap ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Alamat Tinggal Saat Ini"
            rows={2}
            {...register('alamatLengkap')}
          />
          {errors.alamatLengkap && <p className="text-red-500 text-xs mt-1">{errors.alamatLengkap.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Asal Sekolah</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.asalSekolah ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Asal SMA/SMK"
            {...register('asalSekolah')}
          />
          {errors.asalSekolah && <p className="text-red-500 text-xs mt-1">{errors.asalSekolah.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IPK (Optional untuk saat ini, isi 0 jika blm ada)</label>
          <input
            type="number"
            step="0.01"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.ipk ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Misal: 3.50"
            {...register('ipk', { valueAsNumber: true })}
          />
          {errors.ipk && <p className="text-red-500 text-xs mt-1">{errors.ipk.message}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">No HP Orang Tua</label>
          <input
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.noHpOrtu ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="No Telepon Darurat"
            {...register('noHpOrtu')}
          />
          {errors.noHpOrtu && <p className="text-red-500 text-xs mt-1">{errors.noHpOrtu.message}</p>}
        </div>
      </div>
      
      <p className="text-xs text-gray-500 italic mt-2">
        * Tahap awal otomatis menjadi 'biodata_dokumen' dan diassign ke event rekrutmen yang aktif.
      </p>
    </form>
  );
};

export default FormCreateCalas;
