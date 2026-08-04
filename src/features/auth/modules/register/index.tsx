import React from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../login/components/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      title="Pendaftaran Calon Asisten"
      subtitle="Bergabunglah dan kembangkan potensimu bersama Laboratorium Pengembangan Komputer."
    >
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); console.log("Register calas dipanggil"); }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">NPM</label>
            <Input type="text" placeholder="12345678" required className="w-full h-11" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kelas</label>
            <Input type="text" placeholder="3IA01" required className="w-full h-11" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Nama Lengkap</label>
          <Input type="text" placeholder="Nama Lengkap" required className="w-full h-11" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Aktif</label>
          <Input type="email" placeholder="email@student.gunadarma.ac.id" required className="w-full h-11" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Kata Sandi</label>
            <Input type="password" placeholder="••••••••" required className="w-full h-11" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Konfirmasi</label>
            <Input type="password" placeholder="••••••••" required className="w-full h-11" />
          </div>
        </div>

        <Button type="submit" className="w-full h-11 text-base bg-lepkom-green hover:bg-lepkom-green/90 mt-4 text-white">
          Daftar Sekarang
        </Button>

        <div className="mt-6 text-center text-sm text-gray-500">
          Sudah memiliki akun?{' '}
          <Link to="/login?role=calas" className="font-semibold text-lepkom-green hover:text-green-700 transition-colors">
            Masuk di sini
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
