import React from 'react';
import DefaultDialog from './DefaultDialog';
import AlertDialog from './AlertDialog';
import WaitingDialog from './WaitingDialog';

const GlobalDialogs: React.FC = () => {
  return (
    <>
      <DefaultDialog />
      <AlertDialog />
      <WaitingDialog />
    </>
  );
};

export default GlobalDialogs;
