import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import type { IncomingMessage } from 'node:http';

function rewriteVersionRoute(req: IncomingMessage, _res: unknown, next: () => void): void {
  if (req.url) {
    req.url = req.url.replace(/^(\/v(?:4\.0|3\.1|3\.0|2\.0))(?=\?|$)/, '$1/index.html');
  }
  next();
}

export default defineConfig({
  plugins: [{
    name: 'calculator-version-routes',
    configureServer(server) { server.middlewares.use(rewriteVersionRoute); },
    configurePreviewServer(server) { server.middlewares.use(rewriteVersionRoute); },
  }],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        v40: resolve(__dirname, 'v4.0/index.html'),
        v31: resolve(__dirname, 'v3.1/index.html'),
        v30: resolve(__dirname, 'v3.0/index.html'),
        v20: resolve(__dirname, 'v2.0/index.html'),
      },
    },
  },
});
