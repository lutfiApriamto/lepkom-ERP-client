import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaCircleInfo } from 'react-icons/fa6';
import { FaRegTimesCircle } from 'react-icons/fa';
import { IoWarning } from 'react-icons/io5';
import { LuX } from 'react-icons/lu';
import { Skeleton } from '@/components/ui';

interface InfoAlertProps {
  title?: string;
  description?: React.ReactNode;
  status?: 'success' | 'warning' | 'error' | 'info';
  isCloseable?: boolean;
  loading?: boolean;
}

const InfoAlert: React.FC<InfoAlertProps> = ({
  title,
  description,
  status = 'info',
  isCloseable = true,
  loading = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  if (loading) {
    return <Skeleton className="w-full h-16 rounded-md" />;
  }

  const statusConfig = {
    success: {
      border: 'border-l-brand-green',
      bg: 'bg-brand-green/10',
      icon: <IoMdCheckmarkCircleOutline className="w-5 h-5 text-brand-green mt-0.5" />,
      text: 'text-brand-green',
    },
    warning: {
      border: 'border-l-yellow-500',
      bg: 'bg-yellow-500/10',
      icon: <IoWarning className="w-5 h-5 text-yellow-500 mt-0.5" />,
      text: 'text-yellow-700',
    },
    error: {
      border: 'border-l-destructive',
      bg: 'bg-destructive/10',
      icon: <FaRegTimesCircle className="w-5 h-5 text-destructive mt-0.5" />,
      text: 'text-destructive',
    },
    info: {
      border: 'border-l-blue-500',
      bg: 'bg-blue-500/10',
      icon: <FaCircleInfo className="w-5 h-5 text-blue-500 mt-0.5" />,
      text: 'text-blue-700',
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`relative flex items-start p-4 mb-4 border border-border/50 border-l-[5px] rounded-r-md rounded-l-sm ${config.bg} ${config.border} shadow-sm`}>
      <div className="flex-shrink-0 mr-3">
        {config.icon}
      </div>
      <div className="flex-1">
        {title && <h3 className={`text-sm font-bold ${config.text}`}>{title}</h3>}
        {description && <div className={`text-sm mt-1 text-foreground/80`}>{description}</div>}
      </div>
      {isCloseable && (
        <button
          type="button"
          className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-ring hover:bg-black/5 transition-colors"
          onClick={() => setIsVisible(false)}
        >
          <span className="sr-only">Dismiss</span>
          <LuX className="w-5 h-5 text-muted-foreground hover:text-foreground" />
        </button>
      )}
    </div>
  );
};

export default InfoAlert;
