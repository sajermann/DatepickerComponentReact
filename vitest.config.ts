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
        '**/*.config.ts',
        '**/assets/**',
        'src/index.tsx',
        'src/components/RoutesConfig/Sidebar/DevTools/**',
        'src/components/Params/index.tsx',
        'src/hooks/index.ts',
        'src/hooks/useBreadcrumbs/utils/index.ts',
        'src/hooks/useDarkMode/utils/index.ts',
        'src/hooks/useFontSize/utils/index.ts',
        'src/hooks/useRoutesMenu/utils/index.ts',
        'src/packages/DatePickerMega/index.ts',
        'src/packages/DatePickerMega/hooks/index.ts',
        'src/packages/DatePickerMega/utils/index.ts',
        'src/packages/DatePickerRD/index.tsx',
        'src/packages/DayPicker/index.ts',
        'src/packages/DayPicker/hooks/index.ts',
        'src/packages/DayPicker/utils/index.ts',
        'src/packages/MonthPicker/utils/index.ts',
        'src/packages/YearPicker/utils/index.ts',
        'src/packages/useDatePicker/index.ts',
        'src/packages/useDatePicker/hooks/useHeaders/utils/index.ts',
        'src/packages/useDaysPicker/index.ts',
        'src/packages/useDaysPicker/utils/index.ts',
        'src/packages/useMonthsPicker/index.ts',
        'src/packages/useMonthsPicker/utils/index.ts',
        'src/packages/useYearsPicker/index.ts',
        'src/packages/useYearsPicker/utils/index.ts',
        'src/pages/DayPicker/components/Playground/utils/index.ts',
        'src/pages/MonthPicker/components/Playground/utils/index.ts',
        'src/pages/YearPicker/components/Playground/utils/index.ts',
        'src/utils/index.ts',
        'src/**/utils/index.ts',
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
