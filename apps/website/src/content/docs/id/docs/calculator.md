---
title: Panduan Kalkulator Browser Lengkap
description: Cara menggunakan kalkulator browser lengkap CVSS 2.0, 3.0, 3.1, dan 4.0, kontrol hibrida, editor vector inline, dan ekspor hasil.
---

[Kalkulator CVSS](https://cvss.my.id/calculator/) mengevaluasi skor dan vector kerentanan sesuai spesifikasi resmi FIRST untuk CVSS 4.0, 3.1, 3.0, dan 2.0.

## Rute Versi

Setiap versi CVSS memiliki rute statis khusus:

- [Kalkulator CVSS v4.0](https://cvss.my.id/calculator/v4.0) (rute bawaan)
- [Kalkulator CVSS v3.1](https://cvss.my.id/calculator/v3.1)
- [Kalkulator CVSS v3.0](https://cvss.my.id/calculator/v3.0)
- [Kalkulator CVSS v2.0](https://cvss.my.id/calculator/v2.0)

## Tab Kelompok Metrik

Alih-alih menampilkan puluhan kontrol dalam satu dinding vertikal, setiap versi mengelompokkan metriknya ke dalam tab yang logis:

- **CVSS v4.0**: `Base` (11 metrik wajib), `Threat` (1 metrik opsional), `Environmental` (14 metrik opsional), `Supplemental` (6 metrik kontekstual opsional).
- **CVSS v3.1 dan v3.0**: `Base` (8 metrik wajib), `Temporal` (3 metrik opsional), `Environmental` (11 metrik opsional).
- **CVSS v2.0**: `Base` (6 metrik wajib), `Temporal` (3 metrik opsional), `Environmental` (5 metrik opsional).

### Kontrol Hibrida

- **Tombol radio tersegmentasi**: Digunakan saat metrik memiliki 2 sampai 4 opsi singkat (seperti Attack Vector, Attack Complexity, atau Scope). Mendukung pemilihan dengan keyboard dan garis luar `:focus-visible` yang terlihat.
- **Dropdown `<select>` asli**: Digunakan saat metrik memiliki 5 opsi atau lebih, atau labelnya panjang (seperti Target Distribution pada CVSS v2.0 atau override Temporal/Environmental dengan `Not Defined`).

## Status Incomplete dan Skor Numerik

Skor tidak pernah ditampilkan sebagai `0.0` hanya karena metrik belum dipilih.

- Selama ada metrik Base wajib yang belum dipilih, Panel Skor menampilkan **`Incomplete`** dan mencantumkan jumlah tepat metrik Base yang belum diisi.
- Setelah semua metrik Base wajib dipilih, Panel Skor langsung menghitung skor numerik keseluruhan, label tingkat keparahan kualitatif, nomenklatur aktif (seperti `CVSS-B` atau `CVSS-BTE` pada v4.0), dan rincian sub-skor.

## Panel Skor

Panel skor muncul di atas metrik pada perangkat seluler dan di samping metrik pada desktop. Panel ini menampilkan gauge skor, peringkat tingkat keparahan kualitatif, skala 0-10, dan sub-skor yang sesuai versi: Impact dan Exploitability untuk CVSS v2.0 dan v3.x, serta Base dan Nomenclature untuk CVSS v4.0. Panel diperbarui otomatis saat nilai metrik berubah.

- **Share**: Menyalin tautan yang berisi vector kanonis saat ini.
- **Show explanations**: Menyembunyikan atau menampilkan deskripsi metrik dan teks bantuan untuk nilai yang dipilih.
- **Severity Levels**: Bagian di bawah kalkulator mencantumkan pita peringkat kualitatif untuk versi CVSS yang aktif.

## Editor Vector Inline dan Perlindungan Out-of-Sync

Kolom **Vector String** di bagian atas ruang kerja selalu dapat diedit:

1. **Masukan vector valid**: Mengetik atau menempel vector valid untuk versi saat ini akan memperbarui kontrol metrik di semua tab dan menghitung ulang skor. Untuk vector dari versi lain, ikuti tautan yang ditampilkan untuk membuka kalkulator versi tersebut.
2. **Draf vector tidak valid**: Jika Anda salah mengetik kode metrik atau menempel string yang cacat, kalkulator:
   - Tidak pernah menimpa atau menghapus teks yang sedang Anda ketik.
   - Menampilkan pesan validasi spesifik di bawah kolom yang menjelaskan token yang salah atau metrik yang hilang.
   - Menandai Panel Skor sebagai **Out of Sync (Showing Last Valid Score)** dan menawarkan tombol **Revert Vector Input**.
   - Menonaktifkan **Copy Vector** dan **Copy Result** agar Anda tidak tanpa sengaja menyalin skor yang tidak valid atau tidak sinkron.

## Tombol Aksi

- **Copy Vector**: Menyalin vector string CVSS kanonis ke papan klip Anda.
- **Copy Result**: Menyalin ringkasan teks biasa terformat (misalnya, `CVSS v4.0 Score: 9.3 (Critical) [CVSS-B] - CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`).
- **Reset Group**: Mengatur ulang hanya tab yang sedang terbuka (`Threat`, `Temporal`, `Environmental`, atau `Supplemental`) kembali ke `Not Defined` (`X` / `ND`), atau menghapus pilihan `Base` saat berada di tab `Base`.
- **Reset All**: Menghapus semua metrik dan memulihkan status bawaan untuk versi CVSS yang aktif.

## Tabel Referensi

Rentang tingkat keparahan kualitatif dan kunci metrik Base wajib untuk setiap versi yang didukung didokumentasikan di [Kunci Metrik Base dan Rentang Tingkat Keparahan](/id/docs/cvss/metric-keys/).
