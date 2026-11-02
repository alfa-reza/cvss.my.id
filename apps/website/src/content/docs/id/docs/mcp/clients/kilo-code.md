---
title: Penyiapan MCP Kilo Code
description: Konfigurasikan cvss-calculator-mcp di Kilo Code menggunakan stdio lokal atau Streamable HTTP jarak jauh.
---

Panduan ini menunjukkan cara mengonfigurasi `cvss-calculator-mcp` di **Kilo Code** (CLI dan ekstensi VS Code) untuk perhitungan Base Score CVSS 2.0, 3.0, 3.1, dan 4.0.

## Opsi 1: MCP Lokal (`stdio`) - Disarankan

`stdio` lokal berjalan langsung di komputer Anda tanpa batas laju.

### Langkah 1: Instal Biner (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Langkah 2: Konfigurasi Kilo Code

Untuk **Kilo Code CLI / v1.0+**, tambahkan `cvss-calculator` di bawah `"mcp"` pada `~/.config/kilo/kilo.jsonc` (global) atau `kilo.jsonc` (proyek):

```json
{
  "$schema": "https://kilo.ai/config.json",
  "mcp": {
    "cvss-calculator": {
      "type": "local",
      "command": ["cvss-calculator-mcp"],
      "enabled": true
    }
  }
}
```

Untuk **Kilo Code VS Code Extension** (`.kilocode/mcp.json` atau `mcp_settings.json` global), tambahkan di bawah `"mcpServers"`:

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

Hubungkan ke `https://cvss.my.id/mcp` tanpa menginstal biner lokal.

> **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

Di `kilo.jsonc` (`~/.config/kilo/kilo.jsonc`):

```json
{
  "$schema": "https://kilo.ai/config.json",
  "mcp": {
    "cvss-calculator": {
      "type": "remote",
      "url": "https://cvss.my.id/mcp",
      "enabled": true
    }
  }
}
```

Atau di `.kilocode/mcp.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "type": "streamable-http",
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

## Verifikasi Koneksi

1. Buka pengaturan **MCP Servers** Kilo Code dan pastikan `cvss-calculator` terhubung serta menyediakan `calculate_cvss`.
2. Minta Kilo Code:

```text
Gunakan calculate_cvss untuk menghitung skor CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H
```

Hasil Base Score yang diharapkan: `10.0 (CRITICAL)`.

## Pemecahan Masalah

- **Perintah tidak ditemukan**: Ganti `"cvss-calculator-mcp"` dengan jalur lengkap dari `which cvss-calculator-mcp`.
- **`HTTP 429` pada MCP Jarak Jauh**: Endpoint publik mengizinkan 5 permintaan per menit per IP. Gunakan Opsi 1 (`stdio` lokal).

## Referensi Resmi

- [Menggunakan MCP di Kilo Code](https://kilo.ai/docs/automate/mcp/using-in-kilo-code)
