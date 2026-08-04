# Implementation Tasks — HRIS LepKOM Frontend

> **Untuk Agent AI:** Baca `CLAUDE.md` dulu untuk konteks project. Lalu eksekusi iterasi di bawah secara berurutan. Satu iterasi = satu selesai sebelum lanjut ke berikutnya.

## Prasyarat

Sebelum mulai, baca dan pahami:
- `src/types/index.ts` — semua tipe data
- `src/services/*.ts` — semua service functions
- `src/stores/auth.store.ts` — Zustand auth store
- `src/hooks/useAuth.ts` — auth hook
- `src/validations/*.ts` — Zod schemas
- `src/utils/constants.ts` — ROLE_LABELS, TAHAP_LABELS
- `src/routes/index.tsx` — route definitions
- `src/index.css` — Tailwind tokens (lepkom-green, lepkom-blue, page, surface, border)

---

## Iter 1 — UI Primitif

**Branch:** `feat/iter-01-ui-primitif`
**Target:** Buat 9 komponen UI reusable di `src/components/ui/`

### Tasks

1. **Buat `src/components/ui/Button.tsx`**
   - Props: `variant: 'primary' | 'secondary' | 'danger'`, `size: 'sm' | 'md' | 'lg'`, `disabled`, `loading`, `children`, `type`, `onClick`, `className`
   - primary: `bg-lepkom-green text-white hover:bg-lepkom-green/90`
   - secondary: `border border-lepkom-green text-lepkom-green bg-transparent hover:bg-green-50`
   - danger: `bg-red-500 text-white hover:bg-red-600`
   - loading state: tampilkan SVG spinner inline, nonaktifkan tombol
   - disabled: `opacity-50 cursor-not-allowed`

2. **Buat `src/components/ui/Input.tsx`**
   - Props: `label`, `error?`, `type`, `placeholder`, `required`, `value`, `onChange`, `disabled`, `id`
   - Label di atas input: `text-sm font-medium text-gray-700 mb-1`
   - Input: `w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-lepkom-green/30 focus:border-lepkom-green`
   - Jika error: border `border-red-500`, teks error `text-xs text-red-500 mt-1`
   - Password: tambah toggle show/hide (eye icon SVG)

3. **Buat `src/components/ui/Select.tsx`**
   - Props: `label`, `options: {value: string, label: string}[]`, `error?`, `value`, `onChange`, `disabled`, `placeholder`
   - Style mirip Input, tetapi `<select>`
   - Placeholder: option pertama disabled, value kosong

4. **Buat `src/components/ui/Textarea.tsx`**
   - Props: `label`, `error?`, `rows?` (default 4), `value`, `onChange`, `disabled`, `placeholder`, `className`
   - Style mirip Input, tetapi `<textarea>`

