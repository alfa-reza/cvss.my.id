---
title: GitHub Copilot MCP Setup
description: Configure cvss-calculator-mcp in GitHub Copilot Agent Mode (VS Code and Copilot CLI) using Local stdio or Remote Streamable HTTP.
---

This guide shows how to configure `cvss-calculator-mcp` in **GitHub Copilot** (VS Code Agent Mode and GitHub Copilot Coding Agent / CLI) for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` runs directly on your machine with no rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Add to `.vscode/mcp.json` (VS Code Agent Mode)

Create or update `.vscode/mcp.json` in your workspace (note that VS Code uses the top-level `"servers"` key):

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

If you are using the standalone **GitHub Copilot CLI** (`~/.copilot/mcp-config.json`), use the `"mcpServers"` key:

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

## Option 2: Remote MCP (Streamable HTTP)

Connect to `https://cvss.my.id/mcp` without installing a local binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

In `.vscode/mcp.json`:

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

## Verify the Connection

1. Open VS Code Chat, switch to **Agent** mode, and click the **Tools** icon to confirm `calculate_cvss` is listed and enabled.
2. Prompt Copilot Agent Mode:

```text
Calculate the CVSS base score for CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N
```

Expected Base Score result: `5.4 (MEDIUM)`.

## Troubleshooting

- **Server fails to start in VS Code**: Click **Start** code lens above `"cvss-calculator"` in `.vscode/mcp.json` and check the Output panel (`MCP: List Servers`). Use the full path from `which cvss-calculator-mcp` if VS Code does not see `~/.local/bin`.
- **`HTTP 429` in Remote mode**: The free endpoint is limited to `5 requests per minute per IP`. Switch to Option 1 (`"type": "stdio"`).

## Official Reference

- [VS Code & GitHub Copilot MCP Configuration Reference](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)
