/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledBefore } from '.';

describe('package/useDaysPicker/isDisabledBefore', () => {
  const testCases = [
    {
      desc: 'returns false if disabled is undefined',
      input: { dateToVerify: new Date(2025, 5, 10), disabled: undefined },
      expected: false,
    },
    {
      desc: 'returns false if disabled.before is undefined',
      input: { dateToVerify: new Date(2025, 5, 10), disabled: {} },
      expected: false,
    },
    {
      desc: 'returns false if dateToVerify is the same day as disabled.before',
      input: {
        dateToVerify: new Date(2025, 5, 10),
        disabled: { before: new Date(2025, 5, 10) },
      },
      expected: false,
    },
    {
      desc: 'returns true if dateToVerify is before disabled.before',
      input: {
        dateToVerify: new Date(2025, 5, 9),
        disabled: { before: new Date(2025, 5, 10) },
      },
      expected: true,
    },
    {
      desc: 'returns false if dateToVerify is after disabled.before',
      input: {
        dateToVerify: new Date(2025, 5, 11),
        disabled: { before: new Date(2025, 5, 10) },
      },
      expected: false,
    },
    {
      desc: 'returns true if dateToVerify is before disabled.before, different months',
      input: {
        dateToVerify: new Date(2025, 4, 30),
        disabled: { before: new Date(2025, 5, 1) },
      },
      expected: true,
    },
    {
      desc: 'returns true if dateToVerify is before disabled.before, different years',
      input: {
        dateToVerify: new Date(2024, 11, 31),
        disabled: { before: new Date(2025, 0, 1) },
      },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledBefore(input as any)).toBe(expected);
    });
  }
});
