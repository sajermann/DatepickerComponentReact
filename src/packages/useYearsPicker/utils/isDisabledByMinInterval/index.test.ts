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

describe('package/useYearsPicker/isDisabledByMinInterval', () => {
  const testCases: TCase[] = [
    {
      input: { yearToVerify: 5, selectedYearByRange: undefined },
      expected: false,
      desc: 'returns false if selectedYearByRange is undefined',
    },
    {
      input: { yearToVerify: 5, selectedYearByRange: { selectedYear: {} } },
      expected: false,
      desc: 'returns false if minInterval is missing',
    },
    {
      input: {
        yearToVerify: 5,
        selectedYearByRange: { minInterval: 2, selectedYear: {} },
      },
      expected: false,
      desc: 'returns false if selectedYear.from is missing',
    },
    {
      input: {
        yearToVerify: 5,
        selectedYearByRange: { minInterval: NaN, selectedYear: { from: 1 } },
      },
      expected: false,
      desc: 'returns false if minInterval is NaN',
    },
    {
      input: {
        yearToVerify: 5,
        selectedYearByRange: {
          minInterval: 2,
          selectedYear: { from: 1, to: 3 },
        },
      },
      expected: false,
      desc: 'returns false if both from and to are numbers',
    },
    {
      input: {
        yearToVerify: 3,
        selectedYearByRange: { minInterval: 2, selectedYear: { from: 1 } },
      },
      expected: false,
      desc: 'returns false if yearToVerify is within the allowed minimum interval',
    },
    {
      input: {
        yearToVerify: 5,
        selectedYearByRange: { minInterval: 2, selectedYear: { from: 1 } },
      },
      expected: false,
      desc: 'returns false if yearToVerify exceeds the allowed minimum interval',
    },
    {
      input: {
        yearToVerify: 3,
        selectedYearByRange: { minInterval: 2, selectedYear: { from: 1 } },
      },
      expected: false,
      desc: 'returns false if yearToVerify equals the upper limit of the interval',
    },
  ];

  for (const { input, expected, desc } of testCases) {
    it(desc, () => {
      expect(isDisabledByMinInterval(input)).toBe(expected);
    });
  }
});
