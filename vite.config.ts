import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const outDir = path.join(__dirname, 'dist/ui');
const root = './ui';
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
});
