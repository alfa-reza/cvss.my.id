---
title: Format Vector String
description: Sintaks, urutan metrik kanonis, aturan awalan, dan pemeriksaan validasi untuk vector string CVSS v4.0, v3.1, v3.0, dan v2.0.
---

Vector string CVSS adalah representasi teks ringkas dan terbaca mesin dari nilai metrik yang dipilih untuk suatu kerentanan. [Kalkulator browser lengkap](https://cvss.my.id/calculator/) dan server MCP (`cvss-calculator-mcp`) sama-sama memvalidasi vector terhadap spesifikasi resmi FIRST.

## Struktur per Versi

### CVSS v4.0

- **Awalan**: `CVSS:4.0/`
- **Urutan Base wajib** (11 metrik): `AV, AC, AT, PR, UI, VC, VI, VA, SC, SI, SA`
- **Urutan Threat opsional**: `E`
- **Urutan Environmental opsional**: `CR, IR, AR, MAV, MAC, MAT, MPR, MUI, MVC, MVI, MVA, MSC, MSI, MSA`
- **Urutan Supplemental opsional**: `S, AU, R, V, RE, U`
- **Aturan Serialisasi Kanonis**: Metrik Base wajib selalu ada dalam urutan tepat. Metrik opsional yang diatur ke `X` (`Not Defined`) dihilangkan dari vector string kanonis yang diserialisasi.

Contoh vector v4.0 kanonis:

```text
CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/E:P/CR:H/MAV:A/S:P/AU:Y/U:Red
```

### CVSS v3.1 dan v3.0

- **Awalan**: `CVSS:3.1/` atau `CVSS:3.0/`
- **Urutan Base wajib** (8 metrik): `AV, AC, PR, UI, S, C, I, A`
- **Urutan Temporal opsional**: `E, RL, RC`
- **Urutan Environmental opsional**: `CR, IR, AR, MAV, MAC, MPR, MUI, MS, MC, MI, MA`
- **Aturan Serialisasi Kanonis**: Metrik Base wajib selalu disertakan; metrik opsional bernilai `X` dihilangkan.

Contoh vector v3.1 kanonis:

```text
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H/E:F/RL:O/RC:C
```

### CVSS v2.0

- **Awalan**: Tidak ada. (Tanda kurung di sekitar vector seperti `(AV:N/AC:L/Au:N/C:P/I:P/A:P)` diterima oleh parser dan dinormalisasi ke format `AV:N/...` tanpa tanda kurung.)
- **Urutan Base wajib** (6 metrik): `AV, AC, Au, C, I, A`
- **Urutan Temporal opsional**: `E, RL, RC`
- **Urutan Environmental opsional**: `CDP, TD, CR, IR, AR`
- **Aturan Serialisasi Kanonis**: Metrik Base wajib selalu disertakan; metrik opsional bernilai `ND` dihilangkan.

Contoh vector v2.0 kanonis:

```text
AV:N/AC:L/Au:N/C:C/I:C/A:C/E:F/RL:OF/RC:C
```

## Galat Validasi yang Ditangkap Parser

Parser kami menolak vector yang cacat dengan pesan galat yang eksplisit dan dapat ditindaklanjuti:

1. **Awalan versi tidak dikenal atau hilang**: misalnya `CVSS:5.0/...` atau `AV:` yang hilang pada v2.0.
2. **Kunci metrik duplikat**: misalnya menentukan `AV:N` dan `AV:L` dalam string yang sama.
3. **Singkatan metrik tidak dikenal**: misalnya menggunakan `Au` di dalam vector v3.1 atau `S` di dalam vector v2.0.
4. **Nilai metrik tidak valid**: misalnya `AV:X` pada metrik Base wajib atau `UI:R` pada vector v4.0 (v4.0 menggunakan `UI:P` atau `UI:A`).
5. **Kelompok Base tidak lengkap**: Vector apa pun yang kehilangan satu atau lebih metrik Base wajib untuk versinya.
