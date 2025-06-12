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
    setupFiles: './src/config/test/setup.ts',
    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: [
        '**/types/**',
        '**/interface/**',
        '**/*.d.ts',
        '**.config.ts',
        '**/assets/**',
        'src/index.tsx',
      ],
      reportOnFailure: true,
    },
  },
});
