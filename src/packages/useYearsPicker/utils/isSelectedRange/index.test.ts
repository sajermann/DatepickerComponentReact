/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedRange } from '.';

describe('package/useYearsPicker/isSelectedRange', () => {
  const baseSelectedYear = (from?: number, to?: number) => ({ from, to });

  const testCases = [
    {
      desc: 'returns false if selectedYearByRange is undefined',
      input: { yearToVerify: 5, selectedYearByRange: undefined },
      expected: false,
    },
    {
      desc: 'returns true if yearToVerify equals from',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(5, 8),
      },
      expected: true,
    },
    {
      desc: 'returns true if yearToVerify equals to',
      input: {
        yearToVerify: 8,
        selectedYearByRange: baseSelectedYear(5, 8),
      },
      expected: true,
    },
    {
      desc: 'returns true if yearToVerify is between from and to',
      input: {
        yearToVerify: 6,
        selectedYearByRange: baseSelectedYear(5, 8),
      },
      expected: true,
    },
    {
      desc: 'returns false if yearToVerify is less than from',
      input: {
        yearToVerify: 4,
        selectedYearByRange: baseSelectedYear(5, 8),
      },
      expected: false,
    },
    {
      desc: 'returns false if yearToVerify is greater than to',
      input: {
        yearToVerify: 10,
        selectedYearByRange: baseSelectedYear(5, 8),
      },
      expected: false,
    },
    {
      desc: 'returns false if from is not a number',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(undefined, 8),
      },
      expected: false,
    },
    {
      desc: 'returns false if to is not a number',
      input: {
        yearToVerify: 8,
        selectedYearByRange: baseSelectedYear(5, undefined),
      },
      expected: false,
    },
    {
      desc: 'returns false if both from and to are not numbers',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(undefined, undefined),
      },
      expected: false,
    },
    {
      desc: 'returns true if from and to are the same and yearToVerify equals them',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(5, 5),
      },
      expected: true,
    },
    {
      desc: 'returns false if from and to are the same and yearToVerify is different',
      input: {
        yearToVerify: 6,
        selectedYearByRange: baseSelectedYear(5, 5),
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
