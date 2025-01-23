/// <reference types="vitest" />
import * as path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/Config/Test/setup.ts',
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: ['**/main.tsx', '**/*.d.ts', '**/types/**', '**/interface/**'],
      include: ['src/**'],
    },
  },
});
