/// <reference types="vitest" />

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

function getVitestToken(): string | null {
  const possiblePaths = [
    // Windows AppData/Local
    process.env.LOCALAPPDATA
      ? path.join(process.env.LOCALAPPDATA, 'vitest', '.vitest-secret-token')
      : null,
    // Linux / Mac / WSL
    path.join(
      os.homedir(),
      '.local',
      'share',
      'vitest',
      '.vitest-secret-token',
    ),
    // Fallback dentro do node_modules do projeto
    path.join(process.cwd(), 'node_modules', '.vitest', '.vitest-secret-token'),
  ].filter(Boolean) as string[];
  for (const tokenPath of possiblePaths) {
    try {
      if (fs.existsSync(tokenPath)) {
        return fs.readFileSync(tokenPath, 'utf-8').trim();
      }
    } catch {}
  }
  return null;
}

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
      reporter: ['text', 'lcov', 'html', 'json-summary'],
      exclude: [
        '**/types/**',
        '**/interface/**',
        '**/*.d.ts',
        '**.config.ts',
        '**/assets/**',
        'src/index.tsx',
        'components/Params/index.ts',
        'hooks/useBreadcrumbs/util/index.ts',
        'hooks/useDarkMode/utils/index.ts',
        'hooks/useFontSize/utils/index.ts',
        'hooks/useRoutesMenu/utils/index.ts',
        'packages/DatePickerMega/index.ts',
        'packages/DatePickerMega/hooks/index.ts',
        'packages/DatePickerMega/utils/index.ts',
        'packages/DatePickerRD/index.ts',
        'packages/DayPicker/index.ts',
        'packages/DayPicker/hooks/index.ts',
        'packages/DayPicker/utils/index.ts',
        'packages/MonthPicker/utils/index.ts',
        'packages/YearPicker/utils/index.ts',
        'packages/useDatePicker/index.ts',
        'packages/useDatePicker/hooks/useHeaders/utils/index.ts',
        'packages/useDaysPicker/index.ts',
        'packages/useDaysPicker/utils/index.ts',
        'packages/useMonthsPicker/index.ts',
        'packages/useMonthsPicker/utils/index.ts',
        'packages/useYearsPicker/index.ts',
        'packages/useYearsPicker/utils/index.ts',
        'pages/DayPicker/components/Playground/utils/index.ts',
        'pages/MonthPicker/components/Playground/utils/index.ts',
        'pages/YearPicker/components/Playground/utils/index.ts',
        'hooks/useBreadcrumbs/utils/index.ts',
      ],
      reportOnFailure: true,
    },
  },
  plugins: [
    {
      name: 'vitest-token-auto-open',
      configureServer(server) {
        const open = server.config.server.open;
        if (typeof open === 'string' && open.startsWith('/__vitest__')) {
          const token = getVitestToken();
          if (token && !open.includes('token=')) {
            server.config.server.open = `${open}${open.includes('?') ? '&' : '?'}token=${token}`;
          }
        }
      },
    },
  ],
});
