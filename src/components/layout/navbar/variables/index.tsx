
import { useAuthStore } from '@/features/auth/shared/store';
import { FaCircleUser } from 'react-icons/fa6';
import { PiSignOutBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useNavbarVariables = () => {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Berhasil logout dari sistem');
    navigate('/login');
  };

  const menuItems = [
    {
      label: 'Profile',
      value: 'profile',
      icon: <FaCircleUser className="mr-2" />,
      action: () => {
        // Implement UserDetail Dialog if needed later
        toast('Fitur Profil belum tersedia');
      }
    },
    {
      label: 'Keluar',
      value: 'logout',
      icon: <PiSignOutBold className="mr-2" />,
      action: handleLogout
    }
  ];

  return { menuItems, user };
};
