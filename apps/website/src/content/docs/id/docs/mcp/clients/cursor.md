---
title: Penyiapan MCP Cursor
description: Konfigurasikan cvss-calculator-mcp di Cursor menggunakan stdio lokal atau Streamable HTTP jarak jauh.
---

Panduan ini menunjukkan cara menghubungkan **Cursor** ke `cvss-calculator-mcp` untuk perhitungan Base Score CVSS 2.0, 3.0, 3.1, dan 4.0.

## Opsi 1: MCP Lokal (`stdio`) - Disarankan

`stdio` lokal dijalankan di komputer Anda tanpa batas laju.

### Langkah 1: Instal Biner (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Langkah 2: Tambahkan ke `.cursor/mcp.json`

Buat atau edit `.cursor/mcp.json` di akar proyek Anda (atau `~/.cursor/mcp.json` untuk konfigurasi global):

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "command": "cvss-calculator-mcp",
      "args": []
    }
  }
}
```

## Opsi 2: MCP Jarak Jauh (Streamable HTTP)

Hubungkan ke `https://cvss.my.id/mcp` melalui Streamable HTTP tanpa menginstal biner lokal.

> **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

Tambahkan server jarak jauh ke `.cursor/mcp.json` atau `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

## Verifikasi Koneksi

1. Buka **Cursor Settings > MCP** dan pastikan `cvss-calculator` menampilkan indikator aktif hijau serta mencantumkan alat `calculate_cvss`.
2. Di Cursor Composer / chat Agent, minta:

```text
Gunakan calculate_cvss untuk menghitung skor CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Hasil Base Score yang diharapkan: `9.3 (CRITICAL)`.

## Pemecahan Masalah

- **Indikator status merah di Cursor Settings > MCP**: Aplikasi GUI Cursor di macOS/Linux sering tidak memuat jalur dari `~/.bashrc` atau `~/.zshrc`. Jalankan `which cvss-calculator-mcp` di terminal Anda dan atur `"command"` ke jalur lengkap (misalnya `"/usr/local/bin/cvss-calculator-mcp"`).
- **Batas laju (`HTTP 429`) pada MCP Jarak Jauh**: Endpoint publik mengizinkan 5 permintaan per menit per IP. Beralihlah ke Opsi 1 (`stdio` lokal).

## Referensi Resmi

- [Dokumentasi Model Context Protocol (MCP) Cursor](https://docs.cursor.com/context/model-context-protocol)
