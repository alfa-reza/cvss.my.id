---
title: Referensi Alat MCP
description: Parameter masukan, format respons, dan contoh panggilan untuk alat MCP calculate_cvss.
---

Server Lokal (`stdio`) dan Jarak Jauh (Streamable HTTP) sama-sama menyediakan alat **`calculate_cvss`** untuk menghitung **Base Score** pada CVSS v4.0, v3.1, v3.0, dan v2.0.

## Nama Alat: `calculate_cvss`

Menghitung CVSS Base Score dan peringkat tingkat keparahan kualitatif untuk satu vector. Tentukan versi CVSS-nya secara eksplisit.

### Skema Masukan

`calculate_cvss` memerlukan dua bidang: `version` spesifikasi CVSS dan string `vector` **khusus Base** yang lengkap dan peka huruf besar-kecil:

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

### Contoh Panggilan

**Argumen Alat:**

```json
{
  "version": "3.1",
  "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
}
```

**Respons Alat:**

```json
{
  "version": "3.1",
  "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
  "score": 9.8,
  "severity": "Critical"
}
```

### Contoh pada Berbagai Versi CVSS

#### CVSS v4.0

**Argumen Alat:**

```json
{
  "version": "4.0",
  "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N"
}
```

**Respons Alat:**

```json
{
  "version": "4.0",
  "vector": "CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N",
  "score": 9.3,
  "severity": "Critical"
}
```

#### CVSS v2.0

**Argumen Alat:**

```json
{
  "version": "2.0",
  "vector": "AV:N/AC:L/Au:N/C:P/I:P/A:P"
}
```

**Respons Alat:**

```json
{
  "version": "2.0",
  "vector": "AV:N/AC:L/Au:N/C:P/I:P/A:P",
  "score": 7.5,
  "severity": "High"
}
```

## Catatan Cakupan Penting

- **Base Score Saja**: `calculate_cvss` mengevaluasi kelompok metrik Base. Jika Anda memerlukan metrik Threat (`E`), Temporal (`E, RL, RC`), Environmental (`CR, IR, AR`, Modified Base), atau Supplemental, gunakan [Kalkulator Browser Lengkap](https://cvss.my.id/calculator/).
- **Tanpa Pencarian Database CVE**: `calculate_cvss` menghitung skor matematis dari vector string CVSS. Alat ini tidak melakukan kueri ke NVD atau feed CVE eksternal.
