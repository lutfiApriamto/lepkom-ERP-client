import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/shared/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute:
 * - Cek apakah user sudah login (punya user data di store).
 * - TIDAK mengecek cookie access_token secara langsung, karena
 *   cookie bisa kosong sementara saat proses silent refresh sedang berjalan.
 * - Penanganan sesi expired ditangani oleh interceptor (menampilkan AlertDialog).
 * - Komponen ini hanya bertanggung jawab untuk redirect jika user
 *   memang BELUM PERNAH login (tidak ada data user di memori/localStorage).
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    // Hanya redirect ke login jika tidak ada data user sama sekali.
    // Jangan cek `token` dari cookie karena bisa kosong sementara saat refresh.
    if (!user) {
      navigate('/login', { replace: true });
    } else if (user.wajibGantiPassword && window.location.pathname !== '/force-change-password') {
      navigate('/force-change-password', { replace: true });
    }
  }, [user, navigate]);

  // Render children jika ada data user
  return user ? <>{children}</> : null;
};

export default ProtectedRoute;
