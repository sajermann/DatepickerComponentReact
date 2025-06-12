/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedSingle } from '.';

describe('package/useYearsPicker/isSelectedSingle', () => {
  const testCases = [
    {
      desc: 'returns true if yearToVerify equals selectedYear',
      input: { yearToVerify: 5, selectedYear: 5 },
      expected: true,
    },
    {
      desc: 'returns false if yearToVerify does not equal selectedYear',
      input: { yearToVerify: 5, selectedYear: 3 },
      expected: false,
    },
    {
      desc: 'returns false if selectedYear is undefined',
      input: { yearToVerify: 5, selectedYear: undefined },
      expected: false,
    },
    {
      desc: 'returns false if selectedYear is null',
      input: { yearToVerify: 5, selectedYear: null },
      expected: false,
    },
    {
      desc: 'returns true if both yearToVerify and selectedYear are 0',
      input: { yearToVerify: 0, selectedYear: 0 },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isSelectedSingle(input as any)).toBe(expected);
    });
  }
});
