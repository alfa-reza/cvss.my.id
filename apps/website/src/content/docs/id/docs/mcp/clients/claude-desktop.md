---
title: Penyiapan MCP Claude Desktop
description: Hubungkan server CVSS MCP ke Claude Desktop.
---

## MCP Lokal (`stdio`) - Disarankan

Di macOS, instal biner:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Buka pengaturan Claude Desktop, temukan pengaturan server MCP pengembang atau lokal, lalu edit file konfigurasinya. Gabungkan entri ini ke `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "command": "/absolute/path/to/cvss-calculator-mcp",
      "args": []
    }
  }
}
```

Ganti perintah dengan jalur yang dicetak oleh `which cvss-calculator-mcp`, lalu mulai ulang Claude Desktop. Perintah installer di atas mendukung Linux dan macOS; untuk platform lain, lihat [panduan instalasi lokal](/id/docs/mcp/local/).

## MCP Jarak Jauh (Streamable HTTP)

Di pengaturan Claude, tambahkan konektor khusus dengan URL `https://cvss.my.id/mcp`. Ketersediaan dapat bergantung pada pengaturan akun dan organisasi. Konektor jarak jauh terhubung dari infrastruktur cloud Anthropic; vector yang dikirim melaluinya meninggalkan perangkat Anda.

**Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).** IP yang relevan untuk konektor jarak jauh adalah IP keluar layanan klien, yang mungkin dipakai bersama.

## Verifikasi

Dalam percakapan, buka pemilih konektor dan pastikan server CVSS serta alat `calculate_cvss` tersedia. Minta Claude menilai `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`; Base Score yang diharapkan adalah **5.4 (Medium)**.

## Pemecahan Masalah

- Jika server lokal gagal dimulai, periksa log-nya di pengaturan Claude Desktop, jalur biner absolut, dan izin file.
- Jika konektor jarak jauh tidak tersedia, periksa pengaturan konektor akun dan organisasi serta keterjangkauan endpoint.

## Referensi Resmi

- [Server MCP lokal Claude Desktop](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)
- [Konektor jarak jauh khusus Claude](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
