import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const outDir = path.join(__dirname, 'dist/client');
const root = './client';
const sourceDir = './src';
const base = '/plugin.modify/';

export default defineConfig({
  root,
  base,
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
        target: `http://127.0.0.1:8899${base}`,
        changeOrigin: true,
      },
    },
  },
});
