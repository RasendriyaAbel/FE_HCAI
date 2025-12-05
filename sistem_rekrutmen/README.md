# Sistem Rekrutmen Digital

Aplikasi web untuk sistem rekrutmen digital yang dibangun dengan React dan Vite. Aplikasi ini menyediakan berbagai fitur untuk pencari kerja dan perusahaan dalam proses rekrutmen.

## Fitur Utama

### Halaman Dashboard
- Ringkasan pencarian kerja
- Rekomendasi lowongan pekerjaan
- Status lamaran pekerjaan
- Notifikasi dan langkah selanjutnya

### Halaman Pencarian Lowongan
- Filter lowongan berdasarkan:
  - Tipe pekerjaan
  - Lokasi
  - Tingkat pengalaman
  - Industri
  - Rentang gaji
- Pencarian berdasarkan kata kunci
- Sorting berdasarkan relevansi, tanggal, atau gaji

### Halaman Detail Lowongan
- Informasi lengkap lowongan pekerjaan
- Tab untuk deskripsi, kualifikasi, dan informasi perusahaan
- Tombol lamar dan simpan lowongan
- Fitur berbagi ke media sosial

### Halaman Profil
- Informasi personal
- Pengalaman kerja
- Pendidikan
- Skills
- Dokumen
- Auto-fill dari resume/CV

### Halaman Status Lamaran
- Timeline proses lamaran
- Feedback dari perusahaan
- Status setiap tahap (Diterima, Seleksi, Tes, Wawancara)

## Teknologi yang Digunakan

- **React 19** - Library UI
- **React Router DOM** - Routing
- **Vite** - Build tool
- **Lucide React** - Icon library
- **CSS3** - Styling dengan custom properties

## Struktur Proyek

```
src/
├── components/          # Komponen reusable
│   ├── Layout/         # Layout utama dengan sidebar
│   ├── Sidebar/        # Sidebar navigasi
│   └── Header/         # Header dengan search bar
├── pages/              # Halaman aplikasi
│   ├── Dashboard/      # Halaman dashboard
│   ├── JobSearch/      # Halaman pencarian lowongan
│   ├── JobDetail/      # Halaman detail lowongan
│   ├── Applications/   # Daftar lamaran
│   ├── ApplicationStatus/ # Status lamaran
│   ├── Profile/        # Halaman profil
│   └── Settings/       # Pengaturan
├── App.jsx             # Komponen utama dengan routing
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Build untuk production:
```bash
npm run build
```

## Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Menjalankan ESLint

## Tema

Aplikasi menggunakan dark theme dengan variabel CSS untuk konsistensi warna:
- Primary background: `#0f1419`
- Secondary background: `#1a1f2e`
- Accent blue: `#3b82f6`
- Text primary: `#ffffff`
- Text secondary: `#a0aec0`

## Responsive Design

Aplikasi dirancang untuk responsif di berbagai ukuran layar:
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## Lisensi

MIT
