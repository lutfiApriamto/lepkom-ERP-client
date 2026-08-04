import { FiUsers } from 'react-icons/fi';

const HeaderContent = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FiUsers className="text-indigo-600" />
          Penempatan Ruangan Calas
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola penempatan Calon Asisten ke dalam ruangan ujian yang sudah dijadwalkan.
        </p>
      </div>
    </div>
  );
};

export default HeaderContent;
