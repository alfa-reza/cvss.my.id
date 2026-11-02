---
title: Glosarium Metrik CVSS
description: Kunci metrik, definisi bahasa sederhana, dan nilai yang diizinkan untuk CVSS 4.0, 3.1, 3.0, dan 2.0.
---

Gunakan glosarium ini untuk mencari kunci metrik dan nilai yang diizinkan dalam vector CVSS. Definisi di sini adalah deskripsi kerja yang ringkas, bukan pengganti spesifikasi resmi FIRST.

Gunakan pencarian dokumentasi (Ctrl+K) untuk menemukan kunci metrik seperti `AV`, `PR`, atau `CR`.

## Singkatan umum

| Kunci | Metrik | Digunakan pada |
| --- | --- | --- |
| `AV` | Attack Vector (Access Vector pada v2.0) | v2.0, v3.0, v3.1, v4.0 |
| `AC` | Attack Complexity (Access Complexity pada v2.0) | v2.0, v3.0, v3.1, v4.0 |
| `PR` | Privileges Required | v3.0, v3.1, v4.0 |
| `UI` | User Interaction | v3.0, v3.1, v4.0 |
| `S` | Scope | v3.0, v3.1 |
| `C` / `I` / `A` | Confidentiality / Integrity / Availability impact | v2.0, v3.0, v3.1, v4.0* |
| `Au` | Authentication | v2.0 |
| `AT` | Attack Requirements | v4.0 |

\* CVSS v4.0 menggunakan `VC`/`VI`/`VA` untuk sistem rentan dan `SC`/`SI`/`SA` untuk sistem berikutnya.

## CVSS v4.0

CVSS v4.0 memisahkan dampak antara sistem rentan dan sistem berikutnya, serta menambahkan kelompok Threat, Environmental, dan Supplemental.

### Metrik Base

- **`AV` Attack Vector**: Mencerminkan konteks yang memungkinkan eksploitasi kerentanan. Nilai yang diizinkan: `N` Network, `A` Adjacent, `L` Local, `P` Physical.
- **`AC` Attack Complexity**: Menangkap tindakan terukur yang harus dilakukan penyerang untuk secara aktif menghindari atau melewati kondisi peningkatan keamanan bawaan. Nilai yang diizinkan: `L` Low, `H` High.
- **`AT` Attack Requirements**: Menangkap kondisi atau variabel penyebaran dan eksekusi prasyarat pada sistem rentan yang memungkinkan serangan. Nilai yang diizinkan: `N` None, `P` Present.
- **`PR` Privileges Required**: Menjelaskan tingkat hak istimewa yang harus dimiliki penyerang sebelum berhasil mengeksploitasi kerentanan. Nilai yang diizinkan: `N` None, `L` Low, `H` High.
- **`UI` User Interaction**: Menangkap kebutuhan akan partisipasi pengguna manusia selain penyerang agar kompromi berhasil. Nilai yang diizinkan: `N` None, `P` Passive, `A` Active.
- **`VC` Vulnerable System Confidentiality**: Mengukur dampak pada kerahasiaan informasi yang dikelola Sistem Rentan. Nilai yang diizinkan: `H` High, `L` Low, `N` None.
- **`VI` Vulnerable System Integrity**: Mengukur dampak pada integritas Sistem Rentan akibat kerentanan yang berhasil dieksploitasi. Nilai yang diizinkan: `H` High, `L` Low, `N` None.
- **`VA` Vulnerable System Availability**: Mengukur dampak pada ketersediaan Sistem Rentan akibat kerentanan yang berhasil dieksploitasi. Nilai yang diizinkan: `H` High, `L` Low, `N` None.
- **`SC` Subsequent System Confidentiality**: Mengukur dampak pada kerahasiaan informasi yang dikelola Sistem Berikutnya. Nilai yang diizinkan: `H` High, `L` Low, `N` None.
- **`SI` Subsequent System Integrity**: Mengukur dampak pada integritas Sistem Berikutnya. Nilai yang diizinkan: `H` High, `L` Low, `N` None.
- **`SA` Subsequent System Availability**: Mengukur dampak pada ketersediaan Sistem Berikutnya. Nilai yang diizinkan: `H` High, `L` Low, `N` None.

### Metrik Threat

- **`E` Exploit Maturity**: Mengukur kemungkinan kerentanan diserang berdasarkan keadaan teknik eksploitasi atau eksploitasi aktif saat ini. Nilai yang diizinkan: `X` Not Defined, `A` Attacked, `P` POC, `U` Unreported.

### Metrik Environmental

