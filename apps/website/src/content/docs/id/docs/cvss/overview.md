---
title: Perbandingan Versi CVSS
description: Perbandingan teknis kelompok metrik, model penilaian, dan peringkat tingkat keparahan kualitatif CVSS v4.0, v3.1, v3.0, dan v2.0.
---

Common Vulnerability Scoring System (CVSS) telah berkembang melalui empat versi utama yang dikelola oleh FIRST.Org. Karena setiap versi menggunakan metrik, persamaan, dan aturan pembulatan yang berbeda, skor dari satu versi tidak dapat langsung diterjemahkan ke versi lain dengan rumus linear sederhana.

## Ikhtisar Berdampingan

| Fitur | CVSS v4.0 (2023) | CVSS v3.1 (2019) | CVSS v3.0 (2015) | CVSS v2.0 (2007) |
| --- | --- | --- | --- | --- |
| **Awalan Vector** | `CVSS:4.0/` | `CVSS:3.1/` | `CVSS:3.0/` | Tidak ada (mis. `AV:N/AC:L/...`) |
| **Metrik Base Wajib** | 11 (`AV, AC, AT, PR, UI, VC, VI, VA, SC, SI, SA`) | 8 (`AV, AC, PR, UI, S, C, I, A`) | 8 (`AV, AC, PR, UI, S, C, I, A`) | 6 (`AV, AC, Au, C, I, A`) |
| **Kelompok Waktu / Threat** | **Threat** (`E`) | **Temporal** (`E, RL, RC`) | **Temporal** (`E, RL, RC`) | **Temporal** (`E, RL, RC`) |
| **Kelompok Environmental** | `CR, IR, AR` + 11 Modified Base (`MAV..MSA`, termasuk `S` pada `MSI`/`MSA`) | `CR, IR, AR` + 8 Modified Base (`MAV..MA`) | `CR, IR, AR` + 8 Modified Base (`MAV..MA`) | `CDP, TD, CR, IR, AR` |
| **Kelompok Supplemental** | Ya (`S, AU, R, V, RE, U`), tidak mengubah skor numerik | Tidak | Tidak | Tidak |
| **Dampak Lintas Sistem** | Metrik eksplisit untuk Sistem Rentan (`VC/VI/VA`) dan Sistem Berikutnya (`SC/SI/SA`) | `Scope` biner tunggal (`S:U` / `S:C`) | `Scope` biner tunggal (`S:U` / `S:C`) | Tidak dimodelkan |
| **Kondisi Prasyarat** | Metrik khusus `Attack Requirements` (`AT:N` / `AT:P`) | Dilipat ke `Attack Complexity` (`AC`) | Dilipat ke `Attack Complexity` (`AC`) | Dilipat ke `Access Complexity` (`AC`) |
| **User Interaction** | 3 tingkat (`None`, `Passive`, `Active`) | 2 tingkat (`None`, `Required`) | 2 tingkat (`None`, `Required`) | Dilipat ke `AC` |
| **Algoritma Penilaian** | Kelas ekuivalensi MacroVector (`eq1..eq6`) + pencarian tabel + interpolasi jarak tingkat keparahan | Sub-rumus aljabar Impact dan Exploitability dengan `Roundup` | Sub-rumus aljabar Impact dan Exploitability dengan `Roundup` | Persamaan aljabar Base, Temporal, dan Environmental dengan pembulatan 1 desimal standar |
| **Skala Tingkat Keparahan** | `None`, `Low`, `Medium`, `High`, `Critical` | `None`, `Low`, `Medium`, `High`, `Critical` | `None`, `Low`, `Medium`, `High`, `Critical` | `Low`, `Medium`, `High` (**tanpa `None` atau `Critical`**) |

## Skala Peringkat Tingkat Keparahan Kualitatif

### CVSS v4.0, v3.1, dan v3.0

| Peringkat | Rentang Skor |
| --- | --- |
| **None** | `0.0` |
| **Low** | `0.1 - 3.9` |
| **Medium** | `4.0 - 6.9` |
| **High** | `7.0 - 8.9` |
| **Critical** | `9.0 - 10.0` |

### CVSS v2.0

CVSS v2.0 hanya mendefinisikan tiga tingkat keparahan kualitatif dalam panduan resmi FIRST v2:

| Peringkat | Rentang Skor |
| --- | --- |
| **Low** | `0.0 - 3.9` |
| **Medium** | `4.0 - 6.9` |
| **High** | `7.0 - 10.0` |

Jangan pernah memberikan label tingkat keparahan `Critical` atau `None` pada skor CVSS v2.0.
