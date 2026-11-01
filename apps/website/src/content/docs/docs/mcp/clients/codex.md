---
title: Codex MCP Setup
description: Configure cvss-calculator-mcp in OpenAI Codex CLI and IDE extension using Local stdio or Remote Streamable HTTP.
---

This guide shows how to connect **OpenAI Codex** to `cvss-calculator-mcp` for CVSS 2.0, 3.0, 3.1, and 4.0 Base Score calculations.

## Option 1: Local MCP (`stdio`) - Recommended

Local `stdio` runs on your machine with no rate limits.

### Step 1: Install the Binary (Linux / macOS)

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

### Step 2: Register with Codex CLI

Run the `codex mcp add` command:

```bash
codex mcp add cvss-calculator -- cvss-calculator-mcp
```

Or add the following block directly to `~/.codex/config.toml` (global) or `.codex/config.toml` (project):

```toml
[mcp_servers.cvss-calculator]
command = "cvss-calculator-mcp"
args = []
```

## Option 2: Remote MCP (Streamable HTTP)

Use the hosted endpoint at `https://cvss.my.id/mcp` when you do not want to install a local binary.

> **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**

### Register via Codex CLI

```bash
codex mcp add cvss-calculator --url https://cvss.my.id/mcp
```

Or add the following block to `~/.codex/config.toml`:

```toml
[mcp_servers.cvss-calculator]
url = "https://cvss.my.id/mcp"
```

## Verify the Connection

List configured MCP servers in Codex:

```bash
codex mcp list
```

Then ask Codex in a session:

```text
Use calculate_cvss to score CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N
```

Expected Base Score result: `9.3 (CRITICAL)`.

## Troubleshooting

- **`cvss-calculator-mcp: command not found`**: Check `which cvss-calculator-mcp`. If installed in `~/.local/bin`, either add `~/.local/bin` to your `PATH` or specify the full path (e.g. `command = "/home/youruser/.local/bin/cvss-calculator-mcp"`) in `~/.codex/config.toml`.
- **`HTTP 429 Too Many Requests` on Remote MCP**: You exceeded `5 requests per minute per IP` on the public endpoint. Switch to Option 1 (Local `stdio`).

## Official Reference

- [OpenAI Codex Model Context Protocol Documentation](https://developers.openai.com/codex/mcp)
