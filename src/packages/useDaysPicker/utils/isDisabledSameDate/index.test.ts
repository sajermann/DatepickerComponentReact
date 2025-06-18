/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledSameDate } from '.';

describe('package/useDaysPicker/isDisabledSameDate', () => {
  const date = (y: number, m: number, d: number) => new Date(y, m, d);

  const testCases = [
    {
      desc: 'returns false if selectedDateByRange is undefined',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: undefined,
      },
      expected: false,
    },
    {
      desc: 'returns false if disabledSameDate is not true',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: {
          disabledSameDate: false,
          selectedDate: { from: date(2025, 5, 10) },
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedDate.from is not set',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: {
          disabledSameDate: true,
          selectedDate: { from: undefined },
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if both from and to are set',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: {
          disabledSameDate: true,
          selectedDate: { from: date(2025, 5, 10), to: date(2025, 5, 12) },
        },
      },
      expected: false,
    },
    {
      desc: 'returns true if dateToVerify is the same day as selectedDate.from and all conditions are met',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: {
          disabledSameDate: true,
          selectedDate: { from: date(2025, 5, 10) },
        },
      },
      expected: true,
    },
    {
      desc: 'returns false if dateToVerify is not the same day as selectedDate.from and all conditions are met',
      input: {
        dateToVerify: date(2025, 5, 11),
        selectedDateByRange: {
          disabledSameDate: true,
          selectedDate: { from: date(2025, 5, 10) },
        },
      },
      expected: false,
    },
    {
      desc: 'returns true if dateToVerify is the same day as selectedDate.from but with different time',
      input: {
        dateToVerify: new Date(2025, 5, 10, 15, 30),
        selectedDateByRange: {
          disabledSameDate: true,
          selectedDate: { from: new Date(2025, 5, 10, 0, 0) },
        },
      },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledSameDate(input as any)).toBe(expected);
    });
  }
});
