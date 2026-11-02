import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';
import { resolve } from 'node:path';

let testsFailed = false;

test('calculator version URLs serve their own page in Vite', async () => {
  const root = resolve('apps/calculator');
  const server = await createServer({ root, server: { port: 0, host: '127.0.0.1' }, logLevel: 'silent' });
  try {
    await server.listen();
    const { port } = server.httpServer.address();
    for (const version of ['4.0', '3.1', '3.0', '2.0']) {
      for (const suffix of ['', '/', '?vector=test']) {
        const response = await fetch(`http://127.0.0.1:${port}/calculator/v${version}${suffix}`);
        const html = await response.text();
        assert.equal(response.status, 200);
        assert.match(html, new RegExp(`data-cvss-version="${version.replace('.', '\\.')}"`), `wrong page for v${version}${suffix}`);
      }
    }
  } catch (error) {
    testsFailed = true;
    throw error;
  } finally {
    await server.close();
  }
});

// Vite spawns an esbuild --service subprocess that can outlive server.close()
// and keep this test process (and therefore `node --test`) alive indefinitely.
// Exit explicitly once all tests in this file have finished, preserving the
// failure exit code, so the suite terminates deterministically on Node 20+.
after(() => {
  process.exit(testsFailed ? 1 : 0);
});
