---
title: MCP Tool Reference
description: Input parameters, response format, and example calls for the calculate_cvss MCP tool.
---

Both the Local (`stdio`) and Remote (Streamable HTTP) servers expose the **`calculate_cvss`** tool for computing **Base Scores** across CVSS v4.0, v3.1, v3.0, and v2.0.

## Tool Name: `calculate_cvss`

Calculates the CVSS Base Score and qualitative severity rating for one or more CVSS vector strings. Automatically detects CVSS v2.0, v3.0, v3.1, and v4.0 formats.

### Input Schema

`calculate_cvss` requires two fields: the CVSS specification `version` and a complete, case-sensitive **Base-only** `vector` string:

```json
{
  "type": "object",
  "properties": {
    "version": {
      "type": "string",
      "enum": ["2.0", "3.0", "3.1", "4.0"],
      "description": "CVSS specification version (2.0, 3.0, 3.1, or 4.0)."
    },
    "vector": {
      "type": "string",
      "description": "A complete, case-sensitive CVSS Base vector string."
    }
  },
  "required": ["version", "vector"]
}
```

### Example Call

**Tool Arguments:**

```json
{
  "version": "3.1",
  "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
}
```

**Tool Response:**

```json
{
  "version": "3.1",
  "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
  "score": 9.8,
  "severity": "Critical"
}
```

### Example Across CVSS Versions

#### CVSS v4.0

**Tool Arguments:**

```json
{
  "version": "4.0",
  "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N"
}
```

**Tool Response:**

```json
{
  "version": "4.0",
  "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N",
  "score": 9.3,
  "severity": "Critical"
}
```

#### CVSS v2.0

**Tool Arguments:**

```json
{
  "version": "2.0",
  "vector": "AV:N/AC:L/Au:N/C:P/I:P/A:P"
}
```

**Tool Response:**

```json
{
  "version": "2.0",
  "vector": "AV:N/AC:L/Au:N/C:P/I:P/A:P",
  "score": 7.5,
  "severity": "High"
}
```

## Important Scope Notes

- **Base Score Only**: `calculate_cvss` evaluates the Base metric group. If you need Threat (`E`), Temporal (`E, RL, RC`), Environmental (`CR, IR, AR`, Modified Base), or Supplemental metrics, use the [Full Browser Calculator](https://calc.cvss.my.id/).
- **No CVE Database Lookup**: `calculate_cvss` computes mathematical scores from CVSS vector strings. It does not query NVD or external CVE feeds.
