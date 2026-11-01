---
title: MCP Overview
description: Run the CVSS Calculator MCP server locally over stdio or connect to the free public Streamable HTTP endpoint.
---

**`cvss-calculator-mcp`** is a fast, lightweight, open-source Model Context Protocol (MCP) server written in Go ([`alfa-reza/cvss-calculator-mcp`](https://github.com/alfa-reza/cvss-calculator-mcp)). It enables AI coding agents and security tools to validate CVSS vectors and compute **Base Scores** across **CVSS v4.0, v3.1, v3.0, and v2.0**.

> [!IMPORTANT]
> **Scope Comparison: Base-Only MCP vs Full Browser Calculator**
> The Go MCP server (`cvss-calculator-mcp`) computes **Base Scores only** via the `calculate_cvss` tool. When you need **Threat, Temporal, Environmental, or Supplemental** metric group scoring, use the [Full Browser Calculator](https://calc.cvss.my.id/).

## Two Ways to Connect

### 1. Local MCP (`stdio`) - Recommended

Install the standalone single binary onto your workstation and let your AI client launch `cvss-calculator-mcp` directly over standard input/output (`stdio`).

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

- **Supported OS**: Linux and macOS (`amd64` and `arm64`), or any platform via `go install`.
- **Transport**: `stdio`
- **Rate limit**: None (100% local execution, works offline).
- **Guide**: [Local MCP Setup (stdio)](/docs/mcp/local/)

### 2. Remote MCP (HTTP) - Free Public Endpoint

Connect any MCP client that supports **Streamable HTTP** directly to the hosted endpoint without installing a local binary:

```text
https://cvss.my.id/mcp
```

- **Transport**: Streamable HTTP
- **Rate limit**: **5 requests per minute per IP. For higher usage, run Local MCP (stdio).**
- **Note**: The endpoint `https://cvss.my.id/mcp` is a protocol endpoint for MCP clients, not a human HTML page. For the human overview page, visit [MCP Tools Overview](/tools/mcp).
- **Guide**: [Remote MCP Setup (HTTP)](/docs/mcp/remote/)

## Client Configuration Guides

Choose your AI agent or editor for copy-paste configuration:

- [Codex](/docs/mcp/clients/codex/)
- [Claude Code](/docs/mcp/clients/claude-code/)
- [OpenCode](/docs/mcp/clients/opencode/)
- [GitHub Copilot](/docs/mcp/clients/github-copilot/)
- [Cursor](/docs/mcp/clients/cursor/)
- [Pi](/docs/mcp/clients/pi/)
- [Kilo Code](/docs/mcp/clients/kilo-code/)
- [Cline](/docs/mcp/clients/cline/)
- [Hermes Agent](/docs/mcp/clients/hermes-agent/)
