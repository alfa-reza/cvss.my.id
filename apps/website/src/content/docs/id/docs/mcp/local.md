---
title: Penyiapan MCP Lokal (stdio)
description: Instal dan jalankan cvss-calculator-mcp secara lokal melalui stdio di Linux, macOS, dan Windows tanpa batas laju.
---

Menjalankan `cvss-calculator-mcp` secara lokal melalui `stdio` adalah penyiapan yang **disarankan** untuk pekerjaan rekayasa keamanan harian, tinjauan kode otomatis, dan triase kerentanan batch. Semua perhitungan dijalankan di komputer Anda tanpa latensi jaringan dan tanpa batas laju endpoint publik.

## 1. Instal dengan Installer Resmi (Linux dan macOS)

Jalankan skrip installer:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Installer mendeteksi sistem operasi Anda (`linux` atau `darwin`) dan arsitektur CPU (`amd64` atau `arm64`), mengunduh arsip rilis yang sesuai dari [`alfa-reza/cvss-calculator-mcp`](https://github.com/alfa-reza/cvss-calculator-mcp/releases), lalu memasang `cvss-calculator-mcp` ke `/usr/local/bin` (atau `~/.local/bin` jika `/usr/local/bin` tidak dapat ditulis tanpa `sudo`).

### Windows (PowerShell, x64 dan ARM64)

Jalankan di PowerShell:

```powershell
irm https://raw.githubusercontent.com/alfa-reza/cvss-calculator-mcp/main/install.ps1 | iex
```

Installer memverifikasi checksum rilis dan memasang biner ke `%LOCALAPPDATA%\Programs\cvss-calculator-mcp` secara default. Tambahkan direktori tersebut ke PATH, atau gunakan path lengkap biner pada klien MCP Anda.

## 2. Metode Instalasi Alternatif

### Instal dari Sumber dengan Go

Jika Anda memiliki Go 1.25+:

```bash
go install github.com/alfa-reza/cvss-calculator-mcp/cmd/cvss-calculator-mcp@latest
```

Pastikan `$(go env GOPATH)/bin` ada di `PATH` shell Anda.

### Unduh Biner Rilis secara Manual

Unduh arsip biner yang telah dikompilasi langsung dari [halaman GitHub Releases](https://github.com/alfa-reza/cvss-calculator-mcp/releases), ekstrak `cvss-calculator-mcp`, tandai sebagai dapat dieksekusi (`chmod +x cvss-calculator-mcp`), lalu pindahkan ke direktori di `PATH` Anda.

## 3. Verifikasi Instalasi

Pastikan biner merespons di `PATH` Anda:

```bash
which cvss-calculator-mcp
```

Uji permintaan JSON-RPC `initialize` melalui `stdio`:

```bash
printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"smoke-test","version":"1.0.0"}}}\n' | cvss-calculator-mcp
```

Anda akan menerima respons JSON-RPC satu baris yang berisi `serverInfo` dan `capabilities.tools`.

## 4. Hubungkan Klien MCP Anda

Lanjutkan ke [Panduan Penyiapan Klien](/id/docs/mcp/clients/) untuk agen atau IDE spesifik Anda.
