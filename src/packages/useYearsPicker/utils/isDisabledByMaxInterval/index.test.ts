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

describe('package/useYearsPicker/isDisabledByMaxInterval', () => {
  const testCases: TCase[] = [
    {
      input: { yearToVerify: 5, selectedYearByRange: undefined },
      expected: false,
      desc: 'retorna false se selectedYearByRange é undefined',
    },
    {
      input: { yearToVerify: 5, selectedYearByRange: { selectedYear: {} } },
      expected: false,
      desc: 'retorna false se maxInterval está ausente',
    },
    {
      input: {
        yearToVerify: 5,
        selectedYearByRange: { maxInterval: 2, selectedYear: {} },
      },
      expected: false,
      desc: 'retorna false se selectedYear.from está ausente',
    },
    {
      input: {
        yearToVerify: 5,
        selectedYearByRange: { maxInterval: NaN, selectedYear: { from: 1 } },
      },
      expected: false,
      desc: 'retorna false se maxInterval é NaN',
    },
    {
      input: {
        yearToVerify: 5,
        selectedYearByRange: {
          maxInterval: 2,
          selectedYear: { from: 1, to: 3 },
        },
      },
      expected: false,
      desc: 'retorna false se from e to são números',
    },
    {
      input: {
        yearToVerify: 3,
        selectedYearByRange: { maxInterval: 2, selectedYear: { from: 1 } },
      },
      expected: false,
      desc: 'retorna false se yearToVerify está dentro do intervalo',
    },
    {
      input: {
        yearToVerify: 5,
        selectedYearByRange: { maxInterval: 2, selectedYear: { from: 1 } },
      },
      expected: true,
      desc: 'retorna true se yearToVerify está fora do intervalo',
    },
    {
      input: {
        yearToVerify: 3,
        selectedYearByRange: { maxInterval: 2, selectedYear: { from: 1 } },
      },
      expected: false,
      desc: 'retorna false se yearToVerify é igual ao limite superior',
    },
  ];

  for (const { input, expected, desc } of testCases) {
    it(desc, () => {
      expect(isDisabledByMaxInterval(input)).toBe(expected);
    });
  }
});
