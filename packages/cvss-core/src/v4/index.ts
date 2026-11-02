// Copyright (c) 2023 FIRST.ORG, Inc., Red Hat, and contributors
// SPDX-License-Identifier: BSD-2-Clause
// Portions of this file implement the official FIRST CVSS v4.0 MacroVector scoring algorithm.

import type {
  CompleteScoreResult,
  Cvss4Nomenclature,
  MetricDefinition,
  MetricGroupDefinition,
  ParseResult,
  ScoreResult,
  SeverityLevel,
  VersionSchema,
} from '../types.js';
import { CVSS4_LOOKUP, CVSS4_MAX_COMPOSED, CVSS4_MAX_SEVERITY } from './data.js';

export const V4_METRICS: MetricDefinition[] = [
  // Base - Exploitability (5 metrics)
  {
    key: 'AV',
    name: 'Attack Vector',
    group: 'base',
    subGroup: 'Exploitability Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Reflects the context by which vulnerability exploitation is possible.',
    options: [
      { value: 'N', label: 'Network (N)', description: 'Bound to the network stack and remotely exploitable across one or more network hops.' },
      { value: 'A', label: 'Adjacent (A)', description: 'Bound to a protocol stack, limited at the protocol level to a logically adjacent topology.' },
      { value: 'L', label: 'Local (L)', description: 'Not bound to the network stack; attacker path is via local read/write/execute or user interaction.' },
      { value: 'P', label: 'Physical (P)', description: 'Requires the attacker to physically touch or manipulate the vulnerable system.' },
    ],
  },
  {
    key: 'AC',
    name: 'Attack Complexity',
    group: 'base',
    subGroup: 'Exploitability Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Captures measurable actions that must be taken by the attacker to actively evade or circumvent built-in security-enhancing conditions.',
    options: [
      { value: 'L', label: 'Low (L)', description: 'Attacker must take no measurable target-specific circumvention action to exploit the vulnerability.' },
      { value: 'H', label: 'High (H)', description: 'Successful attack depends on the evasion or circumvention of security-enhancing techniques.' },
    ],
  },
  {
    key: 'AT',
    name: 'Attack Requirements',
    group: 'base',
    subGroup: 'Exploitability Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Captures the prerequisite deployment and execution conditions or variables of the vulnerable system that enable the attack.',
    options: [
      { value: 'N', label: 'None (N)', description: 'Successful attack does not depend on specific deployment and execution conditions.' },
      { value: 'P', label: 'Present (P)', description: 'Successful attack depends on the presence of specific deployment and execution conditions (such as race conditions or on-path position).' },
    ],
  },
  {
    key: 'PR',
    name: 'Privileges Required',
    group: 'base',
    subGroup: 'Exploitability Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Describes the level of privileges an attacker must possess prior to successfully exploiting the vulnerability.',
    options: [
      { value: 'N', label: 'None (N)', description: 'Attacker is unauthorized prior to attack and requires no access to settings or files.' },
      { value: 'L', label: 'Low (L)', description: 'Requires privileges that provide basic capabilities limited to a single low-privileged user.' },
      { value: 'H', label: 'High (H)', description: 'Requires privileges that provide significant administrative control over the vulnerable system.' },
    ],
  },
  {
    key: 'UI',
    name: 'User Interaction',
    group: 'base',
    subGroup: 'Exploitability Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Captures the requirement for a human user, other than the attacker, to participate in the successful compromise.',
    options: [
      { value: 'N', label: 'None (N)', description: 'The vulnerable system can be exploited without interaction from any human user.' },
      { value: 'P', label: 'Passive (P)', description: 'Requires limited, involuntary interaction by the targeted user with the vulnerable system.' },
      { value: 'A', label: 'Active (A)', description: 'Requires a targeted user to perform specific, conscious interactions with the vulnerable system.' },
    ],
  },
  // Base - Vulnerable System Impact (3 metrics)
  {
    key: 'VC',
    name: 'Vulnerable System Confidentiality',
    group: 'base',
    subGroup: 'Vulnerable System Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to the confidentiality of information managed by the Vulnerable System.',
    options: [
      { value: 'H', label: 'High (H)', description: 'Total loss of confidentiality, or disclosure of restricted information with direct, serious impact.' },
      { value: 'L', label: 'Low (L)', description: 'Some loss of confidentiality without control over what is obtained or direct serious loss.' },
      { value: 'N', label: 'None (N)', description: 'No loss of confidentiality within the Vulnerable System.' },
    ],
  },
  {
    key: 'VI',
    name: 'Vulnerable System Integrity',
    group: 'base',
    subGroup: 'Vulnerable System Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to integrity of a successfully exploited vulnerability on the Vulnerable System.',
    options: [
      { value: 'H', label: 'High (H)', description: 'Total loss of integrity or complete loss of protection on the Vulnerable System.' },
      { value: 'L', label: 'Low (L)', description: 'Modification of data is possible, but without control over consequence or direct serious impact.' },
      { value: 'N', label: 'None (N)', description: 'No loss of integrity within the Vulnerable System.' },
    ],
  },
  {
    key: 'VA',
    name: 'Vulnerable System Availability',
    group: 'base',
    subGroup: 'Vulnerable System Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to the availability of the Vulnerable System resulting from a successfully exploited vulnerability.',
    options: [
      { value: 'H', label: 'High (H)', description: 'Total loss of availability, or denial of availability presenting a direct, serious consequence.' },
      { value: 'L', label: 'Low (L)', description: 'Performance is reduced or there are interruptions in resource availability without full denial.' },
      { value: 'N', label: 'None (N)', description: 'No impact to availability within the Vulnerable System.' },
    ],
  },
  // Base - Subsequent System Impact (3 metrics)
  {
    key: 'SC',
    name: 'Subsequent System Confidentiality',
    group: 'base',
    subGroup: 'Subsequent System Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to the confidentiality of information managed by Subsequent Systems.',
    options: [
      { value: 'H', label: 'High (H)', description: 'Total loss of confidentiality within the Subsequent System.' },
      { value: 'L', label: 'Low (L)', description: 'Some loss of confidentiality within the Subsequent System.' },
      { value: 'N', label: 'None (N)', description: 'No loss of confidentiality within the Subsequent System.' },
    ],
  },
  {
    key: 'SI',
    name: 'Subsequent System Integrity',
    group: 'base',
    subGroup: 'Subsequent System Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to integrity of Subsequent Systems.',
    options: [
      { value: 'H', label: 'High (H)', description: 'Total loss of integrity or complete loss of protection within the Subsequent System.' },
      { value: 'L', label: 'Low (L)', description: 'Limited modification of data within the Subsequent System.' },
      { value: 'N', label: 'None (N)', description: 'No loss of integrity within the Subsequent System.' },
    ],
  },
  {
    key: 'SA',
    name: 'Subsequent System Availability',
    group: 'base',
    subGroup: 'Subsequent System Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to the availability of Subsequent Systems.',
    options: [
      { value: 'H', label: 'High (H)', description: 'Total loss of availability within the Subsequent System.' },
      { value: 'L', label: 'Low (L)', description: 'Reduced performance or interruptions in resource availability within the Subsequent System.' },
      { value: 'N', label: 'None (N)', description: 'No impact to availability within the Subsequent System.' },
    ],
  },
  // Threat (1 metric)
  {
    key: 'E',
    name: 'Exploit Maturity',
    group: 'threat',
    subGroup: 'Threat Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Measures the likelihood of the vulnerability being attacked based on the current state of exploit techniques or active exploitation.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Reliable threat intelligence is not available; defaults to Attacked (A) worst case in calculation.', isDefault: true },
      { value: 'A', label: 'Attacked (A)', description: 'Attacks have been reported in the wild, or exploit toolkits are publicly/privately available.' },
      { value: 'P', label: 'POC (P)', description: 'Proof-of-concept is publicly available; no reported attacks or exploit toolkits.' },
      { value: 'U', label: 'Unreported (U)', description: 'No publicly available proof-of-concept, reported attacks, or exploit solutions.' },
    ],
  },
  // Environmental - Security Requirements (3 metrics)
  {
    key: 'CR',
    name: 'Confidentiality Requirements',
    group: 'environmental',
    subGroup: 'Security Requirements',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Customizes the assessment depending on the importance of Confidentiality to the affected asset.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Defaults to High (H) worst-case modifier.', isDefault: true },
      { value: 'H', label: 'High (H)', description: 'Catastrophic adverse effect on the organization or individuals.' },
      { value: 'M', label: 'Medium (M)', description: 'Serious adverse effect on the organization or individuals.' },
      { value: 'L', label: 'Low (L)', description: 'Limited adverse effect on the organization or individuals.' },
    ],
  },
  {
    key: 'IR',
    name: 'Integrity Requirements',
    group: 'environmental',
    subGroup: 'Security Requirements',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Customizes the assessment depending on the importance of Integrity to the affected asset.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Defaults to High (H) worst-case modifier.', isDefault: true },
      { value: 'H', label: 'High (H)', description: 'Catastrophic adverse effect on the organization or individuals.' },
      { value: 'M', label: 'Medium (M)', description: 'Serious adverse effect on the organization or individuals.' },
      { value: 'L', label: 'Low (L)', description: 'Limited adverse effect on the organization or individuals.' },
    ],
  },
  {
    key: 'AR',
    name: 'Availability Requirements',
    group: 'environmental',
    subGroup: 'Security Requirements',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Customizes the assessment depending on the importance of Availability to the affected asset.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Defaults to High (H) worst-case modifier.', isDefault: true },
      { value: 'H', label: 'High (H)', description: 'Catastrophic adverse effect on the organization or individuals.' },
      { value: 'M', label: 'Medium (M)', description: 'Serious adverse effect on the organization or individuals.' },
      { value: 'L', label: 'Low (L)', description: 'Limited adverse effect on the organization or individuals.' },
    ],
  },
  // Environmental - Modified Base Metrics (11 metrics)
  {
    key: 'MAV',
    name: 'Modified Attack Vector',
    group: 'environmental',
    subGroup: 'Modified Exploitability Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'select',
    description: 'Overrides the Base Attack Vector based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Attack Vector value.', isDefault: true },
      { value: 'N', label: 'Network (N)', description: 'Bound to the network stack and remotely exploitable.' },
      { value: 'A', label: 'Adjacent (A)', description: 'Limited to a logically adjacent topology.' },
      { value: 'L', label: 'Local (L)', description: 'Exploited via local capabilities or user interaction.' },
      { value: 'P', label: 'Physical (P)', description: 'Requires physical manipulation.' },
    ],
  },
  {
    key: 'MAC',
    name: 'Modified Attack Complexity',
    group: 'environmental',
    subGroup: 'Modified Exploitability Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Attack Complexity based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Attack Complexity value.', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'No target-specific circumvention required.' },
      { value: 'H', label: 'High (H)', description: 'Depends on evasion or circumvention of security-enhancing techniques.' },
    ],
  },
  {
    key: 'MAT',
    name: 'Modified Attack Requirements',
    group: 'environmental',
    subGroup: 'Modified Exploitability Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Attack Requirements based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Attack Requirements value.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'Does not depend on specific deployment or execution conditions.' },
      { value: 'P', label: 'Present (P)', description: 'Depends on specific deployment or execution conditions.' },
    ],
  },
  {
    key: 'MPR',
    name: 'Modified Privileges Required',
    group: 'environmental',
    subGroup: 'Modified Exploitability Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Privileges Required based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Privileges Required value.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No privileges required.' },
      { value: 'L', label: 'Low (L)', description: 'Low user privileges required.' },
      { value: 'H', label: 'High (H)', description: 'Administrative privileges required.' },
    ],
  },
  {
    key: 'MUI',
    name: 'Modified User Interaction',
    group: 'environmental',
    subGroup: 'Modified Exploitability Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base User Interaction based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base User Interaction value.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No user interaction required.' },
      { value: 'P', label: 'Passive (P)', description: 'Passive user interaction required.' },
      { value: 'A', label: 'Active (A)', description: 'Active user interaction required.' },
    ],
  },
  {
    key: 'MVC',
    name: 'Modified Vulnerable System Confidentiality',
    group: 'environmental',
    subGroup: 'Modified Vulnerable System Impact',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Vulnerable System Confidentiality impact.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base VC value.', isDefault: true },
      { value: 'H', label: 'High (H)', description: 'Total loss of confidentiality in the Vulnerable System.' },
      { value: 'L', label: 'Low (L)', description: 'Some loss of confidentiality in the Vulnerable System.' },
      { value: 'N', label: 'None (N)', description: 'No loss of confidentiality in the Vulnerable System.' },
    ],
  },
  {
    key: 'MVI',
    name: 'Modified Vulnerable System Integrity',
    group: 'environmental',
    subGroup: 'Modified Vulnerable System Impact',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Vulnerable System Integrity impact.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base VI value.', isDefault: true },
      { value: 'H', label: 'High (H)', description: 'Total loss of integrity in the Vulnerable System.' },
      { value: 'L', label: 'Low (L)', description: 'Limited modification of data in the Vulnerable System.' },
      { value: 'N', label: 'None (N)', description: 'No loss of integrity in the Vulnerable System.' },
    ],
  },
  {
    key: 'MVA',
    name: 'Modified Vulnerable System Availability',
    group: 'environmental',
    subGroup: 'Modified Vulnerable System Impact',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Vulnerable System Availability impact.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base VA value.', isDefault: true },
      { value: 'H', label: 'High (H)', description: 'Total loss of availability in the Vulnerable System.' },
      { value: 'L', label: 'Low (L)', description: 'Reduced performance or interruptions in the Vulnerable System.' },
      { value: 'N', label: 'None (N)', description: 'No impact to availability in the Vulnerable System.' },
    ],
  },
  {
    key: 'MSC',
    name: 'Modified Subsequent System Confidentiality',
    group: 'environmental',
    subGroup: 'Modified Subsequent System Impact',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Subsequent System Confidentiality impact.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base SC value.', isDefault: true },
      { value: 'H', label: 'High (H)', description: 'Total loss of confidentiality in the Subsequent System.' },
      { value: 'L', label: 'Low (L)', description: 'Some loss of confidentiality in the Subsequent System.' },
      { value: 'N', label: 'Negligible (N)', description: 'No loss of confidentiality in the Subsequent System.' },
    ],
  },
  {
    key: 'MSI',
    name: 'Modified Subsequent System Integrity',
    group: 'environmental',
    subGroup: 'Modified Subsequent System Impact',
    required: false,
    defaultValue: 'X',
    controlType: 'select',
    description: 'Overrides the Base Subsequent System Integrity impact, including potential human safety impact.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base SI value.', isDefault: true },
      { value: 'S', label: 'Safety (S)', description: 'Integrity impacts could cause serious injury or worse (IEC 61508 Marginal or worse) to a human.' },
      { value: 'H', label: 'High (H)', description: 'Total loss of integrity in the Subsequent System.' },
      { value: 'L', label: 'Low (L)', description: 'Limited modification of data in the Subsequent System.' },
      { value: 'N', label: 'Negligible (N)', description: 'No loss of integrity in the Subsequent System.' },
    ],
  },
  {
    key: 'MSA',
    name: 'Modified Subsequent System Availability',
    group: 'environmental',
    subGroup: 'Modified Subsequent System Impact',
    required: false,
    defaultValue: 'X',
    controlType: 'select',
    description: 'Overrides the Base Subsequent System Availability impact, including potential human safety impact.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base SA value.', isDefault: true },
      { value: 'S', label: 'Safety (S)', description: 'Availability impacts could cause serious injury or worse (IEC 61508 Marginal or worse) to a human.' },
      { value: 'H', label: 'High (H)', description: 'Total loss of availability in the Subsequent System.' },
      { value: 'L', label: 'Low (L)', description: 'Reduced performance or interruptions in the Subsequent System.' },
      { value: 'N', label: 'Negligible (N)', description: 'No impact to availability in the Subsequent System.' },
    ],
  },
  // Supplemental (6 metrics - never alter numeric score)
  {
    key: 'S',
    name: 'Safety',
    group: 'supplemental',
    subGroup: 'Supplemental Metrics (Contextual Only)',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Indicates whether exploiting the vulnerability may have Safety impact under IEC 61508. Does not change the numeric score.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Metric has not been evaluated.', isDefault: true },
      { value: 'N', label: 'Negligible (N)', description: 'Meets IEC 61508 consequence category "negligible".' },
      { value: 'P', label: 'Present (P)', description: 'Meets IEC 61508 consequence categories "marginal", "critical", or "catastrophic".' },
    ],
  },
  {
    key: 'AU',
    name: 'Automatable',
    group: 'supplemental',
    subGroup: 'Supplemental Metrics (Contextual Only)',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Captures whether an attacker can reliably automate exploitation events across multiple targets (steps 1-4 of kill chain). Does not change the numeric score.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Metric has not been evaluated.', isDefault: true },
      { value: 'N', label: 'No (N)', description: 'Attackers cannot reliably automate all 4 steps of the kill chain.' },
      { value: 'Y', label: 'Yes (Y)', description: 'Attackers can reliably automate all 4 steps of the kill chain (wormable).' },
    ],
  },
  {
    key: 'R',
    name: 'Recovery',
    group: 'supplemental',
    subGroup: 'Supplemental Metrics (Contextual Only)',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Describes the resilience of a system to recover services in terms of performance and availability after an attack. Does not change the numeric score.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Metric has not been evaluated.', isDefault: true },
      { value: 'A', label: 'Automatic (A)', description: 'The system recovers services automatically after an attack.' },
      { value: 'U', label: 'User (U)', description: 'Requires manual intervention by the user to recover services.' },
      { value: 'I', label: 'Irrecoverable (I)', description: 'System services are irrecoverable by the user after an attack.' },
    ],
  },
  {
    key: 'V',
    name: 'Value Density',
    group: 'supplemental',
    subGroup: 'Supplemental Metrics (Contextual Only)',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Describes the resources that the attacker will gain control over with a single exploitation event. Does not change the numeric score.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Metric has not been evaluated.', isDefault: true },
      { value: 'D', label: 'Diffuse (D)', description: 'The vulnerable system has limited resources (such as a single client workstation).' },
      { value: 'C', label: 'Concentrated (C)', description: 'The vulnerable system is rich in resources (such as a central server or domain controller).' },
    ],
  },
  {
    key: 'RE',
    name: 'Vulnerability Response Effort',
    group: 'supplemental',
    subGroup: 'Supplemental Metrics (Contextual Only)',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Provides supplemental information on how difficult it is for consumers to provide an initial response. Does not change the numeric score.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Metric has not been evaluated.', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'Effort required to respond to the vulnerability is low or trivial.' },
      { value: 'M', label: 'Moderate (M)', description: 'Requires some effort on behalf of the consumer and could cause minimal service impact.' },
      { value: 'H', label: 'High (H)', description: 'Actions required to respond are significant or difficult, potentially leading to extended service impact.' },
    ],
  },
  {
    key: 'U',
    name: 'Provider Urgency',
    group: 'supplemental',
    subGroup: 'Supplemental Metrics (Contextual Only)',
    required: false,
    defaultValue: 'X',
    controlType: 'select',
    description: 'Incorporates additional provider-supplied urgency assessment. Does not change the numeric score.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Metric has not been evaluated.', isDefault: true },
      { value: 'Clear', label: 'Clear', description: 'Provider assessed the impact as having no urgency (Informational).' },
      { value: 'Green', label: 'Green', description: 'Provider assessed the impact as having a reduced urgency.' },
      { value: 'Amber', label: 'Amber', description: 'Provider assessed the impact as having a moderate urgency.' },
      { value: 'Red', label: 'Red', description: 'Provider assessed the impact as having the highest urgency.' },
    ],
  },
];

