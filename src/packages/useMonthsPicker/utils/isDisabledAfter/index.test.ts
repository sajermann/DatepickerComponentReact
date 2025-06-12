/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledAfter } from '.';

describe('package/useMonthsPicker/isDisabledAfter', () => {
  const testCases = [
    { monthToVerify: 0, disabledAfter: 1, expected: false },
    { monthToVerify: 1, disabledAfter: 1, expected: false },
    { monthToVerify: 2, disabledAfter: 1, expected: true },
  ];

  for (const { monthToVerify, disabledAfter, expected } of testCases) {
    it(`should return ${expected} for monthToVerify: ${monthToVerify} and disabledAfter: ${disabledAfter} `, () => {
      expect(isDisabledAfter({ monthToVerify, disabledAfter })).toEqual(
        expected,
      );
    });
  }
});
