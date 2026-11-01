export type CvssVersion = '4.0' | '3.1' | '3.0' | '2.0';

export type SeverityLevel = 'None' | 'Low' | 'Medium' | 'High' | 'Critical';

export type Cvss4Nomenclature = 'CVSS-B' | 'CVSS-BT' | 'CVSS-BE' | 'CVSS-BTE';

export interface MetricOption {
  value: string;
  label: string;
  description: string;
  isDefault?: boolean;
}

export interface MetricDefinition {
  key: string;
  name: string;
  group: string;
  subGroup: string;
  required: boolean;
  defaultValue: string;
  controlType: 'segmented' | 'select';
  description: string;
  options: MetricOption[];
}

export interface MetricGroupDefinition {
  id: string;
  label: string;
  description: string;
  metrics: MetricDefinition[];
}

export interface VersionSchema {
  version: CvssVersion;
  prefix: string;
  groups: MetricGroupDefinition[];
  allMetrics: MetricDefinition[];
}

export type ParseResult =
  | {
      ok: true;
      version: CvssVersion;
      metrics: Record<string, string>;
      canonicalVector: string;
      isComplete: boolean;
      missingBaseMetrics: string[];
    }
  | {
      ok: false;
      error: string;
      detectedOtherVersion?: CvssVersion;
      normalizedOtherVector?: string;
    };

export interface IncompleteScoreResult {
  isComplete: false;
  version: CvssVersion;
  missingBaseMetrics: string[];
}

export interface CompleteScoreResult {
  isComplete: true;
  version: CvssVersion;
  primaryScore: number;
  primarySeverity: SeverityLevel;
  baseScore: number;
  baseSeverity: SeverityLevel;
  temporalScore?: number;
  temporalSeverity?: SeverityLevel;
  environmentalScore?: number;
  environmentalSeverity?: SeverityLevel;
  nomenclature?: Cvss4Nomenclature;
  macroVector?: string;
  hasTemporalOrThreat: boolean;
  hasEnvironmental: boolean;
  hasSupplemental: boolean;
  canonicalVector: string;
}

export type ScoreResult = IncompleteScoreResult | CompleteScoreResult;
