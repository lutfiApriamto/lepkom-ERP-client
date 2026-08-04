import React from 'react';
import { Button } from '@/components/ui';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  leftPanelContent?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  leftPanelContent,
}) => {
  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Left Panel - Branding/Graphics (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-lepkom-green relative overflow-hidden flex-col justify-between p-12">
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 to-blue-500/20 mix-blend-multiply" />
        <div 
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-white/10 blur-3xl"
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-lepkom-blue/20 blur-3xl"
        />

        {/* Brand Header */}
        <div className="relative z-10 flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-lg">
            <img src="/assets/images/logo.svg" alt="LepKOM Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">HRIS LepKOM</h1>
            <p className="text-blue-100 font-medium text-sm">Human Resource Information System</p>
          </div>
        </div>

        {/* Content Box */}
        <div className="relative z-10">
          {leftPanelContent || (
            <>
              <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                Kelola Sistem Administrasi <br /> dengan Lebih Cerdas.
              </h2>
              <p className="text-blue-100 text-lg max-w-md mb-8 leading-relaxed">
                Platform terpusat untuk proses rekrutmen, penilaian, dan manajemen SDM Lembaga Pengembangan Komputer Gunadarma.
              </p>
              
              <div className="flex items-center space-x-4">
                <Button 
                  className="bg-white text-lepkom-green hover:bg-gray-100 border-none font-semibold shadow-md"
                  onClick={() => window.open('https://vm.lepkom.gunadarma.ac.id/')}
                >
                  Kunjungi Website VM LepKOM
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Copyright */}
        <div className="relative z-10 text-blue-200/60 text-sm">
          &copy; {new Date().getFullYear()} Lembaga Pengembangan Komputer. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 relative">
        {/* Mobile Header (Only visible on mobile) */}
        <div className="lg:hidden flex items-center space-x-3 absolute top-8 left-6">
          <div className="w-10 h-10 bg-lepkom-green rounded-lg flex items-center justify-center p-1.5 shadow-md">
            <img src="/assets/images/logo.svg" alt="LepKOM Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <span className="text-xl font-bold text-gray-900">HRIS</span>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              {title}
            </h2>
            <p className="mt-2 text-gray-500">
              {subtitle}
            </p>
          </div>

          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
