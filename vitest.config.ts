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
});
