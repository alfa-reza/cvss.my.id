# AGENTS.md — CVSS.my.id

> **Applies to:** the root of [`alfa-reza/cvss.my.id`](https://github.com/alfa-reza/cvss.my.id) and all its subdirectories.
> **Purpose:** binding engineering and design guardrails for AI coding agents working on this website.
> **Product specification:** [`PRD-CVSS-my-id-v1.0.md`](./PRD-CVSS-my-id-v1.0.md). Read it before changing product behavior. If that file is not present locally, obtain it from the project owner; do not silently replace agreed requirements with guesses.

## 0. Non-negotiable mission

Build **a correct, fast, accessible, modern, fully static CVSS website** deployable on **Cloudflare Pages Free**. Ship a visible, usable vertical slice early, then iterate. Optimize for long-term simplicity, not for code quantity, novelty, or a fashionable technology stack.

**Hierarchy of constraints:**
1. Safety, accuracy, standards compliance, and explicit owner requirements.
2. These non-negotiable infrastructure and quality rules.
3. Product behavior and scope in the approved PRD.
4. Existing working repository conventions, where they do not conflict with the above.

If implementation and specifications conflict, do not quietly violate either. Report the conflict and take the smallest reversible path that preserves safety and already-agreed behavior.

## 1. Engineering philosophy

- **KISS — Keep It Simple, Stupid:** choose the simplest architecture and UX that satisfies the actual requirement. Prefer readable code and ordinary HTML/CSS to custom frameworks or clever abstractions.
- **YAGNI — You Aren't Gonna Need It:** do not build hypothetical APIs, plugin architectures, state managers, design systems, future i18n translations, user accounts, or admin panels.
- **DRY — Don't Repeat Yourself, appropriately:** share stable scoring rules and reusable UI patterns, **but** do not force distinct CVSS versions into a misleading generic formula. A little duplication is better than an abstraction that hides different standards.
- **SOLID, selectively:** single-purpose modules, clear responsibilities, and dependency direction where they genuinely reduce complexity. Do not create interfaces, factories, adapters, or services for a single implementation without a real need.
- **Composition over inheritance; explicit over implicit:** favor small components and plain data flow. Avoid magic behavior, unnecessary indirection, and deep nesting.
- **Separation of concerns:** scoring logic must be pure; browser UI handles presentation; storage and URL sharing stay in the browser; docs are content, not an application.
- **Progressive enhancement:** core navigation, prose, documentation, and links work as static HTML. JavaScript is reserved for actual interactive features.
- **Accessibility is functionality:** semantic elements, keyboard support, focus visibility, labels and usable mobile layouts are required, not polish for later.
- **Measure before optimizing:** use tests, bundle inspection and browser measurements. Don't trade CVSS correctness or accessibility for a cosmetic benchmark.
- **Boring technology wins:** prefer built-in platform capabilities, stable maintained dependencies and predictable deployments.

**The deletion test:** before adding a dependency, abstraction, package, component, animation or configuration file, ask: *Can we remove it and still satisfy the requirement?* If yes, remove it.

## 2. HARD RULE — static-only Cloudflare Pages

Both public-facing applications MUST generate static deployable assets. **No application runtime on the Cloudflare Pages side.**

| Host | Responsibilities | Hosting |
| --- | --- | --- |
| `cvss.my.id` | Static homepage, `/docs`, `/tools/mcp` | Cloudflare Pages project 1 |
| `calc.cvss.my.id` | Full browser-based CVSS calculator | Cloudflare Pages project 2 |
| `cvss.my.id/mcp` | Existing public Remote MCP protocol endpoint; **not an HTML page** | Existing, separate Cloudflare Worker |
| `get.cvss.my.id/install.sh` | Existing installer URL using HTTP 302 | **Already deployed**; do not replace or rehost |

**Mandatory:**

- The website is **Astro static output** with **Starlight** for `/docs`. Use pre-rendered HTML and CSS.
- The calculator is **client-side TypeScript and CSS** (or equivalently small static JS), with calculations performed **locally in the browser**.
- Output directories contain deployable `HTML/CSS/JS/assets` only; Pages serves them as static assets.
- **Never introduce SSR, server-side rendering at request time, Pages Functions (`functions/`), `_worker.js`, Workers Sites runtime, middleware requiring a server, API routes with runtime behavior, edge scoring, serverless backend, database, KV/D1/Durable Objects, or an API proxy** into the website or calculator.
- Do **not** add `@astrojs/cloudflare` solely to deploy a static Astro website. A server adapter is unnecessary for static output.
- Do **not** call `https://cvss.my.id/mcp`, any external scoring API, or any service to compute browser scores. The calculator must also work after the static assets have loaded when offline.
- Do not introduce analytics, trackers, advertising scripts, third-party runtime fonts, remote feature flags, or client-side telemetry.
- A static file redirect (`_redirects`), static routing rule or pre-rendered redirect page is allowed where needed; do not turn it into a Function.
- Avoid build-time remote dependencies when practical; reproducible builds should not rely on unpinned remote assets.

**Release-blocking proof:** inspect generated build artifacts and Cloudflare project settings. There must be **no Pages Functions or Worker runtime generated or invoked** by the website/calculator. Assert in browser network tests that changing metrics makes **zero scoring-network requests**.

**Do not confuse the existing standalone MCP Worker with a Pages runtime.** The existing Worker is out of scope and must continue to work independently.

## 3. Domain and deployment invariants

These URLs are fixed; do not rename them as a refactor:

- Homepage: `https://cvss.my.id/`
- Documentation: `https://cvss.my.id/docs/` (includes CVSS **and MCP docs**)
- MCP introduction: `https://cvss.my.id/tools/mcp`
- Full calculator: `https://calc.cvss.my.id/` with version routes `/v4.0`, `/v3.1`, `/v3.0`, `/v2.0`
- Remote MCP endpoint: `https://cvss.my.id/mcp`
- Local installer: `curl -fsSL https://get.cvss.my.id/install.sh | bash`

Use the existing website repository for website, full calculator and docs. **Keep the existing Go MCP repository separate:**

- Website + calculator: `https://github.com/alfa-reza/cvss.my.id`
- Go MCP: `https://github.com/alfa-reza/cvss-calculator-mcp`

Both repository links MUST be easy to find on the homepage. Do not introduce `mcp.cvss.my.id` for V1.

Deployment is **two independent Cloudflare Pages projects from one website repository**, optionally using simple workspaces/monorepo layout. Do not impose a specific folder layout without first inspecting the actual repository. Prefer the smallest structure that preserves boundaries between static website, calculator UI and pure scoring engines.

**Critical route protection:** the Cloudflare Worker must still receive `cvss.my.id/mcp` after attaching `cvss.my.id` to Pages. Do not assign a Worker Custom Domain that takes over the entire apex hostname. A wildcard route such as `cvss.my.id/mcp*` may also match unrelated prefixes; validate `URL.pathname` in the existing Worker if that route is used. Test actual route precedence, query strings, protocol handshake, and Pages paths before release. Do not change the existing Worker or installer redirect casually.

## 4. Anti-AI-slop design rules — REQUIRED

The site is a **practical security developer tool**, not an AI-generated SaaS landing page. **Pure Monochrome, dark-first, functional minimalism.**

**Starting design tokens:**

```css
:root {
  color-scheme: dark;
  --bg: #0c0d0f;
  --surface: #15171b;
  --elevated: #1d2025;
  --border: #30343b;
  --fg: #e8eaed;
  --muted: #a9adb4;
}
```

- Use a **solid dark background**, off-white text, neutral borders, restrained surface contrast, 4–8px radii and a consistent 4/8px spacing rhythm.
- Use system sans-serif; use system monospace only for vectors, paths and code. **No Google Fonts or other font CDN.**
- Use normal document flow, responsive CSS Grid/Flex, CSS sticky where needed, and semantic HTML. Do not make the layout look like a generic admin dashboard.
- Use color only when semantically useful (especially **CVSS severity**); always include severity text. No dependency on color alone.
- Provide visible keyboard focus and adequate contrast; design for **WCAG 2.2 AA**.
- Mobile first: no horizontal overflow, tiny tap targets, obstructive floating score bars, or mandatory hover interactions.
- Prefer native form controls unless a custom control materially improves metric selection and is tested for accessibility.
- A modern interface is achieved through **typography, spacing, alignment, clarity, interaction quality, and restraint** — not visual effects.

**Explicitly forbidden unless the owner specifically changes the PRD:**

- Gradient/glowing hero backgrounds; glassmorphism; blurred blobs; neon hacker/cyberpunk themes; particle grids; fake terminal rain.
- Decorative dashboards, donut/gauge charts, animated counters, pseudo-3D, carousel slides, gratuitous floating cards or large empty hero sections.
- Stock hacker imagery, AI robot illustrations, meaningless icons, testimonial cards, invented metrics, fake usage counters or partner logos.
- Gratuitous microanimations, scroll-jacking, dramatic page transitions, typewriter effects, endless skeleton loading.
- A different theme/design language per route, giant icon packages, excessive shadows, bloated component systems or needless configuration controls.
- *Placeholder features presented as working.* Never hardcode a sample score into a production calculator result.

**Design review test:** remove every purely decorative element. If the page becomes easier to use and nothing meaningful is lost, keep it removed.

## 5. Homepage and docs behavior

The homepage is a small, static **product hub**, NOT a second calculator. Keep approximately six small areas: header, short hero, CVSS version links, MCP Local/Remote block, documentation/open-source links, footer. No interactive homepage scoring demo.

**MCP block order is fixed:**
1. **Local MCP — recommended**: show installer command exactly as above, Linux/macOS label, Copy action, guide link, `stdio`, no public endpoint limit.
2. **Remote MCP — free**: show `https://cvss.my.id/mcp`, Copy action, Streamable HTTP, and text **“Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).”**

