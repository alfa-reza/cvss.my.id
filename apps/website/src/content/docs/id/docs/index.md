---
title: Ikhtisar Dokumentasi
description: Referensi teknis untuk penilaian CVSS 2.0, 3.0, 3.1, dan 4.0, vector string, kalkulator browser lengkap, dan server MCP khusus Base.
---

Selamat datang di dokumentasi **CVSS.my.id**. Dokumentasi ini mencakup dua produk statis dan satu server Model Context Protocol (MCP) sumber terbuka:

1. [**Kalkulator CVSS**](https://cvss.my.id/calculator/): Menilai kerentanan CVSS 4.0, 3.1, 3.0, dan 2.0 pada kelompok metrik Base, Threat/Temporal, Environmental, dan Supplemental.
2. **Dokumentasi dan Hub Produk**: Panduan referensi untuk perbedaan versi CVSS, sintaks vector, rumus penilaian, dan integrasi agen AI.
3. **CVSS Calculator MCP (`cvss-calculator-mcp`)**: Server MCP Go sumber terbuka untuk **Base Score saja** pada CVSS 2.0, 3.0, 3.1, dan 4.0. Berjalan secara lokal melalui `stdio` atau melalui endpoint Streamable HTTP publik yang gratis.

## Bagian Dokumentasi

### Memulai dan Kalkulator

- [Memulai](/id/docs/getting-started/): Pilih versi CVSS dan alat yang sesuai untuk alur kerja Anda.
- [Panduan Kalkulator Browser Lengkap](/id/docs/calculator/): Tab kelompok metrik, pengeditan vector inline, navigasi keyboard, dan ekspor hasil.

### Referensi CVSS

- [Perbandingan Versi](/id/docs/cvss/overview/): Perbandingan berdampingan CVSS 4.0, 3.1, 3.0, dan 2.0.
- [Referensi CVSS v4.0](/id/docs/cvss/v4/): Kelompok Base, Threat, Environmental, Supplemental, pencarian MacroVector, dan nomenklatur `CVSS-B` / `CVSS-BT` / `CVSS-BE` / `CVSS-BTE`.
- [Referensi CVSS v3.1](/id/docs/cvss/v3.1/): Rumus Base, Temporal, dan Environmental, aturan Scope, serta perilaku `Roundup`.
- [Referensi CVSS v3.0](/id/docs/cvss/v3.0/): Rumus 3.0 historis dan perbedaan tepatnya dari 3.1.
- [Referensi CVSS v2.0](/id/docs/cvss/v2/): Access Vector, Authentication (`Au`), Temporal, Environmental, dan skala tingkat keparahan tiga tingkat (`Low`, `Medium`, `High`).
- [Kunci Metrik Base dan Rentang Tingkat Keparahan](/id/docs/cvss/metric-keys/): Singkatan kunci, nilai Base yang diizinkan, dan pita skor kualitatif untuk setiap versi.
- [Glosarium Metrik CVSS](/id/docs/cvss/metric-glossary/): Definisi dan nilai yang diizinkan untuk setiap kunci metrik pada CVSS 4.0, 3.1, 3.0, dan 2.0.
- [Format Vector String](/id/docs/cvss/vectors/): Aturan awalan, urutan metrik, metrik wajib dan opsional, serta aturan validasi.
- [Contoh Terperinci](/id/docs/cvss/examples/): Vector kerentanan dunia nyata pada keempat versi CVSS.

### Server MCP (`cvss-calculator-mcp`)

- [Ikhtisar MCP](/id/docs/mcp/): Perbandingan `stdio` lokal dan Streamable HTTP jarak jauh, serta cakupan khusus Base.
- [Penyiapan MCP Lokal (stdio)](/id/docs/mcp/local/): Instalasi tanpa batas laju yang disarankan untuk Linux dan macOS.
- [Penyiapan MCP Jarak Jauh (HTTP)](/id/docs/mcp/remote/): Hubungkan ke `https://cvss.my.id/mcp` dan pahami kebijakan 5 permintaan per menit per IP.
- [Referensi Alat MCP](/id/docs/mcp/tools/): Skema masukan, bidang keluaran, dan contoh panggilan untuk `calculate_cvss`.
- [Keamanan, Privasi, dan Batas Laju](/id/docs/mcp/security/): Jaminan offline, catatan transportasi, dan verifikasi kode sumber.
- [Panduan Penyiapan Klien](/id/docs/mcp/clients/): Petunjuk penyiapan untuk sejumlah klien dan editor MCP.

## Atribusi Standar

CVSS (Common Vulnerability Scoring System) adalah standar industri gratis dan terbuka yang dimiliki serta dikelola oleh **FIRST.Org, Inc.** (Forum of Incident Response and Security Teams). Spesifikasi resmi diterbitkan di:

- [Spesifikasi CVSS v4.0 FIRST](https://www.first.org/cvss/v4.0/specification-document)
- [Spesifikasi CVSS v3.1 FIRST](https://www.first.org/cvss/v3-1/specification-document)
- [Spesifikasi CVSS v3.0 FIRST](https://www.first.org/cvss/v3.0/specification-document)
- [Panduan Lengkap CVSS v2.0 FIRST](https://www.first.org/cvss/v2/guide)
