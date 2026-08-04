import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Edit, Trash2 } from 'lucide-react';
import { EmptyCellText } from '@/components/shared/EmptyCellText';
import type { QuestionCard } from '../api/questionCard.api';

export const getListQuestionCardColumns = (
  handleEdit: (row: QuestionCard) => void,
  handleDelete: (id: string) => void,
  isAllowedToManage: boolean,
  currentPage: number,
  pageSize: number
) => {
  const columns = [
    {
      accessorKey: 'no',
      title: 'No',
      size: 50,
      renderCell: (info: any) => {
        const index = (currentPage - 1) * pageSize + info.rowIndex + 1;
        return <span className="text-gray-500 font-medium">{index}</span>;
      }
    },
    {
      accessorKey: 'judulPertanyaan',
      title: 'Judul Pertanyaan',
      sorting: true,
      isSearch: true,
      size: 300,
      renderCell: (info: any) => {
        const val = info.getValue();
        return val ? (
          <div className="text-left font-medium text-gray-900 line-clamp-2">
            {val}
          </div>
        ) : <EmptyCellText />;
      }
    },
    {
      accessorKey: 'kategori',
      title: 'Kategori',
      sorting: true,
      isSearch: true,
      filterOptions: [
        { label: 'Materi', value: 'materi' },
        { label: 'Teknis', value: 'teknis' },
        { label: 'Kepribadian', value: 'kepribadian' },
        { label: 'Motivasi', value: 'motivasi' },
      ],
      renderCell: (info: any) => {
        const val = info.getValue() as string;
        if (!val) return <EmptyCellText />;
        const colorMap: Record<string, 'info' | 'success' | 'warning' | 'default'> = {
          materi: 'default',
          teknis: 'info',
          kepribadian: 'warning',
          motivasi: 'success',
        };
        return (
          <Badge variant={colorMap[val] || 'default'} className="capitalize">
            {val}
          </Badge>
        );
      }
    },
    {
      accessorKey: 'tingkat',
      title: 'Tingkat',
      sorting: true,
      isSearch: true,
      filterOptions: [
        { label: 'Tingkat 1', value: 1 },
        { label: 'Tingkat 2', value: 2 },
        { label: 'Tingkat 3', value: 3 },
      ],
      renderCell: (info: any) => {
        const val = info.getValue();
        return val ? <Badge variant="info">Tingkat {val}</Badge> : <EmptyCellText />;
      }
    },
    {
      accessorKey: 'namaMateri',
      title: 'Materi',
      isSearch: true,
      renderCell: (info: any) => {
        const val = info.getValue();
        return val ? <span className="text-gray-700">{val}</span> : <EmptyCellText />;
      }
    }
  ];

  if (isAllowedToManage) {
    columns.push({
      accessorKey: 'action',
      title: 'Aksi',
      size: 100,
      renderCell: (info: any) => {
        const row = info.row.original as QuestionCard;
        return (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50"
              onClick={() => handleEdit(row)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
              onClick={() => handleDelete(row._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      }
    });
  }

  return columns;
};
