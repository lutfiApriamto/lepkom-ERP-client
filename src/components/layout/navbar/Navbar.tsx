import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import dayjs from 'dayjs';
import id from 'dayjs/locale/id';
import { useNavbarVariables } from './variables';
import { GlobalBreadcrumb } from '@/components/breadcrumb';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';

dayjs.locale(id);

interface NavbarProps {
  onToggleSidebar: () => void;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm:ss'));
  const [isMobile, setIsMobile] = useState(false);
  const { menuItems, user } = useNavbarVariables();
  const breadcrumbItems = useBreadcrumbStore(state => state.breadcrumbItems);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="flex min-h-16 items-center border-b border-gray-200 bg-white px-4 py-3" data-cy="navbar-container">
      <div className="flex w-full items-center gap-4">
        {/* Mobile Toggle Button */}
        {isMobile && (
          <button
            onClick={onToggleSidebar}
            className="flex-shrink-0 text-gray-600 hover:bg-gray-100 hover:text-lepkom-green rounded-lg p-2 transition-colors"
            data-cy="navbar-sidebar-toggle"
          >
            <FiChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Breadcrumb Area */}
        {breadcrumbItems.length > 0 && (
          <div className="flex-1 min-w-0 overflow-hidden">
            <GlobalBreadcrumb />
          </div>
        )}
        
        {/* Spacer if no breadcrumb */}
        {breadcrumbItems.length === 0 && <div className="flex-1" />}

        {/* Clock & Date Widget */}
        <div className="flex flex-shrink-0 gap-2 whitespace-nowrap text-xs sm:text-sm lg:text-base text-gray-700">
          {/* We omit 'Week' calculation for now as it requires dayjs weekOfYear plugin, let's keep it simple or implement it */}
          {!isMobile && (
            <>
              <span className="font-semibold">{dayjs().format('DD-MMM-YYYY')}</span>
              <span className="font-semibold">{currentTime} WIB</span>
            </>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative ml-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-lepkom-blue text-white shadow focus:outline-none"
            data-cy="avatar-btn"
          >
            <span className="font-bold text-sm">{user?.nama?.charAt(0) || 'U'}</span>
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 z-50">
              {menuItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    item.action();
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  data-cy={`${item.value}-btn`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
