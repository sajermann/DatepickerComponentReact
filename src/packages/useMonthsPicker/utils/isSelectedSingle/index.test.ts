/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedSingle } from '.';

describe('package/useMonthsPicker/isSelectedSingle', () => {
  const testCases = [
    {
      desc: 'returns true if monthToVerify equals selectedMonth',
      input: { monthToVerify: 5, selectedMonth: 5 },
      expected: true,
    },
    {
      desc: 'returns false if monthToVerify does not equal selectedMonth',
      input: { monthToVerify: 5, selectedMonth: 3 },
      expected: false,
    },
    {
      desc: 'returns false if selectedMonth is undefined',
      input: { monthToVerify: 5, selectedMonth: undefined },
      expected: false,
    },
    {
      desc: 'returns false if selectedMonth is null',
      input: { monthToVerify: 5, selectedMonth: null },
      expected: false,
    },
    {
      desc: 'returns true if both monthToVerify and selectedMonth are 0',
      input: { monthToVerify: 0, selectedMonth: 0 },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isSelectedSingle(input as any)).toBe(expected);
    });
  }
});