export const V4_GROUPS: MetricGroupDefinition[] = [
  {
    id: 'base',
    label: 'Base',
    description: 'Intrinsic characteristics of a vulnerability that are constant over time and across user environments (11 mandatory metrics).',
    metrics: V4_METRICS.filter((m) => m.group === 'base'),
  },
  {
    id: 'threat',
    label: 'Threat',
    description: 'Characteristics of a vulnerability that change over time based on exploit maturity.',
    metrics: V4_METRICS.filter((m) => m.group === 'threat'),
  },
  {
    id: 'environmental',
    label: 'Environmental',
    description: 'Characteristics unique to a user’s environment, including asset security requirements and modified base metrics.',
    metrics: V4_METRICS.filter((m) => m.group === 'environmental'),
  },
  {
    id: 'supplemental',
    label: 'Supplemental',
    description: 'Contextual attributes that describe extrinsic characteristics. Supplemental metrics are recorded in the vector string but never modify the numeric CVSS v4.0 score.',
    metrics: V4_METRICS.filter((m) => m.group === 'supplemental'),
  },
];

export const V4_SCHEMA: VersionSchema = {
  version: '4.0',
  prefix: 'CVSS:4.0',
  groups: V4_GROUPS,
  allMetrics: V4_METRICS,
};

const V4_BASE_KEYS = ['AV', 'AC', 'AT', 'PR', 'UI', 'VC', 'VI', 'VA', 'SC', 'SI', 'SA'] as const;
const V4_THREAT_KEYS = ['E'] as const;
const V4_ENV_KEYS = [
  'CR',
  'IR',
  'AR',
  'MAV',
  'MAC',
  'MAT',
  'MPR',
  'MUI',
  'MVC',
  'MVI',
  'MVA',
  'MSC',
  'MSI',
  'MSA',
] as const;
const V4_SUPP_KEYS = ['S', 'AU', 'R', 'V', 'RE', 'U'] as const;
const V4_CANONICAL_ORDER = [
  ...V4_BASE_KEYS,
  ...V4_THREAT_KEYS,
  ...V4_ENV_KEYS,
  ...V4_SUPP_KEYS,
] as const;

