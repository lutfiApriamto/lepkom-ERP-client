import { Card } from '@/components/ui/Card';
import PaginationPage from '@/components/pagination/PaginationPage';
import useTableFiltersSortUrlSync from '@/hooks/shared/useTableFiltersSortUrlSync';
import { path } from '@/utils/consts';
import { useGetAllQuestionCards } from '../api/questionCard.api';
import type { QuestionCard } from '../api/questionCard.api';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useDialogStore } from '@/hooks/globalStore/useDialogStore';
import QuestionCardDetail from './QuestionCardDetail';
import { Search } from 'lucide-react';

const QuestionCardGrid = () => {
  const { setDialogContent, setOpenDialog } = useDialogStore();

  const {
    columnFilters,
    setColumnFilters,
    setState,
    pageSize,
    currentPage,
  } = useTableFiltersSortUrlSync({ listUrlBase: path.lepkom.masterData.questionCard.default });

  const queryParams = new URLSearchParams();
  queryParams.set('page', String(currentPage));
  queryParams.set('limit', String(pageSize));
  
  columnFilters.forEach((filter) => {
    queryParams.set(filter.id, filter.value);
  });

  const queryString = `?${queryParams.toString()}`;

  const { data, isLoading, isError } = useGetAllQuestionCards(queryString);

  const handleCardClick = (qc: QuestionCard) => {
    setDialogContent({
      title: 'Detail Question Card',
      body: <QuestionCardDetail data={qc} />,
      size: 'md',
      action: {
        cancel: { text: 'Tutup', onCallback: () => setOpenDialog('defaultDialog', false) },
      }
    });
  };

  const getSearchValue = (id: string) => columnFilters.find((f) => f.id === id)?.value || '';

  const handleFilterChange = (id: string, value: string) => {
    setColumnFilters((prev) => {
      const existing = prev.find((f) => f.id === id);
      if (value === '') {
        return prev.filter((f) => f.id !== id);
      }
      if (existing) {
        return prev.map((f) => (f.id === id ? { ...f, value } : f));
      }
      return [...prev, { id, value }];
    });
  };

  const colorMap: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
    materi: 'default',
    teknis: 'info',
    kepribadian: 'warning',
    motivasi: 'success',
  };

  return (
    <Card className="flex flex-col gap-6 bg-transparent shadow-none border-none">
      
      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            placeholder="Cari judul pertanyaan..." 
            className="pl-10 h-10 w-full"
            value={getSearchValue('search')}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select
            className="h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-white text-sm min-w-37.5"
            value={getSearchValue('kategori')}
            onChange={(e) => handleFilterChange('kategori', e.target.value)}
          >
            <option value="">Semua Kategori</option>
            <option value="materi">Materi</option>
            <option value="teknis">Teknis</option>
            <option value="kepribadian">Kepribadian</option>
            <option value="motivasi">Motivasi</option>
          </select>

          <select
            className="h-10 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green bg-white text-sm min-w-37.5"
            value={getSearchValue('tingkat')}
            onChange={(e) => handleFilterChange('tingkat', e.target.value)}
          >
            <option value="">Semua Tingkat</option>
            <option value="1">Tingkat 1</option>
            <option value="2">Tingkat 2</option>
            <option value="3">Tingkat 3</option>
          </select>
        </div>
      </div>

      {/* Grid Content */}
      <div className="flex-1 mt-5">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(pageSize)].map((_, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 h-32 animate-pulse flex flex-col justify-between">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm">
            <p className="text-red-500 font-medium">Gagal memuat data question card.</p>
          </div>
        ) : data?.data && data.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.data.map((qc) => (
              <div
                key={qc._id}
                onClick={() => handleCardClick(qc)}
                className="group flex flex-col justify-between bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-brand-green/30 transition-all cursor-pointer h-35"
              >
                <p className="font-medium text-gray-800 line-clamp-3 leading-relaxed group-hover:text-brand-green transition-colors">
                  {qc.judulPertanyaan}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant={colorMap[qc.kategori] || 'default'} className="capitalize text-xs">
                    {qc.kategori}
                  </Badge>
                  <span className="text-xs text-gray-400">Tingkat {qc.tingkat}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200 shadow-sm text-center">
            <p className="text-lg font-medium text-gray-700">Tidak ada pertanyaan</p>
            <p className="text-sm text-gray-500 mt-1">Belum ada question card yang ditambahkan atau sesuai filter.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm mt-5">
        <PaginationPage
          totalData={data?.totalData || 0}
          pageSize={pageSize}
          currentPage={currentPage}
          setPageSize={setState}
          loading={isLoading}
        />
      </div>

    </Card>
  );
};

export default QuestionCardGrid;
