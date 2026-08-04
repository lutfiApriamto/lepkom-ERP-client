import React from 'react';
import { useDialogStore } from '@/hooks/globalStore';
import type { DialogActionProps } from '@/hooks/globalStore';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui';

const BUTTON_CONFIG: Record<string, { defaultText: string; variant: DialogActionProps['variant'] }> = {
  close: { defaultText: 'Tutup', variant: 'outline' },
  cancel: { defaultText: 'Batal', variant: 'outline' },
  confirm: { defaultText: 'Konfirmasi', variant: 'default' },
  submit: { defaultText: 'Simpan', variant: 'default' },
};

const BUTTON_ORDER = ['close', 'cancel', 'confirm', 'submit'];

const DefaultDialog: React.FC = () => {
  const { openDialog, dialogContent, setOpenDialog } = useDialogStore();

  const renderButton = (type: string) => {
    // Check if the action object exists and has the specific button type
    const btnData = dialogContent?.action?.[type as keyof typeof dialogContent.action];
    const btnConfig = BUTTON_CONFIG[type];

    if (!btnData) return null;

    return (
      <Button
        key={`${type}-btn`}
        variant={btnData.variant || btnConfig.variant}
        onClick={btnData.onCallback}
        className={btnData.className}
        {...(btnData.btnProps || {})}
      >
        {btnData.text || btnConfig.defaultText}
      </Button>
    );
  };

  const handleClose = () => {
    if (dialogContent?.closeOnInteraction !== false) {
      setOpenDialog('defaultDialog', false);
    }
  };

  // Build footer dynamically based on dialogContent.action
  const hasActions = dialogContent?.action && Object.keys(dialogContent.action).length > 0;
  
  const footerContent = hasActions ? (
    <div className="flex w-full justify-end gap-3" {...(dialogContent?.props?.footer || {})}>
      {BUTTON_ORDER.map((type) => renderButton(type))}
    </div>
  ) : undefined;

  return (
    <Modal
      isOpen={!!openDialog['defaultDialog']}
      onClose={handleClose}
      title={dialogContent?.title}
      size={dialogContent?.size || 'md'}
      footer={footerContent}
      hideCloseButton={dialogContent?.isCloseTrigger === false}
    >
      {dialogContent?.body}
    </Modal>
  );
};

export default DefaultDialog;
