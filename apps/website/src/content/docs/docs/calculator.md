---
title: Full Browser Calculator Guide
description: How to use the CVSS 2.0, 3.0, 3.1, and 4.0 full browser calculator, hybrid controls, inline vector editor, and result export.
---

The [CVSS Calculator](https://cvss.my.id/calculator/) evaluates vulnerability scores and vectors according to official FIRST specifications across CVSS 4.0, 3.1, 3.0, and 2.0.

## Version Routes

Each CVSS version has a dedicated static route:

- [CVSS v4.0 Calculator](https://cvss.my.id/calculator/v4.0) (default route)
- [CVSS v3.1 Calculator](https://cvss.my.id/calculator/v3.1)
- [CVSS v3.0 Calculator](https://cvss.my.id/calculator/v3.0)
- [CVSS v2.0 Calculator](https://cvss.my.id/calculator/v2.0)

## Metric Group Tabs

Instead of rendering dozens of controls in a single vertical wall, each version organizes its metrics into logical tabs:

- **CVSS v4.0**: `Base` (11 required metrics), `Threat` (1 optional metric), `Environmental` (14 optional metrics), `Supplemental` (6 optional contextual metrics).
- **CVSS v3.1 & v3.0**: `Base` (8 required metrics), `Temporal` (3 optional metrics), `Environmental` (11 optional metrics).
- **CVSS v2.0**: `Base` (6 required metrics), `Temporal` (3 optional metrics), `Environmental` (5 optional metrics).

### Hybrid Controls

- **Segmented radio buttons**: Used when a metric has 2 to 4 concise options (such as Attack Vector, Attack Complexity, or Scope). Supports keyboard selection and visible `:focus-visible` outlines.
- **Native `<select>` dropdowns**: Used when a metric has 5 or more options or verbose labels (such as CVSS v2.0 Target Distribution or Temporal/Environmental overrides with `Not Defined`).

## Incomplete State vs Numeric Score

A score is never shown as `0.0` merely because metrics have not been selected yet.

- While any mandatory Base metric is unselected, the Score Panel displays **`Incomplete`** and lists the exact count of missing Base metrics.
- Once all required Base metrics are selected, the Score Panel immediately computes the overall numeric score, qualitative severity label, active nomenclature (such as `CVSS-B` or `CVSS-BTE` in v4.0), and sub-score breakdown.

## Score Panel

The score panel appears above the metrics on mobile and beside them on desktop. It shows a score gauge, the qualitative severity rating, a 0-10 scale, and version-appropriate sub-scores: Impact and Exploitability for CVSS v2.0 and v3.x, and Base and Nomenclature for CVSS v4.0. The panel updates automatically as metric values change.

- **Share**: Copies a link containing the current canonical vector.
- **Show explanations**: Hides or shows the metric descriptions and the help text for the selected value.
- **Severity Levels**: The section below the calculator lists the qualitative rating bands for the active CVSS version.

## Inline Vector Editor & Out-of-Sync Protection

The **Vector String** input at the top of the workspace is editable at all times:

1. **Valid vector input**: Typing or pasting a valid vector for the current version updates metric controls across all tabs and recalculates the score. For a vector from another version, follow the link shown to open its calculator.
2. **Invalid vector draft**: If you mistype a metric code or paste a malformed string, the calculator:
   - Never overwrites or deletes the text you are typing.
   - Displays a specific validation message below the field explaining the exact token or missing metric error.
   - Marks the Score Panel as **Out of Sync (Showing Last Valid Score)** and offers a **Revert Vector Input** button.
   - Disables **Copy Vector** and **Copy Result** so you cannot accidentally copy an invalid or out-of-sync score.

## Action Buttons

- **Copy Vector**: Copies the canonical CVSS vector string to your clipboard.
- **Copy Result**: Copies a formatted plain-text summary (for example, `CVSS v4.0 Score: 9.3 (Critical) [CVSS-B] - CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`).
- **Reset Group**: Resets only the currently open tab (`Threat`, `Temporal`, `Environmental`, or `Supplemental`) back to `Not Defined` (`X` / `ND`), or clears `Base` selections when on the `Base` tab.
- **Reset All**: Clears all metrics and restores the default state for the active CVSS version.

## Reference Tables

Qualitative severity ranges and the mandatory Base metric keys for each supported version are documented in [Base Metric Keys & Severity Ranges](/docs/cvss/metric-keys/).
