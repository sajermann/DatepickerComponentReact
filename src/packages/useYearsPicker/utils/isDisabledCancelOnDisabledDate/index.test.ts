/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledCancelOnDisabledDate } from '.';

describe('package/useYearsPicker/isDisabledCancelOnDisabledDate', () => {
  const baseSelectedYear = (from?: number, to?: number) => ({ from, to });

  const testCases = [
    {
      desc: 'returns false if selectedYearByRange is undefined',
      input: { yearToVerify: 5, selectedYearByRange: undefined },
      expected: false,
    },
    {
      desc: 'returns false if selectedYearByRange.from is falsy',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(undefined),
      },
      expected: false,
    },
    {
      desc: 'returns true if from is number, to is not, and yearToVerify < from',
      input: {
        yearToVerify: 2,
        selectedYearByRange: baseSelectedYear(5, undefined),
      },
      expected: true,
    },
    {
      desc: 'returns false if from is number, to is not, but yearToVerify >= from',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(5, undefined),
      },
      expected: false,
    },
    {
      desc: 'returns false if from and to are numbers',
      input: {
        yearToVerify: 2,
        selectedYearByRange: baseSelectedYear(1, 3),
      },
      expected: false,
    },
    {
      desc: 'returns true if yearToVerify > first disabled after from and all conditions met',
      input: {
        yearToVerify: 8,
        selectedYearByRange: baseSelectedYear(2, undefined),
        disabled: { years: [5, 7, 9] },
        disabledAfterFirstDisabledYears: true,
      },
      expected: true,
    },
    {
      desc: 'returns true if yearToVerify <= first disabled after from',
      input: {
        yearToVerify: 7,
        selectedYearByRange: baseSelectedYear(2, undefined),
        disabled: { years: [5, 7, 9] },
        disabledAfterFirstDisabledYears: true,
      },
      expected: true,
    },
    {
      desc: 'returns false if disabledAfterFirstDisabledYears is false',
      input: {
        yearToVerify: 8,
        selectedYearByRange: baseSelectedYear(2, undefined),
        disabled: { years: [5, 7, 9] },
        disabledAfterFirstDisabledYears: false,
      },
      expected: false,
    },
    {
      desc: 'returns true if no disabled years after from',
      input: {
        yearToVerify: 8,
        selectedYearByRange: baseSelectedYear(9, undefined),
        disabled: { years: [1, 2, 3] },
        disabledAfterFirstDisabledYears: true,
      },
      expected: true,
    },
    {
      desc: 'returns false if disabled is undefined',
      input: {
        yearToVerify: 8,
        selectedYearByRange: baseSelectedYear(2, undefined),
        disabled: undefined,
        disabledAfterFirstDisabledYears: true,
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
