---
title: Penyiapan MCP OpenCode v2
description: Konfigurasikan cvss-calculator-mcp di OpenCode v2 menggunakan stdio lokal atau Streamable HTTP jarak jauh.
---

Panduan ini menunjukkan cara mengonfigurasi `cvss-calculator-mcp` di **OpenCode v2** untuk perhitungan Base Score CVSS 2.0, 3.0, 3.1, dan 4.0.

## Opsi 1: MCP Lokal (`stdio`) - Disarankan

`stdio` lokal berjalan langsung di komputer Anda tanpa batas laju.

### Langkah 1: Instal Biner (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Langkah 2: Konfigurasi OpenCode v2

OpenCode v2 menempatkan entri server di bawah `mcp.servers`, bukan langsung di bawah `mcp`. Gabungkan konfigurasi berikut ke `~/.config/opencode/opencode.json` (global) atau `opencode.json` di akar proyek Anda:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "cvss-calculator": {
        "type": "local",
        "command": ["cvss-calculator-mcp"]
      }
    }
  }
}
```

## Opsi 2: MCP Jarak Jauh (Streamable HTTP)

Hubungkan ke `https://cvss.my.id/mcp` melalui Streamable HTTP tanpa menginstal biner lokal.

> **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

Ganti entri server lokal dengan konfigurasi jarak jauh di `~/.config/opencode/opencode.json` atau `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "servers": {
      "cvss-calculator": {
        "type": "remote",
        "url": "https://cvss.my.id/mcp"
      }
    }
  }
}
```

## Verifikasi Koneksi

Periksa alat MCP yang terdaftar di OpenCode:

```bash
opencode mcp list
```

Lalu minta OpenCode dalam sesi:

```text
Gunakan calculate_cvss untuk menghitung skor CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Hasil Base Score yang diharapkan: `9.3 (CRITICAL)`.

## Pemecahan Masalah

- **Biner tidak ditemukan (`ENOENT`)**: Ganti `["cvss-calculator-mcp"]` dengan jalur absolut dari `which cvss-calculator-mcp` (misalnya `["/usr/local/bin/cvss-calculator-mcp"]`).
- **Batas laju (`HTTP 429`) pada MCP Jarak Jauh**: Endpoint publik mengizinkan 5 permintaan per menit per IP. Gunakan Opsi 1 (`"type": "local"`) untuk penilaian tanpa batas.

## Referensi Resmi

- [Dokumentasi Server MCP OpenCode v2](https://github.com/anomalyco/opencode/blob/v2.1.2/services/www/src/docs/content/mcp-servers.mdx)
