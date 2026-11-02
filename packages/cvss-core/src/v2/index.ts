import type {
  CompleteScoreResult,
  MetricDefinition,
  MetricGroupDefinition,
  ParseResult,
  ScoreResult,
  SeverityLevel,
  VersionSchema,
} from '../types.js';

export const V2_METRICS: MetricDefinition[] = [
  // Base - Exploitability
  {
    key: 'AV',
    name: 'Access Vector',
    group: 'base',
    subGroup: 'Exploitability Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Reflects how the vulnerability is exploited in terms of network or local proximity.',
    options: [
      { value: 'L', label: 'Local (L)', description: 'Requires local system access or user interaction.' },
      { value: 'A', label: 'Adjacent Network (A)', description: 'Requires access to the local broadcast or collision domain.' },
      { value: 'N', label: 'Network (N)', description: 'Remotely exploitable across one or more network hops.' },
    ],
  },
  {
    key: 'AC',
    name: 'Access Complexity',
    group: 'base',
    subGroup: 'Exploitability Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the complexity of the attack required to exploit the vulnerability once target access is gained.',
    options: [
      { value: 'H', label: 'High (H)', description: 'Specialized access conditions exist, such as race conditions or non-default configurations.' },
      { value: 'M', label: 'Medium (M)', description: 'Somewhat specialized access conditions exist.' },
      { value: 'L', label: 'Low (L)', description: 'No specialized access conditions or extenuating circumstances exist.' },
    ],
  },
  {
    key: 'Au',
    name: 'Authentication',
    group: 'base',
    subGroup: 'Exploitability Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the number of times an attacker must authenticate to a target in order to exploit a vulnerability.',
    options: [
      { value: 'M', label: 'Multiple (M)', description: 'Exploiting the vulnerability requires authenticating two or more times.' },
      { value: 'S', label: 'Single (S)', description: 'One instance of authentication is required to access and exploit the vulnerability.' },
      { value: 'N', label: 'None (N)', description: 'Authentication is not required to access and exploit the vulnerability.' },
    ],
  },
  // Base - Impact
  {
    key: 'C',
    name: 'Confidentiality Impact',
    group: 'base',
    subGroup: 'Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact on confidentiality of a successfully exploited vulnerability.',
    options: [
      { value: 'N', label: 'None (N)', description: 'No impact to the confidentiality of the system.' },
      { value: 'P', label: 'Partial (P)', description: 'Considerable informational disclosure, but scope of loss is constrained.' },
      { value: 'C', label: 'Complete (C)', description: 'Total information disclosure; all system files are revealed.' },
    ],
  },
  {
    key: 'I',
    name: 'Integrity Impact',
    group: 'base',
    subGroup: 'Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to integrity of a successfully exploited vulnerability.',
    options: [
      { value: 'N', label: 'None (N)', description: 'No impact to the integrity of the system.' },
      { value: 'P', label: 'Partial (P)', description: 'Modification of some system files or information is possible, without full control.' },
      { value: 'C', label: 'Complete (C)', description: 'Total compromise of system integrity; attacker can modify any file on the target.' },
    ],
  },
  {
    key: 'A',
    name: 'Availability Impact',
    group: 'base',
    subGroup: 'Impact Metrics',
    required: true,
    defaultValue: '',
    controlType: 'segmented',
    description: 'Measures the impact to availability of a successfully exploited vulnerability.',
    options: [
      { value: 'N', label: 'None (N)', description: 'No impact to the availability of the system.' },
      { value: 'P', label: 'Partial (P)', description: 'Reduced performance or interruptions in resource availability.' },
      { value: 'C', label: 'Complete (C)', description: 'Total shutdown of the affected resource.' },
    ],
  },
  // Temporal (3 metrics)
  {
    key: 'E',
    name: 'Exploitability',
    group: 'temporal',
    subGroup: 'Temporal Metrics',
    required: false,
    defaultValue: 'ND',
    controlType: 'select',
    description: 'Measures the current state of exploit techniques or code availability.',
    options: [
      { value: 'ND', label: 'Not Defined (ND)', description: 'Skip this metric in the Temporal equation.', isDefault: true },
      { value: 'U', label: 'Unproven (U)', description: 'No exploit code is available, or an exploit is entirely theoretical.' },
      { value: 'POC', label: 'Proof-of-Concept (POC)', description: 'Proof-of-concept exploit code or attack demonstration is available.' },
      { value: 'F', label: 'Functional (F)', description: 'Functional exploit code is available and works in most situations.' },
      { value: 'H', label: 'High (H)', description: 'Exploitable by functional mobile autonomous code, or no exploit required.' },
    ],
  },
  {
    key: 'RL',
    name: 'Remediation Level',
    group: 'temporal',
    subGroup: 'Temporal Metrics',
    required: false,
    defaultValue: 'ND',
    controlType: 'select',
    description: 'Measures the remediation status of a vulnerability.',
    options: [
      { value: 'ND', label: 'Not Defined (ND)', description: 'Skip this metric in the Temporal equation.', isDefault: true },
      { value: 'OF', label: 'Official Fix (OF)', description: 'Complete vendor solution is available (patch or upgrade).' },
      { value: 'TF', label: 'Temporary Fix (TF)', description: 'Official but temporary fix is available (hotfix or interim tool).' },
      { value: 'W', label: 'Workaround (W)', description: 'Unofficial, non-vendor solution or configuration mitigation is available.' },
      { value: 'U', label: 'Unavailable (U)', description: 'No solution is available or it is impossible to apply.' },
    ],
  },
  {
    key: 'RC',
    name: 'Report Confidence',
    group: 'temporal',
    subGroup: 'Temporal Metrics',
    required: false,
    defaultValue: 'ND',
    controlType: 'segmented',
    description: 'Measures the degree of confidence in the existence of the vulnerability and the credibility of its technical details.',
    options: [
      { value: 'ND', label: 'Not Defined (ND)', description: 'Skip this metric in the Temporal equation.', isDefault: true },
      { value: 'UC', label: 'Unconfirmed (UC)', description: 'Single unconfirmed source or conflicting reports.' },
      { value: 'UR', label: 'Uncorroborated (UR)', description: 'Multiple non-official sources agree, without vendor confirmation.' },
      { value: 'C', label: 'Confirmed (C)', description: 'Acknowledged by the vendor or author of the affected technology.' },
    ],
  },
  // Environmental (5 metrics)
  {
    key: 'CDP',
    name: 'Collateral Damage Potential',
    group: 'environmental',
    subGroup: 'Environmental Metrics',
    required: false,
    defaultValue: 'ND',
    controlType: 'select',
    description: 'Measures the potential for loss of life, physical assets, productivity, or revenue.',
    options: [
      { value: 'ND', label: 'Not Defined (ND)', description: 'Skip this metric in the Environmental equation.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No potential for loss of life, physical assets, productivity, or revenue.' },
      { value: 'L', label: 'Low (L)', description: 'Slight physical or property damage, or slight loss of revenue/productivity.' },
      { value: 'LM', label: 'Low-Medium (LM)', description: 'Moderate physical or property damage, or moderate revenue/productivity loss.' },
      { value: 'MH', label: 'Medium-High (MH)', description: 'Significant physical or property damage or loss.' },
      { value: 'H', label: 'High (H)', description: 'Catastrophic physical or property damage and loss.' },
    ],
  },
  {
    key: 'TD',
    name: 'Target Distribution',
    group: 'environmental',
    subGroup: 'Environmental Metrics',
    required: false,
    defaultValue: 'ND',
    controlType: 'select',
    description: 'Measures the proportion of vulnerable systems in the environment.',
    options: [
      { value: 'ND', label: 'Not Defined (ND)', description: 'Skip this metric in the Environmental equation.', isDefault: true },
      { value: 'N', label: 'None (N)', description: 'No target systems exist in the environment (0%).' },
      { value: 'L', label: 'Low (L)', description: 'Targets exist on a small scale (1% - 25% of the environment).' },
      { value: 'M', label: 'Medium (M)', description: 'Targets exist on a medium scale (26% - 75% of the environment).' },
      { value: 'H', label: 'High (H)', description: 'Targets exist on a considerable scale (76% - 100% of the environment).' },
    ],
  },
  {
    key: 'CR',
    name: 'Confidentiality Requirement',
    group: 'environmental',
    subGroup: 'Impact Subscore Modifiers',
    required: false,
    defaultValue: 'ND',
    controlType: 'segmented',
    description: 'Customizes the Environmental score based on the importance of Confidentiality to the affected asset.',
    options: [
      { value: 'ND', label: 'Not Defined (ND)', description: 'No impact modifier applied (weight 1.0).', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'Limited adverse effect on the organization.' },
      { value: 'M', label: 'Medium (M)', description: 'Serious adverse effect on the organization.' },
      { value: 'H', label: 'High (H)', description: 'Catastrophic adverse effect on the organization.' },
    ],
  },
  {
    key: 'IR',
    name: 'Integrity Requirement',
    group: 'environmental',
    subGroup: 'Impact Subscore Modifiers',
    required: false,
    defaultValue: 'ND',
    controlType: 'segmented',
    description: 'Customizes the Environmental score based on the importance of Integrity to the affected asset.',
    options: [
      { value: 'ND', label: 'Not Defined (ND)', description: 'No impact modifier applied (weight 1.0).', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'Limited adverse effect on the organization.' },
      { value: 'M', label: 'Medium (M)', description: 'Serious adverse effect on the organization.' },
      { value: 'H', label: 'High (H)', description: 'Catastrophic adverse effect on the organization.' },
    ],
  },
  {
    key: 'AR',
    name: 'Availability Requirement',
    group: 'environmental',
    subGroup: 'Impact Subscore Modifiers',
    required: false,
    defaultValue: 'ND',
    controlType: 'segmented',
    description: 'Customizes the Environmental score based on the importance of Availability to the affected asset.',
    options: [
      { value: 'ND', label: 'Not Defined (ND)', description: 'No impact modifier applied (weight 1.0).', isDefault: true },
      { value: 'L', label: 'Low (L)', description: 'Limited adverse effect on the organization.' },
      { value: 'M', label: 'Medium (M)', description: 'Serious adverse effect on the organization.' },
      { value: 'H', label: 'High (H)', description: 'Catastrophic adverse effect on the organization.' },
    ],
  },
];

