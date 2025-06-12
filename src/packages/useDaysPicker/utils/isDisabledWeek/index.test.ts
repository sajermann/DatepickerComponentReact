/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledWeek } from '.';

describe('package/useDaysPicker/isDisabledWeek', () => {
  const testCases = [
    {
      desc: 'returns false if disabledWeeks is undefined',
      input: { dateToVerify: new Date(2025, 5, 11), disabledWeeks: undefined },
      expected: false,
    },
    {
      desc: 'returns false if disabledWeeks is an empty array',
      input: { dateToVerify: new Date(2025, 5, 11), disabledWeeks: [] },
      expected: false,
    },
    {
      desc: 'returns true if the weekday of dateToVerify is included in disabledWeeks',
      input: { dateToVerify: new Date(2025, 5, 15), disabledWeeks: [0, 6] }, // Sunday or Saturday
      expected: true,
    },
    {
      desc: 'returns false if the weekday of dateToVerify is not included in disabledWeeks',
      input: { dateToVerify: new Date(2025, 5, 12), disabledWeeks: [0, 6] }, // Thursday (4)
      expected: false,
    },
    {
      desc: 'returns true if disabledWeeks includes all days',
      input: {
        dateToVerify: new Date(2025, 5, 11),
        disabledWeeks: [0, 1, 2, 3, 4, 5, 6],
      },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledWeek(input as any)).toBe(expected);
    });
  }
});
