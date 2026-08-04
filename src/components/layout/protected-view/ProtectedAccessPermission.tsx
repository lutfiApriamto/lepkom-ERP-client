import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/shared/store';
import { filterPathByRole } from '@/utils/helpers/filterPathByRole';


interface ProtectedAccessPermissionProps {
  children: React.ReactNode;
}

const ProtectedAccessPermission: React.FC<ProtectedAccessPermissionProps> = ({ children }) => {
  const [isPermitted, setIsPermitted] = useState(false);
  const { user } = useAuthStore();
  
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Function to recursively get all paths from menus
  const getAllMenus = (menu: any): string[] => [
    menu.path,
    ...(menu.children?.flatMap(getAllMenus) || [])
  ];

  useEffect(() => {
    if (user) {
      if (pathname === '/not-permitted') {
        setIsPermitted(true);
        return;
      }

      const allowedPaths = filterPathByRole(user?.role || '');
      
      let isForbidden = true;
      if (allowedPaths.some(p => pathname.startsWith(p))) {
        isForbidden = false;
      }
      
      // Allow exact match for parent directories if the user has access to a child route
      // e.g., if user has access to /lepkom/master-data/asisten, allow them to visit exactly /lepkom/master-data
      if (isForbidden) {
        if (allowedPaths.some(p => p.startsWith(pathname === '/' ? '/' : pathname + '/'))) {
          isForbidden = false;
        }
      }

      // Allow root /lepkom to pass and get redirected later by index redirect
      if (pathname === '/lepkom' || pathname === '/') {
        isForbidden = false;
      }

      if (isForbidden) {
        navigate('/not-permitted', { replace: true });
      } else {
        setIsPermitted(true);
      }
    }
  }, [pathname, user, navigate]);

  if (!isPermitted) return null;

  return <>{children}</>;
};

export default ProtectedAccessPermission;
