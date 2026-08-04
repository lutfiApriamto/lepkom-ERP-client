# Phase 3 — Plan by Feature

## Dependency Graph

```
Iter 1: UI Primitif
  └──► Iter 2: Layout & Nav
        └──► Iter 3: Auth
              ├──► Iter 4: Toggle Rekrutmen
              ├──► Iter 5: Master Asisten
              ├──► Iter 6: Master Calas
              ├──► Iter 7: Materi / Soal / QC
              └──► Iter 8: Biodata & Dokumen
                     ├──► Iter 9: Ujian
                     └──► Iter 10: Penjadwalan
                            └──► Iter 11: Penilaian
                                   └──► Iter 12: Dashboard per Role
```

## Target: Design di Antigravity (sebelum Phase 5)

| Iterasi | Halaman yang Perlu Didesain | Prioritas Desain |
|---------|---------------------------|------------------|
| 1 | Tidak ada (component library) | — |
| 2 | Layout shell (sidebar + navbar) | Tinggi |
| 3 | Login, Register, ForgotPassword, ResetPassword | Tinggi |
| 4 | Toggle switch + status badge | Rendah |
| 5 | Tabel master asisten + form CRUD + form role assign | Sedang |
| 6 | Tabel master calas + detail profile + form update timeline | Sedang |
| 7 | Tabel materi, soal, question card + form CRUD | Sedang |
| 8 | Form biodata (multi-step?) + upload dokumen + timeline tracker | **Tinggi** |
| 9 | Halaman download soal + upload hasil ujian | Sedang |
| 10 | Form sesi ujian + form assign PJ + form placement ruangan | Sedang |
| 11 | Form penilaian praktek (4 kriteria) + form penilaian project (9 kriteria) | **Tinggi** |
| 12 | 6 dashboard cards/stats per role | Sedang |

## Rincian Per Iterasi

---

### Iter 1: UI Primitif

**Branch:** `feat/iter-01-ui-primitif`
**Dependencies:** —
**Estimasi:** 1-2 hari

**Yang dibuat:**
| File | Keterangan |
|------|------------|
| `src/components/ui/Button.tsx` | Primary, secondary, danger, disabled, loading state |
| `src/components/ui/Input.tsx` | Text, email, password + label + error + required indicator |
| `src/components/ui/Badge.tsx` | Role badge + status flag (green/yellow/red) |
| `src/components/ui/Card.tsx` | Container latar putih + optional header |
| `src/components/ui/Modal.tsx` | Dialog overlay + confirm variant |
| `src/components/ui/DataTable.tsx` | Tabel dengan sorting + empty state |

**File tambahan:**
| File | Keterangan |
|------|------------|
| `src/components/ui/Select.tsx` | Dropdown select (dibutuhkan di form) |
| `src/components/ui/Textarea.tsx` | Textarea (dibutuhkan di form biodata) |
| `src/components/ui/Skeleton.tsx` | Loading placeholder |

**Commit target:**
```
feat(ui): tambah komponen primitif Button, Input, Badge, Card, Modal, DataTable
```

**Kriteria selesai:**
- [ ] Semua komponen bisa di-import tanpa error
- [ ] Build pass
- [ ] Preview di browser: render test page yang menampilkan semua komponen

---

### Iter 2: Layout & Navigation

**Branch:** `feat/iter-02-layout-nav`
**Dependencies:** Iter 1
**Estimasi:** 1-2 hari

**Yang dibuat:**
| File | Keterangan |
|------|------------|
| `src/components/layout/Sidebar.tsx` | Navigasi samping per role + active state + collapsible |
| `src/components/layout/Navbar.tsx` | Logo + profile dropdown + logout |
| `src/components/layout/DashboardLayout.tsx` | **Update**: Sidebar + Navbar + `<Outlet />` |

**Commit target:**
```
feat(layout): implementasi Sidebar, Navbar, dan DashboardLayout
```

**Kriteria selesai:**
- [ ] Sidebar tampil dengan menu berbeda per role
- [ ] Navbar tampilkan logo + nama user + tombol logout
- [ ] Build pass

---

### Iter 3: Autentikasi

**Branch:** `feat/iter-03-autentikasi`
**Dependencies:** Iter 2
**Estimasi:** 2-3 hari

