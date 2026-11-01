# DESIGN.md - CVSS.my.id Visual Direction

## Identity & Character
- **Product:** CVSS.my.id (Full browser CVSS 2.0 / 3.0 / 3.1 / 4.0 calculator, reference documentation, and MCP setup hub).
- **Audience:** Security engineers, vulnerability analysts, incident responders, and AI coding-agent users.
- **Visual Language:** Pure Monochrome, dark-first functional minimalism. Precision security reference instrument, not a marketing SaaS landing page.
- **Dial:** `ENERGY 1 / RHYTHM 2 / MOTION 1`
- **Design Read:** Reading this as: security practitioner tool and documentation hub for security engineers and AI coding agents, in a Pure Monochrome functional minimalist style, dial ENERGY 1 / RHYTHM 2 / MOTION 1.

## Color Palette & Contrast Decisions (R-01, R-21, R-25, R-29, R-31)
| Token | Hex | Purpose & One-Line Reason | Contrast vs Surface |
|---|---|---|---|
| `--bg` | `#0C0D0F` | Primary page canvas; dark neutral reduces glare during extended vulnerability triage sessions. | Base canvas |
| `--surface` | `#15171B` | Primary panel and form group surface; separates metric groups and score readout from the page canvas without drop shadows. | 1.09:1 vs `--bg` (paired with border) |
| `--elevated` | `#1D2025` | Interactive control background and hover surface; distinguishes actionable controls from static containers. | 1.18:1 vs `--bg` (paired with `--border-control`) |
| `--border` | `#30343B` | Structural section divider; provides low-emphasis visual grouping between non-interactive regions. | Decorative / structural divider |
| `--border-control` | `#68707E` | Interactive component border; guarantees >= 3.27:1 non-text contrast (WCAG 1.4.11) across `--bg`, `--surface`, and `--elevated`. | 3.90:1 (`--bg`), 3.60:1 (`--surface`), 3.27:1 (`--elevated`) |
| `--fg` | `#E8EAED` | Primary text and active control fill; provides high-contrast legibility (16.13:1 on `--bg`). | 16.13:1 (`--bg`), 14.90:1 (`--surface`) |
| `--muted` | `#A9ADB4` | Secondary labels, abbreviations, and help text; maintains comfortable reading hierarchy while exceeding WCAG AA (7.25:1+ on all surfaces). | 8.63:1 (`--bg`), 7.97:1 (`--surface`), 7.25:1 (`--elevated`) |
| `--focus-ring` | `#93C5FD` | Keyboard `:focus-visible` outline; distinct from monochrome selection state so focus and selection never look identical (9.95:1 on `--surface`). | 9.95:1 (`--surface`) |

### Semantic Severity Scale (Only Color Exception)
Severity colors are always paired with explicit text labels (`None`, `Low`, `Medium`, `High`, `Critical`):
- `--sev-none`: `#A9ADB4` (7.97:1 on `--surface`) - Zero severity / informational score `0.0`.
- `--sev-low`: `#4ADE80` (10.30:1 on `--surface`) - Low severity range.
- `--sev-medium`: `#FACC15` (11.72:1 on `--surface`) - Medium severity range.
- `--sev-high`: `#FB923C` (7.93:1 on `--surface`) - High severity range.
- `--sev-critical`: `#F87171` (6.49:1 on `--surface`) - Critical severity range (CVSS v3.x and v4.0 only; CVSS v2.0 has no Critical tier).

## One-Line Reasons for Major Design Decisions (R-31)
- **Why this color palette?** Pure monochrome dark surfaces keep visual focus on metric selection and only introduce color where it encodes CVSS severity or keyboard focus.
- **Why this typography?** System sans-serif (`system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`) and system monospace (`ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, monospace`) eliminate external font network requests while giving vector strings crisp character alignment.
- **Why this layout?** The homepage uses a single-column technical index divided into six focused utility sections, and the calculator uses a two-column split (`62%` metric workspace / `38%` sticky score panel on desktop, stacked on mobile) so the live vector and score stay visible while scrolling long Environmental forms.
- **Why this spacing?** A strict `4px / 8px / 12px / 16px / 24px / 32px / 48px` scale aligns dense metric controls on mobile (`>= 44px` tap targets) without wasting vertical viewport space.
- **Why use bordered panels instead of decorative cards?** Thin `1px` structural borders group related CVSS sub-metrics and MCP transport options without floating shadows or SaaS marketing card grids.
- **Why no illustrations or decorative icons?** Vulnerability scoring is a deterministic mathematical task where text labels and official metric abbreviations (`AV:N`, `AC:L`) communicate faster and more accurately than icons.
- **Identity motif:** Tabular monospace key-value badges (`[AV:N]`, `[CVSS:4.0]`, `[STDIO]`) and crisp 1px hairline grid dividers repeated across the homepage, calculator controls, and documentation tables.
