import { RefObject } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { onChangeYear } from '.';
import * as fnToMock from '..';

// Helper for mock refs
const createRef = (initialValue = '') => ({
  current: { value: initialValue },
});

describe('packages/DatePickerMega/utils/onChangeYear', () => {
  const basePrev = { day: 10, month: 6, year: 2025, date: null, iso: null };

  it('updates year, date, iso and calls onChange with valid 4-digit year', () => {
    const setDate = vi.fn(fn => fn(basePrev));
    const onChange = vi.fn();

    const dayRef = createRef() as RefObject<HTMLInputElement | null>;
    const yearRef = createRef() as RefObject<HTMLInputElement | null>;

    onChangeYear({
      event: { target: { value: '2024' } } as any,
      setDate,
      onChange,
      dayRef,
      yearRef,
    });

    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0](basePrev);
    expect(newValues.year).toBe(2024);
    expect(newValues.date).toEqual(new Date(2024, 5, 10, 0, 0, 0, 0));
    expect(newValues.iso).toBe(new Date(2024, 5, 10, 0, 0, 0, 0).toISOString());
    expect(onChange).toHaveBeenCalledWith(newValues);
  });

  it('strips non-numeric characters and truncates to 4 digits', () => {
    const setDate = vi.fn(fn => fn(basePrev));
    const onChange = vi.fn();
    const dayRef = createRef() as RefObject<HTMLInputElement | null>;
    const yearRef = createRef() as RefObject<HTMLInputElement | null>;

    onChangeYear({
      event: { target: { value: '20a2b45' } } as any,
      setDate,
      onChange,
      dayRef,
      yearRef,
    });

    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0](basePrev);
    expect(newValues.year).toBe(2024);
  });

  it('sets year to null and date/iso to null if input is empty', () => {
    const setDate = vi.fn(fn => fn(basePrev));
    const onChange = vi.fn();
    const dayRef = createRef() as RefObject<HTMLInputElement | null>;
    const yearRef = createRef() as RefObject<HTMLInputElement | null>;

    onChangeYear({
      event: { target: { value: '' } } as any,
      setDate,
      onChange,
      dayRef,
      yearRef,
    });

    expect(setDate).toHaveBeenCalled();
    const newValues = setDate.mock.calls[0][0](basePrev);
    expect(newValues.year).toBeNull();
    expect(newValues.date).toBeNull();
    expect(newValues.iso).toBeNull();
  });

  it('calls focusNextInput and adjustDay if yearRef exists and input has 4 digits', () => {
    const setDate = vi.fn(fn => fn(basePrev));
    const focusNextInput = vi.spyOn(fnToMock, 'focusNextInput');
    const adjustDay = vi.spyOn(fnToMock, 'adjustDay');
    const dayRef = createRef() as RefObject<HTMLInputElement | null>;
    const yearRef = createRef() as RefObject<HTMLInputElement | null>;
    onChangeYear({
      event: { target: { value: '2025' } } as any,
      setDate,
      onChange: undefined,
      dayRef,
      yearRef,
    });

    // focusNextInput and adjustDay should be called
    expect(focusNextInput).toHaveBeenCalled();
    expect(adjustDay).toHaveBeenCalled();
  });

  it('does not call focusNextInput or adjustDay if input is less than 4 digits', () => {
    const setDate = vi.fn(fn => fn(basePrev));
    const dayRef = createRef() as RefObject<HTMLInputElement | null>;
    const yearRef = createRef() as RefObject<HTMLInputElement | null>;
    const focusNextInput = vi.spyOn(fnToMock, 'focusNextInput');
    const adjustDay = vi.spyOn(fnToMock, 'adjustDay');
    onChangeYear({
      event: { target: { value: '20' } } as any,
      setDate,
      onChange: undefined,
      dayRef,
      yearRef,
    });

    expect(focusNextInput).not.toHaveBeenCalled();
    expect(adjustDay).not.toHaveBeenCalled();
  });
});
