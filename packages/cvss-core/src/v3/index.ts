import type {
  CompleteScoreResult,
  MetricDefinition,
  MetricGroupDefinition,
  ParseResult,
  ScoreResult,
  SeverityLevel,
  VersionSchema,
} from '../types.js';

export const V3_METRICS: MetricDefinition[] = [
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
      { value: 'N', label: 'Network (N)', description: 'Bound to the network stack and remotely exploitable across one or more hops.' },
      { value: 'A', label: 'Adjacent (A)', description: 'Bound to the protocol stack, limited to the same shared physical or logical network.' },
      { value: 'L', label: 'Local (L)', description: 'Attack path is via local read/write/execute capabilities or user interaction.' },
      { value: 'P', label: 'Physical (P)', description: 'Requires the attacker to physically touch or manipulate the vulnerable component.' },
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
    description: 'Describes the conditions beyond the attacker’s control that must exist in order to exploit the vulnerability.',
    options: [
      { value: 'L', label: 'Low (L)', description: 'Specialized access conditions or extenuating circumstances do not exist.' },
      { value: 'H', label: 'High (H)', description: 'Successful attack depends on conditions beyond the attacker’s control.' },
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
    description: 'Describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.',
    options: [
      { value: 'N', label: 'None (N)', description: 'Attacker is unauthorized prior to attack and requires no access to settings or files.' },
      { value: 'L', label: 'Low (L)', description: 'Requires privileges that provide basic user capabilities.' },
      { value: 'H', label: 'High (H)', description: 'Requires privileges that provide significant administrative control over the component.' },
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
    description: 'Captures the requirement for a human user, other than the attacker, to participate in the compromise.',
    options: [
      { value: 'N', label: 'None (N)', description: 'The system can be exploited without interaction from any user.' },
      { value: 'R', label: 'Required (R)', description: 'Requires a user to take some action before the vulnerability can be exploited.' },
    ],
  },
  {
    key: 'S',
    name: 'Scope',
    group: 'base',
    subGroup: 'Scope',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope.',
    options: [
      { value: 'U', label: 'Unchanged (U)', description: 'An exploited vulnerability can only affect resources managed by the same security authority.' },
      { value: 'C', label: 'Changed (C)', description: 'An exploited vulnerability can affect resources beyond the security scope managed by the security authority.' },
    ],
  },
  // Base - Impact (3 metrics)
  {
    key: 'C',
    name: 'Confidentiality',
    group: 'base',
    subGroup: 'Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to the confidentiality of the information resources managed by a software component.',
    options: [
      { value: 'N', label: 'None (N)', description: 'There is no loss of confidentiality within the impacted component.' },
      { value: 'L', label: 'Low (L)', description: 'There is some loss of confidentiality; access to some restricted information is obtained.' },
      { value: 'H', label: 'High (H)', description: 'There is total loss of confidentiality, resulting in all resources within the impacted component being divulged.' },
    ],
  },
  {
    key: 'I',
    name: 'Integrity',
    group: 'base',
    subGroup: 'Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to integrity of a successfully exploited vulnerability.',
    options: [
      { value: 'N', label: 'None (N)', description: 'There is no loss of integrity within the impacted component.' },
      { value: 'L', label: 'Low (L)', description: 'Modification of data is possible, without control over the consequence of modification.' },
      { value: 'H', label: 'High (H)', description: 'There is a total loss of integrity, or a complete loss of protection.' },
    ],
  },
  {
    key: 'A',
    name: 'Availability',
    group: 'base',
    subGroup: 'Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability.',
    options: [
      { value: 'N', label: 'None (N)', description: 'There is no impact to availability within the impacted component.' },
      { value: 'L', label: 'Low (L)', description: 'Performance is reduced or there are interruptions in resource availability.' },
      { value: 'H', label: 'High (H)', description: 'There is total loss of availability, resulting in the attacker being able to fully deny access to resources.' },
    ],
  },
  // Temporal (3 metrics)
  {
    key: 'E',
    name: 'Exploit Code Maturity',
    group: 'temporal',
    subGroup: 'Temporal Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'select',
    description: 'Measures the likelihood of the vulnerability being attacked based on the current state of exploit techniques.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Skip this metric (weight 1.0).', isDefault: true },
      { value: 'U', label: 'Unproven (U)', description: 'No exploit code is available, or an exploit is theoretical.' },
      { value: 'P', label: 'Proof-of-Concept (P)', description: 'Proof-of-concept exploit code is available, or an attack demonstration is not practical for most systems.' },
      { value: 'F', label: 'Functional (F)', description: 'Functional exploit code is available and works in most situations where the vulnerability exists.' },
      { value: 'H', label: 'High (H)', description: 'Functional autonomous code exists, or no exploit is required (manual trigger) and details are widely available.' },
    ],
  },
  {
    key: 'RL',
    name: 'Remediation Level',
    group: 'temporal',
    subGroup: 'Temporal Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'select',
    description: 'Prioritizes the remediation status of a vulnerability.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Skip this metric (weight 1.0).', isDefault: true },
      { value: 'O', label: 'Official Fix (O)', description: 'A complete vendor solution is available (either patch or upgrade).' },
      { value: 'T', label: 'Temporary Fix (T)', description: 'There is an official but temporary fix available, such as a hotfix.' },
      { value: 'W', label: 'Workaround (W)', description: 'There is an unofficial, non-vendor solution available.' },
      { value: 'U', label: 'Unavailable (U)', description: 'There is either no solution available or it is impossible to apply.' },
    ],
  },
  {
    key: 'RC',
    name: 'Report Confidence',
    group: 'temporal',
    subGroup: 'Temporal Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Measures the degree of confidence in the existence of the vulnerability and the credibility of the known technical details.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Skip this metric (weight 1.0).', isDefault: true },
      { value: 'U', label: 'Unknown (U)', description: 'There are reports of impacts that indicate a vulnerability is present, with unknown cause.' },
      { value: 'R', label: 'Reasonable (R)', description: 'Significant details are published, and researchers have confidence in the reproducibility.' },
      { value: 'C', label: 'Confirmed (C)', description: 'Detailed reports exist, or functional reproduction is possible.' },
    ],
  },
  // Environmental - Security Requirements (3 metrics)
  {
    key: 'CR',
    name: 'Confidentiality Requirement',
    group: 'environmental',
    subGroup: 'Security Requirements',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Customizes the score depending on the importance of the affected IT asset to the organization in terms of Confidentiality.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'No impact modifier applied (weight 1.0).', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'Loss of Confidentiality is likely to have only a limited adverse effect.' },
      { value: 'M', label: 'Medium (M)', description: 'Loss of Confidentiality is likely to have a serious adverse effect.' },
      { value: 'H', label: 'High (H)', description: 'Loss of Confidentiality is likely to have a catastrophic adverse effect.' },
    ],
  },
  {
    key: 'IR',
    name: 'Integrity Requirement',
    group: 'environmental',
    subGroup: 'Security Requirements',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Customizes the score depending on the importance of the affected IT asset to the organization in terms of Integrity.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'No impact modifier applied (weight 1.0).', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'Loss of Integrity is likely to have only a limited adverse effect.' },
      { value: 'M', label: 'Medium (M)', description: 'Loss of Integrity is likely to have a serious adverse effect.' },
      { value: 'H', label: 'High (H)', description: 'Loss of Integrity is likely to have a catastrophic adverse effect.' },
    ],
  },
  {
    key: 'AR',
    name: 'Availability Requirement',
    group: 'environmental',
    subGroup: 'Security Requirements',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Customizes the score depending on the importance of the affected IT asset to the organization in terms of Availability.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'No impact modifier applied (weight 1.0).', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'Loss of Availability is likely to have only a limited adverse effect.' },
      { value: 'M', label: 'Medium (M)', description: 'Loss of Availability is likely to have a serious adverse effect.' },
      { value: 'H', label: 'High (H)', description: 'Loss of Availability is likely to have a catastrophic adverse effect.' },
    ],
  },
  // Environmental - Modified Base Metrics (8 metrics)
  {
    key: 'MAV',
    name: 'Modified Attack Vector',
    group: 'environmental',
    subGroup: 'Modified Base Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'select',
    description: 'Overrides the Base Attack Vector based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Attack Vector value.', isDefault: true },
      { value: 'N', label: 'Network (N)', description: 'Remotely exploitable across one or more network hops.' },
      { value: 'A', label: 'Adjacent (A)', description: 'Limited to the same shared physical or logical network.' },
      { value: 'L', label: 'Local (L)', description: 'Attack path is via local capabilities or user interaction.' },
      { value: 'P', label: 'Physical (P)', description: 'Requires physical manipulation of the component.' },
    ],
  },
  {
    key: 'MAC',
    name: 'Modified Attack Complexity',
    group: 'environmental',
    subGroup: 'Modified Base Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Attack Complexity based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Attack Complexity value.', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'No specialized access conditions exist in the environment.' },
      { value: 'H', label: 'High (H)', description: 'Successful attack depends on conditions beyond the attacker’s control.' },
    ],
  },
  {
    key: 'MPR',
    name: 'Modified Privileges Required',
    group: 'environmental',
    subGroup: 'Modified Base Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Privileges Required based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Privileges Required value.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No privileges required.' },
      { value: 'L', label: 'Low (L)', description: 'Basic user privileges required.' },
      { value: 'H', label: 'High (H)', description: 'Administrative privileges required.' },
    ],
  },
  {
    key: 'MUI',
    name: 'Modified User Interaction',
    group: 'environmental',
    subGroup: 'Modified Base Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base User Interaction based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base User Interaction value.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No user interaction required.' },
      { value: 'R', label: 'Required (R)', description: 'User interaction required.' },
    ],
  },
  {
    key: 'MS',
    name: 'Modified Scope',
    group: 'environmental',
    subGroup: 'Modified Base Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Scope based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Scope value.', isDefault: true },
      { value: 'U', label: 'Unchanged (U)', description: 'Affects only resources managed by the same security authority.' },
      { value: 'C', label: 'Changed (C)', description: 'Can affect resources beyond the security scope.' },
    ],
  },
  {
    key: 'MC',
    name: 'Modified Confidentiality',
    group: 'environmental',
    subGroup: 'Modified Base Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Confidentiality impact based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Confidentiality value.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No loss of confidentiality in the environment.' },
      { value: 'L', label: 'Low (L)', description: 'Some loss of confidentiality in the environment.' },
      { value: 'H', label: 'High (H)', description: 'Total loss of confidentiality in the environment.' },
    ],
  },
  {
    key: 'MI',
    name: 'Modified Integrity',
    group: 'environmental',
    subGroup: 'Modified Base Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Integrity impact based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Integrity value.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No loss of integrity in the environment.' },
      { value: 'L', label: 'Low (L)', description: 'Limited modification of data in the environment.' },
      { value: 'H', label: 'High (H)', description: 'Total loss of integrity in the environment.' },
    ],
  },
  {
    key: 'MA',
    name: 'Modified Availability',
    group: 'environmental',
    subGroup: 'Modified Base Metrics',
    required: false,
    defaultValue: 'X',
    controlType: 'segmented',
    description: 'Overrides the Base Availability impact based on specific characteristics of the user environment.',
    options: [
      { value: 'X', label: 'Not Defined (X)', description: 'Use Base Availability value.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No impact to availability in the environment.' },
      { value: 'L', label: 'Low (L)', description: 'Reduced performance or interruptions in availability.' },
      { value: 'H', label: 'High (H)', description: 'Total loss of availability in the environment.' },
    ],
  },
];

