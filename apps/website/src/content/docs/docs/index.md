---
title: Documentation Overview
description: Technical reference for CVSS 2.0, 3.0, 3.1, and 4.0 scoring, vector strings, the full browser calculator, and the Base-only MCP server.
---

Welcome to the **CVSS.my.id** documentation. This documentation covers two static products and one open-source Model Context Protocol (MCP) server:

1. [**Full Browser Calculator**](https://calc.cvss.my.id/): Client-side CVSS 2.0, 3.0, 3.1, and 4.0 calculator supporting all metric groups (Base, Threat/Temporal, Environmental, and Supplemental). All scoring executes locally in your browser with zero network requests.
2. **Documentation & Product Hub**: Reference guides for CVSS version differences, vector syntax, scoring formulas, and AI agent integrations.
3. **CVSS Calculator MCP (`cvss-calculator-mcp`)**: Open-source Go MCP server for **Base Score only** across CVSS 2.0, 3.0, 3.1, and 4.0. Runs locally over `stdio` or via the free public Streamable HTTP endpoint.

## Documentation Sections

### Getting Started & Calculator

- [Getting Started](/docs/getting-started/): Choose the right CVSS version and tool for your workflow.
- [Full Browser Calculator Guide](/docs/calculator/): Metric group tabs, inline vector editing, keyboard navigation, `sessionStorage` drafts, and on-demand URL sharing.

### CVSS Reference

- [Version Comparison](/docs/cvss/overview/): Side-by-side comparison of CVSS 4.0, 3.1, 3.0, and 2.0.
- [CVSS v4.0 Reference](/docs/cvss/v4/): Base, Threat, Environmental, Supplemental groups, MacroVector lookup, and `CVSS-B` / `CVSS-BT` / `CVSS-BE` / `CVSS-BTE` nomenclature.
- [CVSS v3.1 Reference](/docs/cvss/v3.1/): Base, Temporal, and Environmental formulas, Scope rules, and `Roundup` behavior.
- [CVSS v3.0 Reference](/docs/cvss/v3.0/): Historical 3.0 formulas and exact differences from 3.1.
- [CVSS v2.0 Reference](/docs/cvss/v2/): Access Vector, Authentication (`Au`), Temporal, Environmental, and the 3-tier severity scale (`Low`, `Medium`, `High`).
- [Vector String Format](/docs/cvss/vectors/): Prefix rules, metric ordering, mandatory vs optional metrics, and validation rules.
- [Worked Examples](/docs/cvss/examples/): Real-world vulnerability vectors across all four CVSS versions.

### MCP Server (`cvss-calculator-mcp`)

- [MCP Overview](/docs/mcp/): Local `stdio` vs Remote Streamable HTTP comparison and Base-only scope.
- [Local MCP Setup (stdio)](/docs/mcp/local/): Recommended zero-rate-limit installation for Linux and macOS.
- [Remote MCP Setup (HTTP)](/docs/mcp/remote/): Connect to `https://cvss.my.id/mcp` and understand the `5 requests per minute per IP` policy.
- [MCP Tool Reference](/docs/mcp/tools/): Input schema, output fields, and example calls for `calculate_cvss`.
- [Security, Privacy & Rate Limits](/docs/mcp/security/): Offline guarantees, transport notes, and source code verification.
- [Client Setup Guides](/docs/mcp/clients/): Copy-paste configuration for [Codex](/docs/mcp/clients/codex/), [Claude Code](/docs/mcp/clients/claude-code/), [OpenCode](/docs/mcp/clients/opencode/), [GitHub Copilot](/docs/mcp/clients/github-copilot/), [Cursor](/docs/mcp/clients/cursor/), [Pi](/docs/mcp/clients/pi/), [Kilo Code](/docs/mcp/clients/kilo-code/), [Cline](/docs/mcp/clients/cline/), and [Hermes Agent](/docs/mcp/clients/hermes-agent/).

## Standards Attribution

CVSS (Common Vulnerability Scoring System) is a free and open industry standard owned and managed by **FIRST.Org, Inc.** (Forum of Incident Response and Security Teams). Official specifications are published at:

- [FIRST CVSS v4.0 Specification](https://www.first.org/cvss/v4.0/specification-document)
- [FIRST CVSS v3.1 Specification](https://www.first.org/cvss/v3-1/specification-document)
- [FIRST CVSS v3.0 Specification](https://www.first.org/cvss/v3.0/specification-document)
- [FIRST CVSS v2.0 Complete Guide](https://www.first.org/cvss/v2/guide)
