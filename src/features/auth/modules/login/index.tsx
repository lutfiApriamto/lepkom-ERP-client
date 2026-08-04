import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthLayout } from './components/AuthLayout';
import { LoginTabSwitcher } from './components/LoginTabSwitcher';

const LoginPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'calas' ? 'calas' : 'asisten';
  const [activeTab, setActiveTab] = useState<'asisten' | 'calas'>(initialRole);

  // Sync tab state with URL parameter without reloading
  const handleTabChange = (tab: 'asisten' | 'calas') => {
    setActiveTab(tab);
    setSearchParams({ role: tab }, { replace: true });
  };

  return (
    <AuthLayout
      title="Selamat Datang Kembali"
      subtitle="Silakan masuk untuk melanjutkan akses Anda ke dashboard."
    >
      <LoginTabSwitcher activeTab={activeTab} onTabChange={handleTabChange} />
    </AuthLayout>
  );
};

export default LoginPage;