export const V3_GROUPS: MetricGroupDefinition[] = [
  {
    id: 'base',
    label: 'Base',
    description: 'Intrinsic qualities of a vulnerability that are constant over time and across user environments.',
    metrics: V3_METRICS.filter((m) => m.group === 'base'),
  },
  {
    id: 'temporal',
    label: 'Temporal',
    description: 'Characteristics of a vulnerability that evolve over the lifetime of the vulnerability.',
    metrics: V3_METRICS.filter((m) => m.group === 'temporal'),
  },
  {
    id: 'environmental',
    label: 'Environmental',
    description: 'Characteristics of a vulnerability that are unique to a user’s environment and asset criticality.',
    metrics: V3_METRICS.filter((m) => m.group === 'environmental'),
  },
];

export const V31_SCHEMA: VersionSchema = {
  version: '3.1',
  prefix: 'CVSS:3.1',
  groups: V3_GROUPS,
  allMetrics: V3_METRICS,
};

export const V30_SCHEMA: VersionSchema = {
  version: '3.0',
  prefix: 'CVSS:3.0',
  groups: V3_GROUPS,
  allMetrics: V3_METRICS,
};

const V3_BASE_KEYS = ['AV', 'AC', 'PR', 'UI', 'S', 'C', 'I', 'A'] as const;
const V3_TEMPORAL_KEYS = ['E', 'RL', 'RC'] as const;
const V3_ENV_KEYS = ['CR', 'IR', 'AR', 'MAV', 'MAC', 'MPR', 'MUI', 'MS', 'MC', 'MI', 'MA'] as const;
const V3_CANONICAL_ORDER = [...V3_BASE_KEYS, ...V3_TEMPORAL_KEYS, ...V3_ENV_KEYS] as const;

