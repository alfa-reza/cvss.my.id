---
title: Penyiapan MCP Cline
description: Konfigurasikan cvss-calculator-mcp di Cline menggunakan stdio lokal atau Streamable HTTP jarak jauh.
---

Panduan ini menunjukkan cara menghubungkan **Cline** (ekstensi VS Code dan Cline CLI) ke `cvss-calculator-mcp` untuk perhitungan Base Score CVSS 2.0, 3.0, 3.1, dan 4.0.

## Opsi 1: MCP Lokal (`stdio`) - Disarankan

`stdio` lokal berjalan langsung di komputer Anda tanpa batas laju.

### Langkah 1: Instal Biner (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Langkah 2: Tambahkan ke `cline_mcp_settings.json`

Di Cline, klik **MCP Servers** di bilah navigasi atas, pilih tab **Configure**, lalu klik **Configure MCP Servers** untuk membuka `cline_mcp_settings.json` (atau edit `~/.cline/data/settings/cline_mcp_settings.json` secara langsung):

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "command": "cvss-calculator-mcp",
      "args": [],
      "disabled": false
    }
  }
}
```

## Opsi 2: MCP Jarak Jauh (Streamable HTTP)

Hubungkan ke `https://cvss.my.id/mcp` tanpa menginstal biner lokal.

> **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

Tambahkan server jarak jauh ke `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp",
      "type": "streamableHttp",
      "disabled": false
    }
  }
}
```

## Verifikasi Koneksi

1. Periksa panel **MCP Servers** di Cline untuk memastikan `cvss-calculator` menampilkan titik status hijau dan mencantumkan alat `calculate_cvss`.
2. Berikan prompt kepada Cline:

```text
Hitung base score CVSS untuk AV:N/AC:L/Au:N/C:P/I:P/A:P menggunakan calculate_cvss.
```

Hasil Base Score yang diharapkan: `7.5 (HIGH)`.

## Pemecahan Masalah

- **Server gagal dimulai di VS Code**: Ganti `"command": "cvss-calculator-mcp"` dengan jalur lengkap dari `which cvss-calculator-mcp` (misalnya `"/usr/local/bin/cvss-calculator-mcp"`).
- **Batas laju (`HTTP 429`) pada MCP Jarak Jauh**: Endpoint publik mengizinkan 5 permintaan per menit per IP. Beralihlah ke Opsi 1 (`stdio` lokal).

## Referensi Resmi

- [Dokumentasi Ikhtisar MCP Cline](https://docs.cline.bot/mcp/mcp-overview)