**Yang dibuat:**
| File | Keterangan |
|------|------------|
| `src/pages/auth/Login.tsx` | **Update**: form email + password + validasi + useAuth |
| `src/pages/auth/Register.tsx` | **Update**: form registrasi calas + validasi |
| `src/pages/auth/ForgotPassword.tsx` | **Update**: form email → kirim reset link |
| `src/pages/auth/ResetPassword.tsx` | **Update**: form token + password baru |
| `src/pages/auth/ForceChangePassword.tsx` | **New**: form ganti password wajib (calas dari asisten) |

**Commit target:**
```
feat(auth): implementasi Login, Register, ForgotPassword, ResetPassword
```

**Kriteria selesai:**
- [ ] Login → redirect ke dashboard sesuai role
- [ ] Register → redirect ke login
- [ ] Token tersimpan di Zustand + localStorage
- [ ] ProtectedRoute redirect ke /login jika tidak ada token
- [ ] Build pass

---

### Iter 4: Toggle Rekrutmen

**Branch:** `feat/iter-04-toggle-rekrutmen`
**Dependencies:** Iter 3
**Estimasi:** 0.5 hari

**Yang dibuat:**
| File | Keterangan |
|------|------------|
| `src/components/ui/Toggle.tsx` | **New**: switch on/off component |
| `src/pages/admin/RecruitmentToggle.tsx` | **New**: toggle + status indicator (super admin only) |

**Commit target:**
```
feat(toggle): tambah toggle rekrutmen untuk super admin
```

---

### Iter 5: Master Data Asisten

**Branch:** `feat/iter-05-master-asisten`
**Dependencies:** Iter 3
**Estimasi:** 1-2 hari

**Yang dibuat/diupdate:**
| File | Keterangan |
|------|------------|
| `src/pages/master-data/AssistantsPage.tsx` | **Update**: tabel asisten + search + pagination |
| `src/components/modals/AsistenFormModal.tsx` | **New**: form tambah/edit asisten |
| `src/components/modals/RoleAssignModal.tsx` | **New**: form assign/ubah role |

**Commit target:**
```
feat(master-data): implementasi CRUD asisten + assign role
```

---

### Iter 6: Master Data Calas

**Branch:** `feat/iter-06-master-calas`
**Dependencies:** Iter 3
**Estimasi:** 1-2 hari

**Yang dibuat/diupdate:**
| File | Keterangan |
|------|------------|
| `src/pages/admin/CalasManagement.tsx` | **New**: tabel calas + filter + search |
| `src/pages/admin/CalasDetail.tsx` | **New**: detail profile calas + update timeline |
| `src/components/modals/TimelineUpdateModal.tsx` | **New**: form update tahap + hasil rekrutmen |
| `src/components/modals/BanConfirmModal.tsx` | **New**: konfirmasi ban/unban |

**Commit target:**
```
feat(master-calas): implementasi manajemen calas + timeline update
```

---

### Iter 7: Materi, Soal & Question Card

**Branch:** `feat/iter-07-materi-soal-qc`
**Dependencies:** Iter 3
**Estimasi:** 1-2 hari

**Yang dibuat/diupdate:**
| File | Keterangan |
|------|------------|
| `src/pages/master-data/MaterialsPage.tsx` | **Update**: tabel materi + form CRUD |
| `src/pages/master-data/QuestionsPage.tsx` | **Update**: tabel soal + upload file |
| `src/pages/master-data/QuestionCardsPage.tsx` | **Update**: tabel question card + form CRUD |

**Commit target:**
```
feat(master-data): implementasi CRUD materi, soal, dan question card
```

---

### Iter 8: Biodata & Dokumen Calas

**Branch:** `feat/iter-08-biodata-dokumen`
**Dependencies:** Iter 3
**Estimasi:** 2-3 hari

**Yang dibuat/diupdate:**
| File | Keterangan |
|------|------------|
| `src/pages/candidates/BiodataForm.tsx` | **Update**: form multi-field biodata + validasi |
| `src/pages/candidates/DocumentUpload.tsx` | **Update**: upload CV + KRS + rangkuman nilai |
| `src/pages/candidates/TimelineTracker.tsx` | **Update**: visual timeline status rekrutmen |

**Commit target:**
```
feat(biodata): implementasi form biodata + upload dokumen + timeline tracker
```

---

### Iter 9: Ujian Praktek & Project

**Branch:** `feat/iter-09-ujian`
**Dependencies:** Iter 8
**Estimasi:** 1 hari