const V3_WEIGHTS = {
  AV: { N: 0.85, A: 0.62, L: 0.55, P: 0.2 } as Record<string, number>,
  AC: { L: 0.77, H: 0.44 } as Record<string, number>,
  PR_U: { N: 0.85, L: 0.62, H: 0.27 } as Record<string, number>,
  PR_C: { N: 0.85, L: 0.68, H: 0.5 } as Record<string, number>,
  UI: { N: 0.85, R: 0.62 } as Record<string, number>,
  CIA: { H: 0.56, L: 0.22, N: 0.0 } as Record<string, number>,
  E: { X: 1.0, H: 1.0, F: 0.97, P: 0.94, U: 0.91 } as Record<string, number>,
  RL: { X: 1.0, U: 1.0, W: 0.97, T: 0.96, O: 0.95 } as Record<string, number>,
  RC: { X: 1.0, C: 1.0, R: 0.96, U: 0.92 } as Record<string, number>,
  REQ: { X: 1.0, H: 1.5, M: 1.0, L: 0.5 } as Record<string, number>,
};

// Official FIRST CVSS v3.1 Appendix A Roundup implementation
export function roundupV3(input: number): number {
  const intInput = Math.round(input * 100000);
  if (intInput % 10000 === 0) {
    return intInput / 100000;
  }
  return (Math.floor(intInput / 10000) + 1) / 10;
}

