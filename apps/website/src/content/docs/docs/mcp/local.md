---
title: Local MCP Setup (stdio)
description: Install and run cvss-calculator-mcp locally over stdio on Linux, macOS, and Windows with zero rate limits.
---

Running `cvss-calculator-mcp` locally over `stdio` is the **recommended** setup for daily security engineering, automated code review, and batch vulnerability triage. All calculations execute on your machine with zero network latency and no public endpoint rate limits.

## 1. Install with the Official Installer (Linux & macOS)

Run the installer script:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

The installer detects your operating system (`linux` or `darwin`) and CPU architecture (`amd64` or `arm64`), downloads the matching release archive from [`alfa-reza/cvss-calculator-mcp`](https://github.com/alfa-reza/cvss-calculator-mcp/releases), and installs `cvss-calculator-mcp` into `/usr/local/bin` (or `~/.local/bin` if `/usr/local/bin` is not writable without `sudo`).

### Windows (PowerShell, x64 and ARM64)

Run in PowerShell:

```powershell
irm https://raw.githubusercontent.com/alfa-reza/cvss-calculator-mcp/main/install.ps1 | iex
```

The installer verifies the release checksum and installs to `%LOCALAPPDATA%\Programs\cvss-calculator-mcp` by default. Add that directory to your PATH, or use the full binary path in your MCP client.

## 2. Alternative Installation Methods

### Install from Source with Go

If you have Go 1.25+ installed:

```bash
go install github.com/alfa-reza/cvss-calculator-mcp/cmd/cvss-calculator-mcp@latest
```

Ensure `$(go env GOPATH)/bin` is in your shell `PATH`.

### Manual Release Binary Download

Download the precompiled binary archive directly from the [GitHub Releases page](https://github.com/alfa-reza/cvss-calculator-mcp/releases), extract `cvss-calculator-mcp`, mark it executable (`chmod +x cvss-calculator-mcp`), and move it into a directory on your `PATH`.

## 3. Verify Installation

Confirm the binary responds on your `PATH`:

```bash
which cvss-calculator-mcp
```

Test a JSON-RPC `initialize` request over `stdio`:

```bash
printf '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"smoke-test","version":"1.0.0"}}}\n' | cvss-calculator-mcp
```

You should receive a single-line JSON-RPC response containing `serverInfo` and `capabilities.tools`.

## 4. Connect Your MCP Client

Proceed to the [Client Setup Guides](/docs/mcp/clients/) for your specific agent or IDE.
