import React from 'react';
import type { Header } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

interface HeaderCellProps extends React.HTMLAttributes<HTMLDivElement> {
  header: Header<any, unknown>;
  handleSortingChange: (column: any) => void;
}

const HeaderCell: React.FC<HeaderCellProps> = ({
  children,
  header,
  handleSortingChange,
  className,
  ...props
}) => {
  const canSort = header.column.getCanSort();

  return (
    <div
      {...props}
      className={cn(
        "flex w-full items-center justify-center gap-2 bg-transparent text-sm font-semibold text-foreground",
        canSort ? "cursor-pointer hover:text-brand-green transition-colors" : "cursor-default",
        className
      )}
      data-testid={`header-cell-${header.column.id}`}
      onClick={canSort ? () => handleSortingChange(header.column) : undefined}
      title={
        canSort
          ? header.column.getNextSortingOrder() === 'asc'
            ? 'Sort ascending'
            : header.column.getNextSortingOrder() === 'desc'
              ? 'Sort descending'
              : 'Clear sort'
          : undefined
      }
    >
      {children}
    </div>
  );
};

export default HeaderCell;