export function getV3Severity(score: number): SeverityLevel {
  if (score === 0) return 'None';
  if (score < 4.0) return 'Low';
  if (score < 7.0) return 'Medium';
  if (score < 9.0) return 'High';
  return 'Critical';
}

export function createInitialV3Metrics(): Record<string, string> {
  const state: Record<string, string> = {};
  for (const m of V3_METRICS) {
    state[m.key] = m.defaultValue;
  }
  return state;
}

export function getMissingV3BaseMetrics(metrics: Record<string, string>): string[] {
  const missing: string[] = [];
  for (const key of V3_BASE_KEYS) {
    const val = metrics[key];
    const def = V3_METRICS.find((m) => m.key === key)!;
    if (!val || !def.options.some((o) => o.value === val)) {
      missing.push(key);
    }
  }
  return missing;
}

export function serializeV3Vector(version: '3.1' | '3.0', metrics: Record<string, string>): string {
  const missing = getMissingV3BaseMetrics(metrics);
  if (missing.length > 0) return '';

  const parts: string[] = [`CVSS:${version}`];
  for (const key of V3_CANONICAL_ORDER) {
    const val = metrics[key];
    if (!val) continue;
    if ((V3_BASE_KEYS as readonly string[]).includes(key)) {
      parts.push(`${key}:${val}`);
    } else if (val !== 'X') {
      parts.push(`${key}:${val}`);
    }
  }
  return parts.join('/');
}

