import React, { useEffect, useRef, useState } from 'react';
import { useDialogStore } from '@/hooks/globalStore';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { FaRegQuestionCircle, FaRegTimesCircle } from 'react-icons/fa';
import { FaCircleInfo } from 'react-icons/fa6';
import { IoWarning } from 'react-icons/io5';
import { LuCopy, LuCheck } from 'react-icons/lu';

const AlertDialog: React.FC = () => {
  const { openDialog, setOpenDialog, alertData: data, resetAlert } = useDialogStore();
  const [progress, setProgress] = useState(100);
  const [showDetail, setShowDetail] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Timer references
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mapping Icon
  const icons: Record<string, { as: React.ElementType; color: string }> = {
    success: { as: IoMdCheckmarkCircleOutline, color: 'text-brand-green' },
    confirm: { as: FaRegQuestionCircle, color: 'text-yellow-500' },
    info: { as: FaCircleInfo, color: 'text-blue-500' },
    warning: { as: IoWarning, color: 'text-yellow-500' },
    error: { as: FaRegTimesCircle, color: 'text-destructive' },
  };

  const currentIcon = icons[data.type] || { as: FaCircleInfo, color: 'text-blue-500' };
  const IconComponent = currentIcon.as;

  // Auto-close Effect
  useEffect(() => {
    if (openDialog['openAlert'] && data.close?.isAuto) {
      const duration = data.close.duration || 5000;
      const interval = 50;
      const steps = duration / interval;
      let currentStep = 0;

      setProgress(100);

      progressIntervalRef.current = setInterval(() => {
        currentStep++;
        const newProgress = 100 - (currentStep / steps) * 100;
        setProgress(newProgress);

        if (currentStep >= steps) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          setOpenDialog('openAlert', false);
          setTimeout(() => {
            resetAlert();
          }, 300);
        }
      }, interval);

      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    } else {
      setProgress(100);
    }
  }, [openDialog, data, setOpenDialog, resetAlert]);

  const handleCopy = async () => {
    if (data.text.detail) {
      await navigator.clipboard.writeText(data.text.detail);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleClose = () => {
    if (data.onCloseCallback) {
      data.onCloseCallback();
    } else {
      setOpenDialog('openAlert', false);
      setTimeout(() => resetAlert(), 300);
    }
  };

  return (
    <Modal
      isOpen={!!openDialog['openAlert']}
      onClose={handleClose}
      title="" // Title hidden
      hideHeader
      size="sm"
      contentClassName="p-0 overflow-hidden" // Remove padding to fit progress bar seamlessly
    >
      {/* Progress Bar (if Auto Close) */}
      {data.close?.isAuto && (
        <div className="w-full h-1 bg-muted absolute top-0 left-0 z-20">
          <div
            className="h-full bg-brand-green transition-all ease-linear"
            style={{ width: `${progress}%`, transitionDuration: '50ms' }}
          />
        </div>
      )}

      <div className="flex flex-col items-center justify-center p-6 text-center space-y-4">
        {/* Animated Icon */}
        <div className={`w-20 h-20 ${currentIcon.color} animate-in zoom-in duration-500`}>
          <IconComponent className="w-full h-full" />
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-foreground" data-testid="alert-dialog-title">
          {data.text.heading}
        </h2>

        {/* Body */}
        <div className="text-muted-foreground text-sm" data-testid="alert-dialog-body">
          {data.text.body}
          
          {data.text.detail && (
            <div className="mt-2">
              <span
                className="text-destructive font-medium cursor-pointer hover:underline"
                onClick={() => setShowDetail(!showDetail)}
              >
                {showDetail ? 'Sembunyikan detail' : 'Klik untuk melihat detail'}
              </span>

              {showDetail && (
                <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md max-h-[200px] overflow-y-auto text-left relative group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-destructive">Detail Error:</span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-7 px-2 text-xs opacity-80 hover:opacity-100"
                      onClick={handleCopy}
                    >
                      {isCopied ? <LuCheck className="w-3 h-3 mr-1 text-brand-green" /> : <LuCopy className="w-3 h-3 mr-1" />}
                      {isCopied ? 'Disalin' : 'Salin'}
                    </Button>
                  </div>
                  <pre className="text-xs text-destructive/90 whitespace-pre-wrap break-words font-mono">
                    {data.text.detail}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center p-6 pt-0">
        {!data.hideCloseButton && (
          <Button
            variant="outline"
            className="w-full sm:w-auto min-w-[120px]"
            onClick={handleClose}
            data-testid="alert-dialog-kembali-mengerti-btn"
          >
            {data.onTrueCallback ? 'Kembali' : 'Mengerti'}
          </Button>
        )}

        {data.onFalseCallback && (
          <Button
            variant="outline"
            className="w-full sm:w-auto min-w-[120px]"
            onClick={data.onFalseCallback}
            {...(data.btnFalse || {})}
          >
            {data.btnFalse?.text || 'Batal'}
          </Button>
        )}

        {data.onTrueCallback && (
          <Button
            variant="default" // Default corresponds to primary/brand-green
            className="w-full sm:w-auto min-w-[120px]"
            onClick={data.onTrueCallback}
            data-testid="alert-dialog-lanjut-btn"
            {...(data.btnTrue || {})}
          >
            {data.btnTrue?.text || 'Lanjut'}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default AlertDialog;
