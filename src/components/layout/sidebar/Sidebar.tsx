import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { mainMenus } from '@/routes/main';
import { NavigationItem } from './modules';
import { useAuthStore } from '@/features/auth/shared/store';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onToggle }) => {
  const { user } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mainMenuList = (mainMenus as any[]).filter(menu => 
    menu.role?.includes(user?.role as string)
  );

  const dashboardMenuList = mainMenuList.filter(menu => menu.type === 'dashboard');
  const defaultMenuList = mainMenuList.filter(menu => menu.type === 'default');
  const processMenuList = mainMenuList.filter(menu => menu.type === 'process');
  const masterDataMenuList = mainMenuList.filter(menu => menu.type === 'master');
  const managementMenuList = mainMenuList.filter(menu => menu.type === 'management');

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out shadow-sm
          ${isMobile ? 'fixed inset-y-0 left-0' : 'relative h-screen'}
          ${isOpen ? (isMobile ? 'w-[75vw] max-w-sm translate-x-0' : 'w-64') : (isMobile ? 'w-0 -translate-x-full overflow-hidden border-none' : 'w-20')}
        `}
        data-cy="sidebar-container"
      >
        {/* Desktop Toggle Button (Floating Edge) */}
        {!isMobile && (
          <button
            onClick={onToggle}
            className="absolute -right-3 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-md hover:bg-gray-50 hover:text-lepkom-green focus:outline-none z-50 transition-colors"
            data-cy="sidebar-desktop-toggle-btn"
          >
            {isOpen ? <FiChevronLeft className="h-4 w-4" /> : <FiChevronRight className="h-4 w-4" />}
          </button>
        )}

        {/* Sidebar Header / Brand */}
        <div className={`flex h-16 items-center border-b border-gray-100 ${isOpen ? 'justify-start px-6' : 'justify-center'} transition-all`}>
          <Link to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="flex flex-shrink-0 items-center justify-center">
              <img src="/assets/images/logo.png" alt="Logo LepKOM" className="h-8 w-auto object-contain" />
            </div>
            {isOpen && (
              <span className="whitespace-nowrap font-bold text-lg text-gray-800 tracking-tight">
                HRIS LepKOM
              </span>
            )}
          </Link>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <div className="flex flex-col space-y-1 p-3">
            {dashboardMenuList.map((menuItem) => (
              <React.Fragment key={menuItem.path || menuItem.label}>
                {menuItem.path && (
                  <NavigationItem
                    item={menuItem}
                    isOpen={isOpen}
                    isMobile={isMobile}
                    onClose={onClose}
                  />
                )}
                {menuItem.children && (menuItem.children as any[]).map(child => (
                   child.role?.includes(user?.role as string) && child.path && (
                    <NavigationItem
                      key={child.path}
                      item={child}
                      isOpen={isOpen}
                      isMobile={isMobile}
                      onClose={onClose}
                    />
                  )
                ))}
              </React.Fragment>
            ))}

            {defaultMenuList.map(item => (
              item.path && (
                <NavigationItem
                  key={item.path}
                  item={item}
                  isOpen={isOpen}
                  isMobile={isMobile}
                  onClose={onClose}
                />
              )
            ))}

            {processMenuList.length > 0 && (
              <>
                <div className={`mt-6 mb-2 px-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {isOpen && <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Proses</span>}
                </div>
                {processMenuList.map(item => (
                  item.path && (
                    <NavigationItem
                      key={item.path}
                      item={item}
                      isOpen={isOpen}
                      isMobile={isMobile}
                      onClose={onClose}
                    />
                  )
                ))}
              </>
            )}

            {managementMenuList.length > 0 && (
              <>
                <div className={`mt-6 mb-2 px-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {isOpen && <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Manajemen</span>}
                </div>
                {managementMenuList.map(item => (
                  item.path && (
                    <NavigationItem
                      key={item.path}
                      item={item}
                      isOpen={isOpen}
                      isMobile={isMobile}
                      onClose={onClose}
                    />
                  )
                ))}
              </>
            )}

            {masterDataMenuList.length > 0 && (
              <>
                <div className={`mt-6 mb-2 px-3 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                  {isOpen && <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Master</span>}
                </div>
                {masterDataMenuList.map(item => (
                  item.path && (
                    <NavigationItem
                      key={item.path}
                      item={item}
                      isOpen={isOpen}
                      isMobile={isMobile}
                      onClose={onClose}
                    />
                  )
                ))}
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
