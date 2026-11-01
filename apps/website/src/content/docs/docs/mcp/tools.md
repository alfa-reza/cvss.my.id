---
title: MCP Tool Reference
description: Input parameters, response format, and example calls for the calculate_cvss MCP tool.
---

Both the Local (`stdio`) and Remote (Streamable HTTP) servers expose the **`calculate_cvss`** tool for computing **Base Scores** across CVSS v4.0, v3.1, v3.0, and v2.0.

## Tool Name: `calculate_cvss`

Calculates the CVSS Base Score and qualitative severity rating for one or more CVSS vector strings. Automatically detects CVSS v2.0, v3.0, v3.1, and v4.0 formats.

### Input Schema

You can pass either a single `vector` string or an array of `vectors` for batch Base Score calculation:

```json
{
  "type": "object",
  "properties": {
    "vector": {
      "type": "string",
      "description": "A single CVSS vector string (v2.0, v3.0, v3.1, or v4.0). Use this for single calculations."
    },
    "vectors": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "A list of CVSS vector strings for batch processing."
    }
  }
}
```

### Example Single Vector Call

**Tool Arguments:**

```json
{
  "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N"
}
```

**Tool Response:**

```json
[
  {
    "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N",
    "version": "4.0",
    "score": 9.3,
    "severity": "CRITICAL"
  }
]
```

### Example Batch Call Across Versions

**Tool Arguments:**

```json
{
  "vectors": [
    "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N",
    "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N",
    "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
    "AV:N/AC:L/Au:N/C:P/I:P/A:P"
  ]
}
```

**Tool Response:**

```json
[
  {
    "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N",
    "version": "4.0",
    "score": 9.3,
    "severity": "CRITICAL"
  },
  {
    "vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N",
    "version": "3.1",
    "score": 5.4,
    "severity": "MEDIUM"
  },
  {
    "vector": "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
    "version": "3.0",
    "score": 10.0,
    "severity": "CRITICAL"
  },
  {
    "vector": "AV:N/AC:L/Au:N/C:P/I:P/A:P",
    "version": "2.0",
    "score": 7.5,
    "severity": "HIGH"
  }
]
```

## Important Scope Notes

- **Base Score Only**: `calculate_cvss` evaluates the Base metric group. If you need Threat (`E`), Temporal (`E, RL, RC`), Environmental (`CR, IR, AR`, Modified Base), or Supplemental metrics, use the [Full Browser Calculator](https://calc.cvss.my.id/).
- **No CVE Database Lookup**: `calculate_cvss` computes mathematical scores from CVSS vector strings. It does not query NVD or external CVE feeds.
