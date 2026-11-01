---
title: VS Code MCP Setup
description: Configure the CVSS MCP server in VS Code with local stdio or remote HTTP.
---

Use VS Code's MCP configuration with a supported agent, such as GitHub Copilot. These examples configure one workspace; merge the entry into an existing `.vscode/mcp.json` if present.

## Local MCP (`stdio`) - Recommended

Install the binary on Linux or macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Add the server to `.vscode/mcp.json` in the workspace:

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

## Remote MCP (Streamable HTTP)

To use the public endpoint instead, replace the local entry with:

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

**Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

## Verify

Start the server from `.vscode/mcp.json` or use **MCP: List Servers** in the Command Palette. In Chat, select an agent that supports MCP and check that its tools include `calculate_cvss`. Ask it to score `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`; the expected Base Score is **5.4 (Medium)**.

## Troubleshooting

- If the local server does not start, check the server output and use the absolute path returned by `which cvss-calculator-mcp`. For remote workspaces, the binary must be available in the environment where the server runs.
- If remote requests receive HTTP 429, use Local MCP or wait before retrying.

## Official Reference

- [VS Code MCP configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration)
- [Manage MCP servers in VS Code](https://code.visualstudio.com/docs/agents/run/manage-mcp-servers)
