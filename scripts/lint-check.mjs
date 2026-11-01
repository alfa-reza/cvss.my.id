import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const EM_DASH = '\u2014';

const SOURCE_DIRS = [
  path.join(ROOT, 'packages'),
  path.join(ROOT, 'apps', 'calculator'),
  path.join(ROOT, 'apps', 'website', 'src'),
  path.join(ROOT, 'DESIGN.md'),
  path.join(ROOT, 'README.md'),
];

const FORBIDDEN_PATTERNS = [
  { pattern: /fonts\.googleapis\.com/i, reason: 'External Google Fonts CDN is forbidden (AGENTS.md Rule 4)' },
  { pattern: /fonts\.gstatic\.com/i, reason: 'External Google Fonts CDN is forbidden (AGENTS.md Rule 4)' },
  { pattern: /google-analytics\.com|googletagmanager\.com|plausible\.io|posthog/i, reason: 'Analytics/telemetry scripts are forbidden (AGENTS.md Rule 2)' },
];

function collectFiles(targetPath, acc = []) {
  if (!fs.existsSync(targetPath)) return acc;
  const stat = fs.statSync(targetPath);
  if (stat.isFile()) {
    acc.push(targetPath);
    return acc;
  }
  for (const entry of fs.readdirSync(targetPath)) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.astro') continue;
    collectFiles(path.join(targetPath, entry), acc);
  }
  return acc;
}

let errors = 0;

for (const srcPath of SOURCE_DIRS) {
  const files = collectFiles(srcPath);
  for (const file of files) {
    const ext = path.extname(file);
    if (!['.ts', '.mjs', '.js', '.astro', '.md', '.css', '.html', '.json'].includes(ext)) continue;
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(ROOT, file);

    if (content.includes(EM_DASH)) {
      console.error(`[FAIL] Em dash (U+2014) found in ${rel} (violates antislop R-02)`);
      errors++;
    }

    for (const rule of FORBIDDEN_PATTERNS) {
      if (rule.pattern.test(content)) {
        console.error(`[FAIL] ${rule.reason} in ${rel}`);
        errors++;
      }
    }
  }
}

// Verify static build artifacts if dist directories exist
const distDirs = [
  { name: 'website', dir: path.join(ROOT, 'apps', 'website', 'dist') },
  { name: 'calculator', dir: path.join(ROOT, 'apps', 'calculator', 'dist') },
];

for (const { name, dir } of distDirs) {
  if (fs.existsSync(dir)) {
    const workerFile = path.join(dir, '_worker.js');
    const functionsDir = path.join(dir, 'functions');
    if (fs.existsSync(workerFile)) {
      console.error(`[FAIL] _worker.js found in ${name} dist (violates static-only Cloudflare Pages rule)`);
      errors++;
    }
    if (fs.existsSync(functionsDir)) {
      console.error(`[FAIL] functions/ found in ${name} dist (violates static-only Cloudflare Pages rule)`);
      errors++;
    }
  }
}

if (errors > 0) {
  console.error(`\nLint check failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('Lint check passed: 0 em dashes, 0 external font/telemetry references, 0 SSR/Worker artifacts.');
}