- **`CR` Confidentiality Requirements**: Menyesuaikan penilaian berdasarkan pentingnya kerahasiaan bagi aset yang terdampak. Nilai yang diizinkan: `X` Not Defined, `H` High, `M` Medium, `L` Low.
- **`IR` Integrity Requirements**: Menyesuaikan penilaian berdasarkan pentingnya integritas bagi aset yang terdampak. Nilai yang diizinkan: `X` Not Defined, `H` High, `M` Medium, `L` Low.
- **`AR` Availability Requirements**: Menyesuaikan penilaian berdasarkan pentingnya ketersediaan bagi aset yang terdampak. Nilai yang diizinkan: `X` Not Defined, `H` High, `M` Medium, `L` Low.
- **`MAV` Modified Attack Vector**: Menggantikan Attack Vector Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` Network, `A` Adjacent, `L` Local, `P` Physical.
- **`MAC` Modified Attack Complexity**: Menggantikan Attack Complexity Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `L` Low, `H` High.
- **`MAT` Modified Attack Requirements**: Menggantikan Attack Requirements Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` None, `P` Present.
- **`MPR` Modified Privileges Required**: Menggantikan Privileges Required Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` None, `L` Low, `H` High.
- **`MUI` Modified User Interaction**: Menggantikan User Interaction Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` None, `P` Passive, `A` Active.
- **`MVC` Modified Vulnerable System Confidentiality**: Menggantikan dampak kerahasiaan Sistem Rentan pada Base. Nilai yang diizinkan: `X` Not Defined, `H` High, `L` Low, `N` None.
- **`MVI` Modified Vulnerable System Integrity**: Menggantikan dampak integritas Sistem Rentan pada Base. Nilai yang diizinkan: `X` Not Defined, `H` High, `L` Low, `N` None.
- **`MVA` Modified Vulnerable System Availability**: Menggantikan dampak ketersediaan Sistem Rentan pada Base. Nilai yang diizinkan: `X` Not Defined, `H` High, `L` Low, `N` None.
- **`MSC` Modified Subsequent System Confidentiality**: Menggantikan dampak kerahasiaan Sistem Berikutnya pada Base. Nilai yang diizinkan: `X` Not Defined, `H` High, `L` Low, `N` Negligible.
- **`MSI` Modified Subsequent System Integrity**: Menggantikan dampak integritas Sistem Berikutnya pada Base, termasuk potensi dampak keselamatan manusia. Nilai yang diizinkan: `X` Not Defined, `S` Safety, `H` High, `L` Low, `N` Negligible.
- **`MSA` Modified Subsequent System Availability**: Menggantikan dampak ketersediaan Sistem Berikutnya pada Base, termasuk potensi dampak keselamatan manusia. Nilai yang diizinkan: `X` Not Defined, `S` Safety, `H` High, `L` Low, `N` Negligible.

### Metrik Supplemental

- **`S` Safety**: Menunjukkan apakah eksploitasi kerentanan dapat menimbulkan dampak keselamatan menurut IEC 61508. Tidak mengubah skor numerik. Nilai yang diizinkan: `X` Not Defined, `N` Negligible, `P` Present.
- **`AU` Automatable**: Menangkap apakah penyerang dapat secara andal mengotomatiskan peristiwa eksploitasi pada banyak target (langkah 1-4 rantai serangan). Tidak mengubah skor numerik. Nilai yang diizinkan: `X` Not Defined, `N` No, `Y` Yes.
- **`R` Recovery**: Menjelaskan ketahanan sistem untuk memulihkan layanan dari segi kinerja dan ketersediaan setelah serangan. Tidak mengubah skor numerik. Nilai yang diizinkan: `X` Not Defined, `A` Automatic, `U` User, `I` Irrecoverable.
- **`V` Value Density**: Menjelaskan sumber daya yang akan dikuasai penyerang melalui satu peristiwa eksploitasi. Tidak mengubah skor numerik. Nilai yang diizinkan: `X` Not Defined, `D` Diffuse, `C` Concentrated.
- **`RE` Vulnerability Response Effort**: Memberikan informasi tambahan tentang seberapa sulit bagi konsumen untuk memberikan respons awal. Tidak mengubah skor numerik. Nilai yang diizinkan: `X` Not Defined, `L` Low, `M` Moderate, `H` High.
- **`U` Provider Urgency**: Memasukkan penilaian urgensi tambahan dari penyedia. Tidak mengubah skor numerik. Nilai yang diizinkan: `X` Not Defined, `Clear` Clear, `Green` Green, `Amber` Amber, `Red` Red.

