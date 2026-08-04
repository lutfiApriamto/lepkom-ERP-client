import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../login/components/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useResetPasswordCalas } from '@/features/auth/shared/api';
import toast from 'react-hot-toast';
import { extractErrorMessage } from '@/utils/helpers/mappingErrorResponse';

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutateAsync: resetPassword, isPending } = useResetPasswordCalas();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Kata sandi baru dan konfirmasi sandi tidak cocok!');
      return;
    }

    if (!token) {
      toast.error('Token tidak valid atau tidak ditemukan.');
      return;
    }

    toast.promise(
      resetPassword({ token, newPassword }),
      {
        loading: 'Menyimpan kata sandi baru...',
        success: (res: any) => {
          // Arahkan ke halaman login (tab calas) setelah sukses
          setTimeout(() => navigate('/login?role=calas', { replace: true }), 1500);
          return res.message || 'Kata sandi berhasil diperbarui, silakan login kembali.';
        },
        error: (err) => extractErrorMessage(err)
      }
    );
  };

  return (
    <AuthLayout
      title="Atur Ulang Sandi"
      subtitle="Silakan masukkan kata sandi baru Anda di bawah ini."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Kata Sandi Baru</label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            required 
            className="w-full h-11"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isPending}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Kata Sandi</label>
          <Input 
            type="password" 
            placeholder="••••••••" 
            required 
            className="w-full h-11"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isPending}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full h-11 text-base bg-lepkom-green hover:bg-lepkom-green/90 mt-2 text-white"
        >
          {isPending ? 'Menyimpan...' : 'Simpan Sandi Baru'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