5. **Buat `src/components/ui/Badge.tsx`**
   - Props: `variant: 'role' | 'status-green' | 'status-yellow' | 'status-red' | 'info'`, `children`, `className`
   - role: `bg-lepkom-blue/10 text-lepkom-blue`
   - status-green: `bg-green-100 text-green-700`
   - status-yellow: `bg-amber-100 text-amber-700`
   - status-red: `bg-red-100 text-red-700`
   - info: `bg-blue-100 text-blue-700`
   - Base: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold`

6. **Buat `src/components/ui/Card.tsx`**
   - Props: `children`, `className`, `header?` (ReactNode)
   - Base: `bg-surface rounded-lg border border-border shadow-sm`
   - Jika header: render di atas dengan `border-b border-border px-6 py-4 font-semibold`
   - Body: `p-6`

7. **Buat `src/components/ui/Modal.tsx`**
   - Props: `isOpen`, `onClose`, `title`, `children`, `footer?` (ReactNode), `size?: 'sm' | 'md' | 'lg'`
   - Overlay: `fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4`
   - Container: `bg-white rounded-xl shadow-xl w-full max-w-{sm|md|lg} animate-in fade-in zoom-in duration-200`
   - Header: title + close button (X icon) kanan atas
   - Body: `p-6`
   - Footer: `border-t border-border px-6 py-4 flex justify-end gap-3`

8. **Buat `src/components/ui/DataTable.tsx`**
   - Props: `columns: {key: string, label: string, render?: (row: any) => ReactNode}[]`, `data: any[]`, `emptyMessage?: string`
   - Wrapper: `overflow-x-auto`
   - Table: `w-full text-sm`
   - thead: `bg-page text-left font-semibold text-gray-600`
   - tbody tr: `border-b border-border hover:bg-gray-50/50`
   - Jika data kosong: tampilkan `emptyMessage` di center (default "Tidak ada data")

9. **Buat `src/components/ui/Skeleton.tsx`**
   - Props: `className` (untuk set width/height), `count?` (jumlah skeleton lines, default 1)
   - Base: `bg-gray-200 animate-pulse rounded`
   - Render `count` div dengan gap-2

### Setelah selesai:
- Jalankan `npm run build` — pastikan pass
- Buat branch, commit: `feat(ui): tambah komponen primitif Button, Input, Badge, Card, Modal, DataTable, Select, Textarea, Skeleton`

---

## Iter 2 — Layout Shell

**Branch:** `feat/iter-02-layout-nav`
**Target:** Buat Sidebar + Navbar + update DashboardLayout

### Tasks

1. **Buat `src/components/layout/Sidebar.tsx`**
   - Props: `isOpen` (mobile toggle), `onClose` (mobile close handler)
   - Fixed left w-64 h-screen bg-white border-r border-border flex flex-col z-40
   - Header: bg-lepkom-green text-white px-4 py-5, logo text "HRIS LepKOM" font-bold text-lg
   - Navigation: flex-1 overflow-y-auto py-4
   - Menu items per role dari `useAuthStore().user.role`:
     - super_admin: Dashboard, Toggle Rekrutmen, Master Asisten, Master Calas, Materi & Soal, Penjadwalan
     - pj_soal_materi: Dashboard, Materi & Soal, Question Card
     - koordinator_lapangan: Dashboard, Penjadwalan, Kanban Board
     - penanggung_jawab_ruangan: Dashboard, Ruangan Saya
     - asisten_penilai: Dashboard, Daftar Tugas, Riwayat Penilaian
     - asisten/staff: Dashboard, Biodata, Dokumen, Timeline
   - Menu item style: `flex items-center gap-3 px-4 py-2.5 mx-3 text-sm text-gray-600 rounded-lg hover:bg-page hover:text-gray-900`
   - Active state: `bg-green-50 text-lepkom-green font-semibold` (gunakan NavLink)
   - Footer: `border-t border-border px-4 py-3` — nama user + badge role + tombol logout (icon logout + "Keluar")
   - Gunakan ROLE_LABELS dari constants.ts
   - Gunakan useAuth() hook untuk get user + logout

2. **Buat `src/components/layout/Navbar.tsx`**
   - Props: `onMenuClick` (hamburger toggle untuk mobile)
   - h-14 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-30
   - Kiri: hamburger button (hidden lg:block) + h1 judul halaman (dynamic dari route)
   - Kanan: avatar circle (initial nama user, bg-lepkom-blue) + dropdown (Profile, Keluar)
   - Mobile responsive: hamburger muncul di bawah lg

3. **Update `src/components/layout/DashboardLayout.tsx`**
   - Flex min-h-screen bg-page
   - Kiri: `<Sidebar />`
   - Kanan: flex-1 flex flex-col — `<Navbar />` + `<main className="flex-1 p-6"><Outlet /></main>`
   - Mobile: sidebar overlay dengan isOpen toggle

### Setelah selesai:
- Jalankan `npm run build`
- Commit: `feat(layout): implementasi Sidebar, Navbar, DashboardLayout`

---

## Iter 3 — Autentikasi

**Branch:** `feat/iter-03-autentikasi`
**Target:** Update 5 halaman auth dari stub ke implementasi lengkap

### Tasks

1. **Update `src/pages/auth/Login.tsx`**
   - Center card: min-h-screen bg-page flex items-center justify-center p-4
   - Card: bg-white rounded-xl shadow-lg p-8 w-full max-w-md
   - Header: logo "HRIS LepKOM" text-lepkom-green text-center, subtitle "Sistem Rekrutmen Asisten"
   - Form (react-hook-form + loginSchema dari validations):
     - Email input (component Input)
     - Password input dengan toggle show/hide
   - Tombol "Masuk" full-width (component Button variant primary)
   - Footer links: "Belum punya akun? Daftar" → /register, "Lupa password?" → /forgot-password
   - Error state: tampilkan `error` dari API di atas form (bg-red-50 border-red-200 rounded-lg p-3 text-red-600 text-sm)
   - Loading: Button show loading spinner saat submit
   - On success: useAuth().login() → redirect ke dashboard sesuai role

2. **Update `src/pages/auth/Register.tsx`**
   - Layout sama seperti Login
   - Form (registerSchema):
     - Nama Calas, NPM (8-12 digit), Email, Password, Konfirmasi Password, Kelas
   - Tombol "Daftar"
   - Footer: "Sudah punya akun? Masuk" → /login
   - Validasi: semua required, email valid, password match

3. **Update `src/pages/auth/ForgotPassword.tsx`**
   - Layout sama
   - Form (forgotPasswordSchema): Email only
   - Tombol "Kirim Link Reset"
   - Success: tampilkan pesan "Link reset sudah dikirim ke email Anda" (bg-green-50 text-green-700)

4. **Update `src/pages/auth/ResetPassword.tsx`**
   - Layout sama
   - Form (resetPasswordSchema): Password Baru, Konfirmasi Password
   - Tombol "Reset Password"
   - Baca `token` dari URL params (react-router useSearchParams)

5. **Buat `src/pages/auth/ForceChangePassword.tsx`**
   - Layout sama
   - Header: icon warning (kuning) + "Ganti Password Wajib"
   - Subtitle: "Anda harus mengganti password sebelum mengakses dashboard"
   - Form: Password Lama, Password Baru, Konfirmasi Password Baru
   - Tombol "Ganti & Masuk"
   - On success: update token, redirect ke dashboard

### Setelah selesai:
- Jalankan `npm run build`
- Commit: `feat(auth): implementasi Login, Register, ForgotPassword, ResetPassword, ForceChangePassword`

---

## Iter 4 — Toggle Rekrutmen

**Branch:** `feat/iter-04-toggle-rekrutmen`
**Target:** Toggle switch + halaman admin

### Tasks

1. **Buat `src/components/ui/Toggle.tsx`**
   - Props: `checked`, `onChange`, `disabled`, `label?`
   - Switch button: w-11 h-6 rounded-full, bg-gray-200 (off) / bg-lepkom-green (on)
   - Circle: w-5 h-5 bg-white rounded-full shadow transition translate-x-0 / translate-x-5
   - Label di samping toggle (jika ada)

2. **Buat `src/pages/admin/RecruitmentToggle.tsx`**
   - Hanya bisa diakses super_admin (cegah di route guard juga)
   - Card dengan header "Toggle Rekrutmen"
   - Toggle switch besar di tengah card
   - Status indicator: "Aktif" (hijau) / "Nonaktif" (abu)
   - Info text: "Saat aktif, asisten dapat mengubah role calas dan mengupdate timeline rekrutmen"
   - Menggunakan recruitment.service.ts

### Setelah selesai:
- Commit: `feat(toggle): tambah toggle rekrutmen untuk super admin`

---

## Iter 5 — Master Data Asisten

**Branch:** `feat/iter-05-master-asisten`
**Target:** Tabel + CRUD asisten + assign role

### Tasks

1. **Update `src/pages/master-data/AssistantsPage.tsx`**
   - Header: "Master Data Asisten" + tombol "+ Tambah Asisten"
   - Filter bar: search input (useDebounce) + filter role dropdown
   - DataTable columns: ID Asisten, Nama, NPM, Email, Role (Badge role), Status (Active badge hijau / Inactive badge abu), Aksi (Edit icon, Delete icon)
   - Pagination
   - Empty state
   - Menggunakan assistant.service.ts

2. **Buat `src/components/modals/AsistenFormModal.tsx`**
   - Props: `isOpen`, `onClose`, `mode: 'create' | 'edit'`, `data?` (pre-fill saat edit)
   - Form fields: ID Asisten, NPM, Nama, Email, Password (create only), Kelas Saat Ini
   - Footer: Batal (Button secondary) + Simpan (Button primary)

3. **Buat `src/components/modals/RoleAssignModal.tsx`**
   - Props: `isOpen`, `onClose`, `asisten: User`
   - Tampilkan nama asisten + role saat ini
   - Select dropdown role baru dari ASISTEN_ROLES
   - Info: "Role hanya bisa diubah saat rekrutmen aktif"
   - Footer: Batal + Simpan

4. **Buat `src/components/modals/ImportAsistenModal.tsx`**
   - Upload area (dashed border, icon upload)
   - Accept: .xlsx, .csv
   - Info: "Format: ID Asisten, NPM, Nama, Email, Password"
   - Tombol Import (Button primary)

### Setelah selesai:
- Commit: `feat(master-data): implementasi CRUD asisten + assign role + import`

---

## Iter 6 — Master Data Calas

**Branch:** `feat/iter-06-master-calas`
**Target:** Tabel + detail + timeline update

### Tasks

1. **Buat `src/pages/admin/CalasManagement.tsx`**
   - Header: "Master Data Calon Asisten" + badge counter
   - Filter: search + filter tahap + filter hasil
   - DataTable: ID, Nama, NPM, Email, Kelas, Tahap (Badge), Hasil (Badge hijau/kuning/merah), Status, Aksi
   - Aksi: Lihat Detail, Update Timeline, Reset Proses, Ban
   - Menggunakan candidate.service.ts

2. **Buat `src/pages/admin/CalasDetail.tsx`**
   - Back button "Kembali ke Daftar"
   - Header card: nama besar + ID + badges
   - Info grid 2 kolom (data diri + pendidikan)
   - Section: Riwayat Kursus (tabel semester)
   - Section: Kemampuan & Pengalaman
   - Section: Dokumen (link download)
   - Section: Timeline Rekrutmen (horizontal steps)
   - Action buttons: Update Timeline, Reset Proses, Ban

3. **Buat `src/components/modals/TimelineUpdateModal.tsx`**
   - Select tahap dari TAHAP_LABELS
   - Select hasil (proses, lolos, tidak_lolos)
   - Conditional: jika "tidak_lolos" → select alasanTidakLolos
   - Info: "Perubahan akan mengirim email notifikasi ke calas"

4. **Buat `src/components/modals/BanConfirmModal.tsx`**
   - Warning icon + "Apakah anda yakin ingin memban calas ini?"
   - Footer: Batal + Ban (Button danger)

### Setelah selesai:
- Commit: `feat(master-calas): implementasi manajemen calas + detail + timeline update`

---

## Iter 7 — Materi, Soal & Question Card

**Branch:** `feat/iter-07-materi-soal-qc`
**Target:** 3 halaman CRUD master data

### Tasks

1. **Update `src/pages/master-data/MaterialsPage.tsx`**
   - Header: "Master Data Materi" + tombol "+ Tambah Materi"
   - Filter: dropdown tingkat (1, 2, 3, Semua)
   - DataTable: Nama Materi, Tingkat (Badge), Deskripsi, Aksi (Edit, Hapus)
   - Modal form: Nama Materi, Tingkat (Select), Deskripsi (Textarea)
   - Menggunakan masterData.service.ts

2. **Update `src/pages/master-data/QuestionsPage.tsx`**
   - Header: "Master Data Soal Ujian" + tombol "+ Upload Soal"
   - Filter: dropdown tingkat
   - DataTable: Judul Soal, Tingkat (Badge), File (icon + nama), Aksi (Download, Hapus)
   - Modal form: Judul Soal, Tingkat (Select), File upload (accept .docx, .pdf)
   - Progress bar saat upload

3. **Update `src/pages/master-data/QuestionCardsPage.tsx`**
   - Header: "Bank Pertanyaan" + tombol "+ Tambah Pertanyaan"
   - DataTable: Judul Pertanyaan, Deskripsi, Aksi (Edit, Hapus)
   - Modal form: Judul Pertanyaan, Deskripsi (Textarea optional)
   - Role guard: hanya super_admin dan pj_soal_materi

### Setelah selesai:
- Commit: `feat(master-data): implementasi CRUD materi, soal, dan question card`

---

## Iter 8 — Biodata, Dokumen & Timeline Calas

**Branch:** `feat/iter-08-biodata-dokumen`
**Target:** 3 halaman untuk calas isi data + upload

### Tasks

1. **Update `src/pages/candidates/BiodataForm.tsx`**
   - Header: "Isi Biodata Diri" + step indicator "Langkah 1 dari 3"
   - 3 sections (scrollable, bukan multi-page):
     - Section 1 Data Diri: Nama Lengkap, NPM (readonly), Email (readonly), Kelas, Jenis Kelamin (radio Laki-laki/Perempuan), No KTP, No HP, Tempat Lahir, Tanggal Lahir, Alamat Lengkap (textarea)
     - Section 2 Pendidikan: Asal Sekolah, Jurusan, IPK, Tabel Kursus Semester 1-7 (input per baris), Checkbox "Semester kursus del"
     - Section 3 Keluarga & Kemampuan: Nama Ibu, Nama Ayah, No HP Orang Tua, Kemampuan Pribadi (textarea), Kemampuan IT (textarea), Pengalaman Organisasi (textarea), Pengalaman Kerja (textarea)
   - Tombol "Simpan Biodata" sticky bottom
   - Menggunakan candidateBiodataSchema + candidate.service.ts

2. **Update `src/pages/candidates/DocumentUpload.tsx`**
   - Header: "Unggah Dokumen" + step indicator "Langkah 2 dari 3"
   - 3 upload zones (Card style):
     - CV/Resume: PDF, max 2MB
     - KRS: PDF, max 2MB
     - Rangkuman Nilai: PDF, max 2MB
   - Upload zone: dashed border border-gray-300 rounded-lg p-8, icon upload, teks "Klik atau seret file"
   - Status: belum diunggah (abu) / sudah (hijau + nama file + tombol hapus)
   - Progress bar saat upload

3. **Update `src/pages/candidates/TimelineTracker.tsx`**
   - Header: "Status Rekrutmen Anda"
   - Horizontal timeline: 6 steps (Registrasi → Screening → Biodata → Ujian Praktek → Ujian Project → Keputusan)
   - Setiap step: icon (check hijau / clock kuning / gray), label, tanggal
   - Status card di bawah: Proses (abu) / Lolos (hijau) / Tidak Lolos (merah + alasan)

### Setelah selesai:
- Commit: `feat(biodata): implementasi form biodata + upload dokumen + timeline tracker`

---

## Iter 9 — Ujian

**Branch:** `feat/iter-09-ujian`
**Target:** 3 halaman download soal + upload hasil

### Tasks

1. **Buat `src/pages/candidates/ExamDownload.tsx`**
   - Header: "Ujian Praktek — Unduh Soal"
   - Info card + daftar soal per tingkat + tombol download
   - Empty state: "Belum ada soal untuk tingkat Anda"

2. **Buat `src/pages/candidates/ExamUploadPraktek.tsx`**
   - Header: "Ujian Praktek — Unggah Hasil"
   - Upload zone: PDF/DOCX, max 10MB
   - Status: belum diunggah / sudah + tombol ganti

3. **Buat `src/pages/candidates/ExamUploadProject.tsx`**
   - Header: "Ujian Project — Unggah Presentasi"
   - Upload zone: PPT/PPTX, max 10MB

### Setelah selesai:
- Commit: `feat(exam): halaman download soal + upload hasil ujian praktek & project`

---

## Iter 10 — Penjadwalan

**Branch:** `feat/iter-10-penjadwalan`
**Target:** 5 halaman penjadwalan + ruangan

### Tasks

1. **Buat `src/pages/scheduling/SessionList.tsx`** — cards grid sesi ujian
2. **Buat `src/pages/scheduling/SessionForm.tsx`** — form buat sesi (tanggal + jenis ujian + catatan)
3. **Update `src/pages/scheduling/RoomAssignment.tsx`** — grid 2x2 PJ per ruangan
4. **Buat `src/pages/scheduling/RoomPlacement.tsx`** — 4 kolom (calas + penilai per ruangan)
5. **Update `src/pages/scheduling/KanbanBoard.tsx`** — overview per ruangan dengan status badge

### Setelah selesai:
- Commit: `feat(scheduling): implementasi sesi ujian, assign PJ, dan placement ruangan`

---

## Iter 11 — Penilaian

**Branch:** `feat/iter-11-penilaian`
**Target:** Form penilaian + daftar tugas + riwayat

### Tasks

1. **Buat `src/pages/penilai/MyAssignments.tsx`** — tabel tugas penilaian
2. **Update `src/pages/evaluations/ScoreForm.tsx`** — dynamic kriteria slider (4 untuk praktek, 9 untuk project) + deskripsi + auto rata-rata
3. **Update `src/pages/evaluations/ScoreHistory.tsx`** — tabel riwayat + expand detail

### Setelah selesai:
- Commit: `feat(evaluation): implementasi form penilaian + riwayat skor`

---

## Iter 12 — Dashboard per Role

**Branch:** `feat/iter-12-dashboard-role`
**Target:** 6 dashboard stat cards + summary

### Tasks

1. **Update 6 dashboard files** di `src/pages/dashboard/`:
   - AdminDashboard: 4 stat cards + tabel ringkasan + shortcut aksi
   - CalasDashboard: status rekrutmen + timeline + checklist dokumen
   - PenilaiDashboard: tugas menunggu + sud dinilai + riwayat
   - KorlapDashboard: sesi aktif + ruangan terisi + aksi cepat
   - PJRuanganDashboard: ruangan ditugaskan + detail penugasan
   - PJSoalDashboard: total materi/soal/QC + aksi cepat

### Setelah selesai:
- Commit: `feat(dashboard): implementasi dashboard statistik per role`

---

## Catatan untuk Agent AI

1. **Selalu baca file yang ada di `src/`** sebelum buat baru — jangan duplikasi kode yang sudah ada
2. **Import komponen dari `@/components/ui/`** — jangan buat ulang Button, Input, dll
3. **Import tipe dari `@/types`** — jangan define ulang tipe yang sudah ada
4. **Import service dari `@/services/`** — jangan buat fetch call manual
5. **Gunakan Zod schema dari `@/validations/`** untuk form
6. **Tailwind tokens hanya:** lepkom-green, lepkom-blue, page, surface, border, status-green/yellow/red. Jangan pakai hex langsung.
7. **Jalankan `npm run build`** setelah setiap iterasi untuk cek error
8. **Satu iterasi selesai = commit + push ke branch sendiri**
