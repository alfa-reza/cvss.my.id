import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'apps', 'website', 'dist');
const EN_DOCS = path.join(DIST, 'docs');
const ID_DOCS = path.join(DIST, 'id', 'docs');

function read(relativePath) {
  return fs.readFileSync(path.join(DIST, relativePath), 'utf8');
}

function findIndexPages(directory, base = directory) {
  const pages = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...findIndexPages(full, base));
    else if (entry.name === 'index.html') pages.push(path.relative(base, full));
  }
  return pages;
}

test('Indonesian documentation routes mirror the English routes', () => {
  for (const relative of findIndexPages(EN_DOCS)) {
    assert.ok(
      fs.existsSync(path.join(ID_DOCS, relative)),
      `Missing Indonesian route for ${relative}`
    );
  }
  assert.ok(fs.existsSync(path.join(DIST, 'id', 'index.html')), 'Missing /id/');
  assert.ok(fs.existsSync(path.join(DIST, 'id', 'tools', 'mcp', 'index.html')), 'Missing /id/tools/mcp');
});

test('language metadata, switchers, and reciprocal hreflang are present', () => {
  const enHome = read('index.html');
  const idHome = read('id/index.html');
  const idDocs = read('id/docs/index.html');

  assert.match(enHome, /<html[^>]*lang="en"/);
  assert.match(idHome, /<html[^>]*lang="id"/);
  assert.match(idDocs, /<html[^>]*lang="id"/);

  assert.match(enHome, /hreflang="id"/);
  assert.match(idHome, /hreflang="en"/);
  assert.match(idDocs, /hreflang="en"/);
  assert.match(idDocs, /hreflang="id"/);

  assert.match(idHome, /class="lang-switch"/);
  assert.match(idHome, /href="\/id\/"/);
  assert.match(read('id/tools/mcp/index.html'), /href="\/id\/docs\/mcp\//);
});

test('Indonesian copies keep CVSS standard names and the official registry name', () => {
  const mcp = read('id/tools/mcp/index.html');
  assert.ok(mcp.includes('Official MCP Registry'));
  assert.ok(!mcp.includes('Registry MCP Resmi'));

  const glossary = read('id/docs/cvss/metric-glossary/index.html');
  for (const term of [
    'Attack Vector',
    'Attack Complexity',
    'Privileges Required',
    'User Interaction',
    'Vulnerable System Confidentiality',
    'Subsequent System Integrity',
    'Exploit Maturity',
    'Provider Urgency',
  ]) {
    assert.ok(glossary.includes(term), `Glossary must keep the standard term: ${term}`);
  }
  for (const translated of [
    'Vektor Serangan',
    'Kompleksitas Serangan',
    'Hak Istimewa yang Diperlukan',
    'Kematangan Eksploit',
    'Urgensi Penyedia',
  ]) {
    assert.ok(!glossary.includes(translated), `Glossary translated a standard term: ${translated}`);
  }
});

test('calculator keeps standard English terms and shows the Indonesian guidance notice', () => {
  const calc = read('calculator/v4.0.html');
  assert.match(calc, /<html[^>]*lang="en"/);

  const assets = path.join(DIST, 'calculator', 'assets');
  const jsFile = fs.readdirSync(assets).find((file) => file.endsWith('.js'));
  assert.ok(jsFile, 'Calculator JS asset missing');
  const js = fs.readFileSync(path.join(assets, jsFile), 'utf8');
  assert.ok(js.includes('/id/docs/calculator/'), 'Indonesian calculator notice link missing');
  assert.ok(js.includes('istilah CVSS standar'), 'Indonesian calculator notice text missing');
  assert.ok(js.includes('Base Score'), 'Standard CVSS term missing from calculator');
});
