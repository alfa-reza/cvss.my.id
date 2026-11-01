---
title: OpenCode MCP Setup
description: Configure cvss-calculator-mcp in OpenCode using Local stdio or Remote Streamable HTTP.
---

This guide shows how to configure `cvss-calculator-mcp` in **OpenCode** for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` runs directly on your machine with no rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Configure OpenCode

Add `cvss-calculator` to `~/.config/opencode/opencode.json` (global) or `opencode.json` in your project root:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "cvss-calculator": {
      "type": "local",
      "command": ["cvss-calculator-mcp"],
      "enabled": true
    }
  }
}
```

## Option 2: Remote MCP (Streamable HTTP)

Connect to `https://cvss.my.id/mcp` over Streamable HTTP without installing a local binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

Add the remote configuration to `~/.config/opencode/opencode.json` or `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "cvss-calculator": {
      "type": "remote",
      "url": "https://cvss.my.id/mcp",
      "enabled": true
    }
  }
}
```

## Verify the Connection

Check registered MCP tools in OpenCode:

```bash
opencode mcp list
```

Then ask OpenCode in a session:

```text
Use calculate_cvss to compute the score for CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Expected Base Score result: `9.3 (CRITICAL)`.

## Troubleshooting

- **Binary not found (`ENOENT`)**: Replace `["cvss-calculator-mcp"]` with the absolute path from `which cvss-calculator-mcp` (for example, `["/usr/local/bin/cvss-calculator-mcp"]`).
- **Rate limit (`HTTP 429`) on Remote MCP**: The public endpoint allows `5 requests per minute per IP`. Use Option 1 (`"type": "local"`) for unlimited scoring.

## Official Reference

- [OpenCode MCP Servers Documentation](https://opencode.ai/docs/mcp-servers/)
