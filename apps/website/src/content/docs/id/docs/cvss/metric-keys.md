---
title: Kunci Metrik Base dan Rentang Tingkat Keparahan
description: Tabel referensi untuk kunci metrik Base CVSS, nilai yang diizinkan, dan rentang skor tingkat keparahan kualitatif pada CVSS 4.0, 3.1, 3.0, dan 2.0.
---

Halaman ini berisi tabel referensi untuk skala tingkat keparahan kualitatif dan kunci metrik Base wajib pada setiap versi CVSS yang didukung.

## Rentang Tingkat Keparahan Kualitatif

### CVSS v4.0, v3.1, dan v3.0

| Peringkat | Skor | Arti |
| --- | --- | --- |
| None | `0.0` | Tidak ada dampak keamanan pada sistem target berdasarkan prasyarat yang diuji. |
| Low | `0.1-3.9` | Dampak minimal, memerlukan hak istimewa tinggi, atau akses fisik lokal. |
| Medium | `4.0-6.9` | Dampak sedang, memerlukan interaksi pengguna, atau kondisi tertentu. |
| High | `7.0-8.9` | Kompromi kerahasiaan, integritas, atau ketersediaan yang substansial. |
| Critical | `9.0-10.0` | Kompromi jarak jauh tanpa autentikasi dan tanpa interaksi pengguna. |

### CVSS v2.0

| Peringkat | Skor | Arti |
| --- | --- | --- |
| Low | `0.0-3.9` | Dampak minimal. Pengungkapan informasi tanpa izin atau denial of service lokal. |
| Medium | `4.0-6.9` | Dampak sedang. Pengungkapan sebagian, kompromi integritas, atau gangguan layanan. |
| High | `7.0-10.0` | Kompromi total pada integritas, kerahasiaan, atau ketersediaan sistem. |

CVSS v2.0 tidak mendefinisikan peringkat None atau Critical.

## Kunci Metrik Base

Kunci dan nilai metrik Base peka huruf besar-kecil. Vector Base yang lengkap harus menyertakan setiap metrik wajib untuk versi CVSS yang dipilih.

### CVSS v4.0 (11 metrik Base)

| Kunci | Metrik | Nilai yang diizinkan |
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

### CVSS v3.1 dan v3.0 (8 metrik Base)

| Kunci | Metrik | Nilai yang diizinkan |
| --- | --- | --- |
| `AV` | Attack Vector | `N` Network, `A` Adjacent, `L` Local, `P` Physical |
| `AC` | Attack Complexity | `L` Low, `H` High |
| `PR` | Privileges Required | `N` None, `L` Low, `H` High |
| `UI` | User Interaction | `N` None, `R` Required |
| `S` | Scope | `U` Unchanged, `C` Changed |
| `C` | Confidentiality | `N` None, `L` Low, `H` High |
| `I` | Integrity | `N` None, `L` Low, `H` High |
| `A` | Availability | `N` None, `L` Low, `H` High |

### CVSS v2.0 (6 metrik Base)

| Kunci | Metrik | Nilai yang diizinkan |
| --- | --- | --- |
| `AV` | Access Vector | `L` Local, `A` Adjacent Network, `N` Network |
| `AC` | Access Complexity | `H` High, `M` Medium, `L` Low |
| `Au` | Authentication | `M` Multiple, `S` Single, `N` None |
| `C` | Confidentiality Impact | `N` None, `P` Partial, `C` Complete |
| `I` | Integrity Impact | `N` None, `P` Partial, `C` Complete |
| `A` | Availability Impact | `N` None, `P` Partial, `C` Complete |

Untuk sintaks vector lengkap dan aturan urutan, lihat [Format dan Aturan Vector String](/id/docs/cvss/vectors/).
