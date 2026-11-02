---
title: CVSS Metric Glossary
description: Metric keys, plain-language definitions, and allowed values for CVSS 4.0, 3.1, 3.0, and 2.0.
---

Use this glossary to look up the metric keys and allowed values used in a CVSS vector. The definitions are concise working descriptions, not replacements for the official FIRST specifications.

Use the documentation search (Ctrl+K) to find a metric key such as `AV`, `PR`, or `CR`.

## Common abbreviations

| Key | Metric | Used in |
| --- | --- | --- |
| `AV` | Attack Vector (Access Vector in v2.0) | v2.0, v3.0, v3.1, v4.0 |
| `AC` | Attack Complexity (Access Complexity in v2.0) | v2.0, v3.0, v3.1, v4.0 |
| `PR` | Privileges Required | v3.0, v3.1, v4.0 |
| `UI` | User Interaction | v3.0, v3.1, v4.0 |
| `S` | Scope | v3.0, v3.1 |
| `C` / `I` / `A` | Confidentiality / Integrity / Availability impact | v2.0, v3.0, v3.1, v4.0* |
| `Au` | Authentication | v2.0 |
| `AT` | Attack Requirements | v4.0 |

\* CVSS v4.0 uses `VC`/`VI`/`VA` for the vulnerable system and `SC`/`SI`/`SA` for subsequent systems.


## CVSS v4.0

CVSS v4.0 splits impact between the vulnerable system and subsequent systems, and adds Threat, Environmental, and Supplemental groups.

### Base Metrics

- **`AV` Attack Vector**: Reflects the context by which vulnerability exploitation is possible. Allowed values: `N` Network, `A` Adjacent, `L` Local, `P` Physical.
- **`AC` Attack Complexity**: Captures measurable actions that must be taken by the attacker to actively evade or circumvent built-in security-enhancing conditions. Allowed values: `L` Low, `H` High.
- **`AT` Attack Requirements**: Captures the prerequisite deployment and execution conditions or variables of the vulnerable system that enable the attack. Allowed values: `N` None, `P` Present.
- **`PR` Privileges Required**: Describes the level of privileges an attacker must possess prior to successfully exploiting the vulnerability. Allowed values: `N` None, `L` Low, `H` High.
- **`UI` User Interaction**: Captures the requirement for a human user, other than the attacker, to participate in the successful compromise. Allowed values: `N` None, `P` Passive, `A` Active.
- **`VC` Vulnerable System Confidentiality**: Measures the impact to the confidentiality of information managed by the Vulnerable System. Allowed values: `H` High, `L` Low, `N` None.
- **`VI` Vulnerable System Integrity**: Measures the impact to integrity of a successfully exploited vulnerability on the Vulnerable System. Allowed values: `H` High, `L` Low, `N` None.
- **`VA` Vulnerable System Availability**: Measures the impact to the availability of the Vulnerable System resulting from a successfully exploited vulnerability. Allowed values: `H` High, `L` Low, `N` None.
- **`SC` Subsequent System Confidentiality**: Measures the impact to the confidentiality of information managed by Subsequent Systems. Allowed values: `H` High, `L` Low, `N` None.
- **`SI` Subsequent System Integrity**: Measures the impact to integrity of Subsequent Systems. Allowed values: `H` High, `L` Low, `N` None.
- **`SA` Subsequent System Availability**: Measures the impact to the availability of Subsequent Systems. Allowed values: `H` High, `L` Low, `N` None.

### Threat Metrics

- **`E` Exploit Maturity**: Measures the likelihood of the vulnerability being attacked based on the current state of exploit techniques or active exploitation. Allowed values: `X` Not Defined, `A` Attacked, `P` POC, `U` Unreported.

### Environmental Metrics

