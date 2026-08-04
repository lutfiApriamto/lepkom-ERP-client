import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useChangePassword } from '../api/resetPassword.api';
import { useAuthStore } from '@/features/auth/shared/store';
import { AuthLayout } from '@/features/auth/modules/login/components/AuthLayout';

const ForceChangePasswordPage = () => {
  const navigate = useNavigate();
  const { user, logout, setWajibGantiPassword } = useAuthStore();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Assume default role is asisten unless it's calas
  const role = user?.role === 'calas' ? 'calas' : 'asisten';
  const changePasswordMutation = useChangePassword(role);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error('Kedua field password wajib diisi');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }
    
    try {
      await changePasswordMutation.mutateAsync(newPassword);
      toast.success('Password berhasil diperbarui. Silakan login kembali.');
      setWajibGantiPassword(false);
      logout();
      navigate('/login', { replace: true });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Gagal mengubah password');
    }
  };

  return (
    <AuthLayout
      title="Wajib Ganti Password"
      subtitle="Demi keamanan, Anda diwajibkan untuk mengganti password default dengan password baru sebelum melanjutkan ke halaman utama."
    >
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password Baru</label>
          <Input 
            type="password" 
            placeholder="Masukkan password baru" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full h-11"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password Baru</label>
          <Input 
            type="password" 
            placeholder="Ulangi password baru" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full h-11"
          />
        </div>
        <div className="pt-2 flex flex-col gap-3">
          <Button 
            type="submit" 
            className="w-full h-11 text-base"
            disabled={changePasswordMutation.isPending}
          >
            {changePasswordMutation.isPending ? 'Menyimpan...' : 'Simpan Password Baru'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-11 text-base font-medium"
            onClick={logout}
          >
            Batal & Keluar
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForceChangePasswordPage;
