/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledYears } from '.';

describe('package/useYearsPicker/isDisabledYears', () => {
  const testCases = [
    {
      desc: 'returns false if disabled is undefined',
      input: { yearToVerify: 5, disabled: undefined },
      expected: false,
    },
    {
      desc: 'returns false if disabled.years is undefined',
      input: { yearToVerify: 5, disabled: {} },
      expected: false,
    },
    {
      desc: 'returns false if disabled.years does not include yearToVerify',
      input: { yearToVerify: 5, disabled: { years: [1, 2, 3] } },
      expected: false,
    },
    {
      desc: 'returns true if disabled.years includes yearToVerify',
      input: { yearToVerify: 2, disabled: { years: [1, 2, 3] } },
      expected: true,
    },
    {
      desc: 'returns false if disabled.years is empty array',
      input: { yearToVerify: 1, disabled: { years: [] } },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledYears(input as any)).toBe(expected);
    });
  }
});
