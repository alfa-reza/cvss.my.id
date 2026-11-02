---
title: Memulai
description: Panduan memulai cepat untuk menilai kerentanan di kalkulator browser atau melalui server CVSS MCP.
---

CVSS.my.id menyediakan dua cara untuk menghitung skor Common Vulnerability Scoring System (CVSS):

1. **Kalkulator Browser Interaktif** untuk penilaian lengkap multi-kelompok (Base, Threat/Temporal, Environmental, dan Supplemental).
2. **Server MCP (`cvss-calculator-mcp`)** untuk perhitungan **Base Score** otomatis di dalam agen pengkodean AI dan alur triase keamanan.

## Alat Mana yang Sebaiknya Saya Gunakan?

| Kebutuhan | Alat yang Disarankan | Kelompok Metrik yang Didukung |
| --- | --- | --- |
| Triase kerentanan interaktif dengan metrik Threat, Temporal, Environmental, atau Supplemental | [Kalkulator Browser Lengkap](/id/docs/calculator/) | Base, Threat, Temporal, Environmental, Supplemental (v4.0, v3.1, v3.0, v2.0) |
| Mengekspor vector string kanonis atau ringkasan skor terformat | [Kalkulator Browser Lengkap](/id/docs/calculator/) | Serialisasi vector lengkap pada semua kelompok metrik |
| Perhitungan Base Score otomatis di Codex, Claude Code, Cursor, atau OpenCode | [MCP Lokal (`stdio`)](/id/docs/mcp/local/) | Base Score saja (v4.0, v3.1, v3.0, v2.0) |
| Pengujian MCP tanpa instalasi dari ruang kerja cloud atau agen berbasis browser | [MCP Jarak Jauh (HTTP)](/id/docs/mcp/remote/) | Base Score saja (batas 5 permintaan/menit/IP) |

## Mulai Cepat: Kalkulator Browser Lengkap

1. Buka kalkulator untuk versi CVSS yang Anda tuju:
   - [Kalkulator CVSS v4.0](https://cvss.my.id/calculator/v4.0)
   - [Kalkulator CVSS v3.1](https://cvss.my.id/calculator/v3.1)
   - [Kalkulator CVSS v3.0](https://cvss.my.id/calculator/v3.0)
   - [Kalkulator CVSS v2.0](https://cvss.my.id/calculator/v2.0)
2. Pilih semua metrik **Base** yang wajib. Selama setiap metrik Base wajib belum dipilih, skor akan menampilkan `Incomplete`, bukan `0.0`.
3. Secara opsional, pindah tab untuk menambahkan metrik **Threat** (v4.0), **Temporal** (v3.x/v2.0), **Environmental**, atau **Supplemental** (v4.0).
4. Atau tempel vector CVSS yang sudah ada langsung ke kolom **Inline Vector String** di bagian atas kalkulator untuk mengisi formulir dan menghitung skor seketika.
5. Gunakan **Copy Vector** atau **Copy Result** setelah semua metrik Base wajib valid.

## Mulai Cepat: Server MCP Lokal (Disarankan untuk Agen)

Instal biner Go mandiri di Linux atau macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Pastikan biner tersedia di `PATH` Anda:

```bash
cvss-calculator-mcp --version
```

Lalu daftarkan `cvss-calculator-mcp` di klien AI Anda menggunakan [Panduan Penyiapan Klien](/id/docs/mcp/clients/).
