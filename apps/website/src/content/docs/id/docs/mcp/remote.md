---
title: Penyiapan MCP Jarak Jauh (HTTP)
description: Hubungkan klien MCP ke endpoint jarak jauh melalui Streamable HTTP.
---

Jika Anda bekerja di lingkungan berbasis browser, container sementara, atau ingin menguji `cvss-calculator-mcp` tanpa menginstal biner lokal, hubungkan klien MCP Anda ke endpoint publik gratis kami.

## Detail Endpoint

- **URL Endpoint**: `https://cvss.my.id/mcp`
- **Protokol Transportasi**: MCP **Streamable HTTP** (`POST` / `GET` JSON-RPC melalui HTTPS)
- **Autentikasi**: Tidak diperlukan
- **Penilaian yang Didukung**: **Base Score** CVSS v4.0, v3.1, v3.0, dan v2.0 (`calculate_cvss`)
- **Kebijakan Penggunaan Publik**: **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**

> [!NOTE]
> Membuka `https://cvss.my.id/mcp` langsung di bilah alamat browser tidak akan menampilkan halaman situs karena ini adalah endpoint protokol MCP otomatis. Untuk dokumentasi manusia dan petunjuk konfigurasi, kunjungi [Ikhtisar Alat MCP](/id/tools/mcp) atau [Dokumentasi MCP](/id/docs/mcp/).

## Menguji Endpoint Jarak Jauh dengan `curl`

Anda dapat memverifikasi bahwa endpoint MCP jarak jauh dapat dijangkau dari jaringan Anda dengan mengirim handshake `initialize` MCP:

```bash
curl -i -X POST https://cvss.my.id/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": {
        "name": "curl-check",
        "version": "1.0.0"
      }
    }
  }'
```

## Menghindari Batas Laju (`HTTP 429`)

Endpoint publik menerapkan kebijakan penggunaan wajar sebesar **5 permintaan per menit per IP** agar layanan yang dihosting tetap tersedia tanpa biaya. Jika agen Anda melakukan tinjauan kerentanan batch atau proses CI otomatis, beralihlah ke [MCP Lokal (`stdio`)](/id/docs/mcp/local/):

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```
