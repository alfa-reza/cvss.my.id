# CVSS.my.id - Static CVSS Calculator, Documentation & MCP Hub

Monorepo for **`cvss.my.id`** (static homepage, `/tools/mcp`, `/docs`, and the full client-side CVSS 2.0, 3.0, 3.1, and 4.0 browser calculator at `/calculator/`), built for **one Cloudflare Pages Free project** with zero application runtime on the Pages side.

## Repository Architecture

```text
.
├── packages/
│   └── cvss-core/         # Pure TypeScript CVSS 2.0, 3.0, 3.1, and 4.0 scoring engine & vector parser
├── apps/
│   ├── website/           # Astro + Starlight static site for https://cvss.my.id
│   └── calculator/        # Vite + TypeScript static browser calculator, deployed under /calculator/
├── scripts/
│   └── lint-check.mjs     # Static verification gate (no SSR/Worker output, no telemetry/CDN fonts, R-02 check)
└── tests/
    └── integration.test.mjs # End-to-end build artifact, route, and calculator state verification
```

### Related Repositories & Endpoints

- **Website & Full Browser Calculator (`cvss.my.id`)**: [`https://github.com/alfa-reza/cvss.my.id`](https://github.com/alfa-reza/cvss.my.id)
- **Go MCP Server (`cvss-calculator-mcp`, Base Score only)**: [`https://github.com/alfa-reza/cvss-calculator-mcp`](https://github.com/alfa-reza/cvss-calculator-mcp)
- **Local MCP Installer (HTTP 302)**: `curl -fsSL https://get.cvss.my.id/install.sh | bash`
- **Remote MCP Endpoint (Streamable HTTP)**: `https://cvss.my.id/mcp` (served by the existing standalone Cloudflare Worker)

## Local Development & Verification

```bash
# Install dependencies
npm install

# Run all unit and integration tests
npm test

# Typecheck all workspaces
npm run typecheck

# Build all packages and static applications
npm run build

# Run static lint and Cloudflare Pages artifact gate
npm run lint
```

## Cloudflare Pages Deployment Settings

Deploy one **Cloudflare Pages** project from this repository. The root build produces both applications and copies the calculator assets under `apps/website/dist/calculator/`:

- **Root directory**: `/` (repository root)
- **Build command**: `npm run build`
- **Build output directory**: `apps/website/dist`
- **Custom domain**: `cvss.my.id`

> **Critical Route Protection for `cvss.my.id/mcp`**:
> Keep the existing standalone Cloudflare Worker bound only to the `/mcp` path on `cvss.my.id`; do not assign it an apex Custom Domain that takes over the entire hostname. Confirm route precedence and the MCP handshake before production cutover. Cloudflare Pages serves the remaining static routes, including `/calculator/` and its version routes.

## Standards & License Attribution

Copyright 2026 Faturahman Alfareza.

- CVSS specifications, formulas, and CVSS v4.0 MacroVector lookup tables are copyright **FIRST.Org, Inc.** (`BSD-2-Clause`). See [FIRST CVSS Specifications](https://www.first.org/cvss/) and [third-party notices](THIRD_PARTY_NOTICES).
- The CVSS.my.id website source code, calculator implementation, and documentation are licensed under the [Apache License 2.0](LICENSE).
