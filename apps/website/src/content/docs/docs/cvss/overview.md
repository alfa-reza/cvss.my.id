---
title: CVSS Version Comparison
description: Technical comparison of CVSS v4.0, v3.1, v3.0, and v2.0 metric groups, scoring models, and qualitative severity ratings.
---

The Common Vulnerability Scoring System (CVSS) has evolved across four major versions maintained by FIRST.Org. Because each version uses distinct metrics, equations, and rounding rules, scores from one version cannot be directly translated into another via a simple linear formula.

## Side-by-Side Overview

| Feature | CVSS v4.0 (2023) | CVSS v3.1 (2019) | CVSS v3.0 (2015) | CVSS v2.0 (2007) |
| --- | --- | --- | --- | --- |
| **Vector Prefix** | `CVSS:4.0/` | `CVSS:3.1/` | `CVSS:3.0/` | None (e.g. `AV:N/AC:L/...`) |
| **Mandatory Base Metrics** | 11 (`AV, AC, AT, PR, UI, VC, VI, VA, SC, SI, SA`) | 8 (`AV, AC, PR, UI, S, C, I, A`) | 8 (`AV, AC, PR, UI, S, C, I, A`) | 6 (`AV, AC, Au, C, I, A`) |
| **Time / Threat Group** | **Threat** (`E`) | **Temporal** (`E, RL, RC`) | **Temporal** (`E, RL, RC`) | **Temporal** (`E, RL, RC`) |
| **Environmental Group** | `CR, IR, AR` + 11 Modified Base (`MAV..MSA`, including `S` on `MSI`/`MSA`) | `CR, IR, AR` + 8 Modified Base (`MAV..MA`) | `CR, IR, AR` + 8 Modified Base (`MAV..MA`) | `CDP, TD, CR, IR, AR` |
| **Supplemental Group** | Yes (`S, AU, R, V, RE, U`) - does not alter numeric score | No | No | No |
| **Cross-System Impact** | Explicit Vulnerable (`VC/VI/VA`) vs Subsequent (`SC/SI/SA`) metrics | Single binary `Scope` (`S:U` / `S:C`) | Single binary `Scope` (`S:U` / `S:C`) | Not modeled |
| **Prerequisite Conditions** | Dedicated `Attack Requirements` (`AT:N` / `AT:P`) | Folded into `Attack Complexity` (`AC`) | Folded into `Attack Complexity` (`AC`) | Folded into `Access Complexity` (`AC`) |
| **User Interaction** | 3 levels (`None`, `Passive`, `Active`) | 2 levels (`None`, `Required`) | 2 levels (`None`, `Required`) | Folded into `AC` |
| **Scoring Algorithm** | MacroVector equivalence classes (`eq1..eq6`) + lookup + severity distance interpolation | Algebraic Impact & Exploitability sub-formulas with `Roundup` | Algebraic Impact & Exploitability sub-formulas with `Roundup` | Algebraic Base, Temporal, and Environmental equations with standard 1-decimal rounding |
| **Severity Scale** | `None`, `Low`, `Medium`, `High`, `Critical` | `None`, `Low`, `Medium`, `High`, `Critical` | `None`, `Low`, `Medium`, `High`, `Critical` | `Low`, `Medium`, `High` (**no `None` or `Critical`**) |

## Qualitative Severity Rating Scales

### CVSS v4.0, v3.1, and v3.0

| Severity Rating | Score Range |
| --- | --- |
| **None** | `0.0` |
| **Low** | `0.1 - 3.9` |
| **Medium** | `4.0 - 6.9` |
| **High** | `7.0 - 8.9` |
| **Critical** | `9.0 - 10.0` |

### CVSS v2.0

CVSS v2.0 defines only three qualitative severity levels in the official FIRST v2 guide:

| Severity Rating | Score Range |
| --- | --- |
| **Low** | `0.0 - 3.9` |
| **Medium** | `4.0 - 6.9` |
| **High** | `7.0 - 10.0` |

Never assign a `Critical` or `None` severity label to a CVSS v2.0 score.
