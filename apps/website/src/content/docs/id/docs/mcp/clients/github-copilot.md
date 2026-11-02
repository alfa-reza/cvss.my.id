---
title: Penyiapan MCP GitHub Copilot
description: Konfigurasikan cvss-calculator-mcp di GitHub Copilot Agent Mode (VS Code dan Copilot CLI) menggunakan stdio lokal atau Streamable HTTP jarak jauh.
---

Panduan ini menunjukkan cara mengonfigurasi `cvss-calculator-mcp` di **GitHub Copilot** (VS Code Agent Mode dan GitHub Copilot Coding Agent / CLI) untuk perhitungan Base Score CVSS 2.0, 3.0, 3.1, dan 4.0.

## Opsi 1: MCP Lokal (`stdio`) - Disarankan

`stdio` lokal berjalan langsung di komputer Anda tanpa batas laju.

### Langkah 1: Instal Biner (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Langkah 2: Tambahkan ke `.vscode/mcp.json` (VS Code Agent Mode)

Buat atau perbarui `.vscode/mcp.json` di workspace Anda (perhatikan bahwa VS Code menggunakan kunci tingkat atas `"servers"`):

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

Jika Anda menggunakan **GitHub Copilot CLI** mandiri (`~/.copilot/mcp-config.json`), gunakan kunci `"mcpServers"`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "type": "local",
      "command": "cvss-calculator-mcp",
      "args": []
    }
  }
}
```

## Opsi 2: MCP Jarak Jauh (Streamable HTTP)

Hubungkan ke `https://cvss.my.id/mcp` tanpa menginstal biner lokal.

> **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

Di `.vscode/mcp.json`:

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

## Verifikasi Koneksi

1. Buka VS Code Chat, beralih ke mode **Agent**, lalu klik ikon **Tools** untuk memastikan `calculate_cvss` tercantum dan aktif.
2. Berikan prompt kepada Copilot Agent Mode:

```text
Hitung base score CVSS untuk CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N
```

Hasil Base Score yang diharapkan: `5.4 (MEDIUM)`.

## Pemecahan Masalah

- **Server gagal dimulai di VS Code**: Klik code lens **Start** di atas `"cvss-calculator"` pada `.vscode/mcp.json` dan periksa panel Output (`MCP: List Servers`). Gunakan jalur lengkap dari `which cvss-calculator-mcp` jika VS Code tidak melihat `~/.local/bin`.
- **`HTTP 429` dalam mode Jarak Jauh**: Endpoint gratis dibatasi 5 permintaan per menit per IP. Beralihlah ke Opsi 1 (`"type": "stdio"`).

## Referensi Resmi

- [Referensi Konfigurasi MCP VS Code dan GitHub Copilot](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
