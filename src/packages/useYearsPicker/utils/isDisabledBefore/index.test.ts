/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledBefore } from '.';

describe('package/useYearsPicker/isDisabledBefore', () => {
  const testCases = [
    { yearToVerify: 0, disabled: { before: 1 }, expected: true },
    { yearToVerify: 1, disabled: { before: 1 }, expected: false },
    { yearToVerify: 2, disabled: { before: 1 }, expected: false },
  ];

  for (const { yearToVerify, disabled, expected } of testCases) {
    it(`should return ${expected} for yearToVerify: ${yearToVerify} and disabledBefore: ${disabled} `, () => {
      expect(isDisabledBefore({ yearToVerify, disabled })).toEqual(expected);
    });
  }
});
