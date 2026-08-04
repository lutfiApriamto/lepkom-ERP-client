import { path } from '@/utils/consts';
import {  FaProjectDiagram } from 'react-icons/fa';
import { FaLaptopCode } from 'react-icons/fa6';
import { GrTasks } from "react-icons/gr";
import { MdDriveFolderUpload } from "react-icons/md";
import { LuHistory } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";
import {MdMeetingRoom  } from "react-icons/md";

export const penugasanMenu = {
  label: 'Penugasan Asisten',
  icon: GrTasks,
  path: path.lepkom.penugasan.default,
  type: 'management',
  role: ['super_admin', "penanggung_jawab_ruangan", "koordinator_lapangan", "asisten_penilai", "staff"],
  children: [
    {
      key: 'praktek',
      label: 'Nilai Praktek',
      description: 'Kelola Penilaian Ujian Praktek Calas.',
      path: path.lepkom.penugasan.praktek.default,
      icon: FaLaptopCode,
      role: ['asisten_penilai']
    },
    {
      key: 'project',
      label: 'Nilai Project',
      path: path.lepkom.penugasan.project.default,
      description: 'Kelola Penilaian Ujian Project Calas.',
      icon: FaProjectDiagram,
      role: ['asisten_penilai']
    },
    {
      key: 'chekcUploadJawaban',
      label: 'Check Uploada Jawaban Calas',
      path: path.lepkom.penugasan.checkUploadJawaban.default,
      description: 'Lihat Calas Upload Jawaban',
      icon: MdDriveFolderUpload,
      role: ['super_admin', 'koordinator_lapangan', 'penanggung_jawab_ruangan', 'asisten_penilai']
    },
    {
      key: 'asistenRoomPlacement',
      label: 'Penempatan Ruangan Asisten',
      path: path.lepkom.penugasan.penempatanRuanganAsisten.default,
      description: 'Kelola Penempatan Ruangan PJ Ruangan dan Asisen Penguji',
      icon: MdMeetingRoom,
      role: ['super_admin', 'koordinator_lapangan']
    },
    {
      key: 'calasRoomPlacement',
      label: 'Penempatan Ruangan Calas',
      path: path.lepkom.penugasan.penempatanRuanganCalas.default,
      description: 'Kelola Penempatan Ruangan Untuk Calas',
      icon: SiGoogleclassroom,
      role: ['super_admin', 'koordinator_lapangan', 'penanggung_jawab_ruangan']
    },
    {
      key: 'historyPenilaian',
      label: 'Riwayat Penilaian Asisten',
      path: path.lepkom.penugasan.historyPenilaian.default,
      description: 'Lihat Riwayat Penilaian Asisten',
      icon: LuHistory,
      role: ['super_admin', 'koordinator_lapangan', 'penanggung_jawab_ruangan']
    }
  ]
};
