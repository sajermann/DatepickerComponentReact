/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedMulti } from '.';

describe('package/useMonthsPicker/isSelectedMulti', () => {
  const testCases = [
    {
      desc: 'returns false if selectedMonths is undefined',
      input: { monthToVerify: 5, selectedMonths: undefined },
      expected: false,
    },
    {
      desc: 'returns false if selectedMonths is empty array',
      input: { monthToVerify: 5, selectedMonths: [] },
      expected: false,
    },
    {
      desc: 'returns false if selectedMonths does not include monthToVerify',
      input: { monthToVerify: 5, selectedMonths: [1, 2, 3] },
      expected: false,
    },
    {
      desc: 'returns true if selectedMonths includes monthToVerify',
      input: { monthToVerify: 2, selectedMonths: [1, 2, 3] },
      expected: true,
    },
    {
      desc: 'returns true if selectedMonths includes monthToVerify as only element',
      input: { monthToVerify: 7, selectedMonths: [7] },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isSelectedMulti(input as any)).toBe(expected);
    });
  }
});
