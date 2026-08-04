import React from 'react';
import { Users, Calendar, FolderCheck } from 'lucide-react';

const features = [
  {
    icon: <Users className="h-8 w-8 text-lepkom-blue" />,
    title: 'Rekrutmen Calas Terpadu',
    description: 'Proses seleksi Calon Asisten yang terintegrasi, transparan, dan mudah dipantau mulai dari tahap pendaftaran hingga ujian praktek.'
  },
  {
    icon: <Calendar className="h-8 w-8 text-lepkom-green" />,
    title: 'Manajemen Penjadwalan',
    description: 'Kemudahan dalam penyusunan jadwal asisten, pemetaan sesi ujian, dan pengelolaan ruang laboratorium secara terpusat.'
  },
  {
    icon: <FolderCheck className="h-8 w-8 text-lepkom-blue" />,
    title: 'Pengelolaan Penilaian & Berkas',
    description: 'Dokumentasi nilai, riwayat pendidikan, serta validasi berkas fisik dan digital yang rapi untuk seluruh SDM.'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Utama Sistem</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            HRIS LepKOM dirancang secara spesifik untuk menjawab kebutuhan pengelolaan asisten dan staf laboratorium.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-8 border border-gray-100 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-6 p-4 bg-gray-50 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
