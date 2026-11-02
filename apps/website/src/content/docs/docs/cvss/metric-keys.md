---
title: Base Metric Keys & Severity Ranges
description: Reference tables for CVSS Base metric keys, allowed values, and qualitative severity score ranges across CVSS 4.0, 3.1, 3.0, and 2.0.
---

This page contains the reference tables for the qualitative severity scale and the mandatory Base metric keys for each supported CVSS version.

## Qualitative Severity Ranges

### CVSS v4.0, v3.1, and v3.0

| Rating | Score | Meaning |
| --- | --- | --- |
| None | `0.0` | No security impact on the target system under the tested prerequisites. |
| Low | `0.1-3.9` | Minimal impact, high privileges, or local physical access required. |
| Medium | `4.0-6.9` | Moderate impact, user interaction, or specific conditions needed. |
| High | `7.0-8.9` | Substantial confidentiality, integrity, or availability compromise. |
| Critical | `9.0-10.0` | Remote unauthenticated compromise without user interaction. |

### CVSS v2.0

| Rating | Score | Meaning |
| --- | --- | --- |
| Low | `0.0-3.9` | Minimal impact. Unauthorized information disclosure or local denial of service. |
| Medium | `4.0-6.9` | Moderate impact. Partial disclosure, integrity compromise, or disruption of service. |
| High | `7.0-10.0` | Complete compromise of system integrity, confidentiality, or availability. |

CVSS v2.0 does not define a None or Critical rating.

## Base Metric Keys

Base metric keys and values are case-sensitive. A complete Base vector must include every required metric for the selected CVSS version.

### CVSS v4.0 (11 Base metrics)

| Key | Metric | Allowed values |
| --- | --- | --- |
| `AV` | Attack Vector | `N` Network, `A` Adjacent, `L` Local, `P` Physical |
| `AC` | Attack Complexity | `L` Low, `H` High |
| `AT` | Attack Requirements | `N` None, `P` Present |
| `PR` | Privileges Required | `N` None, `L` Low, `H` High |
| `UI` | User Interaction | `N` None, `P` Passive, `A` Active |
| `VC` | Vulnerable System Confidentiality | `H` High, `L` Low, `N` None |
| `VI` | Vulnerable System Integrity | `H` High, `L` Low, `N` None |
| `VA` | Vulnerable System Availability | `H` High, `L` Low, `N` None |
| `SC` | Subsequent System Confidentiality | `H` High, `L` Low, `N` None |
| `SI` | Subsequent System Integrity | `H` High, `L` Low, `N` None |
| `SA` | Subsequent System Availability | `H` High, `L` Low, `N` None |

### CVSS v3.1 and v3.0 (8 Base metrics)

| Key | Metric | Allowed values |
| --- | --- | --- |
| `AV` | Attack Vector | `N` Network, `A` Adjacent, `L` Local, `P` Physical |
| `AC` | Attack Complexity | `L` Low, `H` High |
| `PR` | Privileges Required | `N` None, `L` Low, `H` High |
| `UI` | User Interaction | `N` None, `R` Required |
| `S` | Scope | `U` Unchanged, `C` Changed |
| `C` | Confidentiality | `N` None, `L` Low, `H` High |
| `I` | Integrity | `N` None, `L` Low, `H` High |
| `A` | Availability | `N` None, `L` Low, `H` High |

### CVSS v2.0 (6 Base metrics)

| Key | Metric | Allowed values |
| --- | --- | --- |
| `AV` | Access Vector | `L` Local, `A` Adjacent Network, `N` Network |
| `AC` | Access Complexity | `H` High, `M` Medium, `L` Low |
| `Au` | Authentication | `M` Multiple, `S` Single, `N` None |
| `C` | Confidentiality Impact | `N` None, `P` Partial, `C` Complete |
| `I` | Integrity Impact | `N` None, `P` Partial, `C` Complete |
| `A` | Availability Impact | `N` None, `P` Partial, `C` Complete |

For full vector syntax and ordering rules, see [Vector String Format & Rules](/docs/cvss/vectors/).
