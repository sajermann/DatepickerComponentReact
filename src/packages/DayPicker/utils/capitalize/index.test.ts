import { describe, expect, it, vi } from 'vitest';
import { capitalize } from '.';

describe('packages/DayPicker/utils/capitalize', () => {
  const testCases = [
    {
      input: 'hello',
      expected: 'Hello',
      desc: 'capitalizes the first letter of a lowercase string',
    },
    {
      input: 'Hello',
      expected: 'Hello',
      desc: 'does not change an already capitalized string',
    },
    {
      input: 'a',
      expected: 'A',
      desc: 'capitalizes a single lowercase character',
    },
    { input: '', expected: '', desc: 'returns an empty string unchanged' },
    { input: 123, expected: 123, desc: 'does not change a number' },
    {
      input: { test: true },
      expected: { test: true },
      desc: 'does not change an object',
    },
    {
      input: undefined,
      expected: undefined,
      desc: 'does not change undefined',
    },
    { input: null, expected: null, desc: 'does not change null' },
  ];

  for (const { input, expected, desc } of testCases) {
    it(desc, () => {
      expect(capitalize(input as any)).toEqual(expected);
    });
  }
});