export const V2_GROUPS: MetricGroupDefinition[] = [
  {
    id: 'base',
    label: 'Base',
    description: 'Intrinsic qualities of a vulnerability that are constant over time and across user environments.',
    metrics: V2_METRICS.filter((m) => m.group === 'base'),
  },
  {
    id: 'temporal',
    label: 'Temporal',
    description: 'Characteristics of a vulnerability that change over time but not across user environments.',
    metrics: V2_METRICS.filter((m) => m.group === 'temporal'),
  },
  {
    id: 'environmental',
    label: 'Environmental',
    description: 'Characteristics of a vulnerability that are relevant and unique to a particular user environment.',
    metrics: V2_METRICS.filter((m) => m.group === 'environmental'),
  },
];

export const V2_SCHEMA: VersionSchema = {
  version: '2.0',
  prefix: '',
  groups: V2_GROUPS,
  allMetrics: V2_METRICS,
};

const V2_BASE_KEYS = ['AV', 'AC', 'Au', 'C', 'I', 'A'] as const;
const V2_TEMPORAL_KEYS = ['E', 'RL', 'RC'] as const;
const V2_ENV_KEYS = ['CDP', 'TD', 'CR', 'IR', 'AR'] as const;
const V2_CANONICAL_ORDER = [...V2_BASE_KEYS, ...V2_TEMPORAL_KEYS, ...V2_ENV_KEYS] as const;

