/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledDates } from '.';

describe('package/useDaysPicker/isDisabledDates', () => {
  const date = (y: number, m: number, d: number) => new Date(y, m, d);

  const testCases = [
    {
      desc: 'returns false if disabled is undefined',
      input: { dateToVerify: date(2025, 5, 10), disabled: undefined },
      expected: false,
    },
    {
      desc: 'returns false if disabled.dates is undefined',
      input: { dateToVerify: date(2025, 5, 10), disabled: {} },
      expected: false,
    },
    {
      desc: 'returns false if disabled.dates does not include dateToVerify',
      input: {
        dateToVerify: date(2025, 5, 10),
        disabled: { dates: [date(2025, 5, 11), date(2025, 5, 12)] },
      },
      expected: false,
    },
    {
      desc: 'returns true if disabled.dates includes dateToVerify',
      input: {
        dateToVerify: date(2025, 5, 10),
        disabled: { dates: [date(2025, 5, 10), date(2025, 5, 12)] },
      },
      expected: true,
    },
    {
      desc: 'returns true if disabled.dates includes dateToVerify with different time',
      input: {
        dateToVerify: new Date(2025, 5, 10, 15, 30),
        disabled: { dates: [new Date(2025, 5, 10, 0, 0)] },
      },
      expected: true,
    },
    {
      desc: 'returns false if disabled.dates is empty array',
      input: { dateToVerify: date(2025, 5, 10), disabled: { dates: [] } },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledDates(input as any)).toBe(expected);
    });
  }
});
