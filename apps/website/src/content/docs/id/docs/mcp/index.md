---
title: Ikhtisar MCP
description: Jalankan server CVSS Calculator MCP secara lokal melalui stdio atau hubungkan ke endpoint Streamable HTTP publik yang gratis.
---

**`cvss-calculator-mcp`** adalah server Model Context Protocol (MCP) sumber terbuka yang cepat dan ringan, ditulis dalam Go ([`alfa-reza/cvss-calculator-mcp`](https://github.com/alfa-reza/cvss-calculator-mcp)). Server ini memungkinkan agen pengkodean AI dan alat keamanan memvalidasi vector CVSS serta menghitung **Base Score** pada **CVSS v4.0, v3.1, v3.0, dan v2.0**.

> [!IMPORTANT]
> **Perbandingan Cakupan: MCP Khusus Base vs Kalkulator Browser Lengkap**
> Server MCP Go (`cvss-calculator-mcp`) hanya menghitung **Base Score** melalui alat `calculate_cvss`. Jika Anda memerlukan penilaian kelompok metrik **Threat, Temporal, Environmental, atau Supplemental**, gunakan [Kalkulator Browser Lengkap](https://cvss.my.id/calculator/).

## Dua Cara untuk Terhubung

### 1. MCP Lokal (`stdio`) - Disarankan

Instal biner tunggal mandiri di komputer Anda dan biarkan klien AI menjalankan `cvss-calculator-mcp` langsung melalui input/output standar (`stdio`).

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

- **OS yang didukung**: Linux dan macOS (`amd64` dan `arm64`), atau platform apa pun melalui `go install`.
- **Transportasi**: `stdio`
- **Batas laju**: Tidak ada (eksekusi 100% lokal, berfungsi offline).
- **Panduan**: [Penyiapan MCP Lokal (stdio)](/id/docs/mcp/local/)

### 2. MCP Jarak Jauh (HTTP) - Endpoint Publik Gratis

Hubungkan klien MCP apa pun yang mendukung **Streamable HTTP** langsung ke endpoint yang dihosting tanpa menginstal biner lokal:

```text
https://cvss.my.id/mcp
```

- **Transportasi**: Streamable HTTP
- **Batas laju**: **5 permintaan per menit per IP. Untuk penggunaan lebih tinggi, jalankan MCP Lokal (stdio).**
- **Catatan**: Endpoint `https://cvss.my.id/mcp` adalah endpoint protokol untuk klien MCP, bukan halaman HTML untuk manusia. Untuk halaman ikhtisar manusia, kunjungi [Ikhtisar Alat MCP](/id/tools/mcp).
- **Panduan**: [Penyiapan MCP Jarak Jauh (HTTP)](/id/docs/mcp/remote/)

## Skill Penilaian Kerentanan

Skill opsional ini memandu agen menilai bukti kerentanan, memilih metrik CVSS, dan menghitung Base Score menggunakan server MCP yang terhubung. Instal dengan [Skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add alfa-reza/cvss-calculator-mcp --skill vulnerability-cvss-assessment
```

Pilih agen Anda saat diminta. Tambahkan `--global` agar skill tersedia di semua proyek. Hubungkan server MCP menggunakan salah satu pilihan di atas. Lihat [instruksi skill](https://github.com/alfa-reza/cvss-calculator-mcp/blob/main/skills/vulnerability-cvss-assessment/SKILL.md) dan [referensi alat](https://github.com/alfa-reza/cvss-calculator-mcp/blob/main/skills/vulnerability-cvss-assessment/references/tool-reference.md).

## Panduan Konfigurasi Klien

Pilih agen AI atau editor Anda untuk konfigurasi siap tempel:

- [Codex](/id/docs/mcp/clients/codex/)
- [Claude Code](/id/docs/mcp/clients/claude-code/)
- [OpenCode v2](/id/docs/mcp/clients/opencode/)
- [GitHub Copilot](/id/docs/mcp/clients/github-copilot/)
- [Cursor](/id/docs/mcp/clients/cursor/)
- [VS Code](/id/docs/mcp/clients/vscode/)
- [Zed](/id/docs/mcp/clients/zed/)
- [Gemini CLI](/id/docs/mcp/clients/gemini-cli/)
- [JetBrains](/id/docs/mcp/clients/jetbrains/)
- [Claude Desktop](/id/docs/mcp/clients/claude-desktop/)
- [Kilo Code](/id/docs/mcp/clients/kilo-code/)
- [Cline](/id/docs/mcp/clients/cline/)
- [Hermes Agent](/id/docs/mcp/clients/hermes-agent/)
