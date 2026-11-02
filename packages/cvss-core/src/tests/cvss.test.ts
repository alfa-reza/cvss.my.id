import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateScore,
  createInitialMetrics,
  formatResultSummary,
  parseVector,
  serializeVector,
} from '../index.js';

describe('CVSS v4.0 Scoring, Parsing, and Serialization', () => {
  it('returns Incomplete when Base metrics are missing', () => {
    const initial = createInitialMetrics('4.0');
    const res = calculateScore('4.0', initial);
    assert.equal(res.isComplete, false);
    if (!res.isComplete) {
      assert.equal(res.missingBaseMetrics.length, 11);
    }
  });

  it('matches official FIRST CVSS v4.0 reference fixtures (Base, Threat, Environmental, Supplemental)', () => {
    const fixtures: Array<{
      vector: string;
      expectedScore: number;
      expectedSeverity: string;
      expectedNomenclature: string;
    }> = [
      {
        vector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:H/SI:H/SA:H',
        expectedScore: 10.0,
        expectedSeverity: 'Critical',
        expectedNomenclature: 'CVSS-B',
      },
      {
        vector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N',
        expectedScore: 9.3,
        expectedSeverity: 'Critical',
        expectedNomenclature: 'CVSS-B',
      },
      {
        vector: 'CVSS:4.0/AV:A/AC:H/AT:P/PR:L/UI:P/VC:L/VI:H/VA:N/SC:N/SI:L/SA:N',
        expectedScore: 4.3,
        expectedSeverity: 'Medium',
        expectedNomenclature: 'CVSS-B',
      },
      {
        vector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:N/VA:N/SC:N/SI:N/SA:N',
        expectedScore: 0.0,
        expectedSeverity: 'None',
        expectedNomenclature: 'CVSS-B',
      },
      {
        // Threat metric E:P reduces score from 9.3 (000200) to 8.9 (000210) and sets CVSS-BT
        vector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/E:P',
        expectedScore: 8.9,
        expectedSeverity: 'High',
        expectedNomenclature: 'CVSS-BT',
      },
      {
        // Threat metric E:U reduces score further to 8.1 (000220)
        vector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/E:U',
        expectedScore: 8.1,
        expectedSeverity: 'High',
        expectedNomenclature: 'CVSS-BT',
      },
      {
        // Environmental metric MSI:S triggers Safety EQ4=0 (000000 -> 10.0, 000100 -> 10.0, so score is 10.0) and sets CVSS-BE
        vector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/MSI:S',
        expectedScore: 10.0,
        expectedSeverity: 'Critical',
        expectedNomenclature: 'CVSS-BE',
      },
      {
        // Threat + Environmental sets CVSS-BTE (MacroVector 000211 = 8.0, CR/IR/AR=L distance reduces score to 7.875 -> 7.9)
        vector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/E:P/CR:L/IR:L/AR:L',
        expectedScore: 7.9,
        expectedSeverity: 'High',
        expectedNomenclature: 'CVSS-BTE',
      },
      {
        // Supplemental metrics never change numeric score or nomenclature
        vector: 'CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N/S:P/AU:Y/R:I/V:C/RE:H/U:Red',
        expectedScore: 9.3,
        expectedSeverity: 'Critical',
        expectedNomenclature: 'CVSS-B',
      },
    ];

    for (const f of fixtures) {
      const parsed = parseVector('4.0', f.vector);
      assert.equal(parsed.ok, true, `Failed to parse ${f.vector}`);
      if (parsed.ok) {
        assert.equal(parsed.canonicalVector, f.vector);
        const scoreRes = calculateScore('4.0', parsed.metrics);
        assert.equal(scoreRes.isComplete, true);
        if (scoreRes.isComplete) {
          assert.equal(scoreRes.primaryScore, f.expectedScore, `Score mismatch for ${f.vector}`);
          assert.equal(scoreRes.primarySeverity, f.expectedSeverity);
          assert.equal(scoreRes.nomenclature, f.expectedNomenclature);
        }
      }
    }
  });

  it('enforces strict canonical ordering and rejects duplicates in CVSS v4.0', () => {
    const outOfOrder = 'CVSS:4.0/AC:L/AV:N/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N';
    const res1 = parseVector('4.0', outOfOrder);
    assert.equal(res1.ok, false);

    const dup = 'CVSS:4.0/AV:N/AV:L/AC:L/AT:N/PR:N/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N';
    const res2 = parseVector('4.0', dup);
    assert.equal(res2.ok, false);
  });
});

