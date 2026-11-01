import { copyFileSync, cpSync, rmSync } from 'node:fs';

const destination = 'apps/website/dist/calculator';
rmSync(destination, { recursive: true, force: true });
cpSync('apps/calculator/dist', destination, {
  recursive: true,
  filter: (source) => !source.endsWith('/_redirects'),
});
copyFileSync('apps/calculator/dist/_redirects', 'apps/website/dist/_redirects');
