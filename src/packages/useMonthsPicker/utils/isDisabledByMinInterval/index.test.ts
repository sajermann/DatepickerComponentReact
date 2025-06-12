/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledByMinInterval } from '.';

type TCase = {
  input: any;
  expected: boolean;
  desc: string;
};

describe('package/useMonthsPicker/isDisabledByMinInterval', () => {
  const testCases: TCase[] = [
    {
      input: { monthToVerify: 5, selectedMonthByRange: undefined },
      expected: false,
      desc: 'returns false if selectedMonthByRange is undefined',
    },
    {
      input: { monthToVerify: 5, selectedMonthByRange: { selectedMonth: {} } },
      expected: false,
      desc: 'returns false if minInterval is missing',
    },
    {
      input: {
        monthToVerify: 5,
        selectedMonthByRange: { minInterval: 2, selectedMonth: {} },
      },
      expected: false,
      desc: 'returns false if selectedMonth.from is missing',
    },
    {
      input: {
        monthToVerify: 5,
        selectedMonthByRange: { minInterval: NaN, selectedMonth: { from: 1 } },
      },
      expected: false,
      desc: 'returns false if minInterval is NaN',
    },
    {
      input: {
        monthToVerify: 5,
        selectedMonthByRange: {
          minInterval: 2,
          selectedMonth: { from: 1, to: 3 },
        },
      },
      expected: false,
      desc: 'returns false if both from and to are numbers',
    },
    {
      input: {
        monthToVerify: 3,
        selectedMonthByRange: { minInterval: 2, selectedMonth: { from: 1 } },
      },
      expected: false,
      desc: 'returns false if monthToVerify is within the allowed minimum interval',
    },
    {
      input: {
        monthToVerify: 5,
        selectedMonthByRange: { minInterval: 2, selectedMonth: { from: 1 } },
      },
      expected: false,
      desc: 'returns false if monthToVerify exceeds the allowed minimum interval',
    },
    {
      input: {
        monthToVerify: 3,
        selectedMonthByRange: { minInterval: 2, selectedMonth: { from: 1 } },
      },
      expected: false,
      desc: 'returns false if monthToVerify equals the upper limit of the interval',
    },
  ];

  for (const { input, expected, desc } of testCases) {
    it(desc, () => {
      expect(isDisabledByMinInterval(input)).toBe(expected);
    });
  }
});
