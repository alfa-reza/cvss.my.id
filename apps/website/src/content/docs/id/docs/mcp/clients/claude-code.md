---
title: Penyiapan MCP Claude Code
description: Konfigurasikan cvss-calculator-mcp di Anthropic Claude Code menggunakan stdio lokal atau Streamable HTTP jarak jauh.
---

Panduan ini menunjukkan cara mengonfigurasi `cvss-calculator-mcp` di **Claude Code** untuk perhitungan Base Score CVSS 2.0, 3.0, 3.1, dan 4.0.

## Opsi 1: MCP Lokal (`stdio`) - Disarankan

`stdio` lokal berjalan langsung di komputer Anda tanpa batas laju.

### Langkah 1: Instal Biner (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Langkah 2: Tambahkan Server di Claude Code

Daftarkan pada cakupan pengguna melalui CLI `claude`:

```bash
claude mcp add --scope user cvss-calculator -- cvss-calculator-mcp
```

Atau tambahkan ke `.mcp.json` proyek Anda (atau `~/.claude.json` pengguna):

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "type": "stdio",
      "command": "cvss-calculator-mcp",
      "args": []
    }
  }
}
```

## Opsi 2: MCP Jarak Jauh (Streamable HTTP)

Hubungkan ke endpoint yang dihosting di `https://cvss.my.id/mcp` tanpa menginstal biner.

> **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

### Daftarkan melalui Claude CLI

```bash
claude mcp add --scope user --transport http cvss-calculator https://cvss.my.id/mcp
```

Atau di `.mcp.json` / `~/.claude.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "type": "http",
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

## Verifikasi Koneksi

Periksa server MCP yang terdaftar:

```bash
claude mcp list
```

Di dalam sesi Claude Code interaktif, jalankan `/mcp` untuk memeriksa status server, atau berikan prompt:

```text
Hitung base score CVSS untuk CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H menggunakan calculate_cvss.
```

Hasil Base Score yang diharapkan: `10.0 (CRITICAL)`.

## Pemecahan Masalah

- **Server gagal dijalankan dalam mode Lokal**: Jalankan `which cvss-calculator-mcp` di terminal Anda dan berikan jalur biner absolut pada `"command"` jika lingkungan GUI/IDE Anda tidak mewarisi `PATH` shell.
- **Galat batas laju (`429`) dalam mode Jarak Jauh**: Endpoint publik mengizinkan 5 permintaan per menit per IP. Beralihlah ke Opsi 1 (`stdio` lokal) untuk penggunaan tanpa batas.

## Referensi Resmi

- [Dokumentasi MCP Claude Code](https://docs.anthropic.com/en/docs/claude-code/mcp)
