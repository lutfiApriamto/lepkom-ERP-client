import React, { useState } from 'react'
import { Card, Badge, DataTable } from '@/components/ui'

export interface ClassStatItem {
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

export const CalasClassChartWidget: React.FC = () => {
  const [hoveredClass, setHoveredClass] = useState<ClassStatItem | null>(null)
  const totalCalasSum = MOCK_CLASS_STATS.reduce((acc, curr) => acc + curr.totalCalas, 0)
  const maxCalas = Math.max(...MOCK_CLASS_STATS.map((s) => s.totalCalas))

  const tableColumns = [
    {
      key: 'kodeKelas',
      label: 'Kode Kelas Kuliah',
      render: (row: ClassStatItem) => (
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-lepkom-green text-sm px-2 py-0.5 bg-green-50 rounded border border-lepkom-green/20">
            {row.kodeKelas}
          </span>
          <span className="text-xs text-gray-500 hidden sm:inline">({row.jurusan})</span>
        </div>
      ),
    },
    {
      key: 'totalCalas',
      label: 'Jumlah Calas',
      render: (row: ClassStatItem) => (
        <span className="font-extrabold text-gray-900 text-sm">{row.totalCalas} Orang</span>
      ),
    },
    {
      key: 'persentase',
      label: 'Proporsi',
      render: (row: ClassStatItem) => (
        <div className="flex items-center gap-3 w-36">
          <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-lepkom-green h-full rounded-full transition-all duration-500"
              style={{ width: `${row.persentase}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-gray-700 w-10 text-right">{row.persentase}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Kategori',
      render: (row: ClassStatItem) => (
        <Badge
          variant={row.status === 'Dominan' ? 'status-green' : row.status === 'Sedang' ? 'status-yellow' : 'info'}
        >
          {row.status}
        </Badge>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* ─── 1. STATCARD (METRIK SUMMARY) ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-green-50/50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pendaftar Calas</p>
              <p className="text-2xl font-extrabold text-lepkom-green mt-1">{totalCalasSum} Calas</p>
              <p className="text-xs text-gray-600 mt-0.5">Dari {MOCK_CLASS_STATS.length} Kelompok Kelas</p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
        </Card>

        <Card className="bg-blue-50/50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kelas Paling Dominan</p>
              <p className="text-2xl font-extrabold text-lepkom-blue mt-1">1IA20</p>
              <p className="text-xs text-gray-600 mt-0.5">34 Calas (26.5%)</p>
            </div>
            <span className="text-2xl">🏆</span>
          </div>
        </Card>

        <Card className="bg-amber-50/50 border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rata-Rata per Kelas</p>
              <p className="text-2xl font-extrabold text-amber-600 mt-1">18.3 Calas</p>
              <p className="text-xs text-gray-600 mt-0.5">Distribusi Pendaftaran</p>
            </div>
            <span className="text-2xl">📈</span>
          </div>
        </Card>
      </div>

      {/* ─── 2. CHART STATISTIK ────────────────────────────────────────── */}
      <Card
        header={
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span>📊</span> Statistik Distribusi Calas per Kelas Kuliah
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Visualisasi proporsi jumlah pendaftar calon asisten berdasarkan kelompok kode kelas.
            </p>
          </div>
        }
      >
        <div className="py-2 space-y-4">
          {/* Header Info Bar */}
          <div className="h-10 px-4 py-2 bg-gray-900 text-white rounded-lg text-xs flex items-center justify-between shadow-xs transition-colors">
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
                <span>Arahkan kursor atau fokuskan pada batang chart untuk melihat rincian jurusan dan proporsi.</span>
              </div>
            )}
          </div>

          {/* SVG Bar Chart Container */}
          <div className="relative pt-6 pb-2 px-2 bg-page/60 rounded-xl border border-border">
            {/* Chart Grid Lines */}
            <div className="absolute inset-0 px-4 py-6 flex flex-col justify-between pointer-events-none opacity-30">
              <div className="border-b border-gray-300 w-full" />
              <div className="border-b border-gray-300 w-full" />
              <div className="border-b border-gray-300 w-full" />
            </div>

            {/* Bars */}
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-56 pt-6 pb-2 px-2 relative z-10">
              {MOCK_CLASS_STATS.map((item) => {
                const heightPercent = Math.round((item.totalCalas / maxCalas) * 100)
                const isHovered = hoveredClass?.kodeKelas === item.kodeKelas

                return (
                  <div
                    key={item.kodeKelas}
                    role="button"
                    tabIndex={0}
                    aria-label={`Kelas ${item.kodeKelas}: ${item.totalCalas} Calas (${item.persentase}%)`}
                    aria-expanded={isHovered}
                    onMouseEnter={() => setHoveredClass(item)}
                    onMouseLeave={() => setHoveredClass(null)}
                    onFocus={() => setHoveredClass(item)}
                    onBlur={() => setHoveredClass(null)}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative rounded-lg focus:outline-none focus:ring-2 focus:ring-lepkom-blue/50 focus:ring-offset-1"
                  >
                    {/* Floating Mini Tooltip Badge above bar */}
                    {isHovered && (
                      <div className="absolute -top-7 bg-lepkom-blue text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap animate-in fade-in zoom-in duration-150 pointer-events-none z-20">
                        {item.jurusan}
                      </div>
                    )}

                    <div className="text-[11px] font-bold text-gray-700 mb-1 group-hover:text-lepkom-green transition-colors">
                      {item.totalCalas}
                    </div>
                    <div className="w-full max-w-[42px] bg-gray-200 rounded-t-lg h-full flex items-end overflow-hidden p-0.5">
                      <div
                        className={`w-full rounded-t-md transition-all duration-300 group-hover:brightness-110 ${
                          isHovered ? 'bg-lepkom-blue shadow-md' : 'bg-lepkom-green'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="mt-2 text-xs font-mono font-bold text-gray-800 group-hover:text-lepkom-green transition-colors truncate">
                      {item.kodeKelas}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* ─── 3. TABEL DATA RINCIAN ──────────────────────────────────────── */}
      <Card header="📋 Breakdown Rincian Pendaftar per Kelas">
        <DataTable columns={tableColumns} data={MOCK_CLASS_STATS} emptyMessage="Data kelas belum tersedia" />
      </Card>
    </div>
  )
}
