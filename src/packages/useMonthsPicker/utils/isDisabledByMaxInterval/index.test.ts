/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { isDisabledByMaxInterval } from '.';

type TCase = {
  input: any;
  expected: boolean;
  desc: string;
};

describe('package/useMonthsPicker/isDisabledByMaxInterval', () => {
  const testCases: TCase[] = [
    {
      input: { monthToVerify: 5, selectedMonthByRange: undefined },
      expected: false,
      desc: 'retorna false se selectedMonthByRange é undefined',
    },
    {
      input: { monthToVerify: 5, selectedMonthByRange: { selectedMonth: {} } },
      expected: false,
      desc: 'retorna false se maxInterval está ausente',
    },
    {
      input: {
        monthToVerify: 5,
        selectedMonthByRange: { maxInterval: 2, selectedMonth: {} },
      },
      expected: false,
      desc: 'retorna false se selectedMonth.from está ausente',
    },
    {
      input: {
        monthToVerify: 5,
        selectedMonthByRange: { maxInterval: NaN, selectedMonth: { from: 1 } },
      },
      expected: false,
      desc: 'retorna false se maxInterval é NaN',
    },
    {
      input: {
        monthToVerify: 5,
        selectedMonthByRange: {
          maxInterval: 2,
          selectedMonth: { from: 1, to: 3 },
        },
      },
      expected: false,
      desc: 'retorna false se from e to são números',
    },
    {
      input: {
        monthToVerify: 3,
        selectedMonthByRange: { maxInterval: 2, selectedMonth: { from: 1 } },
      },
      expected: false,
      desc: 'retorna false se monthToVerify está dentro do intervalo',
    },
    {
      input: {
        monthToVerify: 5,
        selectedMonthByRange: { maxInterval: 2, selectedMonth: { from: 1 } },
      },
      expected: true,
      desc: 'retorna true se monthToVerify está fora do intervalo',
    },
    {
      input: {
        monthToVerify: 3,
        selectedMonthByRange: { maxInterval: 2, selectedMonth: { from: 1 } },
      },
      expected: false,
      desc: 'retorna false se monthToVerify é igual ao limite superior',
    },
  ];

  for (const { input, expected, desc } of testCases) {
    it(desc, () => {
      expect(isDisabledByMaxInterval(input)).toBe(expected);
    });
  }
});