## CVSS v3.1 dan v3.0

Kunci metrik Base, Temporal, dan Environmental serta nilai yang diizinkan sama untuk CVSS v3.1 dan v3.0. Kedua versi berbeda pada beberapa rumus penilaian, pembulatan, dan aturan Environmental ModifiedImpact.

### Metrik Base

- **`AV` Attack Vector**: Mencerminkan konteks yang memungkinkan eksploitasi kerentanan. Nilai yang diizinkan: `N` Network, `A` Adjacent, `L` Local, `P` Physical.
- **`AC` Attack Complexity**: Menjelaskan kondisi di luar kendali penyerang yang harus ada agar kerentanan dapat dieksploitasi. Nilai yang diizinkan: `L` Low, `H` High.
- **`PR` Privileges Required**: Menjelaskan tingkat hak istimewa yang harus dimiliki penyerang sebelum berhasil mengeksploitasi kerentanan. Nilai yang diizinkan: `N` None, `L` Low, `H` High.
- **`UI` User Interaction**: Menangkap kebutuhan akan partisipasi pengguna manusia selain penyerang dalam kompromi. Nilai yang diizinkan: `N` None, `R` Required.
- **`S` Scope**: Menangkap apakah kerentanan pada satu komponen rentan berdampak pada sumber daya di komponen di luar cakupan keamanannya. Nilai yang diizinkan: `U` Unchanged, `C` Changed.
- **`C` Confidentiality**: Mengukur dampak pada kerahasiaan sumber daya informasi yang dikelola komponen perangkat lunak. Nilai yang diizinkan: `N` None, `L` Low, `H` High.
- **`I` Integrity**: Mengukur dampak pada integritas akibat kerentanan yang berhasil dieksploitasi. Nilai yang diizinkan: `N` None, `L` Low, `H` High.
- **`A` Availability**: Mengukur dampak pada ketersediaan komponen yang terdampak akibat kerentanan yang berhasil dieksploitasi. Nilai yang diizinkan: `N` None, `L` Low, `H` High.

### Metrik Temporal

- **`E` Exploit Code Maturity**: Mengukur kemungkinan kerentanan diserang berdasarkan keadaan teknik eksploitasi saat ini. Nilai yang diizinkan: `X` Not Defined, `U` Unproven, `P` Proof-of-Concept, `F` Functional, `H` High.
- **`RL` Remediation Level**: Memprioritaskan status perbaikan suatu kerentanan. Nilai yang diizinkan: `X` Not Defined, `O` Official Fix, `T` Temporary Fix, `W` Workaround, `U` Unavailable.
- **`RC` Report Confidence**: Mengukur tingkat keyakinan atas keberadaan kerentanan dan kredibilitas detail teknis yang diketahui. Nilai yang diizinkan: `X` Not Defined, `U` Unknown, `R` Reasonable, `C` Confirmed.

### Metrik Environmental

