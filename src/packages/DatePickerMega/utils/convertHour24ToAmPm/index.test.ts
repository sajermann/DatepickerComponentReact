import { describe, expect, it, vi } from 'vitest';
import { convertHour24ToAmPm } from '.';

describe('packages/DatePickerMega/utils/convertHour24ToAmPm', () => {
  const testCases = [
    {
      input: { isAmPmMode: true, hour24: 0 },
      expected: 12,
      desc: 'returns 12 for midnight (0) in AM/PM mode',
    },
    {
      input: { isAmPmMode: true, hour24: 12 },
      expected: 12,
      desc: 'returns 12 for noon (12) in AM/PM mode',
    },
    {
      input: { isAmPmMode: true, hour24: 1 },
      expected: 1,
      desc: 'returns 1 for 1 AM in AM/PM mode',
    },
    {
      input: { isAmPmMode: true, hour24: 11 },
      expected: 11,
      desc: 'returns 11 for 11 AM in AM/PM mode',
    },
    {
      input: { isAmPmMode: true, hour24: 13 },
      expected: 1,
      desc: 'returns 1 for 13 (1 PM) in AM/PM mode',
    },
    {
      input: { isAmPmMode: true, hour24: 15 },
      expected: 3,
      desc: 'returns 3 for 15 (3 PM) in AM/PM mode',
    },
    {
      input: { isAmPmMode: true, hour24: 23 },
      expected: 11,
      desc: 'returns 11 for 23 (11 PM) in AM/PM mode',
    },
    {
      input: { isAmPmMode: false, hour24: 0 },
      expected: 0,
      desc: 'returns 0 for midnight (0) in 24-hour mode',
    },
    {
      input: { isAmPmMode: false, hour24: 12 },
      expected: 12,
      desc: 'returns 12 for noon (12) in 24-hour mode',
    },
    {
      input: { isAmPmMode: false, hour24: 15 },
      expected: 15,
      desc: 'returns 15 for 15 in 24-hour mode',
    },
    {
      input: { hour24: 8 },
      expected: 8,
      desc: 'returns 8 for 8 in 24-hour mode by default',
    },
  ];

  for (const { input, expected, desc } of testCases) {
    it(desc, () => {
      expect(convertHour24ToAmPm(input)).toBe(expected);
    });
  }
});
