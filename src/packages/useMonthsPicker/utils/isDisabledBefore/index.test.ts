/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledBefore } from '.';

describe('package/useMonthsPicker/isDisabledBefore', () => {
  const testCases = [
    { monthToVerify: 0, disabledBefore: 1, expected: true },
    { monthToVerify: 1, disabledBefore: 1, expected: false },
    { monthToVerify: 2, disabledBefore: 1, expected: false },
  ];

  for (const { monthToVerify, disabledBefore, expected } of testCases) {
    it(`should return ${expected} for monthToVerify: ${monthToVerify} and disabledBefore: ${disabledBefore} `, () => {
      expect(isDisabledBefore({ monthToVerify, disabledBefore })).toEqual(
        expected,
      );
    });
  }
});
