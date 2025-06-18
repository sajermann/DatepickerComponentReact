import { RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { onChangeDatepicker } from '.';

// Helper for mock refs
const createRef = (initialValue = '') => ({
  current: { value: initialValue },
});

describe('packages/DatePickerMega/utils/onChangeDatepicker', () => {
  const date = new Date(2025, 5, 10, 14, 30, 0); // June 10, 2025

  it('updates state and calls onChange and refs with formatted values', () => {
    const setDate = vi.fn(fn => fn({}));
    const onChange = vi.fn();

    const dayRef = createRef() as RefObject<HTMLInputElement | null>;
    const monthRef = createRef() as RefObject<HTMLInputElement | null>;
    const yearRef = createRef() as RefObject<HTMLInputElement | null>;

    onChangeDatepicker({
      dates: [date],
      onChange,
      setDate,
      dayRef,
      monthRef,
      yearRef,
    });

    // The state updater should be called and return the new values
    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0]({});

    expect(newValues.year).toBe(2025);
    expect(newValues.month).toBe(6); // June is 5, but +1
    expect(newValues.day).toBe(10);
    expect(newValues.date).toEqual(date);
    expect(newValues.iso).toBe(date.toISOString());

    // The refs should be updated with formatted values
    expect(dayRef.current?.value).toBe('10');
    expect(monthRef.current?.value).toBe('06');
    expect(yearRef.current?.value).toBe('2025');

    // onChange should be called with the new values
    expect(onChange).toHaveBeenCalledWith(newValues);
  });

  it('handles missing refs and onChange gracefully', () => {
    const setDate = vi.fn(fn => fn({}));

    onChangeDatepicker({
      dates: [new Date(2025, 0, 1)],
      setDate,
      // no refs or onChange
    } as any);

    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0]({});
    expect(newValues.year).toBe(2025);
    expect(newValues.month).toBe(1);
    expect(newValues.day).toBe(1);
    expect(newValues.date).toEqual(new Date(2025, 0, 1));
    expect(newValues.iso).toBe(new Date(2025, 0, 1).toISOString());
  });
});
