import { describe, expect, it, vi } from 'vitest';
import { formatTwoNumbers } from '.';

describe('packages/DatePickerMega/utils/formatTwoNumbers', () => {
  const testCases = [
    {
      input: '1',
      expected: '01',
      desc: 'pads single digit string with leading zero',
    },
    {
      input: '9',
      expected: '09',
      desc: 'pads single digit string with leading zero',
    },
    { input: '0', expected: '00', desc: 'pads "0" with leading zero' },
    { input: '10', expected: '10', desc: 'returns two-digit string unchanged' },
    { input: '25', expected: '25', desc: 'returns two-digit string unchanged' },
    {
      input: '123',
      expected: '123',
      desc: 'returns string with more than two digits unchanged',
    },
    { input: '', expected: '', desc: 'returns empty string unchanged' },
  ];

  for (const { input, expected, desc } of testCases) {
    it(desc, () => {
      expect(formatTwoNumbers(input)).toBe(expected);
    });
  }
});
