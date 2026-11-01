---
title: Claude Code MCP Setup
description: Configure cvss-calculator-mcp in Anthropic Claude Code using Local stdio or Remote Streamable HTTP.
---

This guide shows how to configure `cvss-calculator-mcp` in **Claude Code** for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` runs directly on your machine with zero rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Add the Server in Claude Code

Register at user scope via the `claude` CLI:

```bash
claude mcp add --scope user cvss-calculator -- cvss-calculator-mcp
```

Or add it to your project `.mcp.json` (or user `~/.claude.json`):

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "type": "stdio",
      "command": "cvss-calculator-mcp",
      "args": []
    }
  }
}
```

## Option 2: Remote MCP (Streamable HTTP)

Connect to the hosted endpoint at `https://cvss.my.id/mcp` without installing a binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

### Register via Claude CLI

```bash
claude mcp add --scope user --transport http cvss-calculator https://cvss.my.id/mcp
```

Or in `.mcp.json` / `~/.claude.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "type": "http",
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

## Verify the Connection

Check registered MCP servers:

```bash
claude mcp list
```

Inside an interactive Claude Code session, run `/mcp` to inspect server status, or prompt:

```text
Calculate the CVSS base score for CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H using calculate_cvss.
```

Expected Base Score result: `10.0 (CRITICAL)`.

## Troubleshooting

- **Server fails to spawn in Local mode**: Run `which cvss-calculator-mcp` in your terminal and provide the absolute binary path in `"command"` if your GUI/IDE environment does not inherit your shell `PATH`.
- **Rate limit errors (`429`) in Remote mode**: The public endpoint allows `5 requests per minute per IP`. Switch to Option 1 (Local `stdio`) for unrestricted usage.

## Official Reference

- [Claude Code MCP Documentation](https://docs.anthropic.com/en/docs/claude-code/mcp)
