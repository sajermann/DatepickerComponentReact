/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isHoveredRange } from '.';

describe('package/useYearsPicker/isHoveredRange', () => {
  const baseSelectedYear = (from?: number, to?: number) => ({ from, to });

  const testCases = [
    {
      desc: 'returns false if both from and to are numbers (range already selected)',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(2, 8),
        lastHoveredYear: 7,
      },
      expected: false,
    },
    {
      desc: 'returns false if lastHoveredYear is not a number (undefined)',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(2),
        lastHoveredYear: undefined,
      },
      expected: false,
    },
    {
      desc: 'returns false if lastHoveredYear is not a number (null)',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(2),
        lastHoveredYear: null,
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedYearByRange.from is not a number',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(undefined),
        lastHoveredYear: 7,
      },
      expected: false,
    },
    {
      desc: 'returns true if yearToVerify is between from and lastHoveredYear',
      input: {
        yearToVerify: 5,
        selectedYearByRange: baseSelectedYear(2),
        lastHoveredYear: 7,
      },
      expected: true,
    },
    {
      desc: 'returns false if yearToVerify equals from',
      input: {
        yearToVerify: 2,
        selectedYearByRange: baseSelectedYear(2),
        lastHoveredYear: 7,
      },
      expected: false,
    },
    {
      desc: 'returns false if yearToVerify equals lastHoveredYear',
      input: {
        yearToVerify: 7,
        selectedYearByRange: baseSelectedYear(2),
        lastHoveredYear: 7,
      },
      expected: false,
    },
    {
      desc: 'returns false if yearToVerify is less than from',
      input: {
        yearToVerify: 1,
        selectedYearByRange: baseSelectedYear(2),
        lastHoveredYear: 7,
      },
      expected: false,
    },
    {
      desc: 'returns false if yearToVerify is greater than lastHoveredYear',
      input: {
        yearToVerify: 8,
        selectedYearByRange: baseSelectedYear(2),
        lastHoveredYear: 7,
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
