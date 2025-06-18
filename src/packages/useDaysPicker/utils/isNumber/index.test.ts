/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isNumber } from '.';

describe('package/useMonthsPicker/isNumber', () => {
  const testCases = [
    { input: 0, expected: true, desc: 'returns true for 0' },
    { input: 42, expected: true, desc: 'returns true for a positive integer' },
    { input: -7, expected: true, desc: 'returns true for a negative integer' },
    { input: 3.14, expected: true, desc: 'returns true for a float' },
    { input: NaN, expected: false, desc: 'returns false for NaN' },
    { input: '123', expected: false, desc: 'returns false for a string' },
    { input: null, expected: false, desc: 'returns false for null' },
    { input: undefined, expected: false, desc: 'returns false for undefined' },
    { input: {}, expected: false, desc: 'returns false for an object' },
    { input: [], expected: false, desc: 'returns false for an array' },
    { input: true, expected: false, desc: 'returns false for a boolean' },
    { input: false, expected: false, desc: 'returns false for a boolean' },
    { input: Infinity, expected: true, desc: 'returns true for Infinity' },
    { input: -Infinity, expected: true, desc: 'returns true for -Infinity' },
  ];

  for (const { input, expected, desc } of testCases) {
    it(desc, () => {
      expect(isNumber(input)).toBe(expected);
    });
  }
});