export function parseV3Vector(expectedVersion: '3.1' | '3.0', rawText: string): ParseResult {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return {
      ok: false,
      error: `Vector string is empty. Enter a CVSS v${expectedVersion} vector starting with CVSS:${expectedVersion}/...`,
    };
  }

  const segments = trimmed.split('/');
  const prefix = segments[0];
  const expectedPrefix = `CVSS:${expectedVersion}`;
  if (prefix !== expectedPrefix) {
    return {
      ok: false,
      error: `Invalid prefix "${prefix}". Expected "${expectedPrefix}/..." for CVSS v${expectedVersion}.`,
    };
  }

  if (segments.length < 2) {
    return {
      ok: false,
      error: `Vector contains no metrics after "${expectedPrefix}".`,
    };
  }

  const parsed = createInitialV3Metrics();
  const seen = new Set<string>();

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

    const def = V3_METRICS.find((m) => m.key === key);
    if (!def) {
      return { ok: false, error: `Unknown CVSS v${expectedVersion} metric "${key}".` };
    }
    if (seen.has(key)) {
      return { ok: false, error: `Duplicate metric "${key}" in vector.` };
    }
    if (!def.options.some((o) => o.value === val)) {
      const allowed = def.options.map((o) => o.value).join(', ');
      return { ok: false, error: `Invalid value "${val}" for metric "${key}". Allowed values: ${allowed}.` };
    }
    seen.add(key);
    parsed[key] = val;
  }

  const missingBase = getMissingV3BaseMetrics(parsed);
  if (missingBase.length > 0) {
    return {
      ok: false,
      error: `Incomplete CVSS v${expectedVersion} vector. Missing required Base metric(s): ${missingBase.join(', ')}.`,
    };
  }

  return {
    ok: true,
    version: expectedVersion,
    metrics: parsed,
    canonicalVector: serializeV3Vector(expectedVersion, parsed),
    isComplete: true,
    missingBaseMetrics: [],
  };
}

