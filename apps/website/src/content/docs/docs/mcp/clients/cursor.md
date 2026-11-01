---
title: Cursor MCP Setup
description: Configure cvss-calculator-mcp in Cursor using Local stdio or Remote Streamable HTTP.
---

This guide shows how to connect **Cursor** to `cvss-calculator-mcp` for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` executes on your workstation with zero rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Add to `.cursor/mcp.json`

Create or edit `.cursor/mcp.json` in your project root (or `~/.cursor/mcp.json` for global configuration):

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "command": "cvss-calculator-mcp",
      "args": []
    }
  }
}
```

## Option 2: Remote MCP (Streamable HTTP)

Connect to `https://cvss.my.id/mcp` over Streamable HTTP without installing a local binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

Add the remote server to `.cursor/mcp.json` or `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

## Verify the Connection

1. Open **Cursor Settings > MCP** and verify that `cvss-calculator` shows a green active indicator and lists the `calculate_cvss` tool.
2. In Cursor Composer / Agent chat, ask:

```text
Use calculate_cvss to score CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Expected Base Score result: `9.3 (CRITICAL)`.

## Troubleshooting

- **Red status indicator in Cursor Settings > MCP**: Cursor GUI applications on macOS/Linux often do not load `~/.bashrc` or `~/.zshrc` paths. Run `which cvss-calculator-mcp` in your terminal and set `"command"` to the full path (e.g. `"/usr/local/bin/cvss-calculator-mcp"`).
- **Rate limit (`HTTP 429`) on Remote MCP**: The public endpoint allows `5 requests per minute per IP`. Switch to Option 1 (Local `stdio`).

## Official Reference

- [Cursor Model Context Protocol (MCP) Documentation](https://docs.cursor.com/context/model-context-protocol)
