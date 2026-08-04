import React from 'react';
import { clsx } from 'clsx';
import { LoginFormAsisten } from './LoginFormAsisten';
import { LoginFormCalas } from './LoginFormCalas';

interface LoginTabSwitcherProps {
  activeTab: 'asisten' | 'calas';
  onTabChange: (tab: 'asisten' | 'calas') => void;
}

export const LoginTabSwitcher: React.FC<LoginTabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-full">
      {/* Custom Tabs List */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
        <button
          onClick={() => onTabChange('asisten')}
          className={clsx(
            "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
            activeTab === 'asisten' 
              ? "bg-white text-lepkom-blue shadow-sm" 
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Masuk sebagai Asisten
        </button>
        <button
          onClick={() => onTabChange('calas')}
          className={clsx(
            "flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
            activeTab === 'calas' 
              ? "bg-white text-lepkom-green shadow-sm" 
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          Masuk sebagai Calas
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'asisten' ? <LoginFormAsisten /> : <LoginFormCalas />}
      </div>
    </div>
  );
};
