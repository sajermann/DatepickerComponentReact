/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { getParams } from '.';
import { TPlaygroundParams } from '../../types';

const mockSetPlaygroundParams = vi.fn();

describe('pages/YearPicker/components/Playground/utils/getParams', () => {
  it('returns single params when playgroundParams.single exists', () => {
    const playgroundParams: TPlaygroundParams = {
      single: { toggle: true, selectedYear: 5 },
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('single');
    expect(result.single.toggle).toBe(true);
    expect(result.single.selectedYear).toBe(5);

    // Test onSelectedYear callback
    expect(typeof result.single.onSelectedYear).toBe('function');
    result.single.onSelectedYear(7);
    expect(mockSetPlaygroundParams).toHaveBeenCalled();
  });

  it('returns multi params when playgroundParams.multi exists and not single', () => {
    const playgroundParams: TPlaygroundParams = {
      multi: { selectedYears: [1, 2, 3] },
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('multi');
    expect(result.multi.selectedYears).toEqual([1, 2, 3]);

    // Test onSelectedYears callback
    expect(typeof result.multi.onSelectedYears).toBe('function');
    result.multi.onSelectedYears([4, 5]);
    expect(mockSetPlaygroundParams).toHaveBeenCalled();
  });

  it('returns range params when playgroundParams.range exists and not single/multi', () => {
    const playgroundParams: TPlaygroundParams = {
      range: {
        selectedYear: { from: 2, to: 5 },
        disabledAfterFirstDisabledYears: true,
        disabledSameYear: true,
        minInterval: 2,
        maxInterval: 5,
      },
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('range');
    expect(result.range.selectedYear).toEqual({ from: 2, to: 5 });
    expect(result.range.disabledAfterFirstDisabledYears).toBe(true);
    expect(result.range.disabledSameYear).toBe(true);
    expect(result.range.minInterval).toBe(2);
    expect(result.range.maxInterval).toBe(5);

    // Test onSelectedYear callback
    expect(typeof result.range.onSelectedYear).toBe('function');
    result.range.onSelectedYear({ from: 3, to: 4 });
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