export function getV4Severity(score: number): SeverityLevel {
  if (score === 0) return 'None';
  if (score < 4.0) return 'Low';
  if (score < 7.0) return 'Medium';
  if (score < 9.0) return 'High';
  return 'Critical';
}

export function createInitialV4Metrics(): Record<string, string> {
  const state: Record<string, string> = {};
  for (const m of V4_METRICS) {
    state[m.key] = m.defaultValue;
  }
  return state;
}

export function getMissingV4BaseMetrics(metrics: Record<string, string>): string[] {
  const missing: string[] = [];
  for (const key of V4_BASE_KEYS) {
    const val = metrics[key];
    const def = V4_METRICS.find((m) => m.key === key)!;
    if (!val || !def.options.some((o) => o.value === val)) {
      missing.push(key);
    }
  }
  return missing;
}

export function serializeV4Vector(metrics: Record<string, string>): string {
  const missing = getMissingV4BaseMetrics(metrics);
  if (missing.length > 0) return '';

  let value = 'CVSS:4.0';
  for (const key of V4_CANONICAL_ORDER) {
    const selected = metrics[key];
    if (!selected) continue;
    if ((V4_BASE_KEYS as readonly string[]).includes(key)) {
      value += `/${key}:${selected}`;
    } else if (selected !== 'X') {
      value += `/${key}:${selected}`;
    }
  }
  return value;
}

