import toast, { Toaster } from 'react-hot-toast';

export const GlobalToaster = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          fontFamily: 'var(--font-sans)',
          background: 'var(--bg-surface)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-default)',
          fontSize: '14px',
          padding: '12px 16px',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        },
        success: {
          iconTheme: {
            primary: 'var(--status-green)', 
            secondary: 'var(--bg-surface)',
          },
        },
        error: {
          duration: 5000,
          iconTheme: {
            primary: 'var(--status-red)', 
            secondary: 'var(--bg-surface)',
          },
        },
        loading: {
          iconTheme: {
            primary: 'var(--brand-green)',
            secondary: 'var(--bg-page)',
          },
        },
      }}
    />
  );
};

export const toaster = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  loading: (msg: string = 'Sedang memproses...') => toast.loading(msg),
  dismiss: (id?: string) => toast.dismiss(id),
  raw: toast,
};
