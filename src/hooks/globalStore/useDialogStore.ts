import { create } from 'zustand';
import React from 'react';

export interface DialogActionProps {
  text?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'primary' | 'danger';
  className?: string;
  onCallback?: () => void;
  btnProps?: Record<string, any>;
}

export interface DialogContentState {
  title?: string;
  body?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isCloseTrigger?: boolean;
  closeOnInteraction?: boolean;
  action?: {
    close?: DialogActionProps;
    cancel?: DialogActionProps;
    confirm?: DialogActionProps;
    submit?: DialogActionProps;
  };
  props?: {
    root?: Record<string, any>;
    footer?: Record<string, any>;
  };
}

export interface AlertCloseConfig {
  isAuto?: boolean;
  duration?: number;
}

export interface AlertDataState {
  type: 'success' | 'confirm' | 'info' | 'warning' | 'error' | '';
  text: {
    heading?: string;
    body?: React.ReactNode;
    detail?: string;
  };
  close?: AlertCloseConfig;
  hideCloseButton?: boolean;
  btnTrue?: { text?: string } & Record<string, any>;
  btnFalse?: { text?: string } & Record<string, any>;
  onTrueCallback?: () => void;
  onFalseCallback?: () => void;
  onCloseCallback?: () => void;
}

interface DialogStoreState {
  openDialog: Record<string, boolean>;
  dialogContent: DialogContentState;
  alertData: AlertDataState;
  setOpenDialog: (option: string, value: boolean) => void;
  setDialogContent: (value: DialogContentState) => void;
  setAlert: (value: Partial<AlertDataState>) => void;
  resetAlert: () => void;
}

const initialDialogContent: DialogContentState = {
  title: '',
  body: null,
};

const initialAlertData: AlertDataState = {
  type: '',
  text: {},
};

export const useDialogStore = create<DialogStoreState>((set) => ({
  openDialog: {},
  dialogContent: initialDialogContent,
  alertData: initialAlertData,
  
  setOpenDialog: (option, value) => {
    set((state) => ({
      openDialog: { ...state.openDialog, [option]: value },
    }));
  },
  
  setDialogContent: (value) => {
    set((state) => ({
      openDialog: { ...state.openDialog, defaultDialog: true },
      dialogContent: value,
    }));
  },
  
  setAlert: (value) => {
    set((state) => ({
      openDialog: { ...state.openDialog, openAlert: true },
      alertData: { ...state.alertData, ...value } as AlertDataState,
    }));
  },
  
  resetAlert: () => {
    set((state) => ({
      openDialog: { ...state.openDialog, openAlert: false },
      alertData: initialAlertData,
    }));
  },
}));
