---
title: MCP Overview
description: Run the CVSS Calculator MCP server locally over stdio or connect to the free public Streamable HTTP endpoint.
---

**`cvss-calculator-mcp`** is a fast, lightweight, open-source Model Context Protocol (MCP) server written in Go ([`alfa-reza/cvss-calculator-mcp`](https://github.com/alfa-reza/cvss-calculator-mcp)). It enables AI coding agents and security tools to validate CVSS vectors and compute **Base Scores** across **CVSS v4.0, v3.1, v3.0, and v2.0**.

> [!IMPORTANT]
> **Scope Comparison: Base-Only MCP vs Full Browser Calculator**
> The Go MCP server (`cvss-calculator-mcp`) computes **Base Scores only** via the `calculate_cvss` tool. When you need **Threat, Temporal, Environmental, or Supplemental** metric group scoring, use the [Full Browser Calculator](https://cvss.my.id/calculator/).

## Set Up with an AI Agent

Copy this prompt to your AI agent:

```text
Read https://get.cvss.my.id/LLM.txt and follow its instructions to set up CVSS Calculator MCP and offer to install its vulnerability assessment skill.
```

The agent will ask you to choose and approve local or remote MCP before making changes. It will ask for separate approval before installing the optional skill.

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

## Vulnerability Assessment Skill

The optional skill guides an agent through assessing vulnerability evidence, selecting CVSS metrics, and calculating a Base Score using the connected MCP server. Install it with the [Skills CLI](https://github.com/vercel-labs/skills):

```bash
npx skills add alfa-reza/cvss-calculator-mcp --skill vulnerability-cvss-assessment
```

Choose your agent when prompted. Add `--global` to make the skill available across projects. Connect the MCP server using one of the options above. Review the [skill instructions](https://github.com/alfa-reza/cvss-calculator-mcp/blob/main/skills/vulnerability-cvss-assessment/SKILL.md) and [tool reference](https://github.com/alfa-reza/cvss-calculator-mcp/blob/main/skills/vulnerability-cvss-assessment/references/tool-reference.md).

## Client Configuration Guides

Choose your AI agent or editor for copy-paste configuration:

- [Codex](/docs/mcp/clients/codex/)
- [Claude Code](/docs/mcp/clients/claude-code/)
- [OpenCode v2](/docs/mcp/clients/opencode/)
- [GitHub Copilot](/docs/mcp/clients/github-copilot/)
- [Cursor](/docs/mcp/clients/cursor/)
- [VS Code](/docs/mcp/clients/vscode/)
- [Zed](/docs/mcp/clients/zed/)
- [Gemini CLI](/docs/mcp/clients/gemini-cli/)
- [JetBrains](/docs/mcp/clients/jetbrains/)
- [Claude Desktop](/docs/mcp/clients/claude-desktop/)
- [Kilo Code](/docs/mcp/clients/kilo-code/)
- [Cline](/docs/mcp/clients/cline/)
- [Hermes Agent](/docs/mcp/clients/hermes-agent/)
