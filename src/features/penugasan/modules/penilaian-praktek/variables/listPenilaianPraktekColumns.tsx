import { Button } from '@/components/ui/Button';
import { FiEdit3 } from 'react-icons/fi';
import type { CalasToScore } from '../api/penilaianPraktek.api';

interface ListPenilaianPraktekColumnsProps {
  handleBeriPenilaian: (row: CalasToScore) => void;
}

export const listPenilaianPraktekColumns = ({
  handleBeriPenilaian,
}: ListPenilaianPraktekColumnsProps): any[] => [
  {
    id: 'no',
    title: 'No',
    renderCell: ({ row }: any) => <div className="text-center">{row.index + 1}</div>,
    size: 60,
  },
  {
    accessorKey: 'npm',
    title: 'NPM',
    size: 150,
  },
  {
    accessorKey: 'namaCalas',
    title: 'Nama',
    size: 300,
  },

  {
    id: 'actions',
    title: 'Aksi',
    size: 150,
    renderCell: ({ row }: any) => {
      return (
        <div className="flex justify-center">
          <Button
            size="sm"
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => handleBeriPenilaian(row.original)}
          >
            <FiEdit3 className="w-4 h-4" /> Beri Penilaian
          </Button>
        </div>
      );
    },
  },
];