export function parseV4Vector(rawText: string): ParseResult {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return {
      ok: false,
      error: 'Vector string is empty. Enter a CVSS v4.0 vector starting with CVSS:4.0/...',
    };
  }

  const segments = trimmed.split('/');
  const prefix = segments[0];
  if (prefix !== 'CVSS:4.0') {
    return {
      ok: false,
      error: `Invalid prefix "${prefix}". Expected "CVSS:4.0/..." for CVSS v4.0.`,
    };
  }

  if (segments.length < 2) {
    return {
      ok: false,
      error: 'Vector contains no metrics after "CVSS:4.0".',
    };
  }

  const parsed = createInitialV4Metrics();
  const seen = new Set<string>();
  let lastOrderIdx = -1;

  for (let i = 1; i < segments.length; i++) {
    const seg = segments[i];
    if (!seg) {
      return { ok: false, error: 'Malformed vector: empty metric segment between "/" delimiters.' };
    }
    const colonIdx = seg.indexOf(':');
    if (colonIdx === -1 || seg.indexOf(':', colonIdx + 1) !== -1) {
      return { ok: false, error: `Malformed metric segment "${seg}". Expected KEY:VALUE.` };
    }
    const key = seg.slice(0, colonIdx);
    const val = seg.slice(colonIdx + 1);

    const defIdx = V4_METRICS.findIndex((m) => m.key === key);
    if (defIdx === -1) {
      return { ok: false, error: `Unknown CVSS v4.0 metric "${key}".` };
    }
    if (seen.has(key)) {
      return { ok: false, error: `Duplicate metric "${key}" in vector.` };
    }
    if (defIdx < lastOrderIdx) {
      const prevKey = V4_METRICS[lastOrderIdx].key;
      return {
        ok: false,
        error: `Invalid CVSS v4.0 metric order: "${key}" cannot appear after "${prevKey}". CVSS v4.0 requires strict canonical metric ordering.`,
      };
    }

    const def = V4_METRICS[defIdx];
    if (!def.options.some((o) => o.value === val)) {
      const allowed = def.options.map((o) => o.value).join(', ');
      return {
        ok: false,
        error: `Invalid value "${val}" for metric "${key}". Allowed values: ${allowed}.`,
      };
    }

    seen.add(key);
    lastOrderIdx = defIdx;
    parsed[key] = val;
  }

  const missingBase = getMissingV4BaseMetrics(parsed);
  if (missingBase.length > 0) {
    return {
      ok: false,
      error: `Incomplete CVSS v4.0 vector. Missing required Base metric(s): ${missingBase.join(', ')}.`,
    };
  }

  return {
    ok: true,
    version: '4.0',
    metrics: parsed,
    canonicalVector: serializeV4Vector(parsed),
    isComplete: true,
    missingBaseMetrics: [],
  };
}

