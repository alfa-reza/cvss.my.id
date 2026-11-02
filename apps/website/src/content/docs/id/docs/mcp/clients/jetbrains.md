---
title: Penyiapan MCP JetBrains
description: Hubungkan server CVSS MCP ke JetBrains AI Assistant.
---

Petunjuk ini mengonfigurasi **JetBrains AI Assistant sebagai klien MCP**. Petunjuk ini terpisah dari server MCP bawaan IDE JetBrains.

## MCP Lokal (`stdio`) - Disarankan

Instal biner di Linux atau macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Buka **Settings → Tools → AI Assistant → Model Context Protocol (MCP)**, tambahkan server, pilih STDIO, lalu berikan:

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

Tambahkan server menggunakan HTTP dan berikan:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

**Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

## Verifikasi

Periksa status server di pengaturan MCP. Di AI Chat, minta agen menggunakan `calculate_cvss` untuk `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`; Base Score yang diharapkan adalah **5.4 (Medium)**. Ketersediaan agen dapat bergantung pada IDE dan konfigurasi Anda.

## Pemecahan Masalah

- Jika STDIO gagal dimulai, gunakan jalur absolut dari `which cvss-calculator-mcp` dan periksa status server.
- Jika penambahan server tidak tersedia, periksa apakah organisasi Anda mengelola pengaturan MCP secara terpusat.

## Referensi Resmi

- [Dokumentasi MCP JetBrains AI Assistant](https://www.jetbrains.com/help/ai-assistant/mcp.html)
