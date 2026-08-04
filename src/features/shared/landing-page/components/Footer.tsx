import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <div className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Lembaga Pengembangan Komputer. All rights reserved.
        </div>
        <div className="flex items-center space-x-6">
          <a 
            href="https://lepkom.gunadarma.ac.id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-lepkom-blue transition-colors"
          >
            Situs Web Utama
          </a>
          <a 
            href="https://vm.lepkom.gunadarma.ac.id/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-lepkom-green transition-colors"
          >
            Situs Web VM LepKOM
          </a>
        </div>
      </div>
    </footer>
  );
};
