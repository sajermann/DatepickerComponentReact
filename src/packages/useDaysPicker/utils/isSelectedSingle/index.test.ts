/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedSingle } from '.';

describe('package/useMonthsPicker/isSelectedSingle', () => {
  const date = (y: number, m: number, d: number, h = 0, min = 0) =>
    new Date(y, m, d, h, min);

  const testCases = [
    {
      desc: 'returns true if dateToVerify equals selectedDate (same time)',
      input: {
        dateToVerify: date(2025, 5, 10, 12, 0),
        selectedDate: date(2025, 5, 10, 12, 0),
      },
      expected: true,
    },
    {
      desc: 'returns false if dateToVerify does not equal selectedDate (different day)',
      input: {
        dateToVerify: date(2025, 5, 11),
        selectedDate: date(2025, 5, 10),
      },
      expected: false,
    },
    {
      desc: 'returns false if dateToVerify does not equal selectedDate (different time)',
      input: {
        dateToVerify: date(2025, 5, 10, 10, 0),
        selectedDate: date(2025, 5, 10, 12, 0),
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedDate is undefined',
      input: { dateToVerify: date(2025, 5, 10), selectedDate: undefined },
      expected: false,
    },
    {
      desc: 'returns false if selectedDate is null',
      input: { dateToVerify: date(2025, 5, 10), selectedDate: null },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isSelectedSingle(input as any)).toBe(expected);
    });
  }
});
