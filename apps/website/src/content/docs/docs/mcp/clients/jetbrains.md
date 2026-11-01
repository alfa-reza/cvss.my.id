---
title: JetBrains MCP Setup
description: Connect the CVSS MCP server to JetBrains AI Assistant.
---

These instructions configure **JetBrains AI Assistant as an MCP client**. They are separate from the MCP server built into JetBrains IDEs.

## Local MCP (`stdio`) - Recommended

Install the binary on Linux or macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Open **Settings → Tools → AI Assistant → Model Context Protocol (MCP)**, add a server, select STDIO, and provide:

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

Add a server using HTTP and provide:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

**Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

## Verify

Check the server status in the MCP settings. In AI Chat, ask the agent to use `calculate_cvss` for `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`; the expected Base Score is **5.4 (Medium)**. Agent availability may depend on your IDE and configuration.

## Troubleshooting

- If STDIO fails to start, use the absolute path from `which cvss-calculator-mcp` and check the server status.
- If adding servers is unavailable, check whether your organization manages MCP settings centrally.

## Official Reference

- [JetBrains AI Assistant MCP documentation](https://www.jetbrains.com/help/ai-assistant/mcp.html)
