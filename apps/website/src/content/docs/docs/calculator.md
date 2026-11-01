---
title: Full Browser Calculator Guide
description: How to use the CVSS 2.0, 3.0, 3.1, and 4.0 full browser calculator, hybrid controls, inline vector editor, and result export.
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
   - Disables **Copy Vector** and **Copy Result** so you cannot accidentally copy an invalid or out-of-sync score.

## Action Buttons

- **Copy Vector**: Copies the canonical CVSS vector string to your clipboard.
- **Copy Result**: Copies a formatted plain-text summary (for example, `CVSS v4.0 Score: 9.3 (Critical) [CVSS-B] - CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N`).
- **Reset Group**: Resets only the currently open tab (`Threat`, `Temporal`, `Environmental`, or `Supplemental`) back to `Not Defined` (`X` / `ND`), or clears `Base` selections when on the `Base` tab.
- **Reset All**: Clears all metrics and restores the default state for the active CVSS version.

## Built-in Reference Panes

Each calculator route includes dedicated reference panes located directly beneath the scoring workspace:

- **Qualitative Severity Scale & Ranges**: Outlines score threshold bands for the active specification (None, Low, Medium, High, and Critical for CVSS v3/v4; Low, Medium, and High for CVSS v2.0).
- **Base Metric Keys Reference**: Lists the key shorthand, metric name, and allowed values for every mandatory Base metric in the selected version.