- **`CR` Confidentiality Requirements**: Customizes the assessment depending on the importance of Confidentiality to the affected asset. Allowed values: `X` Not Defined, `H` High, `M` Medium, `L` Low.
- **`IR` Integrity Requirements**: Customizes the assessment depending on the importance of Integrity to the affected asset. Allowed values: `X` Not Defined, `H` High, `M` Medium, `L` Low.
- **`AR` Availability Requirements**: Customizes the assessment depending on the importance of Availability to the affected asset. Allowed values: `X` Not Defined, `H` High, `M` Medium, `L` Low.
- **`MAV` Modified Attack Vector**: Overrides the Base Attack Vector based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` Network, `A` Adjacent, `L` Local, `P` Physical.
- **`MAC` Modified Attack Complexity**: Overrides the Base Attack Complexity based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `L` Low, `H` High.
- **`MAT` Modified Attack Requirements**: Overrides the Base Attack Requirements based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` None, `P` Present.
- **`MPR` Modified Privileges Required**: Overrides the Base Privileges Required based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` None, `L` Low, `H` High.
- **`MUI` Modified User Interaction**: Overrides the Base User Interaction based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` None, `P` Passive, `A` Active.
- **`MVC` Modified Vulnerable System Confidentiality**: Overrides the Base Vulnerable System Confidentiality impact. Allowed values: `X` Not Defined, `H` High, `L` Low, `N` None.
- **`MVI` Modified Vulnerable System Integrity**: Overrides the Base Vulnerable System Integrity impact. Allowed values: `X` Not Defined, `H` High, `L` Low, `N` None.
- **`MVA` Modified Vulnerable System Availability**: Overrides the Base Vulnerable System Availability impact. Allowed values: `X` Not Defined, `H` High, `L` Low, `N` None.
- **`MSC` Modified Subsequent System Confidentiality**: Overrides the Base Subsequent System Confidentiality impact. Allowed values: `X` Not Defined, `H` High, `L` Low, `N` Negligible.
- **`MSI` Modified Subsequent System Integrity**: Overrides the Base Subsequent System Integrity impact, including potential human safety impact. Allowed values: `X` Not Defined, `S` Safety, `H` High, `L` Low, `N` Negligible.
- **`MSA` Modified Subsequent System Availability**: Overrides the Base Subsequent System Availability impact, including potential human safety impact. Allowed values: `X` Not Defined, `S` Safety, `H` High, `L` Low, `N` Negligible.

### Supplemental Metrics

- **`S` Safety**: Indicates whether exploiting the vulnerability may have Safety impact under IEC 61508. Does not change the numeric score. Allowed values: `X` Not Defined, `N` Negligible, `P` Present.
- **`AU` Automatable**: Captures whether an attacker can reliably automate exploitation events across multiple targets (steps 1-4 of kill chain). Does not change the numeric score. Allowed values: `X` Not Defined, `N` No, `Y` Yes.
- **`R` Recovery**: Describes the resilience of a system to recover services in terms of performance and availability after an attack. Does not change the numeric score. Allowed values: `X` Not Defined, `A` Automatic, `U` User, `I` Irrecoverable.
- **`V` Value Density**: Describes the resources that the attacker will gain control over with a single exploitation event. Does not change the numeric score. Allowed values: `X` Not Defined, `D` Diffuse, `C` Concentrated.
- **`RE` Vulnerability Response Effort**: Provides supplemental information on how difficult it is for consumers to provide an initial response. Does not change the numeric score. Allowed values: `X` Not Defined, `L` Low, `M` Moderate, `H` High.
- **`U` Provider Urgency**: Incorporates additional provider-supplied urgency assessment. Does not change the numeric score. Allowed values: `X` Not Defined, `Clear` Clear, `Green` Green, `Amber` Amber, `Red` Red.

## CVSS v3.1 and v3.0

The Base, Temporal, and Environmental metric keys and allowed values are the same for CVSS v3.1 and v3.0. The versions differ in some scoring formulas, rounding, and Environmental ModifiedImpact rules.

### Base Metrics

- **`AV` Attack Vector**: Reflects the context by which vulnerability exploitation is possible. Allowed values: `N` Network, `A` Adjacent, `L` Local, `P` Physical.
- **`AC` Attack Complexity**: Describes the conditions beyond the attacker’s control that must exist in order to exploit the vulnerability. Allowed values: `L` Low, `H` High.
- **`PR` Privileges Required**: Describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. Allowed values: `N` None, `L` Low, `H` High.
- **`UI` User Interaction**: Captures the requirement for a human user, other than the attacker, to participate in the compromise. Allowed values: `N` None, `R` Required.
- **`S` Scope**: Captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope. Allowed values: `U` Unchanged, `C` Changed.
- **`C` Confidentiality**: Measures the impact to the confidentiality of the information resources managed by a software component. Allowed values: `N` None, `L` Low, `H` High.
- **`I` Integrity**: Measures the impact to integrity of a successfully exploited vulnerability. Allowed values: `N` None, `L` Low, `H` High.
- **`A` Availability**: Measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. Allowed values: `N` None, `L` Low, `H` High.

### Temporal Metrics

- **`E` Exploit Code Maturity**: Measures the likelihood of the vulnerability being attacked based on the current state of exploit techniques. Allowed values: `X` Not Defined, `U` Unproven, `P` Proof-of-Concept, `F` Functional, `H` High.
- **`RL` Remediation Level**: Prioritizes the remediation status of a vulnerability. Allowed values: `X` Not Defined, `O` Official Fix, `T` Temporary Fix, `W` Workaround, `U` Unavailable.
- **`RC` Report Confidence**: Measures the degree of confidence in the existence of the vulnerability and the credibility of the known technical details. Allowed values: `X` Not Defined, `U` Unknown, `R` Reasonable, `C` Confirmed.

### Environmental Metrics

