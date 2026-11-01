---
title: Remote MCP Setup (HTTP)
description: Connect MCP clients to https://cvss.my.id/mcp over Streamable HTTP.
---

If you are working in a browser-based environment, ephemeral container, or want to test `cvss-calculator-mcp` without installing a local binary, connect your MCP client to our free public endpoint.

## Endpoint Details

- **Endpoint URL**: `https://cvss.my.id/mcp`
- **Transport Protocol**: MCP **Streamable HTTP** (`POST` / `GET` JSON-RPC over HTTPS)
- **Authentication**: None required
- **Supported Scoring**: CVSS v4.0, v3.1, v3.0, and v2.0 **Base Score** (`calculate_cvss`)
- **Published Usage Policy**: **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

> [!NOTE]
> `https://cvss.my.id/mcp` is served by a standalone Cloudflare Worker speaking the MCP protocol. Opening `https://cvss.my.id/mcp` directly in a web browser address bar will not render a website page; for human documentation and setup instructions, use [`https://cvss.my.id/tools/mcp`](/tools/mcp) or [`https://cvss.my.id/docs/mcp/`](/docs/mcp/).

## Testing the Remote Endpoint with `curl`

You can verify that the remote MCP endpoint is reachable from your network by sending an MCP `initialize` handshake:

```bash
curl -i -X POST https://cvss.my.id/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2024-11-05",
      "capabilities": {},
      "clientInfo": {
        "name": "curl-check",
        "version": "1.0.0"
      }
    }
  }'
```

## Avoiding Rate Limits (`HTTP 429`)

The public endpoint enforces a fair-use policy of **5 requests per minute per IP** to keep the hosted service available at zero cost. If your agent performs batch vulnerability reviews or automated CI runs, switch to [Local MCP (`stdio`)](/docs/mcp/local/):

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```
