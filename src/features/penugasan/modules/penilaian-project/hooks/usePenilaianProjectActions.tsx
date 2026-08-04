import { useNavigate } from 'react-router-dom';
import { usePenilaianProjectStore } from '../store/usePenilaianProjectStore';
import type { CalasToScore } from '../api/penilaianProject.api';

export const usePenilaianProjectActions = () => {
  const navigate = useNavigate();
  const { setSelectedCalas } = usePenilaianProjectStore();

  const handleBeriPenilaian = (row: CalasToScore) => {
    setSelectedCalas(row);
    navigate(`/lepkom/penugasan/penilaian-project/form/${row.examSessionId}/${row._id}`, {
      state: { calas: row },
    });
  };

  return {
    handleBeriPenilaian,
  };
};
