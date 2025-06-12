/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledByMinInterval } from '.';

describe('package/useDaysPicker/isDisabledByMinInterval', () => {
  const baseSelectedDate = (from?: Date | number, to?: Date | number) => ({
    from,
    to,
  });

  const testCases = [
    {
      desc: 'returns false if selectedDateByRange is undefined',
      input: {
        dateToVerify: new Date(2025, 5, 10),
        selectedDateByRange: undefined,
      },
      expected: false,
    },
    {
      desc: 'returns false if minInterval is missing',
      input: {
        dateToVerify: new Date(2025, 5, 10),
        selectedDateByRange: {
          selectedDate: baseSelectedDate(new Date(2025, 5, 1)),
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedDate.from is missing',
      input: {
        dateToVerify: new Date(2025, 5, 10),
        selectedDateByRange: {
          minInterval: 5,
          selectedDate: baseSelectedDate(undefined),
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if both from and to are numbers (range already selected)',
      input: {
        dateToVerify: new Date(2025, 5, 10),
        selectedDateByRange: {
          minInterval: 5,
          selectedDate: baseSelectedDate(
            new Date(2025, 5, 1),
            new Date(2025, 5, 5),
          ),
        },
      },
      expected: false,
    },
    {
      desc: 'returns true if dateToVerify is within the min interval (inclusive)',
      input: {
        dateToVerify: new Date(2025, 5, 3),
        selectedDateByRange: {
          minInterval: 5,
          selectedDate: baseSelectedDate(new Date(2025, 5, 1)),
        },
      },
      expected: true,
    },
    {
      desc: 'returns true if dateToVerify is at the end of the min interval',
      input: {
        dateToVerify: new Date(2025, 5, 6),
        selectedDateByRange: {
          minInterval: 6,
          selectedDate: baseSelectedDate(new Date(2025, 5, 1)),
        },
      },
      expected: true,
    },
    {
      desc: 'returns true if dateToVerify is before the min interval',
      input: {
        dateToVerify: new Date(2025, 4, 30),
        selectedDateByRange: {
          minInterval: 5,
          selectedDate: baseSelectedDate(new Date(2025, 5, 1)),
        },
      },
      expected: true,
    },
    {
      desc: 'returns false if dateToVerify is after the min interval',
      input: {
        dateToVerify: new Date(2025, 5, 7),
        selectedDateByRange: {
          minInterval: 5,
          selectedDate: baseSelectedDate(new Date(2025, 5, 1)),
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if minInterval is NaN',
      input: {
        dateToVerify: new Date(2025, 5, 10),
        selectedDateByRange: {
          minInterval: NaN,
          selectedDate: baseSelectedDate(new Date(2025, 5, 1)),
        },
      },
      expected: false,
    },
    {
      desc: 'returns false if selectedDate.from is NaN',
      input: {
        dateToVerify: new Date(2025, 5, 10),
        selectedDateByRange: {
          minInterval: 5,
          selectedDate: baseSelectedDate(NaN),
        },
      },
      expected: false,
    },
    {
      desc: 'returns true if dateToVerify is within the min interval with numeric from',
      input: {
        dateToVerify: new Date(2025, 5, 3),
        selectedDateByRange: {
          minInterval: 5,
          selectedDate: baseSelectedDate(new Date(2025, 5, 1).getTime()),
        },
      },
      expected: true,
    },
  ];

  for (const { desc, input, expected } of testCases) {
    it(desc, () => {
      expect(isDisabledByMinInterval(input as any)).toBe(expected);
    });
  }
});
