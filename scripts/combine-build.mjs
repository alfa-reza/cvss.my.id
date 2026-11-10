import { existsSync, copyFileSync, cpSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const calculatorDist = path.join(ROOT, 'apps', 'calculator', 'dist');
const websiteDist = path.join(ROOT, 'apps', 'website', 'dist');
const destination = path.join(websiteDist, 'calculator');

if (!existsSync(calculatorDist)) {
  console.error('combine-build: apps/calculator/dist is missing. Run "npm run build:calculator" first.');
  process.exit(1);
}
if (!existsSync(path.join(calculatorDist, '_redirects'))) {
  console.error('combine-build: apps/calculator/dist/_redirects is missing. Rebuild the calculator app.');
  process.exit(1);
}
if (!existsSync(websiteDist)) {
  console.error('combine-build: apps/website/dist is missing. Run "npm run build:website" first.');
  process.exit(1);
}

rmSync(destination, { recursive: true, force: true });
cpSync(calculatorDist, destination, {
  recursive: true,
  filter: (source) => !source.endsWith('/_redirects'),
});
copyFileSync(path.join(calculatorDist, '_redirects'), path.join(websiteDist, '_redirects'));

// Build the sitemap after combining both applications, using their canonical URLs.
const { readdirSync, readFileSync, writeFileSync } = await import('node:fs');
function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? htmlFiles(file) : entry.name.endsWith('.html') ? [file] : [];
  });
}
const urls = new Set();
for (const file of htmlFiles(websiteDist)) {
  if (path.basename(file) === '404.html') continue;
  const html = readFileSync(file, 'utf8');
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  if (canonical?.startsWith('https://cvss.my.id/')) urls.add(canonical);
}
const escapeXml = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
writeFileSync(path.join(websiteDist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...urls].sort().map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n')}\n</urlset>\n`);
