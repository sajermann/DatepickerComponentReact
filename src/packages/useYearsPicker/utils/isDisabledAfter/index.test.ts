/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { isDisabledAfter } from '.';

describe('package/useYearsPicker/isDisabledAfter', () => {
  const testCases = [
    { yearToVerify: 0, disabled: { after: 1 }, expected: false },
    { yearToVerify: 1, disabled: { after: 1 }, expected: false },
    { yearToVerify: 2, disabled: { after: 1 }, expected: true },
  ];

  for (const { yearToVerify, disabled, expected } of testCases) {
    it(`should return ${expected} for yearToVerify: ${yearToVerify} and disabledAfter: ${disabled} `, () => {
      expect(isDisabledAfter({ yearToVerify, disabled })).toEqual(expected);
    });
  }
});