const V2_WEIGHTS = {
  AV: { L: 0.395, A: 0.646, N: 1.0 } as Record<string, number>,
  AC: { H: 0.35, M: 0.61, L: 0.71 } as Record<string, number>,
  Au: { M: 0.45, S: 0.56, N: 0.704 } as Record<string, number>,
  CIA: { N: 0.0, P: 0.275, C: 0.66 } as Record<string, number>,
  E: { U: 0.85, POC: 0.9, F: 0.95, H: 1.0, ND: 1.0 } as Record<string, number>,
  RL: { OF: 0.87, TF: 0.9, W: 0.95, U: 1.0, ND: 1.0 } as Record<string, number>,
  RC: { UC: 0.9, UR: 0.95, C: 1.0, ND: 1.0 } as Record<string, number>,
  CDP: { N: 0.0, L: 0.1, LM: 0.3, MH: 0.4, H: 0.5, ND: 0.0 } as Record<string, number>,
  TD: { N: 0.0, L: 0.25, M: 0.75, H: 1.0, ND: 1.0 } as Record<string, number>,
  REQ: { L: 0.5, M: 1.0, H: 1.51, ND: 1.0 } as Record<string, number>,
};

function roundTo1Decimal(val: number): number {
  return Math.round((val + 1e-9) * 10) / 10;
}

