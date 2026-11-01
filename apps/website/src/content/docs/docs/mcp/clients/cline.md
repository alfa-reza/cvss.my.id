---
title: Cline MCP Setup
description: Configure cvss-calculator-mcp in Cline using Local stdio or Remote Streamable HTTP.
---

This guide shows how to connect **Cline** (VS Code extension and Cline CLI) to `cvss-calculator-mcp` for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` runs directly on your machine with no rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Add to `cline_mcp_settings.json`

In Cline, click **MCP Servers** in the top navigation bar, select the **Configure** tab, and click **Configure MCP Servers** to open `cline_mcp_settings.json` (or edit `~/.cline/data/settings/cline_mcp_settings.json` directly):

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "command": "cvss-calculator-mcp",
      "args": [],
      "disabled": false
    }
  }
}
```

## Option 2: Remote MCP (Streamable HTTP)

Connect to `https://cvss.my.id/mcp` without installing a local binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

Add the remote server to `cline_mcp_settings.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp",
      "type": "streamableHttp",
      "disabled": false
    }
  }
}
```

## Verify the Connection

1. Check the **MCP Servers** panel in Cline to confirm `cvss-calculator` shows a green status dot and lists the `calculate_cvss` tool.
2. Prompt Cline:

```text
Calculate the CVSS base score for AV:N/AC:L/Au:N/C:P/I:P/A:P using calculate_cvss.
```

Expected Base Score result: `7.5 (HIGH)`.

## Troubleshooting

- **Server fails to start in VS Code**: Replace `"command": "cvss-calculator-mcp"` with the full path from `which cvss-calculator-mcp` (e.g. `"/usr/local/bin/cvss-calculator-mcp"`).
- **Rate limit (`HTTP 429`) on Remote MCP**: The public endpoint allows `5 requests per minute per IP`. Switch to Option 1 (Local `stdio`).

## Official Reference

- [Cline MCP Overview Documentation](https://docs.cline.bot/mcp/mcp-overview)
