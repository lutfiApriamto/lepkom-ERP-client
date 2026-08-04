import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../login/components/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useRequestHardResetAsisten, useForgotPasswordCalas } from '@/features/auth/shared/api';
import toast from 'react-hot-toast';
import { extractErrorMessage } from '@/utils/helpers/mappingErrorResponse';

const ForgotPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') || 'calas';
  const isAsisten = role === 'asisten';

  const [identifier, setIdentifier] = useState('');

  const { mutateAsync: requestHardReset, isPending: isPendingAsisten } = useRequestHardResetAsisten();
  const { mutateAsync: forgotPasswordCalas, isPending: isPendingCalas } = useForgotPasswordCalas();

  const isPending = isAsisten ? isPendingAsisten : isPendingCalas;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;

    if (isAsisten) {
      toast.promise(
        requestHardReset({ identifier }),
        {
          loading: 'Mengirim pengajuan reset sandi...',
          success: (res: any) => res.message || 'Pengajuan hard reset berhasil dikirim ke Super Admin',
          error: (err) => extractErrorMessage(err)
        }
      );
    } else {
      toast.promise(
        forgotPasswordCalas({ identifier }),
        {
          loading: 'Mengirim tautan reset sandi...',
          success: (res: any) => res.message || 'Tautan reset kata sandi telah dikirim ke email Anda',
          error: (err) => extractErrorMessage(err)
        }
      );
    }
  };

  return (
    <AuthLayout
      title={isAsisten ? "Ajukan Hard Reset?" : "Lupa Kata Sandi?"}
      subtitle={isAsisten ? "Masukkan ID Asisten atau Email Anda untuk mengajukan hard reset ke Super Admin." : "Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi."}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {isAsisten ? "ID Asisten / Email" : "Email Aktif"}
          </label>
          <Input 
            type="text" 
            placeholder={isAsisten ? "contoh@staff.gunadarma.ac.id" : "email@student.gunadarma.ac.id"} 
            required 
            className="w-full h-11"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            disabled={isPending}
          />
        </div>

        <Button 
          type="submit" 
          disabled={isPending}
          className={`w-full h-11 text-base mt-2 text-white ${
            isAsisten ? 'bg-lepkom-blue hover:bg-blue-700' : 'bg-lepkom-green hover:bg-green-700'
          }`}
        >
          {isPending ? 'Sedang Memproses...' : (isAsisten ? "Ajukan Reset Sandi" : "Kirim Tautan Reset")}
        </Button>

        <div className="mt-6 text-center text-sm text-gray-500 flex items-center justify-center">
          <Link to={`/login?role=${role}`} className="flex items-center font-semibold text-gray-700 hover:text-gray-900 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Halaman Masuk
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