The public remote limit is a published usage policy; **do not claim the website enforces that limit**. The Go MCP is **Base Score only**, unlike the **full browser calculator**. Do not promise CVE scanning or Threat/Temporal/Environmental MCP scoring.

**Documentation:** Astro Starlight, static Markdown/MDX, English first (future Indonesian without changing English URLs), first-party navigation/TOC/static search/code-copy wherever possible. `/docs` must explain CVSS 2.0, 3.0, 3.1, 4.0, vector formats, examples, calculator usage, and **MCP installation and tool use**.

`/docs/mcp/clients/` is a **plain index of links**, with one independent Markdown page per client: **Codex, Claude Code, OpenCode, GitHub Copilot, Cursor, Pi, Kilo Code, Cline, Hermes Agent**. Each page: **Local stdio first**, then **Remote HTTP**, verify, short troubleshooting, official reference. **No custom client selector, JavaScript tabs or runtime configuration generator.** Verify client commands against current official documentation; never invent CLI options or assert testing that did not happen.

Provide accurate FIRST attribution, link original standards, respect source licenses, and do not lift third-party articles wholesale.

## 6. Full calculator: scoring correctness before cosmetics

Support **full metric groups** for CVSS **2.0, 3.0, 3.1, 4.0**, not Base-only. Different versions have different metrics, vector rules, severity definitions, formulas, rounding and optional defaults. **Official FIRST specifications and reference fixtures are the source of truth.**