function effectiveMetric(cvssSelected: Record<string, string>, metric: string): string {
  const selected = cvssSelected[metric] ?? 'X';

  if (metric === 'E' && selected === 'X') return 'A';
  if (metric === 'CR' && selected === 'X') return 'H';
  if (metric === 'IR' && selected === 'X') return 'H';
  if (metric === 'AR' && selected === 'X') return 'H';

  const modifiedKey = 'M' + metric;
  if (modifiedKey in cvssSelected) {
    const modifiedSelected = cvssSelected[modifiedKey];
    if (modifiedSelected && modifiedSelected !== 'X') {
      return modifiedSelected;
    }
  }

  return selected;
}

export function computeV4MacroVector(cvssSelected: Record<string, string>): string {
  const av = effectiveMetric(cvssSelected, 'AV');
  const pr = effectiveMetric(cvssSelected, 'PR');
  const ui = effectiveMetric(cvssSelected, 'UI');

  let eq1 = '2';
  if (av === 'N' && pr === 'N' && ui === 'N') {
    eq1 = '0';
  } else if ((av === 'N' || pr === 'N' || ui === 'N') && !(av === 'N' && pr === 'N' && ui === 'N') && av !== 'P') {
    eq1 = '1';
  }

  const ac = effectiveMetric(cvssSelected, 'AC');
  const at = effectiveMetric(cvssSelected, 'AT');
  const eq2 = ac === 'L' && at === 'N' ? '0' : '1';

  const vc = effectiveMetric(cvssSelected, 'VC');
  const vi = effectiveMetric(cvssSelected, 'VI');
  const va = effectiveMetric(cvssSelected, 'VA');
  let eq3 = '2';
  if (vc === 'H' && vi === 'H') {
    eq3 = '0';
  } else if (!(vc === 'H' && vi === 'H') && (vc === 'H' || vi === 'H' || va === 'H')) {
    eq3 = '1';
  }

  const msi = effectiveMetric(cvssSelected, 'MSI');
  const msa = effectiveMetric(cvssSelected, 'MSA');
  const sc = effectiveMetric(cvssSelected, 'SC');
  const si = effectiveMetric(cvssSelected, 'SI');
  const sa = effectiveMetric(cvssSelected, 'SA');
  let eq4 = '2';
  if (msi === 'S' || msa === 'S') {
    eq4 = '0';
  } else if (sc === 'H' || si === 'H' || sa === 'H') {
    eq4 = '1';
  }

  const e = effectiveMetric(cvssSelected, 'E');
  let eq5 = '2';
  if (e === 'A') eq5 = '0';
  else if (e === 'P') eq5 = '1';

  const cr = effectiveMetric(cvssSelected, 'CR');
  const ir = effectiveMetric(cvssSelected, 'IR');
  const ar = effectiveMetric(cvssSelected, 'AR');
  const eq6 = (cr === 'H' && vc === 'H') || (ir === 'H' && vi === 'H') || (ar === 'H' && va === 'H') ? '0' : '1';

  return `${eq1}${eq2}${eq3}${eq4}${eq5}${eq6}`;
}

