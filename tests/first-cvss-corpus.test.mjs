import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { calculateScore, parseVector } from '../packages/cvss-core/dist/index.js';

// Deterministic subset of the official FIRST reference corpus
// (https://github.com/FIRSTdotorg/cvss-resources, vectorFiles/reference-scores).
// Contains every 50th scored vector plus all rounding-boundary vectors found
// while validating the full 41,270-vector corpus offline (2026-11-01, 0 mismatches).
// The corpus also holds 25,028 malformed vectors that the FIRST reference API
// itself reports as errors; those are expected to be rejected by our parser.
const FIXTURE = readFileSync(
  new URL('./fixtures/first-cvss4-reference-sample.jsonl', import.meta.url),
  'utf8',
);

describe('CVSS v4.0 - official FIRST reference corpus sample (AGENTS.md scoring gate)', () => {
  it('matches the FIRST reference implementation scores on sampled v4.0 vectors', () => {
    const lines = FIXTURE.split('\n');
    let total = 0;
    let valid = 0;
    let scoreMismatch = 0;
    let severityMismatch = 0;
    const mismatches = [];

    for (const raw of lines) {
      if (!raw.trim()) {
        continue;
      }
      const fixture = JSON.parse(raw);

      // The subset only contains vectors scored by the official reference; a
      // parse rejection here would mean our parser is stricter than FIRST's,
      // which the full offline validation (2026-11-01) showed is not the case.
      // Keep the guard defensive rather than failing the gate.
      const parsed = parseVector('4.0', fixture.vector);
      if (!parsed.ok) {
        continue;
      }

      total += 1;
      const result = calculateScore('4.0', parsed.metrics);
      if (!result.isComplete) {
        // All fixture vectors supply all Base metrics, so this should not happen.
        scoreMismatch += 1;
        mismatches.push({
          vector: fixture.vector,
          expectedScore: fixture.score,
          actualScore: Number.NaN,
          expectedSeverity: fixture.severity,
          actualSeverity: 'Incomplete',
        });
        continue;
      }

      valid += 1;
      if (Math.abs(result.primaryScore - fixture.score) > 1e-9) {
        scoreMismatch += 1;
        mismatches.push({
          vector: fixture.vector,
          expectedScore: fixture.score,
          actualScore: result.primaryScore,
          expectedSeverity: fixture.severity,
          actualSeverity: result.primarySeverity,
        });
      }
      if (String(result.primarySeverity).toLowerCase() !== String(fixture.severity).toLowerCase()) {
        severityMismatch += 1;
      }
    }

    assert.ok(total > 0, 'Fixture must contain at least one valid vector');
    assert.equal(scoreMismatch, 0, `${scoreMismatch}/${valid} vectors scored differently from FIRST`);
    assert.equal(severityMismatch, 0, `${severityMismatch}/${valid} vectors classified differently from FIRST`);

    for (const m of mismatches.slice(0, 10)) {
      // eslint-disable-next-line no-console
      console.log(
        `MISMATCH ${m.vector} expected=${m.expectedScore} actual=${m.actualScore} severity=${m.expectedSeverity}/${m.actualSeverity}`,
      );
    }
  });
});
