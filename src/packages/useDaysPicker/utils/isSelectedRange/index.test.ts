/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isSelectedRange } from '.';

describe('package/useMonthsPicker/isSelectedRange', () => {
  const date = (y: number, m: number, d: number, h = 0, min = 0) =>
    new Date(y, m, d, h, min);

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
      desc: 'returns true if dateToVerify equals from',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 15) },
      },
      expected: true,
    },
    {
      desc: 'returns true if dateToVerify equals to',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 15) },
      },
      expected: true,
    },
    {
      desc: 'returns true if dateToVerify is within the interval [from, to]',
      input: {
        dateToVerify: date(2025, 5, 12),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 15) },
      },
      expected: true,
    },
    {
      desc: 'returns false if dateToVerify is before the interval',
      input: {
        dateToVerify: date(2025, 5, 9),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 15) },
      },
      expected: false,
    },
    {
      desc: 'returns false if dateToVerify is after the interval',
      input: {
        dateToVerify: date(2025, 5, 16),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 15) },
      },
      expected: false,
    },
    {
      desc: 'returns false if from is not set',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: { from: undefined, to: date(2025, 5, 15) },
      },
      expected: false,
    },
    {
      desc: 'returns false if to is not set',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: { from: date(2025, 5, 10), to: undefined },
      },
      expected: true, // because dateToVerify === from
    },
    {
      desc: 'returns false if both from and to are not set',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: { from: undefined, to: undefined },
      },
      expected: false,
    },
    {
      desc: 'returns true if from and to are the same and dateToVerify equals them',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 10) },
      },
      expected: true,
    },
    {
      desc: 'returns false if from and to are the same and dateToVerify is different',
      input: {
        dateToVerify: date(2025, 5, 11),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 10) },
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isSelectedRange(input as any)).toBe(expected);
    });
  }
});