- **CVSS 4.0**: Base, Threat, Environmental and Supplemental; correct MacroVector/lookup/interpolation; Supplemental metrics affect context/vector but **not the numeric score**.
- **CVSS 3.0 / 3.1**: Base, Temporal, Environmental; preserve version-specific differences in formulas/rounding.
- **CVSS 2.0**: Base, Temporal, Environmental; honor `Au` and v2 vector format; do not invent a Critical qualitative level for v2.
- Score is `Incomplete` until required Base metrics are supplied, not `0.0`.
- No estimated scores, invented scoring constants, wrong/unsupported formulas, or “close enough” CVSS 4.0 calculations.
- Pure scoring code must expose a narrow interface that can be tested against reference fixtures independently of UI.
- Do not reuse the Go MCP's **Base-only** implementation as a purported full-scoring oracle. It is a separate product and may serve as an additional Base-only cross-check where applicable.

**Locked UI behaviors:**

- Tabs per version's metric groups; **hybrid controls** (segmented for short options, select for longer options).
- On desktop, a sticky Score Panel beside the form; on mobile, a normal, compact result panel (no blocking overlay).
- **Inline editable vector field** always visible. While typing invalid text, keep last valid calculation *clearly marked out of sync*, show actionable error and do not overwrite the user's input.
- Valid pasted vectors update metrics and score; metric changes update vector. Follow per-version parser/serializer rules.
- **Copy Vector**, **Copy Result**, **Share URL**, **Reset Group**, **Reset All**. Disable misleading copy/share while invalid or incomplete.
- **Share on Demand**: generate and copy a URL with encoded canonical vector only when the Share control is activated; **no continuous URL synchronization**.
- **sessionStorage**, separated by CVSS version, saves raw draft (including invalid draft) and last valid metric state. Refresh restores drafts; Reset All clears only the active version. An explicitly supplied valid shared URL takes precedence over session data.
- Handle stale shared-URL parameters safely after edits, corrupt storage, unavailable clipboard, invalid URL input, unsupported version, and malformed vectors.
- All calculation state stays on the browser; no database, login, historical tracking, or backend.