function extractValueMetric(metric: string, str: string): string {
  const idx = str.indexOf(metric + ':');
  if (idx === -1) return '';
  const extracted = str.slice(idx + metric.length + 1);
  const slashIdx = extracted.indexOf('/');
  return slashIdx > 0 ? extracted.substring(0, slashIdx) : extracted;
}

const AV_LEVELS: Record<string, number> = { N: 0.0, A: 0.1, L: 0.2, P: 0.3 };
const PR_LEVELS: Record<string, number> = { N: 0.0, L: 0.1, H: 0.2 };
const UI_LEVELS: Record<string, number> = { N: 0.0, P: 0.1, A: 0.2 };
const AC_LEVELS: Record<string, number> = { L: 0.0, H: 0.1 };
const AT_LEVELS: Record<string, number> = { N: 0.0, P: 0.1 };
const VC_LEVELS: Record<string, number> = { H: 0.0, L: 0.1, N: 0.2 };
const VI_LEVELS: Record<string, number> = { H: 0.0, L: 0.1, N: 0.2 };
const VA_LEVELS: Record<string, number> = { H: 0.0, L: 0.1, N: 0.2 };
const SC_LEVELS: Record<string, number> = { H: 0.1, L: 0.2, N: 0.3 };
const SI_LEVELS: Record<string, number> = { S: 0.0, H: 0.1, L: 0.2, N: 0.3 };
const SA_LEVELS: Record<string, number> = { S: 0.0, H: 0.1, L: 0.2, N: 0.3 };
const CR_LEVELS: Record<string, number> = { H: 0.0, M: 0.1, L: 0.2 };
const IR_LEVELS: Record<string, number> = { H: 0.0, M: 0.1, L: 0.2 };
const AR_LEVELS: Record<string, number> = { H: 0.0, M: 0.1, L: 0.2 };

