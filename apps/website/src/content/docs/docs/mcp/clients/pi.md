---
title: Pi MCP Setup
description: Configure cvss-calculator-mcp in Pi Coding Agent using Local stdio or Remote Streamable HTTP.
---

This guide shows how to connect **Pi** (`@mariozechner/pi-coding-agent` with `pi-mcp-adapter`) to `cvss-calculator-mcp` for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` runs directly on your machine with no rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Add to `~/.pi/agent/mcp.json`

Ensure the MCP adapter extension is installed in Pi (`pi install npm:pi-mcp-adapter`), then add `cvss-calculator` to `~/.pi/agent/mcp.json` (global) or `.pi/mcp.json` (project):

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "command": "cvss-calculator-mcp",
      "args": [],
      "lifecycle": "lazy"
    }
  }
}
```

## Option 2: Remote MCP (Streamable HTTP)

Connect to `https://cvss.my.id/mcp` over Streamable HTTP without installing a local binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

Add the remote server to `~/.pi/agent/mcp.json` or `.pi/mcp.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp",
      "lifecycle": "lazy"
    }
  }
}
```

## Verify the Connection

Inside an interactive `pi` session, run `/mcp` or query the MCP tool proxy:

```text
mcp({ search: "calculate_cvss" })
```

Then ask Pi:

```text
Calculate the CVSS base score for CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Expected Base Score result: `9.3 (CRITICAL)`.

## Troubleshooting

- **Binary not found (`ENOENT`)**: Run `which cvss-calculator-mcp` and specify the full path in `"command"` inside `~/.pi/agent/mcp.json`.
- **Rate limit (`HTTP 429`) on Remote MCP**: The public endpoint allows `5 requests per minute per IP`. Switch to Option 1 (Local `stdio`).

## Official Reference

- [Pi Coding Agent Documentation](https://github.com/badlogic/pi-mono/tree/main/packages/coding-agent)
- [Pi MCP Adapter (`pi-mcp-adapter`)](https://github.com/nicobailon/pi-mcp-adapter)
