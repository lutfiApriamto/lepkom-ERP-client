import { ContentLayout } from "@/components/layout";
import { useBreadcrumbStore } from "@/hooks/globalStore";
import { path } from "@/utils/consts";
import { useEffect } from "react";
import HeaderContent from "./components/HeaderContent";
import DaftarSoalFilter from "./components/DaftarSoalFilter";
import DaftarSoalGrid from "./components/DaftarSoalGrid";

const DaftarSoalPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Soal & Upload Jawaban', path: path.lepkom.calasSoal.default},
      { label: 'Daftar Soal', path: path.lepkom.calasSoal.daftarSoal.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="flex flex-col gap-6">
        <HeaderContent />
        <DaftarSoalFilter />
        <DaftarSoalGrid />
      </div>
    </ContentLayout>
  );
};

export default DaftarSoalPage;