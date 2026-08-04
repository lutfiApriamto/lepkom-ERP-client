import React, { useEffect, useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getFilteredRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import type { SortingState, VisibilityState } from '@tanstack/react-table';
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import {
  HeaderCell,
  HeaderRow,
  EmptyStateTable,
  SkeletonBody,
  SearchColumnInput,
} from './modules';

interface ColumnDefConfig {
  accessorKey?: string;
  accessor?: string;
  id?: string;
  title?: string;
  renderCell?: (info: any) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  sorting?: boolean;   // klik nama field untuk sort (single-column only)
  isSearch?: boolean;  // tampilkan search box di bawah nama field
  filterOptions?: { label: string; value: string | number }[]; // opsi untuk dropdown filter
  filterFn?: any; // custom filter function
  hidden?: boolean;
  sticky?: 'left';
  size?: number;
  minSize?: number;
}

interface DefaultTableProps {
  title?: string;
  data: any;
  columnDefs: ColumnDefConfig[];
  columnFilters?: { id: string; value: string }[];
  setColumnFilters?: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>;
  sort?: string;
  setSort?: (key: string, value: any) => void;
  emptyState?: { title?: string; subTitle?: string };
  loading?: boolean;
  loadingCountRows?: number;
  getRowStyle?: (rowData: any) => React.HTMLAttributes<HTMLTableRowElement>;
  isError?: boolean;
  errorType?: 'unauthorized' | 'generic';
  errorMsg?: string;
}

const DefaultTable: React.FC<DefaultTableProps> = ({
  title = 'table',
  data,
  columnDefs,
  columnFilters = [],
  setColumnFilters,
  sort,
  setSort,
  emptyState,
  loading = false,
  loadingCountRows = 5,
  getRowStyle = () => ({}),
  isError = false,
  errorType = 'generic',
  errorMsg = '',
}) => {
  const [sortingState, setSortingState] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    return Object.fromEntries(
      columnDefs
        .filter((col) => col.hidden)
        .map((col) => [col.id || col.accessorKey || (col.accessor as string), false])
    );
  });

  const columnHelper = createColumnHelper<any>();

  const hasSearchableColumns = useMemo(
    () => columnDefs.some((col) => col.isSearch),
    [columnDefs]
  );

  const columns = useMemo(() => {
    return columnDefs.map((col) => {
      const accessor = (col.accessorKey || col.accessor) as string;
      const {
        title,
        renderCell,
        renderHeader,
        id,
        sorting,
        isSearch,
        sticky,
        size,
        minSize,
      } = col;

      if (accessor) {
        return columnHelper.accessor(accessor, {
          id: id || accessor,
          header: renderHeader || (() => title),
          cell: renderCell || ((info) => info.getValue()),
          enableSorting: !!sorting,
          enableColumnFilter: !!isSearch,
          filterFn: col.filterFn,
          size,
          minSize,
          meta: {
            title,
            isSearch: !!isSearch,
            filterOptions: col.filterOptions,
            sticky,
          },
        });
      }

      return columnHelper.display({
        id: id as string,
        header: renderHeader || (() => title),
        cell: renderCell,
        size,
        minSize,
        meta: {
          title,
          sticky,
        },
      });
    });
  }, [columnDefs]);

  const tableData = useMemo(() => {
    return data?.data ? data.data : Array.isArray(data) ? data : [];
  }, [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnFilters: hasSearchableColumns,
    enableMultiSort: false, // Single sort only
    state: { sorting: sortingState, columnVisibility, columnFilters },
    onSortingChange: setSortingState,
    onColumnVisibilityChange: setColumnVisibility,
  });

  const handleSortingChange = (column: any) => {
    const canSort = column.getCanSort();
    if (!canSort) return;
    setSortingState((prevSorting) => {
      if (prevSorting.length === 0) return [{ id: column.id, desc: false }];
      if (prevSorting[0].id === column.id) {
        if (prevSorting[0].desc === true) return [];
        return [{ id: column.id, desc: true }];
      }
      return [{ id: column.id, desc: false }];
    });
  };

  useEffect(() => {
    if (setSort) setSort('sortState', sortingState);
  }, [sortingState, setSort]);

  useEffect(() => {
    if (!sort) {
      setSortingState([]);
    } else {
      const [id, direction] = sort.split(',');
      setSortingState([{ id, desc: direction === 'desc' }]);
    }
  }, [sort]);

  useEffect(() => {
    const newColumnVisibility: VisibilityState = {};
    columnDefs.forEach((col) => {
      const columnId = col.id || col.accessorKey || (col.accessor as string);
      newColumnVisibility[columnId] = col.hidden !== true;
    });
    setColumnVisibility(newColumnVisibility);
  }, [columnDefs]);

  const isSearchActive = columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full overflow-auto rounded-lg border border-border bg-card shadow-sm">
        <Table className="min-w-max border-collapse">
          <TableHeader className="bg-muted/40">
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {/* Baris 1: Nama field + trigger sorting */}
                <HeaderRow>
                  {headerGroup.headers.map((header) => {
                    const meta: any = header.column.columnDef.meta || {};
                    const isSticky = meta.sticky === 'left';

                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          minWidth: header.column.columnDef.minSize,
                          width: header.column.columnDef.size,
                        }}
                        className={cn(
                          "h-12 border-b-0 border-r border-border last:border-r-0 px-4",
                          isSticky && "sticky left-0 z-20 bg-muted/40 shadow-[1px_0_0_0_var(--border-default)]"
                        )}
                      >
                        <HeaderCell header={header} handleSortingChange={handleSortingChange}>
                          <div className="flex flex-row items-center justify-center gap-1.5">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() && (
                              <span className="text-[10px] text-brand-green ml-1">
                                {header.column.getIsSorted() === 'asc' ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
                              </span>
                            )}
                          </div>
                        </HeaderCell>
                      </TableHead>
                    );
                  })}
                </HeaderRow>

                {/* Baris 2: Search per-kolom — selalu tampil jika ada 1+ kolom isSearch */}
                {hasSearchableColumns && (
                  <HeaderRow className="border-t border-border bg-muted/10">
                    {headerGroup.headers.map((header) => {
                      const meta: any = header.column.columnDef.meta || {};
                      const isSticky = meta.sticky === 'left';

                      return (
                        <TableHead
                          key={`search-${header.id}`}
                          className={cn(
                            "p-2 border-r border-border last:border-r-0",
                            isSticky && "sticky left-0 z-20 bg-muted/10"
                          )}
                        >
                          <SearchColumnInput
                            column={header.column}
                            columnFilters={columnFilters}
                            setColumnFilters={setColumnFilters!}
                          />
                        </TableHead>
                      );
                    })}
                  </HeaderRow>
                )}
              </React.Fragment>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              <SkeletonBody
                tableTitle={title}
                columnCount={columns.length}
                rowCount={loadingCountRows}
              />
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, rowIndex) => {
                const rowData = row.original;
                const { className: rowClassName, ...rowStyleProps } = (getRowStyle(rowData) || {}) as React.HTMLAttributes<HTMLTableRowElement>;

                return (
                  <TableRow
                    key={row.id}
                    data-testid={`table-row-${rowIndex}`}
                    className={cn("hover:bg-muted/30 transition-colors", rowClassName)}
                    {...rowStyleProps}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const meta: any = cell.column.columnDef.meta || {};
                      const isSticky = meta.sticky === 'left';

                      return (
                        <TableCell
                          key={cell.id}
                          id={cell.id}
                          data-testid={`table-cell-${cell.column.id}-${rowIndex}`}
                          className={cn(
                            "border-r border-border p-3 last:border-r-0 text-center text-sm",
                            isSticky && "sticky left-0 z-10 bg-card shadow-[1px_0_0_0_var(--border-default)] group-hover:bg-muted/30 transition-colors"
                          )}
                        >
                          {flexRender(cell.column.columnDef.cell, {
                            ...cell.getContext(),
                            rowIndex,
                          } as any)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-64 text-center">
                  <EmptyStateTable
                    emptyState={emptyState}
                    isError={isError}
                    errorType={errorType}
                    errorMsg={errorMsg}
                    isSearchActive={isSearchActive}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DefaultTable;