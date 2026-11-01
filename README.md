# CVSS.my.id - Static CVSS Calculator, Documentation & MCP Hub

Monorepo for **`cvss.my.id`** (static homepage, `/tools/mcp`, and `/docs`) and **`calc.cvss.my.id`** (full client-side CVSS 2.0, 3.0, 3.1, and 4.0 browser calculator), built for **Cloudflare Pages Free** with zero application runtime on the Pages side.

## Repository Architecture

```text
.
├── packages/
│   └── cvss-core/         # Pure TypeScript CVSS 2.0, 3.0, 3.1, and 4.0 scoring engine & vector parser
├── apps/
│   ├── website/           # Astro + Starlight static site for https://cvss.my.id
│   └── calculator/        # Vite + TypeScript static browser calculator for https://calc.cvss.my.id
├── scripts/
│   └── lint-check.mjs     # Static verification gate (no SSR/Worker output, no telemetry/CDN fonts, R-02 check)
└── tests/
    └── integration.test.mjs # End-to-end build artifact, route, and calculator state verification
```

### Related Repositories & Endpoints

- **Website & Full Browser Calculator (`cvss.my.id` + `calc.cvss.my.id`)**: [`https://github.com/alfa-reza/cvss.my.id`](https://github.com/alfa-reza/cvss.my.id)
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

Deploy two independent **Cloudflare Pages** projects from this repository:

### Project 1: `cvss.my.id` (Website & Documentation)

- **Root directory**: `/` (repository root)
- **Build command**: `npm run build --workspace=@cvss/core && npm run build --workspace=@cvss/website`
- **Build output directory**: `apps/website/dist`
- **Custom domain**: `cvss.my.id`

> **Critical Route Protection for `cvss.my.id/mcp`**:
> Ensure the existing standalone Cloudflare Worker remains bound to the route `cvss.my.id/mcp*` (or `cvss.my.id/mcp`) in Cloudflare Workers Routes. Because Cloudflare Workers Routes execute before Cloudflare Pages on the same zone, `https://cvss.my.id/mcp` continues serving the Remote MCP protocol while `https://cvss.my.id/`, `/tools/mcp`, and `/docs/*` are served statically by Cloudflare Pages.

### Project 2: `calc.cvss.my.id` (Full Browser Calculator)

- **Root directory**: `/` (repository root)
- **Build command**: `npm run build --workspace=@cvss/core && npm run build --workspace=@cvss/calculator`
- **Build output directory**: `apps/calculator/dist`
- **Custom domain**: `calc.cvss.my.id`

## Standards & License Attribution

- CVSS specifications, formulas, and CVSS v4.0 MacroVector lookup tables are copyright **FIRST.Org, Inc.** (`BSD-2-Clause`). See [FIRST CVSS Specifications](https://www.first.org/cvss/).