export function computeRawV4Score(cvssSelected: Record<string, string>): { score: number; macroVector: string } {
  const macro = computeV4MacroVector(cvssSelected);

  if (['VC', 'VI', 'VA', 'SC', 'SI', 'SA'].every((metric) => effectiveMetric(cvssSelected, metric) === 'N')) {
    return { score: 0.0, macroVector: macro };
  }

  let value = CVSS4_LOOKUP[macro];

  const eq1 = parseInt(macro[0], 10);
  const eq2 = parseInt(macro[1], 10);
  const eq3 = parseInt(macro[2], 10);
  const eq4 = parseInt(macro[3], 10);
  const eq5 = parseInt(macro[4], 10);
  const eq6 = parseInt(macro[5], 10);

  const eq1NextLower = `${eq1 + 1}${eq2}${eq3}${eq4}${eq5}${eq6}`;
  const eq2NextLower = `${eq1}${eq2 + 1}${eq3}${eq4}${eq5}${eq6}`;

  let eq3eq6NextLower = '';
  let eq3eq6NextLowerLeft = '';
  let eq3eq6NextLowerRight = '';

  if (eq3 === 1 && eq6 === 1) {
    eq3eq6NextLower = `${eq1}${eq2}${eq3 + 1}${eq4}${eq5}${eq6}`;
  } else if (eq3 === 0 && eq6 === 1) {
    eq3eq6NextLower = `${eq1}${eq2}${eq3 + 1}${eq4}${eq5}${eq6}`;
  } else if (eq3 === 1 && eq6 === 0) {
    eq3eq6NextLower = `${eq1}${eq2}${eq3}${eq4}${eq5}${eq6 + 1}`;
  } else if (eq3 === 0 && eq6 === 0) {
    eq3eq6NextLowerLeft = `${eq1}${eq2}${eq3}${eq4}${eq5}${eq6 + 1}`;
    eq3eq6NextLowerRight = `${eq1}${eq2}${eq3 + 1}${eq4}${eq5}${eq6}`;
  } else {
    eq3eq6NextLower = `${eq1}${eq2}${eq3 + 1}${eq4}${eq5}${eq6 + 1}`;
  }

  const eq4NextLower = `${eq1}${eq2}${eq3}${eq4 + 1}${eq5}${eq6}`;
  const eq5NextLower = `${eq1}${eq2}${eq3}${eq4}${eq5 + 1}${eq6}`;

  const scoreEq1NextLower = CVSS4_LOOKUP[eq1NextLower] ?? NaN;
  const scoreEq2NextLower = CVSS4_LOOKUP[eq2NextLower] ?? NaN;

  let scoreEq3eq6NextLower: number;
  if (eq3 === 0 && eq6 === 0) {
    const leftScore = CVSS4_LOOKUP[eq3eq6NextLowerLeft] ?? NaN;
    const rightScore = CVSS4_LOOKUP[eq3eq6NextLowerRight] ?? NaN;
    scoreEq3eq6NextLower = leftScore > rightScore ? leftScore : rightScore;
  } else {
    scoreEq3eq6NextLower = CVSS4_LOOKUP[eq3eq6NextLower] ?? NaN;
  }

  const scoreEq4NextLower = CVSS4_LOOKUP[eq4NextLower] ?? NaN;
  const scoreEq5NextLower = CVSS4_LOOKUP[eq5NextLower] ?? NaN;

  const eq1Maxes = CVSS4_MAX_COMPOSED.eq1[macro[0]];
  const eq2Maxes = CVSS4_MAX_COMPOSED.eq2[macro[1]];
  const eq3Eq6Maxes = CVSS4_MAX_COMPOSED.eq3[macro[2]][macro[5]];
  const eq4Maxes = CVSS4_MAX_COMPOSED.eq4[macro[3]];
  const eq5Maxes = CVSS4_MAX_COMPOSED.eq5[macro[4]];

  const maxVectors: string[] = [];
  for (const eq1Max of eq1Maxes) {
    for (const eq2Max of eq2Maxes) {
      for (const eq3Eq6Max of eq3Eq6Maxes) {
        for (const eq4Max of eq4Maxes) {
          for (const eq5Max of eq5Maxes) {
            maxVectors.push(eq1Max + eq2Max + eq3Eq6Max + eq4Max + eq5Max);
          }
        }
      }
    }
  }

  let distAV = 0;
  let distPR = 0;
  let distUI = 0;
  let distAC = 0;
  let distAT = 0;
  let distVC = 0;
  let distVI = 0;
  let distVA = 0;
  let distSC = 0;
  let distSI = 0;
  let distSA = 0;
  let distCR = 0;
  let distIR = 0;
  let distAR = 0;

  for (let i = 0; i < maxVectors.length; i++) {
    const maxVec = maxVectors[i];
    distAV = AV_LEVELS[effectiveMetric(cvssSelected, 'AV')] - AV_LEVELS[extractValueMetric('AV', maxVec)];
    distPR = PR_LEVELS[effectiveMetric(cvssSelected, 'PR')] - PR_LEVELS[extractValueMetric('PR', maxVec)];
    distUI = UI_LEVELS[effectiveMetric(cvssSelected, 'UI')] - UI_LEVELS[extractValueMetric('UI', maxVec)];

    distAC = AC_LEVELS[effectiveMetric(cvssSelected, 'AC')] - AC_LEVELS[extractValueMetric('AC', maxVec)];
    distAT = AT_LEVELS[effectiveMetric(cvssSelected, 'AT')] - AT_LEVELS[extractValueMetric('AT', maxVec)];

    distVC = VC_LEVELS[effectiveMetric(cvssSelected, 'VC')] - VC_LEVELS[extractValueMetric('VC', maxVec)];
    distVI = VI_LEVELS[effectiveMetric(cvssSelected, 'VI')] - VI_LEVELS[extractValueMetric('VI', maxVec)];
    distVA = VA_LEVELS[effectiveMetric(cvssSelected, 'VA')] - VA_LEVELS[extractValueMetric('VA', maxVec)];

    distSC = SC_LEVELS[effectiveMetric(cvssSelected, 'SC')] - SC_LEVELS[extractValueMetric('SC', maxVec)];
    distSI = SI_LEVELS[effectiveMetric(cvssSelected, 'SI')] - SI_LEVELS[extractValueMetric('SI', maxVec)];
    distSA = SA_LEVELS[effectiveMetric(cvssSelected, 'SA')] - SA_LEVELS[extractValueMetric('SA', maxVec)];

    distCR = CR_LEVELS[effectiveMetric(cvssSelected, 'CR')] - CR_LEVELS[extractValueMetric('CR', maxVec)];
    distIR = IR_LEVELS[effectiveMetric(cvssSelected, 'IR')] - IR_LEVELS[extractValueMetric('IR', maxVec)];
    distAR = AR_LEVELS[effectiveMetric(cvssSelected, 'AR')] - AR_LEVELS[extractValueMetric('AR', maxVec)];

    if (
      [
        distAV,
        distPR,
        distUI,
        distAC,
        distAT,
        distVC,
        distVI,
        distVA,
        distSC,
        distSI,
        distSA,
        distCR,
        distIR,
        distAR,
      ].some((met) => met < 0)
    ) {
      continue;
    }
    break;
  }

  const currentSeverityDistEq1 = distAV + distPR + distUI;
  const currentSeverityDistEq2 = distAC + distAT;
  const currentSeverityDistEq3eq6 = distVC + distVI + distVA + distCR + distIR + distAR;
  const currentSeverityDistEq4 = distSC + distSI + distSA;

  const step = 0.1;

  const availableDistEq1 = value - scoreEq1NextLower;
  const availableDistEq2 = value - scoreEq2NextLower;
  const availableDistEq3eq6 = value - scoreEq3eq6NextLower;
  const availableDistEq4 = value - scoreEq4NextLower;
  const availableDistEq5 = value - scoreEq5NextLower;

  let nExistingLower = 0;
  let normalizedEq1 = 0;
  let normalizedEq2 = 0;
  let normalizedEq3eq6 = 0;
  let normalizedEq4 = 0;
  let normalizedEq5 = 0;

  const maxSeverityEq1 = CVSS4_MAX_SEVERITY.eq1[eq1] * step;
  const maxSeverityEq2 = CVSS4_MAX_SEVERITY.eq2[eq2] * step;
  const maxSeverityEq3eq6 = CVSS4_MAX_SEVERITY.eq3eq6[eq3][eq6] * step;
  const maxSeverityEq4 = CVSS4_MAX_SEVERITY.eq4[eq4] * step;

  if (!Number.isNaN(availableDistEq1)) {
    nExistingLower += 1;
    normalizedEq1 = availableDistEq1 * (currentSeverityDistEq1 / maxSeverityEq1);
  }
  if (!Number.isNaN(availableDistEq2)) {
    nExistingLower += 1;
    normalizedEq2 = availableDistEq2 * (currentSeverityDistEq2 / maxSeverityEq2);
  }
  if (!Number.isNaN(availableDistEq3eq6)) {
    nExistingLower += 1;
    normalizedEq3eq6 = availableDistEq3eq6 * (currentSeverityDistEq3eq6 / maxSeverityEq3eq6);
  }
  if (!Number.isNaN(availableDistEq4)) {
    nExistingLower += 1;
    normalizedEq4 = availableDistEq4 * (currentSeverityDistEq4 / maxSeverityEq4);
  }
  if (!Number.isNaN(availableDistEq5)) {
    nExistingLower += 1;
    normalizedEq5 = 0;
  }

  const meanDistance =
    nExistingLower === 0
      ? 0
      : (normalizedEq1 + normalizedEq2 + normalizedEq3eq6 + normalizedEq4 + normalizedEq5) / nExistingLower;

  value -= meanDistance;
  if (value < 0) value = 0.0;
  if (value > 10) value = 10.0;

  const rounded = Math.round(value * 10) / 10;
  return { score: rounded, macroVector: macro };
}

