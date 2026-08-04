import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type FilterType = Record<string, string>;
type SortStateType = { id: string; desc: boolean }[];
type ColumnFilterType = { id: string; value: string }[];

interface UseTableFiltersSortUrlSyncOptions {
  listUrlBase: string;
}

/**
 * Menyinkronkan status tabel (filter, sorting, halaman) ke dalam Search Params URL secara dua arah.
 * 
 * @param options.listUrlBase - path absolut untuk route ini (misal: '/admin/kandidat')
 */
const useTableFiltersSortUrlSync = ({ listUrlBase }: UseTableFiltersSortUrlSyncOptions) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [columnFilters, setColumnFilters] = useState<ColumnFilterType>([]);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterType>({});
  const [sort, setSort] = useState<string>('');
  const [sortState, setSortState] = useState<SortStateType>([]);
  
  // Karena pagination terpisah dalam komponen pagination, ini men-track state secara internal
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // SetState dinamis
  const setState = useCallback((key: string, value: any) => {
    switch (key) {
      case 'filters':
        setFilters(value);
        break;
      case 'sort':
        setSort(value);
        break;
      case 'sortState':
        setSortState(value);
        break;
      case 'pageSize':
        setPageSize(value);
        break;
      case 'currentPage':
        setCurrentPage(value);
        break;
    }
  }, []);

  const resetFilter = useCallback(() => {
    setFilters({});
    setSort('');
    setSortState([]);
    setPageSize(10);
    setCurrentPage(1);
    setColumnFilters([]);
  }, []);

  // Tahap 1: Membaca URL dan menetapkan state awal
  useEffect(() => {
    setIsEnabled(true);
    setState('currentPage', 1);

    if (searchParams.size === 0) {
      resetFilter();
      return;
    }

    // Parse Filter URL
    const filtersParam = searchParams.get('filters');
    if (filtersParam) {
      try {
        const parsedFilters = JSON.parse(filtersParam);
        if (typeof parsedFilters === 'object' && parsedFilters !== null) {
          setState('filters', parsedFilters);
          setColumnFilters(
            Object.entries(parsedFilters).map(([id, value]) => ({
              id,
              value: String(value)
            }))
          );
        }
      } catch (error) {
        console.error('Error parsing filters from searchParams:', error);
        setState('filters', {});
        setColumnFilters([]);
      }
    } else {
      setState('filters', {});
      setColumnFilters([]);
    }

    // Parse Sort URL
    const sortParam = searchParams.get('sort');
    if (sortParam) {
      const [id, direction] = sortParam.split(',');
      const desc = direction === 'desc';
      setState('sort', `${id},${desc ? 'desc' : 'asc'}`);
      setState('sortState', [{ id, desc }]);
    } else {
      setState('sort', '');
      setState('sortState', []);
    }
  }, [searchParams, setState, resetFilter]);

  // Tahap 2: Mendengarkan perubahan Filter UI, lalu update URL
  useEffect(() => {
    if (!isEnabled) return;

    const tempFilters: FilterType = {};
    columnFilters.forEach(filter => {
      if (filter.value && filter.value.trim() !== '') {
        tempFilters[filter.id] = filter.value;
      }
    });

    const filtersString = JSON.stringify(tempFilters);
    const currentFiltersString = JSON.stringify(filters);

    if (filtersString !== currentFiltersString) {
      // Jika filter berubah, reset halaman ke 1
      if (filtersString !== JSON.stringify({})) {
        setState('currentPage', 1);
      }
      setState('filters', tempFilters);

      const newSearchParams = new URLSearchParams(searchParams);
      if (Object.keys(tempFilters).length > 0) {
        newSearchParams.set('filters', filtersString);
      } else {
        newSearchParams.delete('filters');
      }
      
      // Update URL dengan replace agar tidak menumpuk histori
      navigate(`${listUrlBase}?${newSearchParams.toString()}`, { replace: true });
    }
  }, [columnFilters, filters, searchParams, navigate, setState, listUrlBase, isEnabled]);

  // Tahap 3: Mendengarkan perubahan Sort UI, lalu update URL
  useEffect(() => {
    if (!isEnabled) return;
    
    // Perbandingan array mendalam atau panjangnya
    if (sortState.length === 0 && !searchParams.has('sort')) return;
    
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (sortState.length > 0) {
      const sortValue = `${sortState[0].id},${sortState[0].desc ? 'desc' : 'asc'}`;
      if (newSearchParams.get('sort') !== sortValue) {
        newSearchParams.set('sort', sortValue);
        navigate(`${listUrlBase}?${newSearchParams.toString()}`, { replace: true });
      }
    } else if (newSearchParams.has('sort')) {
      newSearchParams.delete('sort');
      navigate(`${listUrlBase}?${newSearchParams.toString()}`, { replace: true });
    }
  }, [sortState, navigate, listUrlBase, searchParams, isEnabled]);

  return {
    columnFilters,
    setColumnFilters,
    filters,
    sort,
    sortState,
    pageSize,
    currentPage,
    setState,
    resetFilter,
    isEnabled
  };
};

export default useTableFiltersSortUrlSync;
