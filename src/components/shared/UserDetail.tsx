import React from 'react';
import { getAuthUserData } from '@/utils/helpers/authUserData';
import { cn } from '@/lib/utils';

export const UserDetail: React.FC = () => {
  const authUser = getAuthUserData();

  // Warna avatar dinamis berdasarkan Brand Guidelines LepKOM
  const colorPaletteAvatar = [
    'bg-[#156935]', // brand green
    'bg-[#23376c]', // brand blue
    'bg-[#10B981]', // success green
    'bg-[#F59E0B]', // warning yellow
  ];
  
  const pickPalette = (name: string) => {
    const index = name.charCodeAt(0) % colorPaletteAvatar.length;
    return colorPaletteAvatar[index];
  };

  const name = authUser?.name || 'Guest User';
  const initial = name.charAt(0).toUpperCase();
  const roleDisplay = authUser?.roleName || authUser?.role || 'Guest';

  return (
    <div className="flex items-center gap-4 px-4 py-2">
      {/* Avatar Manual (Didesain murni menggunakan Tailwind untuk performa) */}
      <div 
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white font-bold text-xl",
          pickPalette(name)
        )}
      >
        {initial}
      </div>
      
      {/* Detail Text */}
      <div className="flex w-full flex-col gap-0.5">
        <span className="text-base font-semibold text-foreground truncate max-w-[180px]">
          {name}
        </span>
        <span className="text-sm text-muted-foreground truncate max-w-[180px]">
          {authUser?.email || '-'}
        </span>
        <span className="mt-1 w-fit rounded-lg bg-[#23376c] px-2.5 py-0.5 text-xs font-medium text-white">
          {roleDisplay}
        </span>
      </div>
    </div>
  );
};
