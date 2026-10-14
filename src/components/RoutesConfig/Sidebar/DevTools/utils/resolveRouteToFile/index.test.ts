import { describe, expect, it } from 'vitest';
import { resolveRouteToFile } from './index';

describe('components/RoutesConfig/Sidebar/DevTools/utils/resolveRouteToFile', () => {
  it('should return null when pathname is not a string', () => {
    // @ts-expect-error testing invalid type
    expect(resolveRouteToFile(undefined)).toBeNull();
    // @ts-expect-error testing invalid type
    expect(resolveRouteToFile(null)).toBeNull();
    // @ts-expect-error testing invalid type
    expect(resolveRouteToFile(123)).toBeNull();
  });

  it('should resolve known routes correctly', () => {
    const home = resolveRouteToFile('/');
    expect(home).toEqual({
      folder: 'src/pages/Home',
      filePath: 'src/pages/Home/index.tsx',
      testPath: 'src/pages/Home/index.test.tsx',
      componentName: 'Home',
    });

    const yearPicker = resolveRouteToFile('/year-picker');
    expect(yearPicker?.componentName).toBe('YearPicker');

    const monthPicker = resolveRouteToFile('/month-picker');
    expect(monthPicker?.componentName).toBe('MonthPicker');

    const dayPicker = resolveRouteToFile('/day-picker');
    expect(dayPicker?.componentName).toBe('DayPicker');

    const mega = resolveRouteToFile('/datepicker-mega');
    expect(mega?.componentName).toBe('DatePickerMega');

    const rd = resolveRouteToFile('/datepicker-rd');
    expect(rd?.componentName).toBe('DatePickerRD');

    const demo = resolveRouteToFile('/demo');
    expect(demo?.componentName).toBe('Demo');

    const notFound = resolveRouteToFile('/not-found');
    expect(notFound?.componentName).toBe('NotFound');
  });

  it('should strip query params, hashes, and trailing slashes', () => {
    const res = resolveRouteToFile('/demo/?query=true#heading');
    expect(res).toEqual({
      folder: 'src/pages/Demo',
      filePath: 'src/pages/Demo/index.tsx',
      testPath: 'src/pages/Demo/index.test.tsx',
      componentName: 'Demo',
    });
  });

  it('should fallback to not-found when route is unknown', () => {
    const unknown = resolveRouteToFile('/some/random/unknown/route');
    expect(unknown?.componentName).toBe('NotFound');
  });
});
