import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { FiCalendar, FiMap, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { path } from '@/utils/consts';

export const KoordinatorQuickActionsWidget = () => {
  const navigate = useNavigate();

  return (
    <Card header="Jalan Pintas">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="h-auto flex-col items-center justify-center p-6 gap-3 border-dashed hover:border-lepkom-green hover:text-lepkom-green hover:bg-green-50 transition-all"
          onClick={() => navigate(path.lepkom.masterData.rekrutmen.default)}
        >
          <FiCalendar className="w-8 h-8" />
          <span className="font-medium text-xs text-center">Kelola Sesi</span>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto flex-col items-center justify-center p-6 gap-3 border-dashed hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all"
          onClick={() => navigate(path.lepkom.penugasan?.penempatanRuanganAsisten?.default || '/lepkom/penugasan/penempatan-ruangan-asisten')}
        >
          <FiMap className="w-8 h-8" />
          <span className="font-medium text-xs text-center">Penempatan Ruangan</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto flex-col items-center justify-center p-6 gap-3 border-dashed hover:border-purple-500 hover:text-purple-500 hover:bg-purple-50 transition-all"
          onClick={() => navigate(path.lepkom.masterData.soal.default)}
        >
          <FiFileText className="w-8 h-8" />
          <span className="font-medium text-xs text-center">Kelola Soal</span>
        </Button>
      </div>
    </Card>
  );
};
