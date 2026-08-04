import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import { BreadcrumbProvider } from '@/components/breadcrumb/BreadcrumbContext'; 

const UserLayout = () => {
  const [isOpen, setOpen] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{label: string; href?: string}[]>([]);

  // Toggle handler
  const onToggleSidebar = () => setOpen(prev => !prev);
  const onCloseSidebar = () => setOpen(false);

  return (
    <BreadcrumbProvider items={breadcrumbItems}>
      <div className="relative flex h-screen w-full overflow-hidden bg-background">
        
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} onClose={onCloseSidebar} onToggle={onToggleSidebar} />

        {/* Main Content Area */}
        <div
          className="flex flex-1 flex-col overflow-hidden transition-all duration-300 relative z-0"
        >
          {/* Navbar */}
          <Navbar isOpen={isOpen} onToggleSidebar={onToggleSidebar} />

          {/* Scrollable Container */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            <main className="flex-1 bg-background p-4 sm:p-6">
              <Outlet context={{ isOpen, setOpen, setBreadcrumbItems }} />
            </main>
          </div>
        </div>
      </div>
    </BreadcrumbProvider>
  );
};

export default UserLayout;
