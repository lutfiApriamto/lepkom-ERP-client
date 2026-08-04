import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicNavbar } from '@/components/layout/navbar';
import { Button } from '@/components/ui';

export const PublicErrorNotFound = () => {
  return (
    <div className="flex min-h-screen flex-row">
      <div className="flex min-h-screen flex-1 flex-col">
        <PublicNavbar />
        <main className="flex flex-1 items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
          <div className="w-full text-center">
            <p className="text-xl font-medium text-lepkom-blue dark:text-blue-400">
              404
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-7xl">
              Halaman tidak ditemukan
            </h1>
            <p className="mt-4 text-base font-medium text-gray-500 dark:text-gray-400 md:text-xl">
              Maaf, kami tidak dapat menemukan halaman yang Anda tuju.
            </p>
            <div className="mt-8 flex flex-row justify-center gap-4">
              <Link to="/">
                <Button className="bg-lepkom-blue hover:bg-lepkom-blue/90 text-white">
                  Kembali ke Beranda
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => window.open('https://glpi.pti-cosmetics.com')}
                className="text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
              >
                Hubungi Support <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
