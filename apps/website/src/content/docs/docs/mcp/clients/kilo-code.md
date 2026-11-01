---
title: Kilo Code MCP Setup
description: Configure cvss-calculator-mcp in Kilo Code using Local stdio or Remote Streamable HTTP.
---

This guide shows how to configure `cvss-calculator-mcp` in **Kilo Code** (CLI and VS Code extension) for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` runs directly on your machine with zero rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Configure Kilo Code

For **Kilo Code CLI / v1.0+**, add `cvss-calculator` under `"mcp"` in `~/.config/kilo/kilo.jsonc` (global) or `kilo.jsonc` (project):

```json
{
  "$schema": "https://kilo.ai/config.json",
  "mcp": {
    "cvss-calculator": {
      "type": "local",
      "command": ["cvss-calculator-mcp"],
      "enabled": true
    }
  }
}
```

For the **Kilo Code VS Code Extension** (`.kilocode/mcp.json` or Global `mcp_settings.json`), add under `"mcpServers"`:

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

Connect to `https://cvss.my.id/mcp` without installing a local binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

In `kilo.jsonc` (`~/.config/kilo/kilo.jsonc`):

```json
{
  "$schema": "https://kilo.ai/config.json",
  "mcp": {
    "cvss-calculator": {
      "type": "remote",
      "url": "https://cvss.my.id/mcp",
      "enabled": true
    }
  }
}
```

Or in `.kilocode/mcp.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "type": "streamable-http",
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

## Verify the Connection

1. Open Kilo Code **MCP Servers** settings and confirm `cvss-calculator` is connected and exposes `calculate_cvss`.
2. Ask Kilo Code:

```text
Use calculate_cvss to score CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H
```

Expected Base Score result: `10.0 (CRITICAL)`.

## Troubleshooting

- **Command not found**: Replace `"cvss-calculator-mcp"` with the full path from `which cvss-calculator-mcp`.
- **`HTTP 429` on Remote MCP**: The public endpoint allows `5 requests per minute per IP`. Use Option 1 (Local `stdio`).

## Official Reference

- [Using MCP in Kilo Code](https://kilo.ai/docs/automate/mcp/using-in-kilo-code)
