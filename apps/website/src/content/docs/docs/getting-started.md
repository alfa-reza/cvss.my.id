---
title: Getting Started
description: Quick start guide for scoring vulnerabilities in the browser calculator or via the CVSS MCP server.
---

CVSS.my.id provides two ways to calculate Common Vulnerability Scoring System (CVSS) scores:

1. **Interactive Browser Calculator** at `https://calc.cvss.my.id/` for full multi-group scoring (Base, Threat/Temporal, Environmental, and Supplemental).
2. **MCP Server (`cvss-calculator-mcp`)** for automated **Base Score** calculation inside AI coding agents and security triage pipelines.

## Which Tool Should I Use?

| Requirement | Recommended Tool | Supported Metric Groups |
| --- | --- | --- |
| Interactive vulnerability triage with Threat, Temporal, Environmental, or Supplemental metrics | [Full Browser Calculator](/docs/calculator/) (`https://calc.cvss.my.id/`) | Base, Threat, Temporal, Environmental, Supplemental (v4.0, v3.1, v3.0, v2.0) |
| Sharing a canonical vector URL with a security team or advisory draft | [Full Browser Calculator](/docs/calculator/) (`https://calc.cvss.my.id/`) | Full vector serialization across all metric groups |
| Automated Base Score calculation inside Codex, Claude Code, Cursor, or OpenCode | [Local MCP (`stdio`)](/docs/mcp/local/) | Base Score only (v4.0, v3.1, v3.0, v2.0) |
| Zero-install MCP testing from a cloud workspace or browser-hosted agent | [Remote MCP (`https://cvss.my.id/mcp`)](/docs/mcp/remote/) | Base Score only (5 requests/min/IP limit) |

## Quick Start: Full Browser Calculator

1. Open the calculator for your target CVSS version:
   - **CVSS v4.0**: `https://calc.cvss.my.id/v4.0`
   - **CVSS v3.1**: `https://calc.cvss.my.id/v3.1`
   - **CVSS v3.0**: `https://calc.cvss.my.id/v3.0`
   - **CVSS v2.0**: `https://calc.cvss.my.id/v2.0`
2. Select all required **Base** metrics. Until every mandatory Base metric is chosen, the score displays `Incomplete` rather than `0.0`.
3. Optionally switch tabs to add **Threat** (v4.0), **Temporal** (v3.x/v2.0), **Environmental**, or **Supplemental** (v4.0) metrics.
4. Or paste an existing CVSS vector directly into the **Inline Vector String** input at the top of the calculator to populate the form and compute the score immediately.
5. Use **Copy Vector**, **Copy Result**, or **Share URL** once all required Base metrics are valid.

## Quick Start: Local MCP Server (Recommended for Agents)

Install the standalone Go binary on Linux or macOS:

```bash
curl -fsSL https://get.cvss.my.id/install.sh | bash
```

Verify the binary is on your `PATH`:

```bash
cvss-calculator-mcp --version
```

Then register `cvss-calculator-mcp` in your AI client using our [Client Setup Guides](/docs/mcp/clients/).
