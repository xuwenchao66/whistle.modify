import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const outDir = path.join(__dirname, 'dist/client');
const root = './client';
const sourceDir = './src';

export default defineConfig({
  root: root,
  plugins: [react()],
  build: {
    outDir,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, root, sourceDir),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8899/plugin.modify',
        changeOrigin: true,
      },
    },
  },
});
