---
title: Security, Privacy & Rate Limits
description: Privacy model, rate limits, offline guarantees, and source verification for CVSS.my.id and cvss-calculator-mcp.
---

Security engineers working on unreleased vulnerabilities or internal audit findings need clear visibility into where their data goes.

## 1. Full Browser Calculator

- **100% Local Execution**: Every CVSS 2.0, 3.0, 3.1, and 4.0 calculation runs in your browser tab using static JavaScript (`@cvss/core`).
- **Zero Scoring Network Calls**: Editing metrics, pasting vectors, or generating share links never sends your CVSS vector to `cvss.my.id/mcp` or any external server.
- **No Analytics or Telemetry**: Neither `cvss.my.id` nor `calc.cvss.my.id` embeds third-party analytics, tracking pixels, session replay scripts, or CDN fonts.
- **Ephemeral Storage**: Draft vectors and selected metrics are stored only in browser `sessionStorage` so refreshing the page does not lose your work. Closing the browser tab clears `sessionStorage`.
- **Share on Demand**: A shareable URL (`?vector=...`) is generated only when you explicitly click **Share URL**.

## 2. Local MCP Server (`cvss-calculator-mcp` via `stdio`)

- **Offline Operation**: Once installed, `cvss-calculator-mcp` communicates exclusively with your local MCP host over `stdio` pipes. It makes zero outbound network connections.
- **Auditable Source**: Inspect the complete Go implementation and release workflow at [`github.com/alfa-reza/cvss-calculator-mcp`](https://github.com/alfa-reza/cvss-calculator-mcp).
- **Rate Limits**: None.

## 3. Remote MCP Endpoint (Streamable HTTP)

- **Published Fair-Use Policy**: **Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).**
- **Transport**: HTTPS (`Streamable HTTP`) terminated on Cloudflare Workers.
- **Confidential Advisory Recommendation**: While `calculate_cvss` only receives bare CVSS vector strings (such as `CVSS:4.0/AV:N/...`) without vulnerability titles or asset names, teams working under strict air-gapped or zero-external-traffic policies should use **Local MCP (`stdio`)**.