export function getV2Severity(score: number): SeverityLevel {
  // Official CVSS v2.0 qualitative severity scale: Low (0.0-3.9), Medium (4.0-6.9), High (7.0-10.0).
  // CVSS v2.0 does not have a Critical or None qualitative rating.
  if (score < 4.0) return 'Low';
  if (score < 7.0) return 'Medium';
  return 'High';
}

export function createInitialV2Metrics(): Record<string, string> {
  const state: Record<string, string> = {};
  for (const m of V2_METRICS) {
    state[m.key] = m.defaultValue;
  }
  return state;
}

export function getMissingV2BaseMetrics(metrics: Record<string, string>): string[] {
  const missing: string[] = [];
  for (const key of V2_BASE_KEYS) {
    const val = metrics[key];
    const def = V2_METRICS.find((m) => m.key === key)!;
    if (!val || !def.options.some((o) => o.value === val)) {
      missing.push(key);
    }
  }
  return missing;
}

export function serializeV2Vector(metrics: Record<string, string>): string {
  const missing = getMissingV2BaseMetrics(metrics);
  if (missing.length > 0) return '';

  const parts: string[] = [];
  for (const key of V2_CANONICAL_ORDER) {
    const val = metrics[key];
    if (!val) continue;
    if ((V2_BASE_KEYS as readonly string[]).includes(key)) {
      parts.push(`${key}:${val}`);
    } else if (val !== 'ND') {
      parts.push(`${key}:${val}`);
    }
  }
  return parts.join('/');
}

