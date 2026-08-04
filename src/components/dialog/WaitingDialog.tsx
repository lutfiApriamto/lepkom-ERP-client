import React from 'react';
import { useDialogStore } from '@/hooks/globalStore';
import { Modal } from '@/components/ui/Modal';

const WaitingDialog: React.FC = () => {
  const { openDialog } = useDialogStore();

  return (
    <Modal
      isOpen={!!openDialog['openWaiting']}
      onClose={() => {}} // Non-dismissible
      title=""
      hideHeader
      size="xs"
      contentClassName="p-8 flex flex-col items-center justify-center space-y-6"
    >
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute w-full h-full border-4 border-muted rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-brand-green rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-foreground font-semibold text-lg animate-pulse">Loading...</p>
    </Modal>
  );
};

export default WaitingDialog;
