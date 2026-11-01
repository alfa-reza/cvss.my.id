---
title: MCP Client Setup Guides
description: Plain index of MCP client setup guides for Codex, Claude Code, OpenCode, GitHub Copilot, Cursor, Pi, Kilo Code, Cline, and Hermes Agent.
---

Select your AI coding agent or editor below for step-by-step configuration instructions. Every guide covers **Local `stdio` setup first (recommended, no rate limit)** followed by **Remote Streamable HTTP**.

## Supported MCP Clients

1. [**Codex**](/docs/mcp/clients/codex/): Configure via `codex mcp add` or `~/.codex/config.toml`.
2. [**Claude Code**](/docs/mcp/clients/claude-code/): Configure via `claude mcp add` or `.mcp.json` / `~/.claude.json`.
3. [**OpenCode**](/docs/mcp/clients/opencode/): Configure via `opencode mcp add` or `opencode.jsonc`.
4. [**GitHub Copilot**](/docs/mcp/clients/github-copilot/): Configure in VS Code Agent Mode (`.vscode/mcp.json`) or Copilot CLI (`~/.copilot/mcp-config.json`).
5. [**Cursor**](/docs/mcp/clients/cursor/): Configure via `.cursor/mcp.json` or `~/.cursor/mcp.json`.
6. [**Pi**](/docs/mcp/clients/pi/): Configure via `pi mcp add` or `~/.pi/agent/mcp.json`.
7. [**Kilo Code**](/docs/mcp/clients/kilo-code/): Configure via `~/.config/kilo/kilo.jsonc` or `.kilo/kilo.jsonc`.
8. [**Cline**](/docs/mcp/clients/cline/): Configure via `cline_mcp_settings.json` in VS Code or Cline CLI.
9. [**Hermes Agent**](/docs/mcp/clients/hermes-agent/): Configure under `mcp_servers` in `~/.hermes/config.yaml`.

## Prerequisites for Local `stdio`

Before using the **Local `stdio`** configuration in any client below, install `cvss-calculator-mcp` on Linux or macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Verify the binary is available on your `PATH`:

```bash
which cvss-calculator-mcp
```
