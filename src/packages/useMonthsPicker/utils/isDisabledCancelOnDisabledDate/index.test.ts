/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledCancelOnDisabledDate } from '.';

describe('package/useMonthsPicker/isDisabledCancelOnDisabledDate', () => {
  const baseSelectedMonth = (from?: number, to?: number) => ({ from, to });

  const testCases = [
    {
      desc: 'returns false if selectedMonthByRange is undefined',
      input: { monthToVerify: 5, selectedMonthByRange: undefined },
      expected: false,
    },
    {
      desc: 'returns false if selectedMonthByRange.from is falsy',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(undefined),
      },
      expected: false,
    },
    {
      desc: 'returns true if from is number, to is not, and monthToVerify < from',
      input: {
        monthToVerify: 2,
        selectedMonthByRange: baseSelectedMonth(5, undefined),
      },
      expected: true,
    },
    {
      desc: 'returns false if from is number, to is not, but monthToVerify >= from',
      input: {
        monthToVerify: 5,
        selectedMonthByRange: baseSelectedMonth(5, undefined),
      },
      expected: false,
    },
    {
      desc: 'returns false if from and to are numbers',
      input: {
        monthToVerify: 2,
        selectedMonthByRange: baseSelectedMonth(1, 3),
      },
      expected: false,
    },
    {
      desc: 'returns true if monthToVerify > first disabled after from and all conditions met',
      input: {
        monthToVerify: 8,
        selectedMonthByRange: baseSelectedMonth(2, undefined),
        disabled: { months: [5, 7, 9] },
        disabledAfterFirstDisabledMonths: true,
      },
      expected: true,
    },
    {
      desc: 'returns true if monthToVerify <= first disabled after from',
      input: {
        monthToVerify: 7,
        selectedMonthByRange: baseSelectedMonth(2, undefined),
        disabled: { months: [5, 7, 9] },
        disabledAfterFirstDisabledMonths: true,
      },
      expected: true,
    },
    {
      desc: 'returns false if disabledAfterFirstDisabledMonths is false',
      input: {
        monthToVerify: 8,
        selectedMonthByRange: baseSelectedMonth(2, undefined),
        disabled: { months: [5, 7, 9] },
        disabledAfterFirstDisabledMonths: false,
      },
      expected: false,
    },
    {
      desc: 'returns true if no disabled months after from',
      input: {
        monthToVerify: 8,
        selectedMonthByRange: baseSelectedMonth(9, undefined),
        disabled: { months: [1, 2, 3] },
        disabledAfterFirstDisabledMonths: true,
      },
      expected: true,
    },
    {
      desc: 'returns false if disabled is undefined',
      input: {
        monthToVerify: 8,
        selectedMonthByRange: baseSelectedMonth(2, undefined),
        disabled: undefined,
        disabledAfterFirstDisabledMonths: true,
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledCancelOnDisabledDate(input as any)).toBe(expected);
    });
  }
});
