import { useNavigate } from 'react-router-dom';
import { usePenilaianPraktekStore } from '../store/usePenilaianPraktekStore';
import type { CalasToScore } from '../api/penilaianPraktek.api';

export const usePenilaianPraktekActions = () => {
  const navigate = useNavigate();
  const { setSelectedCalas } = usePenilaianPraktekStore();

  const handleBeriPenilaian = (row: CalasToScore) => {
    setSelectedCalas(row);
    navigate(`/lepkom/penugasan/penilaian-praktek/form/${row.examSessionId}/${row._id}`, {
      state: { calas: row },
    });
  };

  return {
    handleBeriPenilaian,
  };
};
