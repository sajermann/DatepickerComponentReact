import { addDays } from 'date-fns';
/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { getParams } from '.';
import { TPlaygroundParams } from '../../types';

const mockSetPlaygroundParams = vi.fn();

describe('pages/DayPicker/components/Playground/utils/getParams', () => {
  it('returns single params when playgroundParams.single exists', () => {
    const today = new Date();
    const playgroundParams: TPlaygroundParams = {
      single: { toggle: true, selectedDate: today },
      disabledWeeks: [],
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('single');
    expect(result.single.toggle).toBe(true);
    expect(result.single.selectedDate).toBe(today);

    // Test onSelectedDate callback
    expect(typeof result.single.onSelectedDate).toBe('function');
    result.single.onSelectedDate(7);
    expect(mockSetPlaygroundParams).toHaveBeenCalled();
  });

  it('returns multi params when playgroundParams.multi exists and not single', () => {
    const today = new Date();
    const playgroundParams: TPlaygroundParams = {
      multi: { selectedDates: [addDays(today, -1), today, addDays(today, 1)] },
      disabledWeeks: [],
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('multi');
    expect(result.multi.selectedDates).toEqual([
      addDays(today, -1),
      today,
      addDays(today, 1),
    ]);

    // Test onSelectedDates callback
    expect(typeof result.multi.onSelectedDates).toBe('function');
    result.multi.onSelectedDates([4, 5]);
    expect(mockSetPlaygroundParams).toHaveBeenCalled();
  });

  it('returns range params when playgroundParams.range exists and not single/multi', () => {
    const today = new Date();
    const playgroundParams: TPlaygroundParams = {
      range: {
        selectedDate: { from: addDays(today, -1), to: addDays(today, 1) },
        disabledAfterFirstDisabledDates: true,
        disabledSameDate: true,
        minInterval: 2,
        maxInterval: 5,
      },
      disabledWeeks: [],
    };
    const result: any = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toHaveProperty('range');
    expect(result.range.selectedDate).toEqual({
      from: addDays(today, -1),
      to: addDays(today, 1),
    });
    expect(result.range.disabledAfterFirstDisabledDates).toBe(true);
    expect(result.range.disabledSameDate).toBe(true);
    expect(result.range.minInterval).toBe(2);
    expect(result.range.maxInterval).toBe(5);

    // Test onSelectedDate callback
    expect(typeof result.range.onSelectedDate).toBe('function');
    result.range.onSelectedDate({ from: 3, to: 4 });
    expect(mockSetPlaygroundParams).toHaveBeenCalled();
  });

  it('returns an empty object if none of single, multi, or range are present', () => {
    const playgroundParams = {} as TPlaygroundParams;
    const result = getParams({
      playgroundParams,
      setPlaygroundParams: mockSetPlaygroundParams,
    });
    expect(result).toEqual({});
  });
});
