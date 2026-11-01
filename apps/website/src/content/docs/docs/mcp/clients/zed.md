---
title: Zed MCP Setup
description: Configure the CVSS MCP server in Zed using local stdio or remote HTTP.
---

These instructions configure a custom MCP server for the **Zed Agent**. External agents or terminal-based agents may use their own MCP configuration; see [Zed's MCP documentation](https://zed.dev/docs/ai/mcp).

## Local MCP (`stdio`) - Recommended

Install the binary on Linux or macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

In Zed, open **Settings → AI → MCP Servers**, choose **Add Server → Add Local Server**, and set the command to `cvss-calculator-mcp`. Alternatively, merge this entry into the settings file opened with **zed: open settings file**:

```json
{
  "context_servers": {
    "cvss-calculator": {
      "command": "cvss-calculator-mcp",
      "args": [],
      "env": {}
    }
  }
}
```

## Remote MCP (Streamable HTTP)

Choose **Add Server → Add Remote Server**, or replace the local entry in settings with:

```json
{
  "context_servers": {
    "cvss-calculator": {
      "url": "https://cvss.my.id/mcp"
    }
  }
}
```

**Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).** Zed's documentation notes that a remote server without an Authorization header can trigger its MCP OAuth flow; check the server status if prompted.

## Verify

Check the MCP server status in **Settings → AI → MCP Servers**. In a Zed Agent thread, check that the server's tools are available and ask it to score `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`. The expected Base Score is **5.4 (Medium)**.

## Troubleshooting

- If the local server fails to start, replace the command with the absolute path from `which cvss-calculator-mcp`; ensure the binary is installed in the environment running the server.
- If the remote server returns HTTP 429, use Local MCP or wait before retrying.

## Official Reference

- [Zed Model Context Protocol documentation](https://zed.dev/docs/ai/mcp)
