/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledCancelOnDisabledDate } from '.';

describe('package/useDaysPicker/isDisabledCancelOnDisabledDate', () => {
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
      desc: 'returns false if selectedDateByRange.from is undefined',
      input: {
        dateToVerify: date(2025, 5, 10),
        selectedDateByRange: { from: undefined, to: undefined },
      },
      expected: false,
    },
    {
      desc: 'returns true if from is set, to is not, and dateToVerify is before from',
      input: {
        dateToVerify: date(2025, 5, 5),
        selectedDateByRange: { from: date(2025, 5, 10) },
      },
      expected: true,
    },
    {
      desc: 'returns false if from is set, to is not, and dateToVerify is after from',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10) },
      },
      expected: false,
    },
    {
      desc: 'returns true if there is a disabled week between from and dateToVerify and all conditions met',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10) },
        disabled: { weeeks: [0, 1, 2, 3, 4, 5, 6] }, // All days disabled
        disabledAfterFirstDisabledDates: true,
      },
      expected: true,
    },
    {
      desc: 'returns false if no disabled weeks between from and dateToVerify',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10) },
        disabled: { weeeks: [] },
        disabledAfterFirstDisabledDates: true,
      },
      expected: false,
    },
    {
      desc: 'returns true if there is a disabled date after from and dateToVerify is after that date',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10) },
        disabled: { dates: [date(2025, 5, 12), date(2025, 5, 14)] },
        disabledAfterFirstDisabledDates: true,
      },
      expected: true,
    },
    {
      desc: 'returns false if there is a disabled date after from but dateToVerify is not after that date',
      input: {
        dateToVerify: date(2025, 5, 13),
        selectedDateByRange: { from: date(2025, 5, 10) },
        disabled: { dates: [date(2025, 5, 12), date(2025, 5, 14)] },
        disabledAfterFirstDisabledDates: true,
      },
      expected: true,
    },
    {
      desc: 'returns false if disabledAfterFirstDisabledDates is false',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10) },
        disabled: { dates: [date(2025, 5, 12), date(2025, 5, 14)] },
        disabledAfterFirstDisabledDates: false,
      },
      expected: false,
    },
    {
      desc: 'returns false if no disabled dates after from',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10) },
        disabled: { dates: [date(2025, 5, 5)] },
        disabledAfterFirstDisabledDates: true,
      },
      expected: false,
    },
    {
      desc: 'returns false if disabled is undefined',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10) },
        disabled: undefined,
        disabledAfterFirstDisabledDates: true,
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedDateByRange.to is set',
      input: {
        dateToVerify: date(2025, 5, 15),
        selectedDateByRange: { from: date(2025, 5, 10), to: date(2025, 5, 16) },
        disabled: { dates: [date(2025, 5, 12)] },
        disabledAfterFirstDisabledDates: true,
      },
      expected: false,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledCancelOnDisabledDate(input as any)).toBe(expected);
    });
  }
});