**Yang dibuat:**
| File | Keterangan |
|------|------------|
| `src/pages/candidates/ExamDownload.tsx` | **New**: daftar soal + download per level |
| `src/pages/candidates/ExamUploadPraktek.tsx` | **New**: upload hasil ujian praktek |
| `src/pages/candidates/ExamUploadProject.tsx` | **New**: upload PPT/PPTX ujian project |

**Commit target:**
```
feat(exam): halaman download soal + upload hasil ujian praktek & project
```

---

### Iter 10: Penjadwalan & Penugasan Ruangan

**Branch:** `feat/iter-10-penjadwalan`
**Dependencies:** Iter 4, 6, 7
**Estimasi:** 2-3 hari

**Yang dibuat/diupdate:**
| File | Keterangan |
|------|------------|
| `src/pages/scheduling/SessionForm.tsx` | **New**: form buat sesi ujian |
| `src/pages/scheduling/SessionList.tsx` | **New**: tabel daftar sesi ujian |
| `src/pages/scheduling/RoomAssignment.tsx` | **Update**: form assign PJ per ruangan |
| `src/pages/scheduling/RoomPlacement.tsx` | **New**: form pembagian calas + penilai |
| `src/pages/scheduling/KanbanBoard.tsx` | **Update**: overview penugasan per ruangan |

**Commit target:**
```
feat(scheduling): implementasi sesi ujian, assign PJ, dan placement ruangan
```

---

### Iter 11: Penilaian

**Branch:** `feat/iter-11-penilaian`
**Dependencies:** Iter 10
**Estimasi:** 1-2 hari

**Yang dibuat/diupdate:**
| File | Keterangan |
|------|------------|
| `src/pages/penilai/MyAssignments.tsx` | **New**: daftar calas yang di-assign |
| `src/pages/evaluations/ScoreForm.tsx` | **Update**: form penilaian (dynamic kriteria per jenis ujian) |
| `src/pages/evaluations/ScoreHistory.tsx` | **Update**: riwayat penilaian yang sudah diinput |

**Commit target:**
```
feat(evaluation): implementasi form penilaian + riwayat skor
```

---

### Iter 12: Dashboard per Role

**Branch:** `feat/iter-12-dashboard-role`
**Dependencies:** Semua iterasi sebelumnya
**Estimasi:** 1-2 hari

**Yang dibuat/diupdate:**
| File | Keterangan |
|------|------------|
| `src/pages/dashboard/AdminDashboard.tsx` | **Update**: stat cards + overview |
| `src/pages/dashboard/CalasDashboard.tsx` | **Update**: timeline + status rekrutmen |
| `src/pages/dashboard/PenilaiDashboard.tsx` | **Update**: daftar tugas penilaian |
| `src/pages/dashboard/KorlapDashboard.tsx` | **Update**: jadwal + overview ruangan |
| `src/pages/dashboard/PJRuanganDashboard.tsx` | **Update**: overview ruangan per PJ |
| `src/pages/dashboard/PJSoalDashboard.tsx` | **Update**: overview materi & soal |

**Commit target:**
```
feat(dashboard): implementasi dashboard statistik per role
```

---

## Execution Strategy

### Pola Paralel

Setelah Iter 3 selesai, **3 jalur paralel** bisa jalan bersama:

```
Jalur A (Admin):    Iter 4 → Iter 5 → Iter 6
Jalur B (Content):  Iter 7
Jalur C (Calas):    Iter 8 → Iter 9
                          │
              ┌───────────┘
              ▼
         Iter 10 (menunggu Jalur A + B selesai)
              │
              ▼
         Iter 11
              │
              ▼
         Iter 12 (final)
```

### Workflow Commit

Untuk setiap iterasi:
1. `git checkout -b feat/iter-NN-nama-fitur`
2. Implementasi
3. `npm run build` — pastikan pass
4. Commit dengan format `feat(scope): deskripsi`
5. Push: `git push -u origin feat/iter-NN-nama-fitur`
6. Saya reminder kamu untuk review
7. Kamu konfirmasi "oke" → saya merge ke main
8. Hapus branch

### Checklist per Iterasi

Setiap iterasi selesai jika:
- [ ] Semua file terbuat/diupdate
- [ ] `npm run build` pass tanpa error
- [ ] `npx tsc --noEmit` pass
- [ ] Tidak ada `console.log` di kode
- [ ] Semua warna pakai Tailwind token (bukan hex langsung)
- [ ] Commit + push ke branch
- [ ] Kamu konfirmasi review → merge ke main

---

**HRIS LepKOM · Phase 3 — Plan by Feature v1.0**
