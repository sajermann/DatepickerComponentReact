import { RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { adjustDay } from '.';

describe('packages/DatePickerMega/utils/adjustDay', () => {
  const createRef = (val: string) => ({ current: { value: val } });

  it('does nothing if date.month is not set', () => {
    const setDate = vi.fn();
    const dayRef = createRef('15') as RefObject<HTMLInputElement | null>;
    adjustDay({
      date: { year: 2025 } as any,
      dayRef,
      setDate,
      onChange: undefined,
    });
    expect(setDate).not.toHaveBeenCalled();
  });

  it('does nothing if dayRef.current.value is not greater than last day of month', () => {
    const setDate = vi.fn();
    const dayRef = createRef('28') as RefObject<HTMLInputElement | null>;
    adjustDay({
      date: { year: 2025, month: 2 } as any,
      dayRef,
      setDate,
      onChange: undefined,
    });
    expect(setDate).not.toHaveBeenCalled();
    expect(dayRef.current?.value).toBe('28');
  });

  it('adjusts day and updates state if value is greater than last day of month', () => {
    const setDate = vi.fn(fn => fn({}));
    const dayRef = createRef('32') as RefObject<HTMLInputElement | null>;
    const onChange = vi.fn();

    adjustDay({
      date: { year: 2025, month: 1 } as any,
      dayRef,
      setDate,
      onChange,
    });

    // January has 31 days
    expect(dayRef.current?.value).toBe('31');
    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0]({});
    expect(newValues.day).toBe(31);
    expect(newValues.date).toEqual(new Date('2025-1-31'));
    expect(newValues.iso).toBe(new Date('2025-1-31').toISOString());
    expect(onChange).toHaveBeenCalledWith(newValues);
  });

  it('handles months with fewer days (February, non-leap year)', () => {
    const setDate = vi.fn(fn => fn({}));
    const dayRef = createRef('30') as RefObject<HTMLInputElement | null>;
    const onChange = vi.fn();

    adjustDay({
      date: { year: 2025, month: 2 } as any,
      dayRef,
      setDate,
      onChange,
    });

    // February 2025 has 28 days
    expect(dayRef.current?.value).toBe('28');
    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0]({});
    expect(newValues.day).toBe(28);
    expect(newValues.date).toEqual(new Date('2025-2-28'));
    expect(newValues.iso).toBe(new Date('2025-2-28').toISOString());
    expect(onChange).toHaveBeenCalledWith(newValues);
  });

  it('does nothing if dayRef is undefined', () => {
    const setDate = vi.fn();
    adjustDay({
      date: { year: 2025, month: 1 } as any,
      dayRef: undefined as any,
      setDate,
      onChange: undefined,
    });
    expect(setDate).not.toHaveBeenCalled();
  });
});
