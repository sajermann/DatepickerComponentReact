/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledSameMonth } from '.';

describe('package/useMonthsPicker/isDisabledSameMonth', () => {
  const baseSelectedMonth = (from?: number, to?: number) => ({ from, to });

  const testCases = [
    {
      desc: 'returns false if selectedMonthByRange is undefined',
      input: { monthToVerify: 5, selectedMonthByRange: undefined },
      expected: false,
    },
    {
      desc: 'returns false if disabledSameMonth is not true',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: {
          disabledSameMonth: false,
          selectedMonth: baseSelectedMonth(5),
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedMonth.from is not a number',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: {
          disabledSameMonth: true,
          selectedMonth: baseSelectedMonth(undefined),
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if both from and to are numbers',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: {
          disabledSameMonth: true,
          selectedMonth: baseSelectedMonth(5, 6),
        },
      },
      expected: false,
    },
    {
      desc: 'returns true if monthToVerify equals selectedMonth.from and all conditions are met',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: {
          disabledSameMonth: true,
          selectedMonth: baseSelectedMonth(5),
        },
      },
      expected: true,
    },
    {
      desc: 'returns false if monthToVerify does not equal selectedMonth.from and all conditions are met',
      input: {
        monthToVerify: 4,
        selectedMonthByRange: {
          disabledSameMonth: true,
          selectedMonth: baseSelectedMonth(5),
        },
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledSameMonth(input as any)).toBe(expected);
    });
  }
});
