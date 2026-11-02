---
title: Penyiapan MCP VS Code
description: Konfigurasikan server CVSS MCP di VS Code dengan stdio lokal atau HTTP jarak jauh.
---

Gunakan konfigurasi MCP VS Code dengan agen yang didukung, seperti GitHub Copilot. Contoh ini mengonfigurasi satu workspace; gabungkan entri ke `.vscode/mcp.json` yang sudah ada jika tersedia.

## MCP Lokal (`stdio`) - Disarankan

Instal biner di Linux atau macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Tambahkan server ke `.vscode/mcp.json` di workspace:

```json
{
  "servers": {
    "cvss-calculator": {
      "type": "stdio",
      "command": "cvss-calculator-mcp",
      "args": []
    }
  }
}
```

## MCP Jarak Jauh (Streamable HTTP)

Untuk menggunakan endpoint publik, ganti entri lokal dengan:

```json
{
  "servers": {
    "cvss-calculator": {
      "type": "http",
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

**Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

## Verifikasi

Mulai server dari `.vscode/mcp.json` atau gunakan **MCP: List Servers** di Command Palette. Di Chat, pilih agen yang mendukung MCP dan pastikan alatnya mencakup `calculate_cvss`. Minta agen menilai `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`; Base Score yang diharapkan adalah **5.4 (Medium)**.

## Pemecahan Masalah

- Jika server lokal tidak mulai, periksa output server dan gunakan jalur absolut yang dikembalikan oleh `which cvss-calculator-mcp`. Untuk workspace jarak jauh, biner harus tersedia di lingkungan tempat server berjalan.
- Jika permintaan jarak jauh menerima HTTP 429, gunakan MCP Lokal atau tunggu sebelum mencoba lagi.

## Referensi Resmi

- [Referensi konfigurasi MCP VS Code](https://code.visualstudio.com/docs/agents/reference/mcp-configuration)
- [Mengelola server MCP di VS Code](https://code.visualstudio.com/docs/agents/run/manage-mcp-servers)
