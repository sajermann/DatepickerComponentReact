import { RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { onChangeTimepicker } from '.';

// Helper for mock refs
const createRef = (initialValue = '') => ({
  current: { value: initialValue },
});

describe('packages/DatePickerMega/utils/onChangeTimepicker', () => {
  const date = new Date(2025, 5, 10, 14, 7, 0); // June 10, 2025, 14:07

  it('updates state, refs, and calls onChange with correct values in AM/PM mode', () => {
    const setDate = vi.fn(fn => fn({}));
    const onChange = vi.fn();

    const hourRef = createRef() as RefObject<HTMLInputElement | null>;
    const minuteRef = createRef() as RefObject<HTMLInputElement | null>;
    const amPmRef = createRef() as RefObject<HTMLInputElement | null>;

    onChangeTimepicker({
      date,
      onChange,
      setDate,
      hourRef,
      minuteRef,
      isAmPmMode: true,
      amPmRef,
    });

    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0]({});
    expect(newValues.year).toBe(2025);
    expect(newValues.month).toBe(6);
    expect(newValues.day).toBe(10);
    expect(newValues.hour).toBe(14);
    expect(newValues.minute).toBe(7);
    expect(newValues.clockType).toBe('pm');
    expect(newValues.iso).toBe(date.toISOString());

    // hourRef should receive "02" (14 in 12-hour format is 2 PM)
    expect(hourRef.current?.value).toBe('02');
    // minuteRef should receive "07"
    expect(minuteRef.current?.value).toBe('07');
    // amPmRef should receive "pm"
    expect(amPmRef.current?.value).toBe('pm');

    expect(onChange).toHaveBeenCalledWith(newValues);
  });

  it('updates state and refs in 24-hour mode', () => {
    const setDate = vi.fn(fn => fn({}));
    const hourRef = createRef() as RefObject<HTMLInputElement | null>;
    const minuteRef = createRef() as RefObject<HTMLInputElement | null>;
    const amPmRef = createRef() as RefObject<HTMLInputElement | null>;

    onChangeTimepicker({
      date,
      setDate,
      hourRef,
      minuteRef,
      isAmPmMode: false,
      amPmRef,
    });

    expect(hourRef.current?.value).toBe('14');
    expect(minuteRef.current?.value).toBe('07');
    expect(amPmRef.current?.value).toBe('pm');
  });

  it('handles missing refs and onChange gracefully', () => {
    const setDate = vi.fn(fn => fn({}));

    onChangeTimepicker({
      date,
      setDate,
      // no refs or onChange
    } as any);

    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0]({});
    expect(newValues.year).toBe(2025);
    expect(newValues.month).toBe(6);
    expect(newValues.day).toBe(10);
    expect(newValues.hour).toBe(14);
    expect(newValues.minute).toBe(7);
    expect(newValues.clockType).toBe('pm');
    expect(newValues.iso).toBe(date.toISOString());
  });
});
