# TanyaIn

Sebuah aplikasi quiz minimalis yang dibangun dengan React dan TypeScript. Pengguna dapat mendaftar, mengonfigurasi quiz, dan bermain soal pilihan ganda berbasis waktu yang diambil dari Open Trivia Database.

## Stack

- React 19 + TypeScript
- Vite
- TailwindCSS v4
- Zustand (dengan middleware `persist`)
- React Router DOM v7
- Motion (untuk animasi)
- Axios
- Lucide React (icons)

## Getting Started

Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build untuk production:

```bash
npm run build
```

Preview hasil build production:

```bash
npm run preview
```

Lint codebase:

```bash
npm run lint
```

## Struktur Project

```
src/
  api/          OpenTDB API client dan types
  components/   Reusable UI (Button, Card, Input, SettingsModal, ProtectedRoute)
  lib/          Utilities (cn, password hashing)
  store/        Zustand stores (auth, quiz)
  views/        Page-level views (AuthView, StartView, QuizView, ResultView)
  App.tsx       Route definitions
  main.tsx      Entry point
  index.css     Global styles dan theme tokens
```

## Alur Aplikasi

1. `/` — `AuthView`. Login atau register. Kredensial disimpan secara lokal dengan password yang di-hash menggunakan SHA-256 (hanya di browser, tanpa backend).
2. `/start` — `StartView`. Menampilkan konfigurasi quiz saat ini dan memulai permainan. Membuka settings modal untuk mengubah amount, category, difficulty, dan type.
3. `/quiz` — `QuizView`. Menampilkan soal satu per satu dengan countdown timer per quiz.
4. `/result` — `ResultView`. Menampilkan total, answered, correct, dan wrong.

Semua route selain auth dijaga oleh `ProtectedRoute`, yang akan mengarahkan pengguna yang belum login kembali ke `/`.

## Konfigurasi Quiz

- Amount: 5, 10, 15, 20, atau 50 soal
- Category: salah satu dari sembilan kategori OpenTDB yang didukung
- Difficulty: easy, medium, atau hard
- Type: multiple choice atau true / false

Durasi timer disesuaikan dengan jumlah soal, mulai dari dua menit (lima soal) hingga dua puluh lima menit (lima puluh soal).

## State

Dua Zustand stores dengan middleware `persist` (localStorage):

- `useAuthStore` — daftar user yang terdaftar dan username yang sedang login.
- `useQuizStore` — daftar soal, index saat ini, score, timer, dan konfigurasi quiz.

## Catatan

- Tidak ada backend. Autentikasi, progres quiz, dan konfigurasi semuanya disimpan di sisi client.
- Soal diambil secara on-demand dari `https://opentdb.com/api.php`.
- Tema aplikasi monochrome, monospace, dan menggunakan JetBrains Mono di seluruh aplikasi.
