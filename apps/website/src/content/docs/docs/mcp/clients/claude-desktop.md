---
title: Claude Desktop MCP Setup
description: Connect the CVSS MCP server to Claude Desktop.
---

## Local MCP (`stdio`) - Recommended

On macOS, install the binary:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Open Claude Desktop settings, find the developer or local MCP server settings, and edit the configuration file. Merge this entry into `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cvss-calculator": {
      "command": "/absolute/path/to/cvss-calculator-mcp",
      "args": []
    }
  }
}
```

Replace the command with the path printed by `which cvss-calculator-mcp`, then restart Claude Desktop. The installer command above supports Linux and macOS; for other platforms, see the [local installation guide](/docs/mcp/local/).

## Remote MCP (Streamable HTTP)

In Claude settings, add a custom connector with the URL `https://cvss.my.id/mcp`. Availability may depend on account and organization settings. Remote connectors connect from Anthropic's cloud infrastructure; vectors sent through them leave your device.

**Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).** The relevant IP for a remote connector is the client service's egress IP, which may be shared.

## Verify

In a conversation, open the connector picker and check that the CVSS server and `calculate_cvss` tool are available. Ask Claude to score `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`; the expected Base Score is **5.4 (Medium)**.

## Troubleshooting

- If the local server fails to start, check its logs in Claude Desktop settings, the absolute binary path, and file permissions.
- If the remote connector is unavailable, check account and organization connector settings and the endpoint's reachability.

## Official Reference

- [Claude Desktop local MCP servers](https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)
- [Claude custom remote connectors](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)
