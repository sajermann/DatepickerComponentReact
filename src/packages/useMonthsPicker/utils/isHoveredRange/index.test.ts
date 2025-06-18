/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isHoveredRange } from '.';

describe('package/useMonthsPicker/isHoveredRange', () => {
  const baseSelectedMonth = (from?: number, to?: number) => ({ from, to });

  const testCases = [
    {
      desc: 'returns false if both from and to are numbers (range already selected)',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(2, 8),
        lastHoveredMonth: 7,
      },
      expected: false,
    },
    {
      desc: 'returns false if lastHoveredMonth is not a number (undefined)',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(2),
        lastHoveredMonth: undefined,
      },
      expected: false,
    },
    {
      desc: 'returns false if lastHoveredMonth is not a number (null)',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(2),
        lastHoveredMonth: null,
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedMonthByRange.from is not a number',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(undefined),
        lastHoveredMonth: 7,
      },
      expected: false,
    },
    {
      desc: 'returns true if monthToVerify is between from and lastHoveredMonth',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(2),
        lastHoveredMonth: 7,
      },
      expected: true,
    },
    {
      desc: 'returns false if monthToVerify equals from',
      input: {
        monthToVerify: 2,
        selectedMonthByRange: baseSelectedMonth(2),
        lastHoveredMonth: 7,
      },
      expected: false,
    },
    {
      desc: 'returns false if monthToVerify equals lastHoveredMonth',
      input: {
        monthToVerify: 7,
        selectedMonthByRange: baseSelectedMonth(2),
        lastHoveredMonth: 7,
      },
      expected: false,
    },
    {
      desc: 'returns false if monthToVerify is less than from',
      input: {
        monthToVerify: 1,
        selectedMonthByRange: baseSelectedMonth(2),
        lastHoveredMonth: 7,
      },
      expected: false,
    },
    {
      desc: 'returns false if monthToVerify is greater than lastHoveredMonth',
      input: {
        monthToVerify: 8,
        selectedMonthByRange: baseSelectedMonth(2),
        lastHoveredMonth: 7,
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isHoveredRange(input as any)).toBe(expected);
    });
  }
});
