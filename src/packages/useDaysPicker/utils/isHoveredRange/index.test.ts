/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isHoveredRange } from '.';

describe('package/useDaysPicker/isHoveredRange', () => {
  const date = (y: number, m: number, d: number) => new Date(y, m, d);

  const testCases = [
    {
      desc: 'returns false if both from and to are set (range already selected)',
      input: {
        dateToVerify: date(2025, 5, 12),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 15) },
        lastHoveredDate: date(2025, 5, 14),
      },
      expected: false,
    },
    {
      desc: 'returns false if lastHoveredDate is undefined',
      input: {
        dateToVerify: date(2025, 5, 12),
        selectedDateByRange: { from: date(2025, 5, 10) },
        lastHoveredDate: undefined,
      },
      expected: false,
    },
    {
      desc: 'returns false if lastHoveredDate is null',
      input: {
        dateToVerify: date(2025, 5, 12),
        selectedDateByRange: { from: date(2025, 5, 10) },
        lastHoveredDate: null,
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedDateByRange.from is undefined',
      input: {
        dateToVerify: date(2025, 5, 12),
        selectedDateByRange: { from: undefined },
        lastHoveredDate: date(2025, 5, 14),
      },
      expected: false,
    },
    {
      desc: 'returns true if dateToVerify is within the interval [from, lastHoveredDate]',
      input: {
        dateToVerify: date(2025, 5, 12),
        selectedDateByRange: { from: date(2025, 5, 10) },
        lastHoveredDate: date(2025, 5, 14),
      },
      expected: true,
    },
    {
      desc: 'returns true if dateToVerify is equal to start of interval',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: { from: date(2025, 5, 10) },
        lastHoveredDate: date(2025, 5, 14),
      },
      expected: true,
    },
    {
      desc: 'returns true if dateToVerify is equal to end of interval',
      input: {
        dateToVerify: date(2025, 5, 14),
        selectedDateByRange: { from: date(2025, 5, 10) },
        lastHoveredDate: date(2025, 5, 14),
      },
      expected: true,
    },
    {
      desc: 'returns false if dateToVerify is before the interval',
      input: {
        dateToVerify: date(2025, 5, 9),
        selectedDateByRange: { from: date(2025, 5, 10) },
        lastHoveredDate: date(2025, 5, 14),
      },
      expected: false,
    },
    {
      desc: 'returns false if dateToVerify is after the interval',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10) },
        lastHoveredDate: date(2025, 5, 14),
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isHoveredRange(input as any)).toBe(expected);
    });
  }
});
