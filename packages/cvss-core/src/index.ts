import type { CvssVersion, ParseResult, ScoreResult, VersionSchema } from './types.js';
import {
  calculateV2Score,
  createInitialV2Metrics,
  getMissingV2BaseMetrics,
  getV2Severity,
  parseV2Vector,
  serializeV2Vector,
  V2_SCHEMA,
} from './v2/index.js';
import {
  calculateV3Score,
  createInitialV3Metrics,
  getMissingV3BaseMetrics,
  getV3Severity,
  parseV3Vector,
  roundupV3,
  serializeV3Vector,
  V30_SCHEMA,
  V31_SCHEMA,
} from './v3/index.js';
import {
  calculateV4Score,
  computeV4MacroVector,
  createInitialV4Metrics,
  getMissingV4BaseMetrics,
  getV4Severity,
  parseV4Vector,
  serializeV4Vector,
  V4_SCHEMA,
} from './v4/index.js';

export * from './types.js';
export {
  V2_SCHEMA,
  V30_SCHEMA,
  V31_SCHEMA,
  V4_SCHEMA,
  roundupV3,
  computeV4MacroVector,
  getV2Severity,
  getV3Severity,
  getV4Severity,
};

export function getVersionSchema(version: CvssVersion): VersionSchema {
  switch (version) {
    case '4.0':
      return V4_SCHEMA;
    case '3.1':
      return V31_SCHEMA;
    case '3.0':
      return V30_SCHEMA;
    case '2.0':
      return V2_SCHEMA;
  }
}

export function createInitialMetrics(version: CvssVersion): Record<string, string> {
  switch (version) {
    case '4.0':
      return createInitialV4Metrics();
    case '3.1':
    case '3.0':
      return createInitialV3Metrics();
    case '2.0':
      return createInitialV2Metrics();
  }
}

export function getMissingBaseMetrics(version: CvssVersion, metrics: Record<string, string>): string[] {
  switch (version) {
    case '4.0':
      return getMissingV4BaseMetrics(metrics);
    case '3.1':
    case '3.0':
      return getMissingV3BaseMetrics(metrics);
    case '2.0':
      return getMissingV2BaseMetrics(metrics);
  }
}

export function serializeVector(version: CvssVersion, metrics: Record<string, string>): string {
  switch (version) {
    case '4.0':
      return serializeV4Vector(metrics);
    case '3.1':
    case '3.0':
      return serializeV3Vector(version, metrics);
    case '2.0':
      return serializeV2Vector(metrics);
  }
}

export function calculateScore(version: CvssVersion, metrics: Record<string, string>): ScoreResult {
  switch (version) {
    case '4.0':
      return calculateV4Score(metrics);
    case '3.1':
    case '3.0':
      return calculateV3Score(version, metrics);
    case '2.0':
      return calculateV2Score(metrics);
  }
}

export function detectVectorVersion(rawText: string): CvssVersion | null {
  const trimmed = rawText.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('CVSS:4.0/')) return '4.0';
  if (trimmed.startsWith('CVSS:3.1/')) return '3.1';
  if (trimmed.startsWith('CVSS:3.0/')) return '3.0';
  const unparen =
    trimmed.startsWith('(') && trimmed.endsWith(')') ? trimmed.slice(1, -1).trim() : trimmed;
  if (!unparen.startsWith('CVSS:') && (unparen.includes('Au:') || /^AV:[LAN]\//.test(unparen))) {
    const v2Check = parseV2Vector(trimmed);
    if (v2Check.ok) return '2.0';
  }
  return null;
}

export function parseVector(expectedVersion: CvssVersion, rawText: string): ParseResult {
  const detected = detectVectorVersion(rawText);
  if (detected && detected !== expectedVersion) {
    const otherParse = parseVectorForDetectedVersion(detected, rawText);
    if (otherParse.ok) {
      return {
        ok: false,
        error: `This vector is formatted for CVSS v${detected}, not CVSS v${expectedVersion}.`,
        detectedOtherVersion: detected,
        normalizedOtherVector: otherParse.canonicalVector,
      };
    }
  }

  return parseVectorForDetectedVersion(expectedVersion, rawText);
}

function parseVectorForDetectedVersion(version: CvssVersion, rawText: string): ParseResult {
  switch (version) {
    case '4.0':
      return parseV4Vector(rawText);
    case '3.1':
    case '3.0':
      return parseV3Vector(version, rawText);
    case '2.0':
      return parseV2Vector(rawText);
  }
}

export function formatResultSummary(result: ScoreResult): string {
  if (!result.isComplete) {
    return `CVSS v${result.version}: Incomplete`;
  }
  const scoreStr = result.primaryScore.toFixed(1);
  if (result.version === '4.0' && result.nomenclature) {
    return `CVSS v4.0 (${result.nomenclature}): ${scoreStr} (${result.primarySeverity})\nVector: ${result.canonicalVector}`;
  }
  return `CVSS v${result.version}: ${scoreStr} (${result.primarySeverity})\nVector: ${result.canonicalVector}`;
}