export function calculateV3Score(version: '3.1' | '3.0', metrics: Record<string, string>): ScoreResult {
  const missing = getMissingV3BaseMetrics(metrics);
  if (missing.length > 0) {
    return {
      isComplete: false,
      version,
      missingBaseMetrics: missing,
    };
  }

  const scope = metrics.S;
  const av = V3_WEIGHTS.AV[metrics.AV];
  const ac = V3_WEIGHTS.AC[metrics.AC];
  const pr = scope === 'C' ? V3_WEIGHTS.PR_C[metrics.PR] : V3_WEIGHTS.PR_U[metrics.PR];
  const ui = V3_WEIGHTS.UI[metrics.UI];
  const c = V3_WEIGHTS.CIA[metrics.C];
  const i = V3_WEIGHTS.CIA[metrics.I];
  const a = V3_WEIGHTS.CIA[metrics.A];

  const iss = 1 - (1 - c) * (1 - i) * (1 - a);
  const impact =
    scope === 'U'
      ? 6.42 * iss
      : 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15);
  const exploitability = 8.22 * av * ac * pr * ui;

  let baseScore = 0.0;
  if (impact > 0) {
    if (scope === 'U') {
      baseScore = roundupV3(Math.min(impact + exploitability, 10));
    } else {
      baseScore = roundupV3(Math.min(1.08 * (impact + exploitability), 10));
    }
  }
  const baseSeverity = getV3Severity(baseScore);

  const eVal = metrics.E || 'X';
  const rlVal = metrics.RL || 'X';
  const rcVal = metrics.RC || 'X';
  const hasTemporal = eVal !== 'X' || rlVal !== 'X' || rcVal !== 'X';

  const eWeight = V3_WEIGHTS.E[eVal] ?? 1.0;
  const rlWeight = V3_WEIGHTS.RL[rlVal] ?? 1.0;
  const rcWeight = V3_WEIGHTS.RC[rcVal] ?? 1.0;

  const temporalScore = roundupV3(baseScore * eWeight * rlWeight * rcWeight);
  const temporalSeverity = getV3Severity(temporalScore);

  const hasEnvironmental = V3_ENV_KEYS.some((k) => {
    const v = metrics[k];
    return v !== undefined && v !== '' && v !== 'X';
  });

  const mScope = metrics.MS && metrics.MS !== 'X' ? metrics.MS : metrics.S;
  const mAV = V3_WEIGHTS.AV[metrics.MAV && metrics.MAV !== 'X' ? metrics.MAV : metrics.AV];
  const mAC = V3_WEIGHTS.AC[metrics.MAC && metrics.MAC !== 'X' ? metrics.MAC : metrics.AC];
  const rawMPR = metrics.MPR && metrics.MPR !== 'X' ? metrics.MPR : metrics.PR;
  const mPR = mScope === 'C' ? V3_WEIGHTS.PR_C[rawMPR] : V3_WEIGHTS.PR_U[rawMPR];
  const mUI = V3_WEIGHTS.UI[metrics.MUI && metrics.MUI !== 'X' ? metrics.MUI : metrics.UI];
  const mC = V3_WEIGHTS.CIA[metrics.MC && metrics.MC !== 'X' ? metrics.MC : metrics.C];
  const mI = V3_WEIGHTS.CIA[metrics.MI && metrics.MI !== 'X' ? metrics.MI : metrics.I];
  const mA = V3_WEIGHTS.CIA[metrics.MA && metrics.MA !== 'X' ? metrics.MA : metrics.A];

  const cr = V3_WEIGHTS.REQ[metrics.CR || 'X'] ?? 1.0;
  const ir = V3_WEIGHTS.REQ[metrics.IR || 'X'] ?? 1.0;
  const ar = V3_WEIGHTS.REQ[metrics.AR || 'X'] ?? 1.0;

  const miss = Math.min(1 - (1 - cr * mC) * (1 - ir * mI) * (1 - ar * mA), 0.915);

  // Version-specific ModifiedImpact equation:
  // CVSS v3.0 uses exponent 15 on (MISS - 0.02).
  // CVSS v3.1 uses exponent 13 on (MISS * 0.9731 - 0.02).
  let modifiedImpact: number;
  if (mScope === 'U') {
    modifiedImpact = 6.42 * miss;
  } else if (version === '3.0') {
    modifiedImpact = 7.52 * (miss - 0.029) - 3.25 * Math.pow(miss - 0.02, 15);
  } else {
    modifiedImpact = 7.52 * (miss - 0.029) - 3.25 * Math.pow(miss * 0.9731 - 0.02, 13);
  }

  const modifiedExploitability = 8.22 * mAV * mAC * mPR * mUI;

  let environmentalScore = 0.0;
  if (modifiedImpact > 0) {
    if (mScope === 'U') {
      environmentalScore = roundupV3(
        roundupV3(Math.min(modifiedImpact + modifiedExploitability, 10)) * eWeight * rlWeight * rcWeight
      );
    } else {
      environmentalScore = roundupV3(
        roundupV3(Math.min(1.08 * (modifiedImpact + modifiedExploitability), 10)) *
          eWeight *
          rlWeight *
          rcWeight
      );
    }
  }
  const environmentalSeverity = getV3Severity(environmentalScore);

  const primaryScore = hasEnvironmental
    ? environmentalScore
    : hasTemporal
      ? temporalScore
      : baseScore;
  const primarySeverity = getV3Severity(primaryScore);

  const result: CompleteScoreResult = {
    isComplete: true,
    version,
    primaryScore,
    primarySeverity,
    baseScore,
    baseSeverity,
    impactScore: impact,
    exploitabilityScore: exploitability,
    temporalScore,
    temporalSeverity,
    environmentalScore,
    environmentalSeverity,
    hasTemporalOrThreat: hasTemporal,
    hasEnvironmental,
    hasSupplemental: false,
    canonicalVector: serializeV3Vector(version, metrics),
  };

  return result;
}
