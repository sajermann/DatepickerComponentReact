/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledSameYear } from '.';

describe('package/useYearsPicker/isDisabledSameYear', () => {
  const baseSelectedYear = (from?: number, to?: number) => ({ from, to });

  const testCases = [
    {
      desc: 'returns false if selectedYearByRange is undefined',
      input: { yearToVerify: 5, selectedYearByRange: undefined },
      expected: false,
    },
    {
      desc: 'returns false if disabledSameYear is not true',
      input: {
        yearToVerify: 5,
        selectedYearByRange: {
          disabledSameYear: false,
          selectedYear: baseSelectedYear(5),
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedYear.from is not a number',
      input: {
        yearToVerify: 5,
        selectedYearByRange: {
          disabledSameYear: true,
          selectedYear: baseSelectedYear(undefined),
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if both from and to are numbers',
      input: {
        yearToVerify: 5,
        selectedYearByRange: {
          disabledSameYear: true,
          selectedYear: baseSelectedYear(5, 6),
        },
      },
      expected: false,
    },
    {
      desc: 'returns true if yearToVerify equals selectedYear.from and all conditions are met',
      input: {
        yearToVerify: 5,
        selectedYearByRange: {
          disabledSameYear: true,
          selectedYear: baseSelectedYear(5),
        },
      },
      expected: true,
    },
    {
      desc: 'returns false if yearToVerify does not equal selectedYear.from and all conditions are met',
      input: {
        yearToVerify: 4,
        selectedYearByRange: {
          disabledSameYear: true,
          selectedYear: baseSelectedYear(5),
        },
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledSameYear(input as any)).toBe(expected);
    });
  }
});
