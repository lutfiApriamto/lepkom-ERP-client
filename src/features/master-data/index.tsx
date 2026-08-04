import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout/ContentLayout';
import { Card } from '@/components/ui/Card';
import { useBreadcrumbStore } from '@/hooks/globalStore/useBreadcrumbStore';
import { useAuthStore } from '@/features/auth/shared/store/useAuthStore';
import { path } from '@/utils/consts';
import { masterDataMenu } from '@/routes/config/menu/master-data';

const MasterDataDashboard = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();
  const { role } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Master Data', path: path.lepkom.masterData.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  // Filter menus based on user role
  const allowedMenus = masterDataMenu.children.filter((menu) => {
    if (!role) return false;
    return menu.role.includes(role);
  });

  return (
    <ContentLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Menu Master Data</h1>
          <p className="text-gray-500 mt-1">Pilih modul master data yang ingin Anda kelola.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allowedMenus.map((menu) => (
            <Card 
              key={menu.key} 
              className="group cursor-pointer hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-lepkom-green/50"
              onClick={() => menu.path !== '#' && navigate(menu.path)}
            >
              <div className="flex flex-col items-center text-center p-5">
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                  <menu.icon className="w-6 h-6 text-lepkom-green" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">{menu.label}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{menu.description}</p>
              </div>
            </Card>
          ))}
          
          {allowedMenus.length === 0 && (
            <div className="col-span-full py-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              Anda tidak memiliki akses ke modul Master Data apa pun.
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
};

export default MasterDataDashboard;
