import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SkeletonBodyProps {
  tableTitle: string;
  columnCount: number;
  rowCount: number;
}

const SkeletonBody: React.FC<SkeletonBodyProps> = ({ tableTitle, columnCount, rowCount }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <TableRow key={`${tableTitle}-skeleton-${rowIndex}`} className="hover:bg-transparent">
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <TableCell key={`col-${colIndex}`} className="p-4 border-r border-border last:border-r-0 text-center">
              <div className="flex items-center justify-center">
                <Skeleton className={cn("h-4 rounded-md", colIndex % 3 === 0 ? "w-2/3" : colIndex % 2 === 0 ? "w-1/2" : "w-3/4")} />
              </div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonBody;