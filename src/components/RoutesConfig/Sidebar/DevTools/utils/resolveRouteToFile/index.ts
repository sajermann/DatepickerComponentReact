import type { TRouteFileInfo } from './types';

const ROUTES_MAP: Record<string, { folder: string; componentName: string }> = {
  '/': {
    folder: 'src/pages/Home',
    componentName: 'Home',
  },
  '/year-picker': {
    folder: 'src/pages/YearPicker',
    componentName: 'YearPicker',
  },
  '/month-picker': {
    folder: 'src/pages/MonthPicker',
    componentName: 'MonthPicker',
  },
  '/day-picker': {
    folder: 'src/pages/DayPicker',
    componentName: 'DayPicker',
  },
  '/datepicker-mega': {
    folder: 'src/pages/DatePickerMega',
    componentName: 'DatePickerMega',
  },
  '/datepicker-rd': {
    folder: 'src/pages/DatePickerRD',
    componentName: 'DatePickerRD',
  },
  '/demo': {
    folder: 'src/pages/Demo',
    componentName: 'Demo',
  },
  '/not-found': {
    folder: 'src/pages/NotFound',
    componentName: 'NotFound',
  },
};

export function resolveRouteToFile(pathname: string): TRouteFileInfo | null {
  if (typeof pathname !== 'string') {
    return null;
  }

  const cleanPath =
    pathname.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';

  const route = ROUTES_MAP[cleanPath] ?? ROUTES_MAP['/not-found'];

  if (!route) {
    return null;
  }

  return {
    folder: route.folder,
    filePath: `${route.folder}/index.tsx`,
    testPath: `${route.folder}/index.test.tsx`,
    componentName: route.componentName,
  };
}
