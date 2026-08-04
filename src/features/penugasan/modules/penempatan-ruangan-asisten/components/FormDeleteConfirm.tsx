import React, { useState } from 'react';
import { useDeleteRoomPlacement } from '../api/penempatanAsisten.api';
import { usePenempatanAsistenStore } from '../store/usePenempatanAsistenStore';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import toast from 'react-hot-toast';

const FormDeleteConfirm = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { selectedRoomPlacement } = usePenempatanAsistenStore();
  const { setOpenDialog } = useDialogStore();
  const deleteMutation = useDeleteRoomPlacement();

  if (!selectedRoomPlacement) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Password Super Admin wajib diisi');
      return;
    }

    deleteMutation.mutate(selectedRoomPlacement._id, {
      onSuccess: () => {
        toast.success(`Penugasan ruangan ${selectedRoomPlacement.ruangan} berhasil dihapus`);
        setOpenDialog('defaultDialog', false);
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.message || 'Gagal menghapus penugasan';
        setError(msg);
        toast.error(msg);
      }
    });
  };

  return (
    <form id="form-delete-penempatan" onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-red-800">
          Anda akan menghapus penugasan ruangan <strong>{selectedRoomPlacement.ruangan}</strong> secara <strong>PERMANEN</strong>.
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
