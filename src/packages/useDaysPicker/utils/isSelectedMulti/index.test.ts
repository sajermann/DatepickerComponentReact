/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedMulti } from '.';

describe('package/useMonthsPicker/isSelectedMulti', () => {
  const date = (y: number, m: number, d: number, h = 0, min = 0) =>
    new Date(y, m, d, h, min);

  const testCases = [
    {
      desc: 'returns false if selectedDates is undefined',
      input: { dateToVerify: date(2025, 5, 10), selectedDates: undefined },
      expected: false,
    },
    {
      desc: 'returns false if selectedDates is an empty array',
      input: { dateToVerify: date(2025, 5, 10), selectedDates: [] },
      expected: false,
    },
    {
      desc: 'returns false if selectedDates does not include dateToVerify',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDates: [date(2025, 5, 11), date(2025, 5, 12)],
      },
      expected: false,
    },
    {
      desc: 'returns true if selectedDates includes dateToVerify (same time)',
      input: {
        dateToVerify: date(2025, 5, 10, 12, 0),
        selectedDates: [date(2025, 5, 10, 12, 0), date(2025, 5, 12)],
      },
      expected: true,
    },
    {
      desc: 'returns false if selectedDates includes dateToVerify with different time',
      input: {
        dateToVerify: date(2025, 5, 10, 10, 0),
        selectedDates: [date(2025, 5, 10, 12, 0)],
      },
      expected: false,
    },
    {
      desc: 'returns true if selectedDates includes dateToVerify as only element',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDates: [date(2025, 5, 15)],
      },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isSelectedMulti(input as any)).toBe(expected);
    });
  }
});
