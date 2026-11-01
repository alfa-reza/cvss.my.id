---
title: Gemini CLI MCP Setup
description: Connect the CVSS MCP server to Gemini CLI.
---

## Local MCP (`stdio`) - Recommended

Install the binary on Linux or macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Merge this entry into `~/.gemini/settings.json` (user) or `.gemini/settings.json` (project):

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

## Remote MCP (Streamable HTTP)

Replace the local entry with:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "httpUrl": "https://cvss.my.id/mcp"
    }
  }
}
```

**Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

## Verify

Start Gemini CLI and run `/mcp` to check the server connection and available tools. Ask it to calculate the Base Score for `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`; the expected result is **5.4 (Medium)**.

## Troubleshooting

- If the command is not found, use the absolute path from `which cvss-calculator-mcp`.
- For an HTTP 429 response, wait before retrying or use the local server.

## Official Reference

- [Gemini CLI MCP server configuration](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md)
