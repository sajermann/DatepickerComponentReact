/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledMonths } from '.';

describe('package/useMonthsPicker/isDisabledMonths', () => {
  const testCases = [
    {
      desc: 'returns false if disabled is undefined',
      input: { monthToVerify: 5, disabled: undefined },
      expected: false,
    },
    {
      desc: 'returns false if disabled.months is undefined',
      input: { monthToVerify: 5, disabled: {} },
      expected: false,
    },
    {
      desc: 'returns false if disabled.months does not include monthToVerify',
      input: { monthToVerify: 5, disabled: { months: [1, 2, 3] } },
      expected: false,
    },
    {
      desc: 'returns true if disabled.months includes monthToVerify',
      input: { monthToVerify: 2, disabled: { months: [1, 2, 3] } },
      expected: true,
    },
    {
      desc: 'returns false if disabled.months is empty array',
      input: { monthToVerify: 1, disabled: { months: [] } },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledMonths(input as any)).toBe(expected);
    });
  }
});
