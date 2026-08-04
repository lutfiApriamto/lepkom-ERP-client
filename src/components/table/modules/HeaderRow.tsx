import React from 'react';
import { TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface HeaderRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

const HeaderRow: React.FC<HeaderRowProps> = ({ children, className, ...props }) => {
  return (
    <TableRow
      className={cn("sticky top-0 z-10 shadow-[0_1px_0_0_var(--border-default)]", className)}
      {...props}
    >
      {children}
    </TableRow>
  );
};

export default HeaderRow;