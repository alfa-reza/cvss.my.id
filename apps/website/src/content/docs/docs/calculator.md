---
title: Full Browser Calculator Guide
description: How to use the CVSS 2.0, 3.0, 3.1, and 4.0 full browser calculator, inline vector editor, session persistence, and on-demand URL sharing.
---

The [CVSS Calculator](https://calc.cvss.my.id/) evaluates vulnerability scores and vectors according to official FIRST specifications across CVSS 4.0, 3.1, 3.0, and 2.0.

## Version Routes

Each CVSS version has a dedicated static route:

- [CVSS v4.0 Calculator](https://calc.cvss.my.id/v4.0) (default route)
- [CVSS v3.1 Calculator](https://calc.cvss.my.id/v3.1)
- [CVSS v3.0 Calculator](https://calc.cvss.my.id/v3.0)
- [CVSS v2.0 Calculator](https://calc.cvss.my.id/v2.0)

## Metric Group Tabs

Instead of rendering dozens of controls in a single vertical wall, each version organizes its metrics into logical tabs:

- **CVSS v4.0**: `Base` (11 required metrics), `Threat` (1 optional metric), `Environmental` (14 optional metrics), `Supplemental` (6 optional contextual metrics).
- **CVSS v3.1 & v3.0**: `Base` (8 required metrics), `Temporal` (3 optional metrics), `Environmental` (11 optional metrics).
- **CVSS v2.0**: `Base` (6 required metrics), `Temporal` (3 optional metrics), `Environmental` (5 optional metrics).

### Hybrid Controls

- **Segmented radio buttons**: Used when a metric has 2 to 4 concise options (such as Attack Vector, Attack Complexity, or Scope). Fully accessible with keyboard arrow keys and visible `:focus-visible` outlines.
- **Native `<select>` dropdowns**: Used when a metric has 5 or more options or verbose labels (such as CVSS v2.0 Target Distribution or Temporal/Environmental overrides with `Not Defined`).

## Incomplete State vs Numeric Score

A score is never shown as `0.0` merely because metrics have not been selected yet.

- While any mandatory Base metric is unselected, the Score Panel displays **`Incomplete`** and lists the exact count of missing Base metrics.
- Once all required Base metrics are selected, the Score Panel immediately computes the overall numeric score, qualitative severity label, active nomenclature (such as `CVSS-B` or `CVSS-BTE` in v4.0), and sub-score breakdown.

## Inline Vector Editor & Out-of-Sync Protection

The **Vector String** input at the top of the workspace is editable at all times:

1. **Valid vector input**: Typing or pasting a valid CVSS vector automatically switches to the matching CVSS version (if needed), updates every metric control across all tabs, and recalculates the score.
2. **Invalid vector draft**: If you mistype a metric code or paste a malformed string, the calculator:
   - Never overwrites or deletes the text you are typing.
   - Displays a specific validation message below the field explaining the exact token or missing metric error.
   - Marks the Score Panel as **Out of Sync (Showing Last Valid Score)** and offers a **Revert Vector Input** button.
   - Disables **Copy Vector**, **Copy Result**, and **Share URL** so you cannot accidentally copy or share an invalid or out-of-sync score.

## Action Buttons

- **Copy Vector**: Copies the canonical CVSS vector string to your clipboard.
- **Copy Result**: Copies a formatted plain-text summary (for example, `CVSS v4.0 Score: 9.3 (Critical) [CVSS-B] - CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`).
- **Share URL**: Generates a canonical URL with `?vector=<encoded-vector>`, updates the address bar via `history.replaceState`, and copies the link to your clipboard. If the Clipboard API is restricted by browser permissions, a selectable fallback input appears automatically.
- **Reset Group**: Resets only the currently open tab (`Threat`, `Temporal`, `Environmental`, or `Supplemental`) back to `Not Defined` (`X` / `ND`), or clears `Base` selections when on the `Base` tab.
- **Reset All**: Clears all metrics and `sessionStorage` draft state for the active CVSS version only.

## Session Persistence & URL Precedence

The calculator stores state per CVSS version in browser `sessionStorage` (`cvss_draft_v1_4.0`, `3.1`, `3.0`, `2.0`):

1. **Shared URL Precedence**: Opening a link containing a valid `?vector=...` query parameter loads that vector immediately and takes precedence over any older `sessionStorage` draft for that version.
2. **Stale Query Removal**: As soon as you edit any metric or modify the vector after loading a shared URL, the calculator strips the stale `?vector=` query parameter from the browser address bar so refreshing the page will not overwrite your new edits.
3. **Draft Preservation**: Refreshing the tab restores both your last valid metric selections and any in-progress raw vector draft. Closing the browser tab clears `sessionStorage`.