describe('CVSS v3.1 and v3.0 Scoring, Rounding, and Version Differences', () => {
  it('calculates known baseline CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H as 9.8 Critical', () => {
    const v = 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H';
    const parsed = parseVector('3.1', v);
    assert.equal(parsed.ok, true);
    if (parsed.ok) {
      const score = calculateScore('3.1', parsed.metrics);
      assert.equal(score.isComplete, true);
      if (score.isComplete) {
        assert.equal(score.primaryScore, 9.8);
        assert.equal(score.primarySeverity, 'Critical');
        assert.ok(score.impactScore !== undefined && Math.abs(score.impactScore - 5.8731) < 0.001);
        assert.ok(score.exploitabilityScore !== undefined && Math.abs(score.exploitabilityScore - 3.8870) < 0.001);
      }
    }
  });

  it('preserves the Environmental ModifiedImpact formula difference between v3.0 and v3.1', () => {
    // When Modified Scope is Changed and MISS is high (e.g. CR:H/IR:H/AR:H with MC:H/MI:H/MA:H),
    // v3.0 and v3.1 differ in the ModifiedImpact exponent (15 vs 13 with 0.9731 factor).
    const body = 'AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H/CR:H/IR:H/AR:H/MS:C/MC:H/MI:H/MA:H/E:P/RL:O/RC:R';
    const p30 = parseVector('3.0', `CVSS:3.0/${body}`);
    const p31 = parseVector('3.1', `CVSS:3.1/${body}`);
    assert.equal(p30.ok, true);
    assert.equal(p31.ok, true);
    if (p30.ok && p31.ok) {
      const s30 = calculateScore('3.0', p30.metrics);
      const s31 = calculateScore('3.1', p31.metrics);
      assert.equal(s30.isComplete && s31.isComplete, true);
      if (s30.isComplete && s31.isComplete) {
        // In v3.0, 7.52*(0.915-0.029) - 3.25*(0.915-0.02)^15 = 6.66272 - 0.6061... = 6.056 -> 1.08*(6.056+3.11) = 9.9 -> 9.9*0.94*0.95*0.96 = 8.5
        // In v3.1, 7.52*(0.915-0.029) - 3.25*(0.915*0.9731-0.02)^13 = 6.66272 - 0.5404... = 6.122 -> 10.0 * 0.94*0.95*0.96 = 8.6
        assert.equal(s30.environmentalScore, 8.5);
        assert.equal(s31.environmentalScore, 8.6);
      }
    }
  });

  it('accepts flexible ordering in v3.x and serializes to canonical order', () => {
    const nonCanonical = 'CVSS:3.1/C:H/I:H/A:H/S:U/UI:N/PR:N/AC:L/AV:N';
    const parsed = parseVector('3.1', nonCanonical);
    assert.equal(parsed.ok, true);
    if (parsed.ok) {
      assert.equal(parsed.canonicalVector, 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H');
    }
  });
});

describe('CVSS v2.0 Scoring and Severity Rules', () => {
  it('calculates Base, Temporal, and Environmental scores and never outputs Critical', () => {
    const v = 'AV:N/AC:L/Au:N/C:C/I:C/A:C';
    const parsed = parseVector('2.0', v);
    assert.equal(parsed.ok, true);
    if (parsed.ok) {
      const score = calculateScore('2.0', parsed.metrics);
      assert.equal(score.isComplete, true);
      if (score.isComplete) {
        assert.equal(score.baseScore, 10.0);
        assert.equal(score.baseSeverity, 'High');
      }
    }

    const vEnv = '(AV:N/AC:L/Au:N/C:P/I:P/A:P/E:POC/RL:OF/RC:C/CDP:MH/TD:H/CR:H/IR:H/AR:L)';
    const parsedEnv = parseVector('2.0', vEnv);
    assert.equal(parsedEnv.ok, true);
    if (parsedEnv.ok) {
      assert.equal(
        parsedEnv.canonicalVector,
        'AV:N/AC:L/Au:N/C:P/I:P/A:P/E:POC/RL:OF/RC:C/CDP:MH/TD:H/CR:H/IR:H/AR:L'
      );
      const scoreEnv = calculateScore('2.0', parsedEnv.metrics);
      assert.equal(scoreEnv.isComplete, true);
      if (scoreEnv.isComplete) {
        assert.equal(scoreEnv.baseScore, 7.5);
        assert.equal(scoreEnv.temporalScore, 5.9);
        assert.equal(scoreEnv.environmentalScore, 7.8);
        assert.equal(scoreEnv.primaryScore, 7.8);
        assert.equal(scoreEnv.primarySeverity, 'High');
      }
    }
  });

  it('detects cross-version vectors without silently switching', () => {
    const res = parseVector('4.0', 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H');
    assert.equal(res.ok, false);
    if (!res.ok) {
      assert.equal(res.detectedOtherVersion, '3.1');
      assert.equal(res.normalizedOtherVector, 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H');
    }
  });

  it('formats result summary without em dashes', () => {
    const parsed = parseVector('3.1', 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H');
    assert.equal(parsed.ok, true);
    if (parsed.ok) {
      const score = calculateScore('3.1', parsed.metrics);
      const summary = formatResultSummary(score);
      assert.equal(summary.includes('\u2014'), false);
      assert.equal(
        summary,
        'CVSS v3.1: 9.8 (Critical)\nVector: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H'
      );
      assert.equal(serializeVector('3.1', parsed.metrics), parsed.canonicalVector);
    }
  });
});
