import React from 'react';
import { HiColorSwatch, HiOutlineExclamationCircle, HiOutlineSearch, HiOutlineLockClosed } from 'react-icons/hi';

interface EmptyStateTableProps {
  isError?: boolean;
  errorType?: 'unauthorized' | 'generic';
  errorMsg?: string;
  isSearchActive?: boolean;
  emptyState?: {
    title?: string;
    subTitle?: string;
  };
}

const EmptyStateTable: React.FC<EmptyStateTableProps> = ({
  isError,
  errorType = 'generic',
  errorMsg,
  isSearchActive,
  emptyState,
}) => {
  // 1. Error dari server / unauthorized
  if (isError) {
    const isUnauthorized = errorType === 'unauthorized';
    return (
      <div className="flex w-full flex-col items-center justify-center py-16 text-center text-destructive">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 ring-4 ring-destructive/5">
          {isUnauthorized ? (
            <HiOutlineLockClosed className="h-7 w-7 text-destructive" />
          ) : (
            <HiOutlineExclamationCircle className="h-7 w-7 text-destructive" />
          )}
        </div>
        <h3 className="mb-1.5 text-lg font-semibold text-foreground">
          {isUnauthorized ? 'Akses Ditolak' : 'Terjadi Kesalahan'}
        </h3>
        <p className="text-sm text-muted-foreground max-w-[300px]">
          {errorMsg ||
            (isUnauthorized
              ? 'Anda tidak memiliki izin untuk mengakses data ini. Silakan hubungi administrator.'
              : 'Gagal memuat data dari server. Pastikan koneksi Anda stabil atau hubungi administrator.')}
        </p>
      </div>
    );
  }

  // 2. Pencarian aktif tapi tidak ada hasil
  if (isSearchActive) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-16 text-center text-muted-foreground">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10 ring-4 ring-brand-green/5">
          <HiOutlineSearch className="h-7 w-7 text-brand-green" />
        </div>
        <h3 className="mb-1.5 text-lg font-semibold text-foreground">
          Data tidak ditemukan
        </h3>
        <ul className="text-sm max-w-[320px] list-disc list-inside text-left space-y-1 mx-auto">
          <li>Coba hapus pencarian pada salah satu kolom</li>
          <li>Gunakan kata kunci yang berbeda</li>
        </ul>
      </div>
    );
  }

  // 3. Database memang kosong
  return (
    <div className="flex w-full flex-col items-center justify-center py-16 text-center text-muted-foreground">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted ring-4 ring-muted/50 transition-all hover:scale-105">
        <HiColorSwatch className="h-7 w-7 text-brand-blue" />
      </div>
      <h3 className="mb-1.5 text-lg font-semibold text-foreground">
        {emptyState?.title || 'Belum ada data'}
      </h3>
      <p className="text-sm max-w-[350px]">
        {emptyState?.subTitle || 'Data untuk tabel ini masih kosong. Silakan tambahkan data baru terlebih dahulu.'}
      </p>
    </div>
  );
};

export default EmptyStateTable;