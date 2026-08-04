import React, { useState } from 'react';
import { useDeleteCalas } from '../api/calas.api';
import { useCalasStore } from '../store/useCalasStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

const FormDeleteConfirm = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { selectedCalas } = useCalasStore();
  const { setOpenDialog } = useDialogStore();
  const deleteMutation = useDeleteCalas();

  if (!selectedCalas) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Password Super Admin wajib diisi');
      return;
    }

    deleteMutation.mutate({
      id: selectedCalas._id,
      password,
    }, {
      onSuccess: () => {
        toast.success(`Data calas ${selectedCalas.namaCalas} berhasil dihapus permanen`);
        setOpenDialog('defaultDialog', false);
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || 'Gagal menghapus calas';
        setError(msg);
        toast.error(msg);
      }
    });
  };

  return (
    <form id="form-delete-calas" onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-red-800">
          Anda akan menghapus data calas <strong>{selectedCalas.namaCalas}</strong> secara <strong>PERMANEN</strong>. Data yang telah dihapus tidak dapat dikembalikan.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password Konfirmasi (Super Admin)</label>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Masukkan password akun Anda..."
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </form>
  );
};

export default FormDeleteConfirm;
