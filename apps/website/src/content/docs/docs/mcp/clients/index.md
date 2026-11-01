---
title: MCP Client Setup Guides
description: Setup guides for selected MCP clients and editors.
---

These guides cover a selection of AI agents and editors; other MCP clients may also work if they support stdio or Streamable HTTP. Follow your client’s documentation for its configuration format. Every guide covers **Local `stdio` setup first (recommended, no rate limit)** followed by **Remote Streamable HTTP**.

## Selected Client Guides

1. [**Codex**](/docs/mcp/clients/codex/): Configure via `codex mcp add` or `~/.codex/config.toml`.
2. [**Claude Code**](/docs/mcp/clients/claude-code/): Configure via `claude mcp add` or `.mcp.json` / `~/.claude.json`.
3. [**OpenCode v2**](/docs/mcp/clients/opencode/): Configure via `opencode mcp add` or `opencode.jsonc`.
4. [**GitHub Copilot**](/docs/mcp/clients/github-copilot/): Configure in VS Code Agent Mode (`.vscode/mcp.json`) or Copilot CLI (`~/.copilot/mcp-config.json`).
5. [**Cursor**](/docs/mcp/clients/cursor/): Configure via `.cursor/mcp.json` or `~/.cursor/mcp.json`.
6. [**VS Code**](/docs/mcp/clients/vscode/): Configure the workspace MCP servers in `.vscode/mcp.json`.
7. [**Zed**](/docs/mcp/clients/zed/): Configure `context_servers` in Zed settings.
8. [**Kilo Code**](/docs/mcp/clients/kilo-code/): Configure via `~/.config/kilo/kilo.jsonc` or `.kilo/kilo.jsonc`.
9. [**Cline**](/docs/mcp/clients/cline/): Configure via `cline_mcp_settings.json` in VS Code or Cline CLI.
10. [**Hermes Agent**](/docs/mcp/clients/hermes-agent/): Configure under `mcp_servers` in `~/.hermes/config.yaml`.
11. [**Gemini CLI**](/docs/mcp/clients/gemini-cli/): Configure `mcpServers` in Gemini settings.
12. [**JetBrains**](/docs/mcp/clients/jetbrains/): Add a server through the MCP settings.
13. [**Claude Desktop**](/docs/mcp/clients/claude-desktop/): Configure a local server or a remote connector.

## Prerequisites for Local `stdio`

Before using the **Local `stdio`** configuration in any client below, install `cvss-calculator-mcp` on Linux or macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Verify the binary is available on your `PATH`:

```bash
which cvss-calculator-mcp
```
