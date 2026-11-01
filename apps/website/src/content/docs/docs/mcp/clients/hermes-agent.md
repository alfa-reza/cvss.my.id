---
title: Hermes Agent MCP Setup
description: Configure cvss-calculator-mcp in Nous Research Hermes Agent using Local stdio or Remote Streamable HTTP.
---

This guide shows how to connect **Hermes Agent** to `cvss-calculator-mcp` for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` runs directly on your machine with no rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Add to `~/.hermes/config.yaml`

Run `hermes mcp add` or add `cvss_calculator` under the `mcp_servers:` key in `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  cvss_calculator:
    command: "cvss-calculator-mcp"
    args: []
```

## Option 2: Remote MCP (Streamable HTTP)

Connect to `https://cvss.my.id/mcp` over Streamable HTTP without installing a local binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

Add the remote server to `~/.hermes/config.yaml`:

```yaml
mcp_servers:
  cvss_calculator:
    url: "https://cvss.my.id/mcp"
```

## Verify the Connection

Inside a Hermes Agent session (or via CLI), check active MCP servers:

```bash
hermes mcp list
```

Or run `/mcp` inside the interactive session, then ask Hermes Agent:

```text
Use calculate_cvss to compute the base score for CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Expected Base Score result: `9.3 (CRITICAL)`.

## Troubleshooting

- **Binary not found when starting Hermes Agent**: Run `which cvss-calculator-mcp` and set `command:` to the absolute path (for example, `command: "/usr/local/bin/cvss-calculator-mcp"`).
- **Rate limit (`HTTP 429`) on Remote MCP**: The public endpoint allows `5 requests per minute per IP`. Use Option 1 (Local `stdio`) for higher throughput.

## Official Reference

- [Hermes Agent MCP Documentation](https://hermes-agent.nousresearch.com/docs/user-guide/features/mcp)
