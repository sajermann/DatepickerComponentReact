/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledVisibleMonth } from '.';

describe('package/useDaysPicker/isDisabledVisibleMonth', () => {
  const date = (y: number, m: number, d: number) => new Date(y, m, d);

  const testCases = [
    {
      desc: 'returns false if selectOnlyVisibleMonth is false',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectOnlyVisibleMonth: false,
        firstDateOfCurrentMonthOfView: date(2025, 5, 1),
      },
      expected: false,
    },
    {
      desc: 'returns false if selectOnlyVisibleMonth is undefined',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectOnlyVisibleMonth: undefined,
        firstDateOfCurrentMonthOfView: date(2025, 5, 1),
      },
      expected: false,
    },
    {
      desc: 'returns false if dateToVerify is in the same month as firstDateOfCurrentMonthOfView',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectOnlyVisibleMonth: true,
        firstDateOfCurrentMonthOfView: date(2025, 5, 1),
      },
      expected: false,
    },
    {
      desc: 'returns true if selectOnlyVisibleMonth is true and dateToVerify is in a different month',
      input: {
        dateToVerify: date(2025, 6, 1),
        selectOnlyVisibleMonth: true,
        firstDateOfCurrentMonthOfView: date(2025, 5, 1),
      },
      expected: true,
    },
    {
      desc: 'returns true if selectOnlyVisibleMonth is true and dateToVerify is in a different year and month',
      input: {
        dateToVerify: date(2026, 0, 1),
        selectOnlyVisibleMonth: true,
        firstDateOfCurrentMonthOfView: date(2025, 5, 1),
      },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledVisibleMonth(input as any)).toBe(expected);
    });
  }
});
