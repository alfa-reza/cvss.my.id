---
title: Vector String Format
description: Syntax, canonical metric ordering, prefix rules, and validation checks for CVSS v4.0, v3.1, v3.0, and v2.0 vector strings.
---

A CVSS vector string is a compact, machine-readable text representation of the metric values selected for a vulnerability. Both the [full browser calculator](https://calc.cvss.my.id/) and the MCP server (`cvss-calculator-mcp`) validate vectors against the official FIRST specifications.

## Structure by Version

### CVSS v4.0

- **Prefix**: `CVSS:4.0/`
- **Mandatory Base order** (11 metrics): `AV, AC, AT, PR, UI, VC, VI, VA, SC, SI, SA`
- **Optional Threat order**: `E`
- **Optional Environmental order**: `CR, IR, AR, MAV, MAC, MAT, MPR, MUI, MVC, MVI, MVA, MSC, MSI, MSA`
- **Optional Supplemental order**: `S, AU, R, V, RE, U`
- **Canonical Serialization Rule**: Mandatory Base metrics are always present in exact order. Optional metrics set to `X` (`Not Defined`) are omitted from the serialized canonical vector string.

Example canonical v4.0 vector:

```text
CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/E:P/CR:H/MAV:A/S:P/AU:Y/U:Red
```

### CVSS v3.1 and v3.0

- **Prefix**: `CVSS:3.1/` or `CVSS:3.0/`
- **Mandatory Base order** (8 metrics): `AV, AC, PR, UI, S, C, I, A`
- **Optional Temporal order**: `E, RL, RC`
- **Optional Environmental order**: `CR, IR, AR, MAV, MAC, MPR, MUI, MS, MC, MI, MA`
- **Canonical Serialization Rule**: Mandatory Base metrics are always emitted; optional metrics with value `X` are omitted.

Example canonical v3.1 vector:

```text
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H/E:F/RL:O/RC:C
```

### CVSS v2.0

- **Prefix**: None. (Parentheses around the vector such as `(AV:N/AC:L/Au:N/C:P/I:P/A:P)` are accepted by the parser and normalized to bare `AV:N/...` format.)
- **Mandatory Base order** (6 metrics): `AV, AC, Au, C, I, A`
- **Optional Temporal order**: `E, RL, RC`
- **Optional Environmental order**: `CDP, TD, CR, IR, AR`
- **Canonical Serialization Rule**: Mandatory Base metrics are always emitted; optional metrics with value `ND` are omitted.

Example canonical v2.0 vector:

```text
AV:N/AC:L/Au:N/C:C/I:C/A:C/E:F/RL:OF/RC:C
```

## Validation Errors Caught by the Parser

Our parser rejects malformed vectors with explicit, actionable error messages:

1. **Unrecognized or missing version prefix**: e.g., `CVSS:5.0/...` or missing `AV:` in v2.0.
2. **Duplicate metric keys**: e.g., specifying `AV:N` and `AV:L` in the same string.
3. **Unknown metric abbreviation**: e.g., using `Au` inside a v3.1 vector or `S` inside a v2.0 vector.
4. **Invalid metric value**: e.g., `AV:X` on a mandatory Base metric or `UI:R` in a v4.0 vector (where v4.0 uses `UI:P` or `UI:A`).
5. **Incomplete Base group**: Any vector missing one or more mandatory Base metrics for its version.