export function calculateV4Score(metrics: Record<string, string>): ScoreResult {
  const missing = getMissingV4BaseMetrics(metrics);
  if (missing.length > 0) {
    return {
      isComplete: false,
      version: '4.0',
      missingBaseMetrics: missing,
    };
  }

  const normalized = createInitialV4Metrics();
  for (const m of V4_METRICS) {
    if (metrics[m.key]) {
      normalized[m.key] = metrics[m.key];
    }
  }

  const { score: primaryScore, macroVector } = computeRawV4Score(normalized);
  const primarySeverity = getV4Severity(primaryScore);

  const baseOnlyMetrics = createInitialV4Metrics();
  for (const key of V4_BASE_KEYS) {
    baseOnlyMetrics[key] = normalized[key];
  }
  const { score: baseScore } = computeRawV4Score(baseOnlyMetrics);
  const baseSeverity = getV4Severity(baseScore);

  const hasThreat = V4_THREAT_KEYS.some((k) => normalized[k] && normalized[k] !== 'X');
  const hasEnvironmental = V4_ENV_KEYS.some((k) => normalized[k] && normalized[k] !== 'X');
  const hasSupplemental = V4_SUPP_KEYS.some((k) => normalized[k] && normalized[k] !== 'X');

  let nomenclature: Cvss4Nomenclature = 'CVSS-B';
  if (hasThreat && hasEnvironmental) {
    nomenclature = 'CVSS-BTE';
  } else if (hasThreat) {
    nomenclature = 'CVSS-BT';
  } else if (hasEnvironmental) {
    nomenclature = 'CVSS-BE';
  }

  const result: CompleteScoreResult = {
    isComplete: true,
    version: '4.0',
    primaryScore,
    primarySeverity,
    baseScore,
    baseSeverity,
    nomenclature,
    macroVector,
    hasTemporalOrThreat: hasThreat,
    hasEnvironmental,
    hasSupplemental,
    canonicalVector: serializeV4Vector(normalized),
  };

  return result;
}
