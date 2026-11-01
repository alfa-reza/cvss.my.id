---
title: Worked Examples
description: Verified CVSS v4.0, v3.1, v3.0, and v2.0 vector examples with Base, Threat/Temporal, Environmental, and Supplemental breakdowns.
---

Below are worked vulnerability examples across all four CVSS versions. Click any calculator link to inspect or modify the vector live in the browser calculator.

## 1. Unauthenticated Remote Code Execution (CVSS v4.0)

A network-reachable service allows unauthenticated remote code execution (`AV:N/AC:L/AT:N/PR:N/UI:N`) with full compromise of the vulnerable host (`VC:H/VI:H/VA:H`), no subsequent system impact (`SC:N/SI:N/SA:N`), and public Proof-of-Concept exploit code (`E:P`).

- **Vector**: `CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/E:P`
- **Base Score (`CVSS-B`)**: `9.3 (Critical)`
- **Base + Threat Score (`CVSS-BT`)**: `8.1 (High)`
- **Open in Calculator**: [Inspect in v4.0 Calculator](https://calc.cvss.my.id/v4.0?vector=CVSS%3A4.0%2FAV%3AN%2FAC%3AL%2FAT%3AN%2FPR%3AN%2FUI%3AN%2FVC%3AH%2FVI%3AH%2FVA%3AH%2FSC%3AN%2FSI%3AN%2FSA%3AN%2FE%3AP)

## 2. Container Escape Affecting Host System (CVSS v4.0 + Supplemental)

An attacker with low privileges inside a container (`AV:L/AC:L/AT:N/PR:L/UI:N`) compromises both the container (`VC:H/VI:H/VA:H`) and the underlying host (`SC:H/SI:H/SA:H`). Supplemental metrics record that the vulnerability is automatable (`AU:Y`) with provider urgency `Red` (`U:Red`).

- **Vector**: `CVSS:4.0/AV:L/AC:L/AT:N/PR:L/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H/AU:Y/U:Red`
- **Score (`CVSS-B`)**: `9.3 (Critical)` (Supplemental metrics `AU:Y/U:Red` are preserved in the vector without changing the numeric score.)
- **Open in Calculator**: [Inspect in v4.0 Calculator](https://calc.cvss.my.id/v4.0?vector=CVSS%3A4.0%2FAV%3AL%2FAC%3AL%2FAT%3AN%2FPR%3AL%2FUI%3AN%2FVC%3AH%2FVI%3AH%2FVA%3AH%2FSC%3AH%2FSI%3AH%2FSA%3AH%2FAU%3AY%2FU%3ARed)

## 3. Stored Cross-Site Scripting (CVSS v3.1)

An attacker with low privileges (`PR:L`) injects script that executes in a victim user's browser (`UI:R`, `S:C`) with low confidentiality and integrity impact (`C:L/I:L/A:N`).

- **Vector**: `CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N`
- **Base Score**: `5.4 (Medium)`
- **Open in Calculator**: [Inspect in v3.1 Calculator](https://calc.cvss.my.id/v3.1?vector=CVSS%3A3.1%2FAV%3AN%2FAC%3AL%2FPR%3AL%2FUI%3AR%2FS%3AC%2FC%3AL%2FI%3AL%2FA%3AN)

## 4. Critical Network Service Compromise (CVSS v3.1 vs v3.0)

- **v3.1 Vector**: `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` -> **`10.0 (Critical)`** ([Inspect in v3.1 Calculator](https://calc.cvss.my.id/v3.1?vector=CVSS%3A3.1%2FAV%3AN%2FAC%3AL%2FPR%3AN%2FUI%3AN%2FS%3AC%2FC%3AH%2FI%3AH%2FA%3AH))
- **v3.0 Vector**: `CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H` -> **`10.0 (Critical)`** ([Inspect in v3.0 Calculator](https://calc.cvss.my.id/v3.0?vector=CVSS%3A3.0%2FAV%3AN%2FAC%3AL%2FPR%3AN%2FUI%3AN%2FS%3AC%2FC%3AH%2FI%3AH%2FA%3AH))

## 5. Legacy Network Buffer Overflow (CVSS v2.0)

- **Vector**: `AV:N/AC:L/Au:N/C:C/I:C/A:C/E:F/RL:OF/RC:C`
- **Base Score**: `10.0 (High)` (Remember: CVSS v2.0 highest severity rating is `High`.)
- **Temporal Score**: `8.3 (High)`
- **Open in Calculator**: [Inspect in v2.0 Calculator](https://calc.cvss.my.id/v2.0?vector=AV%3AN%2FAC%3AL%2FAu%3AN%2FC%3AC%2FI%3AC%2FA%3AC%2FE%3AF%2FRL%3AOF%2FRC%3AC)
