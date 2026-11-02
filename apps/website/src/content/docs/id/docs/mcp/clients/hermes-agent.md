---
title: Penyiapan MCP Hermes Agent
description: Konfigurasikan cvss-calculator-mcp di Nous Research Hermes Agent menggunakan stdio lokal atau Streamable HTTP jarak jauh.
---

Panduan ini menunjukkan cara menghubungkan **Hermes Agent** ke `cvss-calculator-mcp` untuk perhitungan Base Score CVSS 2.0, 3.0, 3.1, dan 4.0.

## Opsi 1: MCP Lokal (`stdio`) - Disarankan

`stdio` lokal berjalan langsung di komputer Anda tanpa batas laju.

### Langkah 1: Instal Biner (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Langkah 2: Tambahkan ke `~/.hermes/config.yaml`

Jalankan `hermes mcp add` atau tambahkan `cvss_calculator` di bawah kunci `mcp_servers:` pada `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  cvss_calculator:
    command: "cvss-calculator-mcp"
    args: []
```

## Opsi 2: MCP Jarak Jauh (Streamable HTTP)

Hubungkan ke `https://cvss.my.id/mcp` melalui Streamable HTTP tanpa menginstal biner lokal.

> **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

Tambahkan server jarak jauh ke `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  cvss_calculator:
    url: "https://cvss.my.id/mcp"
```

## Verifikasi Koneksi

Di dalam sesi Hermes Agent (atau melalui CLI), periksa server MCP yang aktif:

```bash
hermes mcp list
```

Atau jalankan `/mcp` di dalam sesi interaktif, lalu minta Hermes Agent:

```text
Gunakan calculate_cvss untuk menghitung base score CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Hasil Base Score yang diharapkan: `9.3 (CRITICAL)`.

## Pemecahan Masalah

- **Biner tidak ditemukan saat memulai Hermes Agent**: Jalankan `which cvss-calculator-mcp` dan atur `command:` ke jalur absolut (misalnya `command: "/usr/local/bin/cvss-calculator-mcp"`).
- **Batas laju (`HTTP 429`) pada MCP Jarak Jauh**: Endpoint publik mengizinkan 5 permintaan per menit per IP. Gunakan Opsi 1 (`stdio` lokal) untuk throughput yang lebih tinggi.

## Referensi Resmi

- [Dokumentasi MCP Hermes Agent](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp)
