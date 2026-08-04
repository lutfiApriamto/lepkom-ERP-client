import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import { FiSettings, FiPlusCircle, FiUsers, FiFileText } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { path } from '@/utils/consts';

export const AdminQuickActionsWidget = () => {
  const navigate = useNavigate();

  return (
    <Card header="Jalan Pintas">
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          className="h-auto flex-col items-center justify-center p-6 gap-3 border-dashed hover:border-lepkom-green hover:text-lepkom-green hover:bg-green-50 transition-all"
          onClick={() => navigate(path.lepkom.masterData.calas.default)}
        >
          <FiPlusCircle className="w-8 h-8" />
          <span className="font-medium">Calon Asisten</span>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto flex-col items-center justify-center p-6 gap-3 border-dashed hover:border-blue-500 hover:text-blue-500 hover:bg-blue-50 transition-all"
          onClick={() => navigate(path.lepkom.masterData.asisten.default)}
        >
          <FiUsers className="w-8 h-8" />
          <span className="font-medium">Kelola Asisten</span>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto flex-col items-center justify-center p-6 gap-3 border-dashed hover:border-purple-500 hover:text-purple-500 hover:bg-purple-50 transition-all"
          onClick={() => navigate(path.lepkom.masterData.soal.default)}
        >
          <FiFileText className="w-8 h-8" />
          <span className="font-medium">Kelola Soal</span>
        </Button>

        <Button 
          variant="outline" 
          className="h-auto flex-col items-center justify-center p-6 gap-3 border-dashed hover:border-orange-500 hover:text-orange-500 hover:bg-orange-50 transition-all"
          onClick={() => navigate(path.lepkom.masterData.default)}
        >
          <FiSettings className="w-8 h-8" />
          <span className="font-medium">Master Data</span>
        </Button>
      </div>
    </Card>
  );
};