**Never present a visual preview as a verified calculator.** Early UI previews may show `—` / `Incomplete`; release actual scores only once the applicable FIRST reference tests pass.

## 7. Dependencies, architecture and source hygiene

- **Inspect before editing:** list files, check `package.json`/workspace/build configuration, current routes, tests and project license. Preserve useful existing code.
- Prefer **Astro static + Starlight** for homepage/docs, **TypeScript + platform DOM/CSS** for calculator, **pure TS functions** for scoring.
- Use native `fetch` only when genuinely needed for non-scoring functionality; the initial V1 has no need for runtime data fetching.
- No framework hydration on the homepage; avoid large frontend frameworks in the calculator unless measured evidence proves necessity and owner approves the trade-off.
- Avoid `any`, swallowed exceptions, global mutable scoring state, hand-written cryptic one-liners, enormous components and CSS duplication.
- Split modules at **real functional seams**, not arbitrary line-count limits; avoid 20 tiny utility files for a simple feature.
- Choose few direct dependencies; verify licensing and avoid installing design libraries solely for one button, tooltip or modal.
- Keep lockfile and build scripts reproducible; no remote `curl | bash` during CI/build.
- No unnecessary `.env`, secrets, third-party API keys or runtime Cloudflare bindings. Never commit secrets.
- Do not modify the Go MCP repo, existing Remote MCP Worker, installer 302, or deployment DNS except with specific approval.
- Keep contributions focused; do not bundle unrelated refactors or formatting churn into a functional change.

## 8. Performance budget (targets; verify, do not fabricate)

| Measure | Initial target |
| --- | --- |
| Homepage authored JS | **≤ 10 KiB gzip**, ideally close to zero |
| Calculator initial JS | **≤ 150 KiB gzip**; lazy-load version engine if beneficial |
| CSS per page | **≤ 30 KiB gzip** |
| Calculator initial compressed transfer | **≤ 250 KiB**, as measured |
| LCP | **≤ 2.5 s**, p75 real-user data when available |
| INP | **≤ 200 ms**, p75 when available |
| CLS | **≤ 0.1**, p75 when available |
| Lighthouse mobile performance | **≥ 95** target for representative build |
| Runtime scoring calls | **0** |
| Third-party analytics requests | **0** |

These are **engineering budgets, not claims of achieved performance**. Correct scoring, accessibility and functional usability take priority if a target conflicts. Measure compiled bundles and browser experience; document deviations with evidence and the simplest mitigation. Keep static docs search local (e.g., Starlight/Pagefind), not server-backed.

## 9. Tests and verification: do not claim success without proof

Before saying a feature is complete, run the relevant checks, report actual commands and results, and fix failures:

