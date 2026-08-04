import React from 'react';
import { cn } from '@/lib/utils';

export interface EmptyCellTextProps {
  text?: string;
  className?: string;
}

/**
 * Komponen teks untuk tabel data ketika ada sel yang kosong/belum diset.
 * Sangat berguna untuk mempertahankan densitas data visual.
 */
export const EmptyCellText: React.FC<EmptyCellTextProps> = ({ 
  text = '(not-set)', 
  className 
}) => {
  return (
    <span className={cn("text-muted-foreground/70 font-semibold italic text-sm", className)}>
      {text}
    </span>
  );
};
