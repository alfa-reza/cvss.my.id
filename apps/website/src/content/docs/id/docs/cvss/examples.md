---
title: Contoh Terperinci
description: Contoh vector CVSS v4.0, v3.1, v3.0, dan v2.0 terverifikasi dengan rincian Base, Threat/Temporal, Environmental, dan Supplemental.
---

Berikut adalah contoh kerentanan terperinci pada keempat versi CVSS. Klik tautan kalkulator mana pun untuk memeriksa atau mengubah vector secara langsung di kalkulator browser.

## 1. Eksekusi Kode Jarak Jauh Tanpa Autentikasi (CVSS v4.0)

Layanan yang dapat dijangkau jaringan memungkinkan eksekusi kode jarak jauh tanpa autentikasi (`AV:N/AC:L/AT:N/PR:N/UI:N`) dengan kompromi penuh pada host rentan (`VC:H/VI:H/VA:H`), tanpa dampak pada sistem berikutnya (`SC:N/SI:N/SA:N`), dan kode eksploit Proof-of-Concept publik (`E:P`).

- **Vector**: `CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/E:P`
- **Base Score (`CVSS-B`)**: `9.3 (Critical)`
- **Base + Threat Score (`CVSS-BT`)**: `8.9 (High)`
- **Buka di Kalkulator**: [Periksa di Kalkulator v4.0](https://cvss.my.id/calculator/v4.0?vector=CVSS%3A4.0%2FAV%3AN%2FAC%3AL%2FAT%3AN%2FPR%3AN%2FUI%3AN%2FVC%3AH%2FVI%3AH%2FVA%3AH%2FSC%3AN%2FSI%3AN%2FSA%3AN%2FE%3AP)

## 2. Container Escape yang Memengaruhi Sistem Host (CVSS v4.0 + Supplemental)

Penyerang dengan hak istimewa rendah di dalam container (`AV:L/AC:L/AT:N/PR:L/UI:N`) mengompromi container (`VC:H/VI:H/VA:H`) dan host yang mendasarinya (`SC:H/SI:H/SA:H`). Metrik Supplemental mencatat bahwa kerentanan dapat diotomatiskan (`AU:Y`) dengan urgensi penyedia `Red` (`U:Red`).

- **Vector**: `CVSS:4.0/AV:L/AC:L/AT:N/PR:L/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H/AU:Y/U:Red`
- **Skor (`CVSS-B`)**: `9.3 (Critical)` (Metrik Supplemental `AU:Y/U:Red` dipertahankan dalam vector tanpa mengubah skor numerik.)
- **Buka di Kalkulator**: [Periksa di Kalkulator v4.0](https://cvss.my.id/calculator/v4.0?vector=CVSS%3A4.0%2FAV%3AL%2FAC%3AL%2FAT%3AN%2FPR%3AL%2FUI%3AN%2FVC%3AH%2FVI%3AH%2FVA%3AH%2FSC%3AH%2FSI%3AH%2FSA%3AH%2FAU%3AY%2FU%3ARed)

## 3. Cross-Site Scripting Tersimpan (CVSS v3.1)

Penyerang dengan hak istimewa rendah (`PR:L`) menyuntikkan skrip yang dieksekusi di browser pengguna korban (`UI:R`, `S:C`) dengan dampak kerahasiaan dan integritas rendah (`C:L/I:L/A:N`).

- **Vector**: `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`
- **Base Score**: `5.4 (Medium)`
- **Buka di Kalkulator**: [Periksa di Kalkulator v3.1](https://cvss.my.id/calculator/v3.1?vector=CVSS%3A3.1%2FAV%3AN%2FAC%3AL%2FPR%3AL%2FUI%3AR%2FS%3AC%2FC%3AL%2FI%3AL%2FA%3AN)

## 4. Kompromi Layanan Jaringan Kritis (CVSS v3.1 vs v3.0)

- **Vector v3.1**: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` -> **`10.0 (Critical)`** ([Periksa di Kalkulator v3.1](https://cvss.my.id/calculator/v3.1?vector=CVSS%3A3.1%2FAV%3AN%2FAC%3AL%2FPR%3AN%2FUI%3AN%2FS%3AC%2FC%3AH%2FI%3AH%2FA%3AH))
- **Vector v3.0**: `CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` -> **`10.0 (Critical)`** ([Periksa di Kalkulator v3.0](https://cvss.my.id/calculator/v3.0?vector=CVSS%3A3.0%2FAV%3AN%2FAC%3AL%2FPR%3AN%2FUI%3AN%2FS%3AC%2FC%3AH%2FI%3AH%2FA%3AH))

## 5. Buffer Overflow Jaringan Legacy (CVSS v2.0)

- **Vector**: `AV:N/AC:L/Au:N/C:C/I:C/A:C/E:F/RL:OF/RC:C`
- **Base Score**: `10.0 (High)` (Ingat: peringkat tingkat keparahan tertinggi CVSS v2.0 adalah `High`.)
- **Temporal Score**: `8.3 (High)`
- **Buka di Kalkulator**: [Periksa di Kalkulator v2.0](https://cvss.my.id/calculator/v2.0?vector=AV%3AN%2FAC%3AL%2FAu%3AN%2FC%3AC%2FI%3AC%2FA%3AC%2FE%3AF%2FRL%3AOF%2FRC%3AC)
