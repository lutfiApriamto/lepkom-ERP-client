import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-lepkom-green rounded-lg flex items-center justify-center p-1.5">
            <img src="/assets/images/logo.svg" alt="LepKOM Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">HRIS LepKOM</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="https://vm.lepkom.gunadarma.ac.id/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-semibold text-gray-600 hover:text-lepkom-blue transition-colors"
          >
            Kunjungi VM LepKOM
          </a>
          <Link to="/login">
            <Button className="bg-lepkom-blue hover:bg-blue-700 text-white font-medium px-6 shadow-sm">
              Masuk
            </Button>
          </Link>
        </nav>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center space-x-4">
          <Link to="/login">
            <Button className="bg-lepkom-blue hover:bg-blue-700 text-white font-medium px-4 shadow-sm text-sm h-9">
              Masuk
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
