/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { getMonthName } from '.';

describe('package/useMonthsPicker/getMonthName', () => {
  const testCases = [
    { input: 0, expected: { 'en-US': 'January', 'pt-BR': 'Janeiro' } },
    { input: 1, expected: { 'en-US': 'February', 'pt-BR': 'Fevereiro' } },
    { input: 2, expected: { 'en-US': 'March', 'pt-BR': 'Março' } },
    { input: 3, expected: { 'en-US': 'April', 'pt-BR': 'Abril' } },
    { input: 4, expected: { 'en-US': 'May', 'pt-BR': 'Maio' } },
    { input: 5, expected: { 'en-US': 'June', 'pt-BR': 'Junho' } },
    { input: 6, expected: { 'en-US': 'July', 'pt-BR': 'Julho' } },
    { input: 7, expected: { 'en-US': 'August', 'pt-BR': 'Agosto' } },
    { input: 8, expected: { 'en-US': 'September', 'pt-BR': 'Setembro' } },
    { input: 9, expected: { 'en-US': 'October', 'pt-BR': 'Outubro' } },
    { input: 10, expected: { 'en-US': 'November', 'pt-BR': 'Novembro' } },
    { input: 11, expected: { 'en-US': 'December', 'pt-BR': 'Dezembro' } },
    { input: -1, expected: { 'en-US': '', 'pt-BR': '' } },
    { input: 12, expected: { 'en-US': '', 'pt-BR': '' } },
    { input: 99, expected: { 'en-US': '', 'pt-BR': '' } },
  ];

  for (const { input, expected } of testCases) {
    it(`should return correct month name for input ${input}`, () => {
      expect(getMonthName(input)).toEqual(expected);
    });
  }
});
