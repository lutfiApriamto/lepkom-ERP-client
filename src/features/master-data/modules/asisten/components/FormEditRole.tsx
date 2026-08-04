import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUpdateAsistenRole } from '../api/asisten.api';
import { useAsistenStore } from '../store/useAsistenStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import { useGetAllRekrutmen } from '../../rekrutmen/api/rekrutmen.api';
import toast from 'react-hot-toast';

const roleSchema = z.object({
  role: z.string().min(1, 'Role wajib dipilih'),
});

type RoleFormData = z.infer<typeof roleSchema>;

const FormEditRole = () => {
  const { setOpenDialog } = useDialogStore();
  const { selectedAsisten } = useAsistenStore();
  const updateRoleMutation = useUpdateAsistenRole();
  const { data: activeRecruitment } = useGetAllRekrutmen('?isActive=true');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: { role: '' },
  });

  useEffect(() => {
    if (selectedAsisten) {
      reset({ role: selectedAsisten.role });
    }
  }, [selectedAsisten, reset]);

  const onSubmit = (data: RoleFormData) => {
    if (!selectedAsisten) return;
    
    updateRoleMutation.mutate({ id: selectedAsisten._id, data }, {
      onSuccess: () => {
        toast.success('Role asisten berhasil diperbarui');
        setOpenDialog('defaultDialog', false);
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Gagal memperbarui role');
      }
    });
  };

  if (!selectedAsisten) return null;

  // Determine available roles
  const hasActiveRecruitment = activeRecruitment?.data && activeRecruitment.data.length > 0;
  
  const allRoles = [
    { value: 'asisten', label: 'Asisten Biasa' },
    { value: 'staff', label: 'Staff' },
    { value: 'koordinator_lapangan', label: 'Koordinator Lapangan' },
    { value: 'pj_soal_materi', label: 'PJ Soal & Materi' },
    { value: 'penanggung_jawab_ruangan', label: 'PJ Ruangan' },
    { value: 'asisten_penilai', label: 'Asisten Penilai' },
    { value: 'super_admin', label: 'Super Admin' }
  ];

  const restrictedRoles = ['koordinator_lapangan', 'pj_soal_materi', 'penanggung_jawab_ruangan', 'asisten_penilai'];

  const availableRoles = allRoles.filter(role => {
    if (!hasActiveRecruitment && restrictedRoles.includes(role.value)) {
      return false; // Hide functional roles if recruitment is closed
    }
    return true;
  });

  return (
    <form id="form-edit-role" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-3 text-sm mb-4">
        Mengubah role asisten <span className="font-bold">{selectedAsisten.nama}</span>. 
        {!hasActiveRecruitment && (
          <span className="block mt-1 font-medium text-red-600">
            Catatan: Saat ini tidak ada event rekrutmen aktif. Role fungsional (Koor, PJ, Penilai) tidak dapat dipilih.
          </span>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Role Baru</label>
        <select
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
          {...register('role')}
        >
          <option value="" disabled>-- Pilih Role --</option>
          {availableRoles.map(role => (
            <option key={role.value} value={role.value}>
              {role.label}
            </option>
          ))}
        </select>
        {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
      </div>
    </form>
  );
};

export default FormEditRole;
