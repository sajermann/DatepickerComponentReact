/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedRange } from '.';

describe('package/useMonthsPicker/isSelectedRange', () => {
  const baseSelectedMonth = (from?: number, to?: number) => ({ from, to });

  const testCases = [
    {
      desc: 'returns false if selectedMonthByRange is undefined',
      input: { monthToVerify: 5, selectedMonthByRange: undefined },
      expected: false,
    },
    {
      desc: 'returns true if monthToVerify equals from',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(5, 8),
      },
      expected: true,
    },
    {
      desc: 'returns true if monthToVerify equals to',
      input: {
        monthToVerify: 8,
        selectedMonthByRange: baseSelectedMonth(5, 8),
      },
      expected: true,
    },
    {
      desc: 'returns true if monthToVerify is between from and to',
      input: {
        monthToVerify: 6,
        selectedMonthByRange: baseSelectedMonth(5, 8),
      },
      expected: true,
    },
    {
      desc: 'returns false if monthToVerify is less than from',
      input: {
        monthToVerify: 4,
        selectedMonthByRange: baseSelectedMonth(5, 8),
      },
      expected: false,
    },
    {
      desc: 'returns false if monthToVerify is greater than to',
      input: {
        monthToVerify: 10,
        selectedMonthByRange: baseSelectedMonth(5, 8),
      },
      expected: false,
    },
    {
      desc: 'returns false if from is not a number',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(undefined, 8),
      },
      expected: false,
    },
    {
      desc: 'returns false if to is not a number',
      input: {
        monthToVerify: 8,
        selectedMonthByRange: baseSelectedMonth(5, undefined),
      },
      expected: false,
    },
    {
      desc: 'returns false if both from and to are not numbers',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(undefined, undefined),
      },
      expected: false,
    },
    {
      desc: 'returns true if from and to are the same and monthToVerify equals them',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(5, 5),
      },
      expected: true,
    },
    {
      desc: 'returns false if from and to are the same and monthToVerify is different',
      input: {
        monthToVerify: 6,
        selectedMonthByRange: baseSelectedMonth(5, 5),
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isSelectedRange(input as any)).toBe(expected);
    });
  }
});
