import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
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
