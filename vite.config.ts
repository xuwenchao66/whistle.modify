import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const outDir = path.resolve(__dirname, 'dist/ui');

// https://vitejs.dev/config/
export default defineConfig({
  root: './ui',
  plugins: [react()],
  build: {
    outDir,
  },
});
