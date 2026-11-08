import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const ROOT = process.cwd();
const WEBSITE_DIST = path.join(ROOT, 'apps', 'website', 'dist');
const CALC_DIST = path.join(ROOT, 'apps', 'calculator', 'dist');

describe('Static Build & Architecture Gate (AGENTS.md Section 2, 3, 5, 8, 9)', () => {
  it('keeps calculator navigation on the current origin', () => {
    for (const route of ['index.html', 'v4.0.html', 'v3.1.html', 'v3.0.html', 'v2.0.html']) {
      const html = fs.readFileSync(path.join(CALC_DIST, route), 'utf8');
      assert.doesNotMatch(html, /<a\b[^>]*href="https:\/\/cvss\.my\.id\//, `${route} has an absolute internal link`);
      assert.match(html, /href="\/docs\//);
      assert.match(html, /href="\/tools\/mcp"/);
    }
  });
  it('builds both website and calculator to pure static assets without _worker.js or functions/', () => {
    assert.ok(fs.existsSync(WEBSITE_DIST), 'apps/website/dist must exist');
    assert.ok(fs.existsSync(CALC_DIST), 'apps/calculator/dist must exist');

    assert.equal(fs.existsSync(path.join(WEBSITE_DIST, '_worker.js')), false, 'Website must not emit _worker.js');
    assert.equal(fs.existsSync(path.join(WEBSITE_DIST, 'functions')), false, 'Website must not emit functions/');
    assert.equal(fs.existsSync(path.join(CALC_DIST, '_worker.js')), false, 'Calculator must not emit _worker.js');
    assert.equal(fs.existsSync(path.join(CALC_DIST, 'functions')), false, 'Calculator must not emit functions/');
  });

  it('generates all required static routes for cvss.my.id', () => {
    const websiteRoutes = [
      'index.html',
      'tools/mcp/index.html',
      'docs/index.html',
      'docs/getting-started/index.html',
      'docs/calculator/index.html',
      'docs/cvss/overview/index.html',
      'docs/cvss/v4/index.html',
      'docs/cvss/v3.1/index.html',
      'docs/cvss/v3.0/index.html',
      'docs/cvss/v2/index.html',
      'docs/cvss/vectors/index.html',
      'docs/cvss/examples/index.html',
      'docs/mcp/index.html',
      'docs/mcp/local/index.html',
      'docs/mcp/remote/index.html',
      'docs/mcp/tools/index.html',
      'docs/mcp/security/index.html',
      'docs/mcp/clients/index.html',
      'docs/mcp/clients/codex/index.html',
      'docs/mcp/clients/claude-code/index.html',
      'docs/mcp/clients/opencode/index.html',
      'docs/mcp/clients/github-copilot/index.html',
      'docs/mcp/clients/cursor/index.html',
      'docs/mcp/clients/vscode/index.html',
      'docs/mcp/clients/zed/index.html',
      'docs/mcp/clients/gemini-cli/index.html',
      'docs/mcp/clients/jetbrains/index.html',
      'docs/mcp/clients/claude-desktop/index.html',
      'docs/mcp/clients/kilo-code/index.html',
      'docs/mcp/clients/cline/index.html',
      'docs/mcp/clients/hermes-agent/index.html',
    ];

    for (const route of websiteRoutes) {
      assert.ok(
        fs.existsSync(path.join(WEBSITE_DIST, route)),
        `Missing website static route: ${route}`
      );
    }

    const calcRoutes = [
      'index.html',
      'v4.0.html',
      'v3.1.html',
      'v3.0.html',
      'v2.0.html',
      '_redirects',
    ];

    assert.equal(fs.existsSync(path.join(WEBSITE_DIST, 'docs/mcp/clients/pi/index.html')), false, 'Removed Pi guide must not be generated');
    const clientIndex = fs.readFileSync(path.join(WEBSITE_DIST, 'docs/mcp/clients/index.html'), 'utf8');
    assert.doesNotMatch(clientIndex, /\/docs\/mcp\/clients\/pi\//);
    for (const client of ['vscode', 'zed', 'gemini-cli', 'jetbrains', 'claude-desktop']) {
      assert.ok(clientIndex.includes(`/docs/mcp/clients/${client}/`), `Client index must link to ${client}`);
    }

    // Cloudflare Pages serves /calculator/v4.0/index.html via a 308 redirect to
    // /calculator/v4.0/, while _redirects sends /calculator/v4.0/ back to
    // /calculator/v4.0 - an infinite redirect loop. Version pages must instead be
    // emitted as flat files (v4.0.html) so the canonical non-slash URL serves 200 directly.
    for (const version of ['v4.0', 'v3.1', 'v3.0', 'v2.0']) {
      assert.equal(
        fs.existsSync(path.join(WEBSITE_DIST, 'calculator', version, 'index.html')),
        false,
        `${version} must not build as a directory route (causes redirect loop with _redirects)`
      );
    }

    for (const route of calcRoutes.filter((route) => route !== '_redirects')) {
      assert.ok(
        fs.existsSync(path.join(WEBSITE_DIST, 'calculator', route)),
        `Missing deployed calculator static route: ${route}`
      );
    }
    assert.match(fs.readFileSync(path.join(WEBSITE_DIST, '_redirects'), 'utf8'), /\/calculator\/v4\.0/);
  });

  it('enforces MCP block order, exact rate limit policy, and repository links on homepage and /tools/mcp', () => {
    for (const page of ['index.html', 'tools/mcp/index.html']) {
      const html = fs.readFileSync(path.join(WEBSITE_DIST, page), 'utf8');
      const localIdx = html.indexOf('curl -fsSL https://get.cvss.my.id/install.sh | bash');
      const remoteIdx = html.indexOf('https://cvss.my.id/mcp');

      assert.ok(localIdx !== -1, `Local MCP installer command missing in ${page}`);
      assert.ok(remoteIdx !== -1, `Remote MCP endpoint missing in ${page}`);
      assert.ok(localIdx < remoteIdx, `Local MCP must appear before Remote MCP in ${page}`);

      assert.ok(
        html.includes('Rate limit: 5 requests per minute per IP. For higher usage, run Local MCP (stdio).'),
        `Exact rate limit notice missing in ${page}`
      );
      assert.ok(
        html.includes('https://github.com/alfa-reza/cvss.my.id'),
        `Website GitHub link missing in ${page}`
      );
      assert.ok(
        html.includes('https://github.com/alfa-reza/cvss-calculator-mcp'),
        `Go MCP GitHub link missing in ${page}`
      );
    }
  });

  it('includes the assessment skill installation in both MCP pages and docs', () => {
    const command = 'npx skills add alfa-reza/cvss-calculator-mcp --skill vulnerability-cvss-assessment';
    for (const page of ['tools/mcp/index.html', 'id/tools/mcp/index.html', 'docs/mcp/index.html', 'id/docs/mcp/index.html']) {
      const html = fs.readFileSync(path.join(WEBSITE_DIST, page), 'utf8');
      assert.ok(html.includes(command), `Skill installation command missing in ${page}`);
    }
  });

  it('includes the agent-guided setup prompt in both MCP pages and docs', () => {
    const prompt = 'Read https://get.cvss.my.id/LLM.txt and follow its instructions to set up CVSS Calculator MCP and offer to install its vulnerability assessment skill.';
    for (const page of ['tools/mcp/index.html', 'id/tools/mcp/index.html', 'docs/mcp/index.html', 'id/docs/mcp/index.html']) {
      const html = fs.readFileSync(path.join(WEBSITE_DIST, page), 'utf8');
      assert.ok(html.includes(prompt), `Agent setup prompt missing in ${page}`);
    }
  });

  it('verifies calculator JS bundle makes zero network scoring or telemetry requests and meets gzip size budgets', () => {
    const assetsDir = path.join(CALC_DIST, 'assets');
    const files = fs.readdirSync(assetsDir);
    const jsFiles = files.filter((f) => f.endsWith('.js'));
    const cssFiles = files.filter((f) => f.endsWith('.css'));

    assert.ok(jsFiles.length > 0, 'Calculator must output JS asset');
    assert.ok(cssFiles.length > 0, 'Calculator must output CSS asset');

    let totalJsGzip = 0;
    for (const jsFile of jsFiles) {
      const content = fs.readFileSync(path.join(assetsDir, jsFile));
      const text = content.toString('utf8');
      assert.equal(text.includes('cvss.my.id/mcp'), false, 'Calculator JS must never call cvss.my.id/mcp');
      assert.equal(text.includes('XMLHttpRequest'), false, 'Calculator JS must not use XMLHttpRequest');
      totalJsGzip += zlib.gzipSync(content).length;
    }

    let totalCssGzip = 0;
    for (const cssFile of cssFiles) {
      const content = fs.readFileSync(path.join(assetsDir, cssFile));
      totalCssGzip += zlib.gzipSync(content).length;
    }

    assert.ok(totalJsGzip <= 150 * 1024, `Calculator JS gzip (${totalJsGzip} B) exceeds 150 KiB budget`);
    assert.ok(totalCssGzip <= 30 * 1024, `Calculator CSS gzip (${totalCssGzip} B) exceeds 30 KiB budget`);
  });
});
