import * as React from 'react';
import Select from 'react-select';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button, Input } from '@/components/ui';
import { cn } from '@/lib/utils';

export interface PaginationProps {
  totalData: number;
  pageSize: number;
  currentPage: number;
  setPageSize: (key: string, value: number) => void;
  loading?: boolean;
}

const PaginationPage: React.FC<PaginationProps> = ({
  totalData,
  pageSize,
  currentPage,
  setPageSize,
  loading = false,
}) => {
  const [jumpToPage, setJumpToPage] = React.useState<string>('');
  const totalPages = Math.ceil(totalData / pageSize) || 1;

  const pageSizeOptions = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '100', value: 100 },
  ];

  const selectedOption =
    pageSizeOptions.find((option) => option.value === pageSize) || pageSizeOptions[1]; // default 10

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) setPageSize('currentPage', currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPageSize('currentPage', currentPage + 1);
  };

  const handleJumpToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(jumpToPage, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setPageSize('currentPage', pageNum);
      setJumpToPage('');
    }
  };

  if (loading) {
    return (
      <div className="flex w-full animate-pulse flex-col items-start justify-between gap-4 py-4 lg:flex-row lg:items-center">
        <div className="h-10 w-64 rounded-md bg-muted"></div>
        <div className="h-10 w-48 rounded-md bg-muted"></div>
      </div>
    );
  }

  // Sembunyikan pagination jika tidak ada data
  if (totalData === 0) return null;

  return (
    <div className="flex w-full flex-col items-start justify-between gap-4 overflow-x-auto py-4 lg:flex-row lg:items-center">
      {/* Page Navigation */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <div key={`ellipsis-${idx}`} className="flex h-10 w-10 items-center justify-center">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          ) : (
            <Button
              key={`page-${page}`}
              variant={currentPage === page ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setPageSize('currentPage', page as number)}
              className={cn(
                'h-10 w-10 font-medium transition-colors',
                currentPage === page
                  ? 'bg-lepkom-green hover:bg-lepkom-green/90 text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              )}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Info & Page Size Selector */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Jump to Page */}
        <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm text-muted-foreground">Ke Hal:</span>
          <Input
            type="number"
            min={1}
            max={totalPages}
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            className="h-9 w-16 text-center text-sm"
            placeholder={String(currentPage)}
          />
        </form>

        <div className="hidden h-6 w-px bg-border sm:block"></div>

        <span className="whitespace-nowrap text-sm text-muted-foreground">
          Total: <span className="font-semibold text-foreground">{totalData}</span>
        </span>
        
        <div className="hidden h-6 w-px bg-border sm:block"></div>
        
        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap text-sm text-muted-foreground">
            Tampil:
          </span>
          <Select
            menuPlacement="top"
            menuPortalTarget={document.body}
            isSearchable={false}
            value={selectedOption}
            options={pageSizeOptions}
            onChange={(e) => {
              if (e) {
                setPageSize('pageSize', e.value);
                setPageSize('currentPage', 1); // Reset to page 1 when changing page size
              }
            }}
            className="min-w-[80px] text-sm"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: '36px',
                borderRadius: '0.375rem',
                borderColor: 'var(--border-default)',
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
          />
        </div>
      </div>
    </div>
  );
};

export default PaginationPage;
