/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { getParams } from '.';
import { TPlaygroundParams } from '../../types';

const mockSetPlaygroundParams = vi.fn();

describe('pages/MonthPicker/components/Playground/utils/getParams', () => {
  it('returns single params when playgroundParams.single exists', () => {
    const playgroundParams: TPlaygroundParams = {
      single: { toggle: true, selectedMonth: 5 },
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('single');
    expect(result.single.toggle).toBe(true);
    expect(result.single.selectedMonth).toBe(5);

    // Test onSelectedMonth callback
    expect(typeof result.single.onSelectedMonth).toBe('function');
    result.single.onSelectedMonth(7);
    expect(mockSetPlaygroundParams).toHaveBeenCalled();
  });

  it('returns multi params when playgroundParams.multi exists and not single', () => {
    const playgroundParams: TPlaygroundParams = {
      multi: { selectedMonths: [1, 2, 3] },
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('multi');
    expect(result.multi.selectedMonths).toEqual([1, 2, 3]);

    // Test onSelectedMonths callback
    expect(typeof result.multi.onSelectedMonths).toBe('function');
    result.multi.onSelectedMonths([4, 5]);
    expect(mockSetPlaygroundParams).toHaveBeenCalled();
  });

  it('returns range params when playgroundParams.range exists and not single/multi', () => {
    const playgroundParams: TPlaygroundParams = {
      range: {
        selectedMonth: { from: 2, to: 5 },
        disabledAfterFirstDisabledMonths: true,
        disabledSameMonth: true,
        minInterval: 2,
        maxInterval: 5,
      },
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('range');
    expect(result.range.selectedMonth).toEqual({ from: 2, to: 5 });
    expect(result.range.disabledAfterFirstDisabledMonths).toBe(true);
    expect(result.range.disabledSameMonth).toBe(true);
    expect(result.range.minInterval).toBe(2);
    expect(result.range.maxInterval).toBe(5);

    // Test onSelectedMonth callback
    expect(typeof result.range.onSelectedMonth).toBe('function');
    result.range.onSelectedMonth({ from: 3, to: 4 });
    expect(mockSetPlaygroundParams).toHaveBeenCalled();
  });

  it('returns an empty object if none of single, multi, or range are present', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toEqual({});
  });
});
