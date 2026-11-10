import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const dist = new URL('../apps/website/dist/', import.meta.url);
test('robots, sitemap and favicon are available in the combined build', () => {
  const robots = readFileSync(new URL('robots.txt', dist), 'utf8');
  const sitemap = readFileSync(new URL('sitemap.xml', dist), 'utf8');
  assert.match(robots, /Sitemap: https:\/\/cvss\.my\.id\/sitemap\.xml/);
  for (const route of ['/', '/tools/mcp', '/id/tools/mcp', '/docs/mcp/', '/calculator/v4.0', '/calculator/v2.0']) {
    assert.ok(sitemap.includes(`<loc>https://cvss.my.id${route}</loc>`), route);
  }
  assert.doesNotMatch(sitemap, /<loc>[^<]*404/);
  assert.ok(readFileSync(new URL('favicon-48.png', dist)).length > 0);
});

test('international and Indonesian pages have reciprocal language and canonical metadata', () => {
  for (const [en, id, enPath, idPath] of [
    ['index.html', 'id/index.html', '/', '/id/'],
    ['tools/mcp/index.html', 'id/tools/mcp/index.html', '/tools/mcp', '/id/tools/mcp'],
  ]) {
    for (const [file, lang, canonical] of [[en, 'en', enPath], [id, 'id', idPath]]) {
      const html = readFileSync(new URL(file, dist), 'utf8');
      assert.match(html, new RegExp(`<html[^>]*lang="${lang}"`));
      assert.ok(html.includes(`rel="canonical" href="https://cvss.my.id${canonical}"`));
      for (const [hreflang, route] of [['en', enPath], ['id', idPath], ['x-default', enPath]]) {
        assert.ok(html.includes(`hreflang="${hreflang}" href="https://cvss.my.id${route}"`));
      }
    }
  }
  const calculator = readFileSync(new URL('calculator/v4.0.html', dist), 'utf8');
  assert.match(calculator, /<html lang="en">/);
  assert.match(calculator, /property="og:url" content="https:\/\/cvss\.my\.id\/calculator\/v4\.0"/);
});
