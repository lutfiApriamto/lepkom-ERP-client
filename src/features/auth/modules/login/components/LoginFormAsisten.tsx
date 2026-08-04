import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useLoginAsisten } from '@/features/auth/shared/api';
import { useAuthStore } from '@/features/auth/shared/store';
import toast from 'react-hot-toast';
import { extractErrorMessage } from '@/utils/helpers/mappingErrorResponse';

export const LoginFormAsisten: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  const { mutateAsync: login, isPending } = useLoginAsisten();
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
          const { accessToken, asisten } = res.data;
          setToken(accessToken, asisten.role);
          setUser(asisten);
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
          Email atau ID Asisten
        </label>
        <Input 
          type="text" 
          placeholder="contoh@staff.gunadarma.ac.id" 
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
          <Link to="/forgot-password?role=asisten" className="text-sm font-medium text-lepkom-blue hover:text-blue-700">
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
        className="w-full h-11 text-base bg-lepkom-blue hover:bg-lepkom-blue/90 mt-2"
        disabled={isPending}
      >
        {isPending ? 'Sedang Masuk...' : 'Masuk sebagai Asisten'}
      </Button>
    </form>
  );
};
