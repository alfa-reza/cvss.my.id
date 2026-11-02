---
title: Panduan Penyiapan Klien MCP
description: Panduan penyiapan untuk sejumlah klien dan editor MCP.
---

Panduan ini mencakup sejumlah agen dan editor AI. Klien MCP lain juga dapat berfungsi selama mendukung stdio atau Streamable HTTP. Ikuti dokumentasi klien Anda untuk format konfigurasinya. Setiap panduan mencakup **penyiapan `stdio` lokal terlebih dahulu (disarankan, tanpa batas laju)**, lalu **Streamable HTTP jarak jauh**.

## Panduan Klien Terpilih

1. [**Codex**](/id/docs/mcp/clients/codex/): Konfigurasi melalui `codex mcp add` atau `~/.codex/config.toml`.
2. [**Claude Code**](/id/docs/mcp/clients/claude-code/): Konfigurasi melalui `claude mcp add` atau `.mcp.json` / `~/.claude.json`.
3. [**OpenCode v2**](/id/docs/mcp/clients/opencode/): Konfigurasi melalui `opencode mcp add` atau `opencode.jsonc`.
4. [**GitHub Copilot**](/id/docs/mcp/clients/github-copilot/): Konfigurasi di VS Code Agent Mode (`.vscode/mcp.json`) atau Copilot CLI (`~/.copilot/mcp-config.json`).
5. [**Cursor**](/id/docs/mcp/clients/cursor/): Konfigurasi melalui `.cursor/mcp.json` atau `~/.cursor/mcp.json`.
6. [**VS Code**](/id/docs/mcp/clients/vscode/): Konfigurasi server MCP workspace di `.vscode/mcp.json`.
7. [**Zed**](/id/docs/mcp/clients/zed/): Konfigurasi `context_servers` di pengaturan Zed.
8. [**Kilo Code**](/id/docs/mcp/clients/kilo-code/): Konfigurasi melalui `~/.config/kilo/kilo.jsonc` atau `.kilo/kilo.jsonc`.
9. [**Cline**](/id/docs/mcp/clients/cline/): Konfigurasi melalui `cline_mcp_settings.json` di VS Code atau Cline CLI.
10. [**Hermes Agent**](/id/docs/mcp/clients/hermes-agent/): Konfigurasi di bawah `mcp_servers` pada `~/.hermes/config.yaml`.
11. [**Gemini CLI**](/id/docs/mcp/clients/gemini-cli/): Konfigurasi `mcpServers` di pengaturan Gemini.
12. [**JetBrains**](/id/docs/mcp/clients/jetbrains/): Tambahkan server melalui pengaturan MCP.
13. [**Claude Desktop**](/id/docs/mcp/clients/claude-desktop/): Konfigurasi server lokal atau konektor jarak jauh.

## Prasyarat untuk `stdio` Lokal

Sebelum menggunakan konfigurasi **`stdio` lokal** di klien mana pun di bawah ini, instal `cvss-calculator-mcp` di Linux atau macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Pastikan biner tersedia di `PATH` Anda:

```bash
which cvss-calculator-mcp
```