export function parseV2Vector(rawText: string): ParseResult {
  const trimmed = rawText.trim();
  if (!trimmed) {
    return { ok: false, error: 'Vector string is empty. Enter a CVSS v2.0 vector such as AV:N/AC:L/Au:N/C:P/I:P/A:P.' };
  }

  let body = trimmed;
  if (body.startsWith('(') || body.endsWith(')')) {
    if (!body.startsWith('(') || !body.endsWith(')')) {
      return { ok: false, error: 'Malformed parentheses in CVSS v2.0 vector.' };
    }
    body = body.slice(1, -1).trim();
  }

  if (body.startsWith('CVSS:')) {
    return {
      ok: false,
      error: 'CVSS v2.0 vectors do not use a "CVSS:" prefix. Use AV:.../AC:.../Au:.../C:.../I:.../A:... format.',
    };
  }

  const segments = body.split('/');
  const parsed = createInitialV2Metrics();
  const seen = new Set<string>();

  for (const seg of segments) {
    if (!seg) {
      return { ok: false, error: 'Malformed vector: empty metric segment between "/" delimiters.' };
    }
    const colonIdx = seg.indexOf(':');
    if (colonIdx === -1 || seg.indexOf(':', colonIdx + 1) !== -1) {
      return { ok: false, error: `Malformed metric segment "${seg}". Expected KEY:VALUE.` };
    }
    const key = seg.slice(0, colonIdx);
    const val = seg.slice(colonIdx + 1);

    const def = V2_METRICS.find((m) => m.key === key);
    if (!def) {
      if (key === 'AU') {
        return { ok: false, error: 'Unknown metric "AU". CVSS v2.0 uses case-sensitive "Au" for Authentication.' };
      }
      return { ok: false, error: `Unknown CVSS v2.0 metric "${key}".` };
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

  // Check if all temporal or all environmental metrics are partially supplied?
  // In CVSS v2.0, omitted optional metrics default to ND.
  const missingBase = getMissingV2BaseMetrics(parsed);
  if (missingBase.length > 0) {
    return {
      ok: false,
      error: `Incomplete CVSS v2.0 vector. Missing required Base metric(s): ${missingBase.join(', ')}.`,
    };
  }

  return {
    ok: true,
    version: '2.0',
    metrics: parsed,
    canonicalVector: serializeV2Vector(parsed),
    isComplete: true,
    missingBaseMetrics: [],
  };
}

export function calculateV2Score(metrics: Record<string, string>): ScoreResult {
  const missing = getMissingV2BaseMetrics(metrics);
  if (missing.length > 0) {
    return {
      isComplete: false,
      version: '2.0',
      missingBaseMetrics: missing,
    };
  }

  const av = V2_WEIGHTS.AV[metrics.AV];
  const ac = V2_WEIGHTS.AC[metrics.AC];
  const au = V2_WEIGHTS.Au[metrics.Au];
  const c = V2_WEIGHTS.CIA[metrics.C];
  const i = V2_WEIGHTS.CIA[metrics.I];
  const a = V2_WEIGHTS.CIA[metrics.A];

  const impact = 10.41 * (1 - (1 - c) * (1 - i) * (1 - a));
  const exploitability = 20 * av * ac * au;
  const fImpact = impact === 0 ? 0 : 1.176;

  const baseScore = roundTo1Decimal((0.6 * impact + 0.4 * exploitability - 1.5) * fImpact);
  const baseSeverity = getV2Severity(baseScore);

  const eVal = metrics.E || 'ND';
  const rlVal = metrics.RL || 'ND';
  const rcVal = metrics.RC || 'ND';
  const hasTemporal = eVal !== 'ND' || rlVal !== 'ND' || rcVal !== 'ND';

  const eWeight = V2_WEIGHTS.E[eVal] ?? 1.0;
  const rlWeight = V2_WEIGHTS.RL[rlVal] ?? 1.0;
  const rcWeight = V2_WEIGHTS.RC[rcVal] ?? 1.0;

  const temporalScore = roundTo1Decimal(baseScore * eWeight * rlWeight * rcWeight);
  const temporalSeverity = getV2Severity(temporalScore);

  const cdpVal = metrics.CDP || 'ND';
  const tdVal = metrics.TD || 'ND';
  const crVal = metrics.CR || 'ND';
  const irVal = metrics.IR || 'ND';
  const arVal = metrics.AR || 'ND';
  const hasEnvironmental =
    cdpVal !== 'ND' || tdVal !== 'ND' || crVal !== 'ND' || irVal !== 'ND' || arVal !== 'ND';

  const cdpWeight = V2_WEIGHTS.CDP[cdpVal] ?? 0.0;
  const tdWeight = V2_WEIGHTS.TD[tdVal] ?? 1.0;
  const crWeight = V2_WEIGHTS.REQ[crVal] ?? 1.0;
  const irWeight = V2_WEIGHTS.REQ[irVal] ?? 1.0;
  const arWeight = V2_WEIGHTS.REQ[arVal] ?? 1.0;

  const adjustedImpact = Math.min(
    10,
    10.41 * (1 - (1 - c * crWeight) * (1 - i * irWeight) * (1 - a * arWeight))
  );
  const fAdjImpact = adjustedImpact === 0 ? 0 : 1.176;
  const adjustedBase = roundTo1Decimal((0.6 * adjustedImpact + 0.4 * exploitability - 1.5) * fAdjImpact);
  const adjustedTemporal = roundTo1Decimal(adjustedBase * eWeight * rlWeight * rcWeight);
  const environmentalScore = roundTo1Decimal(
    (adjustedTemporal + (10 - adjustedTemporal) * cdpWeight) * tdWeight
  );
  const environmentalSeverity = getV2Severity(environmentalScore);

  const primaryScore = hasEnvironmental
    ? environmentalScore
    : hasTemporal
      ? temporalScore
      : baseScore;
  const primarySeverity = getV2Severity(primaryScore);

  const result: CompleteScoreResult = {
    isComplete: true,
    version: '2.0',
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
    canonicalVector: serializeV2Vector(metrics),
  };

  return result;
}