1. **Static build gate:** both projects build to static assets; inspect output/config for absence of runtime Worker artifacts, Functions and SSR.
2. **Type/lint gate:** project-provided type checking and linting pass; do not invent or report tests that were not run.
3. **Scoring gate (release blocker):** fixtures and boundary cases against FIRST official calculators/reference code for all versions, all supported groups, rounding, zero scores, v4 Supplemental behavior, invalid/duplicate vectors, canonical round trips.
4. **State gate:** valid/invalid inline editing, out-of-sync score, Copy/Share fallback, URL precedence, stale query removal, Reset Group/All, per-version sessionStorage including refresh.
5. **Browser gate:** desktop/mobile snapshots and interaction checks at representative widths (360, 390, 768, 1024, 1440 px), keyboard-only navigation, focus, color contrast, horizontal overflow.
6. **Network gate:** inspect live browser requests — **no remote scoring calls or telemetry**, no hidden backend dependency.
7. **Docs gate:** correct pages, nine client guides, command examples, internal links, search, code copy, external repository links, FIRST attribution.
8. **Cloudflare routing gate (before production cutover):** `/`, `/docs`, `/tools/mcp` served by Pages; `/mcp` still reaches existing Worker and completes actual MCP handshake; installer still follows existing 302 chain.
9. **Performance gate:** record build asset sizes and Lighthouse results; compare against targets without misrepresenting lab tests as real-user data.

If a check cannot be run, write **“not verified”** and say why. **Never describe a mock, screenshot or placeholder score as production-complete.** Do not mark a client setup example “tested” unless it was executed in that client.

## 10. Autonomous agent working protocol

- Start by reading **this file, the PRD, repository structure, current code and existing tests**. If PRD is unavailable, do not fabricate missing product requirements.
- Make a brief, explicit implementation plan organized into **small, reviewable slices**, not a massive all-at-once rewrite.
- **Show a working preview early**: homepage, calculator shell and docs navigation should be visually inspectable before all scoring engines are finished. Label unfinished behavior accurately.
- Implement minimal complete paths, verify them, and then iterate on UI based on observed problems, not speculative polish.
- Prefer small scoped diffs; add tests next to behavior; keep documentation consistent with actual implementation.
- Use official upstream documentation for framework/Cloudflare/client syntax and FIRST for CVSS. If anything is ambiguous, use the safest narrow interpretation, note the assumption, and proceed where reversible; request owner input only for genuinely blocking or irreversible decisions.
- **Do not deploy to production, alter DNS, change Cloudflare Worker routes, rotate credentials, or push to protected branches without explicit authorization.** Preview/static build work may proceed with authorized access.
- At each handoff report: **what changed, paths touched, commands/tests run, observable results (preview/screenshot if available), measured performance, known limitations, and next smallest step**.
- No bogus green checkmarks, invented compatibility claims, success messages before tests, or “everything works” without supporting evidence.

## 11. Explicitly out of scope for V1

No SSR/server/API backend, Pages Functions, database, authentication, user dashboard, scan/CVE lookup, embedded chatbot/AI agent, analytics, ads, JSON/PDF export, vector comparison, persistent history, animated marketing site, remote scoring for the browser, Docker/VPS self-hosting tutorials, MCP information subdomain, alternate remote MCP URL, modifying the existing Go MCP implementation, or Indonesian translated pages before the future localization milestone.

## 12. Authoritative references

- PRD: `PRD-CVSS-my-id-v1.0.md` (project root)
- [FIRST CVSS v4.0 Specification](https://www.first.org/cvss/v4.0/specification-document)
- [FIRST CVSS v3.1 Specification](https://www.first.org/cvss/v3-1/specification-document)
- [FIRST CVSS v3.0 Specification](https://www.first.org/cvss/v3.0/specification-document)
- [FIRST CVSS v2 Guide](https://www.first.org/cvss/v2/guide)
- [FIRST CVSS v4 reference calculator source](https://github.com/FIRSTdotorg/cvss-v4-calculator)
- [Astro](https://docs.astro.build/)
- [Astro Starlight](https://starlight.astro.build/)
- [Cloudflare Pages — Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
- [Cloudflare Pages — Monorepos](https://developers.cloudflare.com/pages/configuration/monorepos/)
- [Cloudflare Pages — Functions pricing and static assets](https://developers.cloudflare.com/pages/functions/pricing/)
- [Cloudflare Workers — Routes](https://developers.cloudflare.com/workers/configuration/routing/routes/)

> **Final rule:** deliver the smallest correct static solution. **KISS > complexity. Correctness > appearance. Usability > decoration. Verified results > confident claims.**
