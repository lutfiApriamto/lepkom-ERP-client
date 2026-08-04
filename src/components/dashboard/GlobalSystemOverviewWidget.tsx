import React, { useState } from 'react'
import { Card } from '@/components/ui'

interface ClassStatItem {
  kodeKelas: string
  jurusan: string
  totalCalas: number
  persentase: number
  status: 'Dominan' | 'Sedang' | 'Minor'
}

const MOCK_CLASS_STATS: ClassStatItem[] = [
  { kodeKelas: '1IA20', jurusan: 'Teknik Informatika', totalCalas: 34, persentase: 26.5, status: 'Dominan' },
  { kodeKelas: '1KA20', jurusan: 'Sistem Informasi', totalCalas: 28, persentase: 21.8, status: 'Dominan' },
  { kodeKelas: '2MA01', jurusan: 'Manajemen Informatika', totalCalas: 22, persentase: 17.1, status: 'Sedang' },
  { kodeKelas: '3KA01', jurusan: 'Sistem Informasi', totalCalas: 18, persentase: 14.0, status: 'Sedang' },
  { kodeKelas: '1DB01', jurusan: 'Manajemen Informatika', totalCalas: 14, persentase: 10.9, status: 'Minor' },
  { kodeKelas: '4KA05', jurusan: 'Sistem Informasi', totalCalas: 8, persentase: 6.2, status: 'Minor' },
  { kodeKelas: '2IA02', jurusan: 'Teknik Informatika', totalCalas: 4, persentase: 3.5, status: 'Minor' },
]

/**
 * Section 2: Global System Overview Widget
 * Displays aggregate system metrics (4 pillars) + distribution chart for all internal roles.
 */
export const GlobalSystemOverviewWidget: React.FC = () => {
  const [hoveredClass, setHoveredClass] = useState<ClassStatItem | null>(null)
  const maxCalas = Math.max(...MOCK_CLASS_STATS.map((s) => s.totalCalas))

  return (
    <div className="space-y-6">
      {/* ─── Section Divider ─── */}
      <div className="flex items-center gap-3 pt-2">
        <div className="flex-1 border-t border-border" />
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap flex items-center gap-2">
          <span>🌐</span> Ringkasan Ekosistem LEPKOM
        </h3>
        <div className="flex-1 border-t border-border" />
      </div>

      {/* ─── 4-Pilar Grid ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Asisten LEPKOM</p>
              <p className="text-xl font-extrabold text-lepkom-green mt-0.5">45 Asisten</p>
              <p className="text-xs text-gray-500 mt-0.5">30 Penilai • 15 Staff PJ</p>
            </div>
            <span className="text-2xl opacity-60">👥</span>
          </div>
        </Card>

        <Card className="border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pendaftar Calas</p>
              <p className="text-xl font-extrabold text-lepkom-blue mt-0.5">128 Calas</p>
              <p className="text-xs text-gray-500 mt-0.5">7 Kelompok Kelas Kuliah</p>
            </div>
            <span className="text-2xl opacity-60">📋</span>
          </div>
        </Card>

        <Card className="border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kapasitas Ruangan</p>
              <p className="text-xl font-extrabold text-purple-600 mt-0.5">5 Ruangan</p>
              <p className="text-xs text-gray-500 mt-0.5">Lab 121 – 125 Aktif</p>
            </div>
            <span className="text-2xl opacity-60">🏢</span>
          </div>
        </Card>

        <Card className="border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Bank Soal & Materi</p>
              <p className="text-xl font-extrabold text-amber-600 mt-0.5">24 Paket</p>
              <p className="text-xs text-gray-500 mt-0.5">100% Terverifikasi PJ Soal</p>
            </div>
            <span className="text-2xl opacity-60">📂</span>
          </div>
        </Card>
      </div>

      {/* ─── Distribution Chart ─── */}
      <Card
        header={
          <div>
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span>📊</span> Distribusi Calas per Kelas Kuliah
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Visualisasi proporsi pendaftar calon asisten berdasarkan kode kelas.
            </p>
          </div>
        }
      >
        <div className="py-2 space-y-4">
          {/* Info Bar */}
          <div className="h-9 px-4 py-2 bg-gray-900 text-white rounded-lg text-xs flex items-center justify-between shadow-xs transition-colors">
            {hoveredClass ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="font-bold font-mono text-lepkom-green text-sm">{hoveredClass.kodeKelas}</span>
                  <span className="text-gray-300">• {hoveredClass.jurusan}</span>
                </div>
                <span className="font-extrabold text-yellow-400">
                  {hoveredClass.totalCalas} Calas ({hoveredClass.persentase}%)
                </span>
              </>
            ) : (
              <div className="flex items-center gap-2 text-gray-400 italic">
                <span>💡</span>
                <span>Arahkan kursor pada batang chart untuk melihat rincian.</span>
              </div>
            )}
          </div>

          {/* Bar Chart */}
          <div className="relative pt-4 pb-2 px-2 bg-page/60 rounded-xl border border-border">
            <div className="absolute inset-0 px-4 py-4 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="border-b border-gray-300 w-full" />
              <div className="border-b border-gray-300 w-full" />
              <div className="border-b border-gray-300 w-full" />
            </div>
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-44 pt-4 pb-2 px-2 relative z-10">
              {MOCK_CLASS_STATS.map((item) => {
                const heightPercent = Math.round((item.totalCalas / maxCalas) * 100)
                const isHovered = hoveredClass?.kodeKelas === item.kodeKelas
                return (
                  <div
                    key={item.kodeKelas}
                    role="button"
                    tabIndex={0}
                    aria-label={`Kelas ${item.kodeKelas}: ${item.totalCalas} Calas (${item.persentase}%)`}
                    onMouseEnter={() => setHoveredClass(item)}
                    onMouseLeave={() => setHoveredClass(null)}
                    onFocus={() => setHoveredClass(item)}
                    onBlur={() => setHoveredClass(null)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative rounded-lg focus:outline-none focus:ring-2 focus:ring-lepkom-blue/50 focus:ring-offset-1"
                  >
                    <div className="text-[10px] font-bold text-gray-600 mb-1 group-hover:text-lepkom-green transition-colors">
                      {item.totalCalas}
                    </div>
                    <div className="w-full max-w-[36px] bg-gray-200 rounded-t-lg h-full flex items-end overflow-hidden p-0.5">
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 group-hover:brightness-110 ${
                          isHovered ? 'bg-lepkom-blue shadow-md' : 'bg-lepkom-green'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="mt-1 text-[10px] font-mono font-bold text-gray-700 group-hover:text-lepkom-green transition-colors truncate">
                      {item.kodeKelas}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
