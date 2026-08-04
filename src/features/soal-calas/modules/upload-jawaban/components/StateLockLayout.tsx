import React from 'react';
import { FiLock } from 'react-icons/fi';
import { Card } from '@/components/ui/Card';

interface StateLockLayoutProps {
  title: string;
  description: string;
}

const StateLockLayout: React.FC<StateLockLayoutProps> = ({ title, description }) => {
  return (
    <Card className="p-8 flex flex-col items-center justify-center text-center min-h-[300px] border-dashed">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FiLock className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md">
        {description}
      </p>
    </Card>
  );
};

export default StateLockLayout;