- **`CR` Confidentiality Requirement**: Customizes the score depending on the importance of the affected IT asset to the organization in terms of Confidentiality. Allowed values: `X` Not Defined, `L` Low, `M` Medium, `H` High.
- **`IR` Integrity Requirement**: Customizes the score depending on the importance of the affected IT asset to the organization in terms of Integrity. Allowed values: `X` Not Defined, `L` Low, `M` Medium, `H` High.
- **`AR` Availability Requirement**: Customizes the score depending on the importance of the affected IT asset to the organization in terms of Availability. Allowed values: `X` Not Defined, `L` Low, `M` Medium, `H` High.
- **`MAV` Modified Attack Vector**: Overrides the Base Attack Vector based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` Network, `A` Adjacent, `L` Local, `P` Physical.
- **`MAC` Modified Attack Complexity**: Overrides the Base Attack Complexity based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `L` Low, `H` High.
- **`MPR` Modified Privileges Required**: Overrides the Base Privileges Required based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` None, `L` Low, `H` High.
- **`MUI` Modified User Interaction**: Overrides the Base User Interaction based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` None, `R` Required.
- **`MS` Modified Scope**: Overrides the Base Scope based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `U` Unchanged, `C` Changed.
- **`MC` Modified Confidentiality**: Overrides the Base Confidentiality impact based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` None, `L` Low, `H` High.
- **`MI` Modified Integrity**: Overrides the Base Integrity impact based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` None, `L` Low, `H` High.
- **`MA` Modified Availability**: Overrides the Base Availability impact based on specific characteristics of the user environment. Allowed values: `X` Not Defined, `N` None, `L` Low, `H` High.

## CVSS v2.0

CVSS v2.0 uses the Authentication (`Au`) metric and its own Base, Temporal, and Environmental keys. It has no Critical severity rating.

### Base Metrics

- **`AV` Access Vector**: Reflects how the vulnerability is exploited in terms of network or local proximity. Allowed values: `L` Local, `A` Adjacent Network, `N` Network.
- **`AC` Access Complexity**: Measures the complexity of the attack required to exploit the vulnerability once target access is gained. Allowed values: `H` High, `M` Medium, `L` Low.
- **`Au` Authentication**: Measures the number of times an attacker must authenticate to a target in order to exploit a vulnerability. Allowed values: `M` Multiple, `S` Single, `N` None.
- **`C` Confidentiality Impact**: Measures the impact on confidentiality of a successfully exploited vulnerability. Allowed values: `N` None, `P` Partial, `C` Complete.
- **`I` Integrity Impact**: Measures the impact to integrity of a successfully exploited vulnerability. Allowed values: `N` None, `P` Partial, `C` Complete.
- **`A` Availability Impact**: Measures the impact to availability of a successfully exploited vulnerability. Allowed values: `N` None, `P` Partial, `C` Complete.

### Temporal Metrics

- **`E` Exploitability**: Measures the current state of exploit techniques or code availability. Allowed values: `ND` Not Defined, `U` Unproven, `POC` Proof-of-Concept, `F` Functional, `H` High.
- **`RL` Remediation Level**: Measures the remediation status of a vulnerability. Allowed values: `ND` Not Defined, `OF` Official Fix, `TF` Temporary Fix, `W` Workaround, `U` Unavailable.
- **`RC` Report Confidence**: Measures the degree of confidence in the existence of the vulnerability and the credibility of its technical details. Allowed values: `ND` Not Defined, `UC` Unconfirmed, `UR` Uncorroborated, `C` Confirmed.

### Environmental Metrics

- **`CDP` Collateral Damage Potential**: Measures the potential for loss of life, physical assets, productivity, or revenue. Allowed values: `ND` Not Defined, `N` None, `L` Low, `LM` Low-Medium, `MH` Medium-High, `H` High.
- **`TD` Target Distribution**: Measures the proportion of vulnerable systems in the environment. Allowed values: `ND` Not Defined, `N` None, `L` Low, `M` Medium, `H` High.
- **`CR` Confidentiality Requirement**: Customizes the Environmental score based on the importance of Confidentiality to the affected asset. Allowed values: `ND` Not Defined, `L` Low, `M` Medium, `H` High.
- **`IR` Integrity Requirement**: Customizes the Environmental score based on the importance of Integrity to the affected asset. Allowed values: `ND` Not Defined, `L` Low, `M` Medium, `H` High.
- **`AR` Availability Requirement**: Customizes the Environmental score based on the importance of Availability to the affected asset. Allowed values: `ND` Not Defined, `L` Low, `M` Medium, `H` High.

## Related references

- [Base Metric Keys & Severity Ranges](/docs/cvss/metric-keys/)
- [Vector String Format & Rules](/docs/cvss/vectors/)
- [CVSS Overview](/docs/cvss/overview/)
- [CVSS v4.0 Specification](https://www.first.org/cvss/v4.0/specification-document)
- [CVSS v3.1 Specification](https://www.first.org/cvss/v3-1/specification-document)
- [CVSS v3.0 Specification](https://www.first.org/cvss/v3.0/specification-document)
- [CVSS v2.0 Guide](https://www.first.org/cvss/v2/guide)

