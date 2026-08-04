import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
            Sistem Informasi <span className="text-lepkom-green">Sumber Daya Manusia</span> LepKOM
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Platform terpadu untuk memfasilitasi administrasi, rekrutmen, penjadwalan, dan pengelolaan kinerja di lingkungan Lembaga Pengembangan Komputer Universitas Gunadarma.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-lepkom-green hover:bg-green-700 text-white font-semibold shadow-md px-8 h-12 text-base">
                Masuk ke Sistem <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
