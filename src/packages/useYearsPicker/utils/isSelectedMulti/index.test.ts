/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedMulti } from '.';

describe('package/useYearsPicker/isSelectedMulti', () => {
  const testCases = [
    {
      desc: 'returns false if selectedYears is undefined',
      input: { yearToVerify: 5, selectedYears: undefined },
      expected: false,
    },
    {
      desc: 'returns false if selectedYears is empty array',
      input: { yearToVerify: 5, selectedYears: [] },
      expected: false,
    },
    {
      desc: 'returns false if selectedYears does not include yearToVerify',
      input: { yearToVerify: 5, selectedYears: [1, 2, 3] },
      expected: false,
    },
    {
      desc: 'returns true if selectedYears includes yearToVerify',
      input: { yearToVerify: 2, selectedYears: [1, 2, 3] },
      expected: true,
    },
    {
      desc: 'returns true if selectedYears includes yearToVerify as only element',
      input: { yearToVerify: 7, selectedYears: [7] },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isSelectedMulti(input as any)).toBe(expected);
    });
  }
});
