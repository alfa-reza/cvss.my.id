---
title: Penyiapan MCP Zed
description: Konfigurasikan server CVSS MCP di Zed menggunakan stdio lokal atau HTTP jarak jauh.
---

Petunjuk ini mengonfigurasi server MCP khusus untuk **Zed Agent**. Agen eksternal atau agen berbasis terminal dapat menggunakan konfigurasi MCP mereka sendiri; lihat [dokumentasi MCP Zed](https://zed.dev/docs/ai/mcp).

## MCP Lokal (`stdio`) - Disarankan

Instal biner di Linux atau macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Di Zed, buka **Settings → AI → MCP Servers**, pilih **Add Server → Add Local Server**, lalu atur perintahnya ke `cvss-calculator-mcp`. Sebagai alternatif, gabungkan entri ini ke file pengaturan yang dibuka dengan **zed: open settings file**:

```json
{
  "context_servers": {
    "cvss-calculator": {
      "command": "cvss-calculator-mcp",
      "args": [],
      "env": {}
    }
  }
}
```

## MCP Jarak Jauh (Streamable HTTP)

Pilih **Add Server → Add Remote Server**, atau ganti entri lokal di pengaturan dengan:

```json
{
  "context_servers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

**Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).** Dokumentasi Zed mencatat bahwa server jarak jauh tanpa header Authorization dapat memicu alur MCP OAuth; periksa status server jika diminta.

## Verifikasi

Periksa status server MCP di **Settings → AI → MCP Servers**. Di thread Zed Agent, pastikan alat server tersedia dan minta agen menilai `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`. Base Score yang diharapkan adalah **5.4 (Medium)**.

## Pemecahan Masalah

- Jika server lokal gagal dimulai, ganti perintah dengan jalur absolut dari `which cvss-calculator-mcp`; pastikan biner terinstal di lingkungan yang menjalankan server.
- Jika server jarak jauh mengembalikan HTTP 429, gunakan MCP Lokal atau tunggu sebelum mencoba lagi.

## Referensi Resmi

- [Dokumentasi Model Context Protocol Zed](https://zed.dev/docs/ai/mcp)
