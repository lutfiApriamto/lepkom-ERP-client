import React, { useCallback, useMemo } from 'react';
import type { Column } from '@tanstack/react-table';
import Select from 'react-select';
import DebouncedInput from './DebouncedInput';

interface FilterTableProps {
  column: Column<any, unknown>;
  setColumnFilters: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>;
  columnFilters: { id: string; value: string }[];
}

const FilterTable: React.FC<FilterTableProps> = ({ setColumnFilters, columnFilters, column }) => {
  const getFilterValue = useMemo(
    () => columnFilters.find((item) => item.id === column.id),
    [columnFilters, column.id]
  );

  const columnFilterValue = useMemo(
    () => (getFilterValue ? getFilterValue.value : ''),
    [getFilterValue]
  );

  const handleFilterChange = useCallback(
    (columnId: string, value: string) => {
      setColumnFilters((prev) => {
        if (value === '' || value === null || value === undefined) {
          return prev.filter((filter) => filter.id !== columnId);
        }

        const existingFilterIndex = prev.findIndex((filter) => filter.id === columnId);

        if (existingFilterIndex !== -1) {
          const newFilters = [...prev];
          newFilters[existingFilterIndex] = { id: columnId, value };
          return newFilters;
        }

        return [...prev, { id: columnId, value }];
      });
    },
    [setColumnFilters]
  );

  const getHeaderText = useCallback((headerDef: any) => {
    if (headerDef?.title) return headerDef.title;
    if (typeof headerDef?.header === 'string') return headerDef.header;
    if (typeof headerDef?.header === 'function') {
      return headerDef.accessorKey || 'Column';
    }
    return 'Column';
  }, []);

  const handleChange = useCallback(
    (value: string | number) => {
      handleFilterChange(column.id, String(value));
    },
    [handleFilterChange, column.id]
  );

  const handleSelectChange = useCallback(
    (option: any) => {
      handleFilterChange(column.id, option?.value ?? '');
    },
    [handleFilterChange, column.id]
  );

  // Mengambil definisi kolom khusus dari meta agar tipe datanya bersih
  const meta: any = column.columnDef.meta || {};
  const filterType = meta.filterType || 'text';
  const filterOptions = meta.filterOptions || [];

  const placeholder = useMemo(
    () => `Cari ${getHeaderText(column.columnDef)}`,
    [getHeaderText, column.columnDef]
  );

  const selectedOption = useMemo(
    () =>
      columnFilterValue === '' || columnFilterValue == null
        ? null
        : filterOptions.find((opt: any) => String(opt.value) === String(columnFilterValue)) || null,
    [filterOptions, columnFilterValue]
  );

  const selectOptions = useMemo(
    () => filterOptions.filter((opt: any) => opt.value !== ''),
    [filterOptions]
  );

  if (filterType === 'select') {
    return (
      <Select
        menuPortalTarget={document.body}
        placeholder={placeholder}
        value={selectedOption}
        options={selectOptions}
        onChange={handleSelectChange}
        isSearchable={false}
        isClearable={!!columnFilterValue}
        className="w-full text-sm text-left"
        styles={{
          control: (base, _state) => ({
            ...base,
            minHeight: '36px',
            borderRadius: '0.375rem',
            borderColor: !!columnFilterValue 
                ? 'var(--brand-green)' 
                : 'var(--border-default)',
            borderWidth: !!columnFilterValue ? '2px' : '1px',
            boxShadow: 'none',
            '&:hover': {
              borderColor: 'var(--brand-green)',
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? 'var(--brand-green)'
              : state.isFocused
              ? 'var(--bg-page)'
              : 'transparent',
            color: state.isSelected ? '#fff' : 'inherit',
            cursor: 'pointer',
          }),
        }}
        data-testid={`filter-${column.id}-select`}
      />
    );
  }

  return (
    <DebouncedInput
      className="w-full shadow-sm rounded-md"
      onChange={handleChange}
      placeholder={placeholder}
      type="text"
      data-testid={`filter-${column.id}-input`}
      value={columnFilterValue || ''}
    />
  );
};

export default React.memo(FilterTable);
