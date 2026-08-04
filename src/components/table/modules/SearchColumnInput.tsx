import React from 'react';
import type { Column } from '@tanstack/react-table';
import DebouncedInput from './DebouncedInput';
import { FiSearch } from 'react-icons/fi';

interface SearchColumnInputProps {
  column: Column<any, unknown>;
  columnFilters: { id: string; value: string }[];
  setColumnFilters: React.Dispatch<React.SetStateAction<{ id: string; value: string }[]>>;
}

const SearchColumnInput: React.FC<SearchColumnInputProps> = ({
  column,
  columnFilters,
  setColumnFilters,
}) => {
  const meta: any = column.columnDef.meta || {};

  // Kolom yang isSearch=false tetap punya sel, hanya tanpa input (menjaga alignment)
  if (!meta.isSearch) {
    return <div className="h-9" data-testid={`search-${column.id}-placeholder`} />;
  }

  const current = columnFilters.find((f) => f.id === column.id)?.value ?? '';

  const handleChange = (value: string | number) => {
    const strValue = String(value);
    setColumnFilters((prev) => {
      if (!strValue) return prev.filter((f) => f.id !== column.id);
      const idx = prev.findIndex((f) => f.id === column.id);
      if (idx !== -1) {
        const next = [...prev];
        next[idx] = { id: column.id, value: strValue };
        return next;
      }
      return [...prev, { id: column.id, value: strValue }];
    });
  };

  if (meta.filterOptions) {
    return (
      <select
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="h-9 w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green"
      >
        <option value="">Semua</option>
        {meta.filterOptions.map((opt: { label: string; value: string | number }) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <DebouncedInput
      value={current}
      onChange={handleChange}
      placeholder={`Cari ${meta.title || column.id}`}
      icon={<FiSearch className="h-3.5 w-3.5" />}
      className="h-9 text-xs"
      data-testid={`search-${column.id}-input`}
    />
  );
};

export default React.memo(SearchColumnInput);