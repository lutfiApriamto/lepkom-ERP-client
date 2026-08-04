import { Card } from '@/components/ui/Card';
import { FiActivity } from 'react-icons/fi';

export const AdminActivitiesWidget = () => {
  return (
    <Card header="Aktivitas Terkini">
      <div className="flex h-full flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-gray-50 p-4">
          <FiActivity className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">Belum ada aktivitas rekrutmen terbaru hari ini.</p>
      </div>
    </Card>
  );
};