- **`CR` Confidentiality Requirement**: Menyesuaikan skor berdasarkan pentingnya aset TI yang terdampak bagi organisasi dari segi kerahasiaan. Nilai yang diizinkan: `X` Not Defined, `L` Low, `M` Medium, `H` High.
- **`IR` Integrity Requirement**: Menyesuaikan skor berdasarkan pentingnya aset TI yang terdampak bagi organisasi dari segi integritas. Nilai yang diizinkan: `X` Not Defined, `L` Low, `M` Medium, `H` High.
- **`AR` Availability Requirement**: Menyesuaikan skor berdasarkan pentingnya aset TI yang terdampak bagi organisasi dari segi ketersediaan. Nilai yang diizinkan: `X` Not Defined, `L` Low, `M` Medium, `H` High.
- **`MAV` Modified Attack Vector**: Menggantikan Attack Vector Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` Network, `A` Adjacent, `L` Local, `P` Physical.
- **`MAC` Modified Attack Complexity**: Menggantikan Attack Complexity Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `L` Low, `H` High.
- **`MPR` Modified Privileges Required**: Menggantikan Privileges Required Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` None, `L` Low, `H` High.
- **`MUI` Modified User Interaction**: Menggantikan User Interaction Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` None, `R` Required.
- **`MS` Modified Scope**: Menggantikan Scope Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `U` Unchanged, `C` Changed.
- **`MC` Modified Confidentiality**: Menggantikan dampak kerahasiaan Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` None, `L` Low, `H` High.
- **`MI` Modified Integrity**: Menggantikan dampak integritas Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` None, `L` Low, `H` High.
- **`MA` Modified Availability**: Menggantikan dampak ketersediaan Base berdasarkan karakteristik khusus lingkungan pengguna. Nilai yang diizinkan: `X` Not Defined, `N` None, `L` Low, `H` High.

## CVSS v2.0

CVSS v2.0 menggunakan metrik Authentication (`Au`) dan kunci Base, Temporal, serta Environmental tersendiri. Versi ini tidak memiliki peringkat tingkat keparahan Critical.

### Metrik Base

- **`AV` Access Vector**: Mencerminkan bagaimana kerentanan dieksploitasi dari segi kedekatan jaringan atau lokal. Nilai yang diizinkan: `L` Local, `A` Adjacent Network, `N` Network.
- **`AC` Access Complexity**: Mengukur kompleksitas serangan yang diperlukan untuk mengeksploitasi kerentanan setelah akses target diperoleh. Nilai yang diizinkan: `H` High, `M` Medium, `L` Low.
- **`Au` Authentication**: Mengukur berapa kali penyerang harus melakukan autentikasi ke target untuk mengeksploitasi kerentanan. Nilai yang diizinkan: `M` Multiple, `S` Single, `N` None.
- **`C` Confidentiality Impact**: Mengukur dampak pada kerahasiaan akibat kerentanan yang berhasil dieksploitasi. Nilai yang diizinkan: `N` None, `P` Partial, `C` Complete.
- **`I` Integrity Impact**: Mengukur dampak pada integritas akibat kerentanan yang berhasil dieksploitasi. Nilai yang diizinkan: `N` None, `P` Partial, `C` Complete.
- **`A` Availability Impact**: Mengukur dampak pada ketersediaan akibat kerentanan yang berhasil dieksploitasi. Nilai yang diizinkan: `N` None, `P` Partial, `C` Complete.

### Metrik Temporal

- **`E` Exploitability**: Mengukur keadaan teknik eksploitasi atau ketersediaan kode saat ini. Nilai yang diizinkan: `ND` Not Defined, `U` Unproven, `POC` Proof-of-Concept, `F` Functional, `H` High.
- **`RL` Remediation Level**: Mengukur status perbaikan suatu kerentanan. Nilai yang diizinkan: `ND` Not Defined, `OF` Official Fix, `TF` Temporary Fix, `W` Workaround, `U` Unavailable.
- **`RC` Report Confidence**: Mengukur tingkat keyakinan atas keberadaan kerentanan dan kredibilitas detail teknisnya. Nilai yang diizinkan: `ND` Not Defined, `UC` Unconfirmed, `UR` Uncorroborated, `C` Confirmed.

### Metrik Environmental

- **`CDP` Collateral Damage Potential**: Mengukur potensi kehilangan nyawa, aset fisik, produktivitas, atau pendapatan. Nilai yang diizinkan: `ND` Not Defined, `N` None, `L` Low, `LM` Low-Medium, `MH` Medium-High, `H` High.
- **`TD` Target Distribution**: Mengukur proporsi sistem rentan di lingkungan. Nilai yang diizinkan: `ND` Not Defined, `N` None, `L` Low, `M` Medium, `H` High.
- **`CR` Confidentiality Requirement**: Menyesuaikan skor Environmental berdasarkan pentingnya kerahasiaan bagi aset yang terdampak. Nilai yang diizinkan: `ND` Not Defined, `L` Low, `M` Medium, `H` High.
- **`IR` Integrity Requirement**: Menyesuaikan skor Environmental berdasarkan pentingnya integritas bagi aset yang terdampak. Nilai yang diizinkan: `ND` Not Defined, `L` Low, `M` Medium, `H` High.
- **`AR` Availability Requirement**: Menyesuaikan skor Environmental berdasarkan pentingnya ketersediaan bagi aset yang terdampak. Nilai yang diizinkan: `ND` Not Defined, `L` Low, `M` Medium, `H` High.

## Referensi terkait

- [Kunci Metrik Base dan Rentang Tingkat Keparahan](/id/docs/cvss/metric-keys/)
- [Format dan Aturan Vector String](/id/docs/cvss/vectors/)
- [Ikhtisar CVSS](/id/docs/cvss/overview/)
- [Spesifikasi CVSS v4.0](https://www.first.org/cvss/v4.0/specification-document)
- [Spesifikasi CVSS v3.1](https://www.first.org/cvss/v3-1/specification-document)
- [Spesifikasi CVSS v3.0](https://www.first.org/cvss/v3.0/specification-document)
- [Panduan CVSS v2.0](https://www.first.org/cvss/v2/guide)
