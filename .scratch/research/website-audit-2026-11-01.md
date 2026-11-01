# Website and documentation audit — 2026-11-01

Scope: review of local website/docs source against calculator implementation and primary references. This is a review, not a release verification. PRD-CVSS-my-id-v1.0.md was not present.

## Findings

- `apps/website/src/content/docs/docs/calculator.md:41` promises automatic version switching; `apps/calculator/src/app.ts:764` and `:564` instead show an explicit link to the other version.
- `apps/website/src/content/docs/docs/calculator.md:27` claims radio arrow-key support. `apps/calculator/src/app.ts:841` attaches click handlers, whereas arrow handling at `:807` is for tabs. Browser keyboard testing is needed to confirm the practical impact.
- `apps/website/src/content/docs/docs/cvss/vectors.md:28` calls v3 Base ordering mandatory. Clarify input validity vs canonical output: [FIRST v3.1](https://www.first.org/cvss/v3-1/specification-document) requires parsers to accept any ordering. [FIRST v4](https://www.first.org/cvss/v4.0/specification-document) requires ordering.
- `apps/website/src/pages/index.astro:249` and `apps/website/src/pages/tools/mcp.astro:184` promise checksum guidance; `apps/website/src/content/docs/docs/mcp/local.md` does not provide it or specific Windows steps.
- `apps/website/src/pages/tools/mcp.astro:80` says language models frequently miscalculate without citing evidence of frequency. Use a qualified statement or provide evidence.
- `apps/website/src/content/docs/docs/mcp/tools.md:10` claims multiple vectors and automatic version detection, although the same page describes a required version and a single vector. Verify against the deployed server and upstream before documenting the exact contract.
- `apps/website/src/content/docs/docs/index.md:27` calls examples real-world, while `apps/website/src/content/docs/docs/cvss/examples.md` supplies scenarios without sources. The examples are useful but should be labeled illustrative unless traceable.
- `apps/website/src/content/docs/docs/mcp/security.md:25` limits the confidentiality recommendation to air-gapped/no-external-traffic policies. Remote calls leave the machine; explain the trust boundary and avoid implying the hosting layer or client cannot receive identifying context.
- Secondary text is small: `apps/website/src/styles/site.css:582` and `:877`, and `apps/website/src/styles/starlight-custom.css:146`. Visual judgment, not a verified WCAG failure.

## Boundaries

The homepage was observed previously in Brave on desktop in light and dark themes. This audit does not establish mobile behavior, keyboard accessibility, network privacy, runtime Cloudflare routing, or actual third-party client configuration. Source links: [FIRST v4](https://www.first.org/cvss/v4.0/specification-document), [FIRST v3.1](https://www.first.org/cvss/v3-1/specification-document), [MCP upstream README](https://github.com/alfa-reza/cvss-calculator-mcp).
- `apps/website/src/content/docs/docs/cvss/examples.md:14` gives 8.1 for its v4 Threat vector, but the local engine returns 8.9. This mismatch must be checked against the [FIRST reference calculator](https://github.com/FIRSTdotorg/cvss-v4-calculator) before changing the number.
- `apps/website/src/content/docs/docs/mcp/clients/pi.md:19` presents an adapter as required. [The adapter's own documentation](https://github.com/nicobailon/pi-mcp-adapter#pi-mcp-adapter-vs-pis-built-in-mcp) says Pi 0.99 introduced built-in MCP and installing the adapter replaces it in Pi sessions. Explain versions, alternatives, and the effect.
- [Upstream MCP tool schema](https://github.com/alfa-reza/cvss-calculator-mcp/blob/main/internal/mcp/tools.go) confirms a required version and a single vector, with nonempty vector and additional properties disallowed. Document the MCP response envelope separately from its text payload.
