---
title: Penyiapan MCP Gemini CLI
description: Hubungkan server CVSS MCP ke Gemini CLI.
---

## MCP Lokal (`stdio`) - Disarankan

Instal biner di Linux atau macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Gabungkan entri ini ke `~/.gemini/settings.json` (pengguna) atau `.gemini/settings.json` (proyek):

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

## MCP Jarak Jauh (Streamable HTTP)

Ganti entri lokal dengan:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "httpUrl": "https://cvss.my.id/mcp"
    }
  }
}
```

**Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

## Verifikasi

Mulai Gemini CLI dan jalankan `/mcp` untuk memeriksa koneksi server dan alat yang tersedia. Minta Gemini menghitung Base Score untuk `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`; hasil yang diharapkan adalah **5.4 (Medium)**.

## Pemecahan Masalah

- Jika perintah tidak ditemukan, gunakan jalur absolut dari `which cvss-calculator-mcp`.
- Jika respons HTTP 429, tunggu sebelum mencoba lagi atau gunakan server lokal.

## Referensi Resmi

- [Konfigurasi server MCP Gemini CLI](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md)
