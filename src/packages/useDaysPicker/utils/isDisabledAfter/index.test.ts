/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledAfter } from '.';

describe('package/useDaysPicker/isDisabledAfter', () => {
  const testCases = [
    {
      desc: 'returns false if disabled is undefined',
      input: { dateToVerify: new Date(2025, 5, 10), disabled: undefined },
      expected: false,
    },
    {
      desc: 'returns false if disabled.after is undefined',
      input: { dateToVerify: new Date(2025, 5, 10), disabled: {} },
      expected: false,
    },
    {
      desc: 'returns false if dateToVerify is the same day as disabled.after',
      input: {
        dateToVerify: new Date(2025, 5, 10),
        disabled: { after: new Date(2025, 5, 10) },
      },
      expected: false,
    },
    {
      desc: 'returns false if dateToVerify is before disabled.after',
      input: {
        dateToVerify: new Date(2025, 5, 9),
        disabled: { after: new Date(2025, 5, 10) },
      },
      expected: false,
    },
    {
      desc: 'returns true if dateToVerify is after disabled.after',
      input: {
        dateToVerify: new Date(2025, 5, 11),
        disabled: { after: new Date(2025, 5, 10) },
      },
      expected: true,
    },
    {
      desc: 'returns true if dateToVerify is after disabled.after, different months',
      input: {
        dateToVerify: new Date(2025, 6, 1),
        disabled: { after: new Date(2025, 5, 30) },
      },
      expected: true,
    },
    {
      desc: 'returns false if dateToVerify is before disabled.after, different years',
      input: {
        dateToVerify: new Date(2024, 11, 31),
        disabled: { after: new Date(2025, 0, 1) },
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledAfter(input as any)).toBe(expected);
    });
  }
});
