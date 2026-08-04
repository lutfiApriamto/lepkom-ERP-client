import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRequestHardReset } from '../api/resetPassword.api';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { AuthLayout } from '@/features/auth/modules/login/components/AuthLayout';

const RequestResetPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const requestResetMutation = useRequestHardReset('asisten');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      toast.error('ID Asisten atau Email wajib diisi');
      return;
    }
    
    try {
      await requestResetMutation.mutateAsync(identifier);
      setIsSuccess(true);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Gagal mengirim permintaan reset password');
    }
  };

  if (isSuccess) {
    return (
      <AuthLayout
        title="Permintaan Terkirim"
        subtitle="Permintaan reset password telah berhasil dikirim. Silakan hubungi Super Admin untuk menyetujui permintaan Anda."
      >
        <div className="flex flex-col items-center py-6">
          <div className="w-20 h-20 bg-green-100 text-brand-green rounded-full flex items-center justify-center mb-6">
            <FiCheckCircle className="w-10 h-10" />
          </div>
          <Link to="/login" className="w-full">
            <Button className="w-full h-11 text-base">
              Kembali ke halaman Login
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Lupa Password"
      subtitle="Masukkan ID Asisten atau Email yang terdaftar. Kami akan mengirimkan permintaan reset password ke Super Admin."
    >
      <div className="relative">
        <Link to="/login" className="absolute -top-24 left-0 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2 text-sm font-medium">
          <FiArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">ID Asisten / Email</label>
            <Input 
              placeholder="Contoh: A1234 atau email@lepkom.com" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full h-11"
            />
          </div>
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full h-11 text-base"
              disabled={requestResetMutation.isPending}
            >
              {requestResetMutation.isPending ? 'Mengirim...' : 'Kirim Permintaan Reset'}
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default RequestResetPage;
