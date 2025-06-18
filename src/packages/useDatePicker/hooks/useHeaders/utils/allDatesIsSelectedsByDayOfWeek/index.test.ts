import { afterEach, describe, expect, it, vi } from 'vitest';
import { allDatesIsSelectedsByDayOfWeek } from '.';

describe('packages/useDatePicker/utils/allDatesIsSelectedsByDayOfWeek', () => {
  const makeDay = (
    y: number,
    m: number,
    d: number,
    isDisabled = false,
  ): any => ({
    date: new Date(y, m, d),
    isDisabled,
  });

  it('returns false if multi is undefined', () => {
    expect(allDatesIsSelectedsByDayOfWeek({ dayOfWeek: 1, weeks: [] })).toBe(
      false,
    );
  });

  it('returns false if multi.selectedDates is empty', () => {
    const multi: any = { selectedDates: [] };
    expect(
      allDatesIsSelectedsByDayOfWeek({ dayOfWeek: 1, weeks: [], multi }),
    ).toBe(false);
  });

  it('returns false if all days in column are disabled', () => {
    const weeks = [
      [makeDay(2025, 5, 2, true), makeDay(2025, 5, 3, true)],
      [makeDay(2025, 5, 9, true), makeDay(2025, 5, 10, true)],
    ];
    const multi: any = { selectedDates: [weeks[0][1].date, weeks[1][1].date] };
    expect(allDatesIsSelectedsByDayOfWeek({ dayOfWeek: 1, weeks, multi })).toBe(
      false,
    );
  });

  it('returns true if all non-disabled days in column are selected', () => {
    const weeks = [
      [makeDay(2025, 5, 2), makeDay(2025, 5, 3)],
      [makeDay(2025, 5, 9), makeDay(2025, 5, 10)],
    ];
    const multi: any = { selectedDates: [weeks[0][1].date, weeks[1][1].date] };
    expect(allDatesIsSelectedsByDayOfWeek({ dayOfWeek: 1, weeks, multi })).toBe(
      true,
    );
  });

  it('returns false if not all non-disabled days in column are selected', () => {
    const weeks = [
      [makeDay(2025, 5, 2), makeDay(2025, 5, 3)],
      [makeDay(2025, 5, 9), makeDay(2025, 5, 10)],
    ];
    const multi: any = { selectedDates: [weeks[1][1].date] };
    expect(allDatesIsSelectedsByDayOfWeek({ dayOfWeek: 1, weeks, multi })).toBe(
      false,
    );
  });

  it('ignores disabled days and checks only enabled ones', () => {
    const weeks = [
      [makeDay(2025, 5, 2), makeDay(2025, 5, 3, true)],
      [makeDay(2025, 5, 9), makeDay(2025, 5, 10)],
    ];
    const multi: any = { selectedDates: [weeks[1][1].date] };
    expect(allDatesIsSelectedsByDayOfWeek({ dayOfWeek: 1, weeks, multi })).toBe(
      true,
    );
  });
});
