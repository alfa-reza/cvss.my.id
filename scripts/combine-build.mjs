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
