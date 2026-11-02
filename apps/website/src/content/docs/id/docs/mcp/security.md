---
title: Keamanan, Privasi, dan Batas Laju
description: Model privasi, batas laju, jaminan offline, dan verifikasi sumber untuk CVSS.my.id dan cvss-calculator-mcp.
---

Insinyur keamanan yang menangani kerentanan yang belum dirilis atau temuan audit internal memerlukan kejelasan tentang ke mana data mereka pergi.

## 1. Kalkulator Browser Lengkap

- **Eksekusi 100% Lokal**: Setiap perhitungan CVSS 2.0, 3.0, 3.1, dan 4.0 berjalan di tab browser Anda menggunakan JavaScript statis (`@cvss/core`).
- **Tanpa Panggilan Jaringan untuk Penilaian**: Mengubah metrik, menempel vector, atau menyalin hasil tidak pernah mengirim vector CVSS Anda ke `cvss.my.id/mcp` atau server eksternal mana pun.
- **Tanpa Analitik atau Telemetri**: Situs web maupun kalkulator browser tidak menyematkan analitik pihak ketiga, piksel pelacak, skrip pemutaran sesi, atau font CDN.
- **Penyimpanan Sementara**: Draf vector dan metrik yang dipilih hanya disimpan di session storage browser agar memuat ulang halaman tidak menghilangkan pekerjaan yang sedang berlangsung. Menutup tab browser akan menghapus data sesi.

## 2. Server MCP Lokal (`cvss-calculator-mcp` melalui `stdio`)

- **Operasi Offline**: Setelah diinstal, `cvss-calculator-mcp` hanya berkomunikasi dengan host MCP lokal Anda melalui pipa `stdio`. Server ini tidak membuat koneksi jaringan keluar.
- **Sumber yang Dapat Diaudit**: Periksa implementasi Go lengkap dan alur rilis di [`github.com/alfa-reza/cvss-calculator-mcp`](https://github.com/alfa-reza/cvss-calculator-mcp).
- **Batas Laju**: Tidak ada.

## 3. Endpoint MCP Jarak Jauh (Streamable HTTP)

- **Kebijakan Penggunaan Wajar Publik**: **Batas laju: 5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**
- **Transportasi**: HTTPS (`Streamable HTTP`) yang diterminasi di Cloudflare Workers.
- **Rekomendasi untuk Advisory Rahasia**: Meskipun `calculate_cvss` hanya menerima vector string CVSS mentah (seperti `CVSS:4.0/AV:N/...`) tanpa judul kerentanan atau nama aset, tim yang bekerja di bawah kebijakan air-gapped ketat atau tanpa lalu lintas eksternal sebaiknya menggunakan **MCP Lokal (`stdio`)**.
