import { ContentLayout } from "@/components/layout";
import { useBreadcrumbStore } from "@/hooks/globalStore";
import { path } from "@/utils/consts";
import { useEffect } from "react";
import HeaderContent from "./components/HeaderContent";
import RiwayatPenilaianFilter from "./components/RiwayatPenilaianFilter";
import RiwayatPenilaianList from "./components/RiwayatPenilaianList";

const RiwayatPenilaianPage = () => {
  const { setBreadcrumbItems } = useBreadcrumbStore();

  useEffect(() => {
    setBreadcrumbItems([
      { label: 'Dashboard', path: path.lepkom.dashboard.default },
      { label: 'Penugasan', path: path.lepkom.penugasan.default },
      { label: 'Riwayat Penilaian Asisten', path: path.lepkom.penugasan.historyPenilaian.default },
    ]);
    return () => setBreadcrumbItems([]);
  }, [setBreadcrumbItems]);

  return (
    <ContentLayout>
      <div className="flex flex-col gap-6">
        <HeaderContent />
        <RiwayatPenilaianFilter />
        <RiwayatPenilaianList />
      </div>
    </ContentLayout>
  );
};

export default RiwayatPenilaianPage;