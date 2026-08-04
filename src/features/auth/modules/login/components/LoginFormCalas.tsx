import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLoginCalas } from '@/features/auth/shared/api';
import { useAuthStore } from '@/features/auth/shared/store';
import toast from 'react-hot-toast';
import { extractErrorMessage } from '@/utils/helpers/mappingErrorResponse';

export const LoginFormCalas: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const { mutateAsync: login, isPending } = useLoginCalas();
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleClearSession = () => {
    // Clear old tokens strictly manually to avoid window.location.replace triggers
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    localStorage.clear();
    sessionStorage.clear();
    useAuthStore.setState({ user: null, token: null, role: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleClearSession();

    toast.promise(
      login({ identifier, password }),
      {
        loading: 'Memverifikasi kredensial...',
        success: (res: any) => {
          const { accessToken, calas } = res.data;
          setToken(accessToken, 'calas');
          setUser({ ...calas, role: 'calas' });
          navigate('/lepkom/dashboard', { replace: true });
          return 'Login berhasil!';
        },
        error: (err) => extractErrorMessage(err)
      }
    );
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          NPM atau Email
        </label>
        <Input 
          type="text" 
          placeholder="12345678" 
          required 
          className="w-full h-11"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          disabled={isPending}
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Kata Sandi
          </label>
          <Link to="/forgot-password?role=calas" className="text-sm font-medium text-lepkom-green hover:text-green-700">
            Lupa sandi?
          </Link>
        </div>
        <Input 
          type="password" 
          placeholder="••••••••" 
          required 
          className="w-full h-11"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </div>
      <Button 
        type="submit" 
        className="w-full h-11 text-base bg-lepkom-green hover:bg-lepkom-green/90 mt-2 text-white"
        disabled={isPending}
      >
        {isPending ? 'Sedang Masuk...' : 'Masuk sebagai Calas'}
      </Button>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Belum memiliki akun Calas?{' '}
        <Link to="/register" className="font-semibold text-lepkom-green hover:text-green-700 transition-colors">
          Daftar sekarang
        </Link>
      </div>
    </form>
  );
};
