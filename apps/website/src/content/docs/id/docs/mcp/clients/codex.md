---
title: Penyiapan MCP Codex
description: Konfigurasikan cvss-calculator-mcp di OpenAI Codex CLI dan ekstensi IDE menggunakan stdio lokal atau Streamable HTTP jarak jauh.
---

Panduan ini menunjukkan cara menghubungkan **OpenAI Codex** ke `cvss-calculator-mcp` untuk perhitungan Base Score CVSS 2.0, 3.0, 3.1, dan 4.0.

## Opsi 1: MCP Lokal (`stdio`) - Disarankan

`stdio` lokal berjalan di komputer Anda tanpa batas laju.

### Langkah 1: Instal Biner (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Langkah 2: Daftarkan dengan Codex CLI

Jalankan perintah `codex mcp add`:

```bash
codex mcp add cvss-calculator -- cvss-calculator-mcp
```

Atau tambahkan blok berikut langsung ke `~/.codex/config.toml` (global) atau `.codex/config.toml` (proyek):

```toml
[mcp_servers.cvss-calculator]
command = "cvss-calculator-mcp"
args = []
```

## Opsi 2: MCP Jarak Jauh (Streamable HTTP)

Gunakan endpoint yang dihosting di `https://cvss.my.id/mcp` jika Anda tidak ingin menginstal biner lokal.

> **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

### Daftarkan melalui Codex CLI

```bash
codex mcp add cvss-calculator --url https://cvss.my.id/mcp
```

Atau tambahkan blok berikut ke `~/.codex/config.toml`:

```toml
[mcp_servers.cvss-calculator]
url = "https://cvss.my.id/mcp"
```

## Verifikasi Koneksi

Daftar server MCP yang dikonfigurasi di Codex:

```bash
codex mcp list
```

Lalu minta Codex dalam sesi:

```text
Gunakan calculate_cvss untuk menghitung skor CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Hasil Base Score yang diharapkan: `9.3 (CRITICAL)`.

## Pemecahan Masalah

- **`cvss-calculator-mcp: command not found`**: Periksa `which cvss-calculator-mcp`. Jika diinstal di `~/.local/bin`, tambahkan `~/.local/bin` ke `PATH` Anda atau tentukan jalur lengkap (misalnya `command = "/home/youruser/.local/bin/cvss-calculator-mcp"`) di `~/.codex/config.toml`.
- **`HTTP 429 Too Many Requests` pada MCP Jarak Jauh**: Anda melampaui 5 permintaan per menit per IP pada endpoint publik. Beralihlah ke Opsi 1 (`stdio` lokal).

## Referensi Resmi

- [Dokumentasi Model Context Protocol OpenAI Codex](https://developers.openai.com/codex/mcp)
