import { useEffect } from 'react';

type ColumnFilterType = { id: string; value: string }[];
type FilterType = Record<string, string>;
type SortStateType = { id: string; desc: boolean }[];

interface UseTableStateProps {
  columnFilters: ColumnFilterType;
  filters: FilterType;
  sortState: SortStateType;
  setState: (key: string, value: any) => void;
}

/**
 * Custom hook untuk sinkronisasi state tabel lokal ke store/state global secara langsung 
 * tanpa melalui URL Search Params.
 */
const useTableState = ({ columnFilters, filters, sortState, setState }: UseTableStateProps) => {
  // Sync columnFilters -> filters (reset page saat filter berubah)
  useEffect(() => {
    const tempFilters = columnFilters.reduce((acc, filter) => {
      if (filter.value?.trim()) acc[filter.id] = filter.value;
      return acc;
    }, {} as FilterType);

    if (JSON.stringify(filters) !== JSON.stringify(tempFilters)) {
      setState('currentPage', 1);
    }
    setState('filters', tempFilters);
  }, [columnFilters]); // Hapus 'filters' dari dependency untuk mencegah infinite loop

  // Sync sortState -> sort (reset page saat sort berubah)
  useEffect(() => {
    if (sortState.length > 0) {
      setState('sort', `${sortState[0].id},${sortState[0].desc ? 'desc' : 'asc'}`);
    } else {
      setState('sort', '');
    }
    setState('currentPage', 1);
  }, [sortState]);
};

export default useTableState;
