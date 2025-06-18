/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { onDayClick } from '.';

describe('package/useDaysPicker/onDayClick', () => {
  const date = (y: number, m: number, d: number) => new Date(y, m, d);

  it('calls single.onSelectedDate with dateToVerify if selectedDate is null', () => {
    const onSelectedDate = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 10),
      single: { selectedDate: null, onSelectedDate },
    });
    expect(onSelectedDate).toHaveBeenCalledWith(date(2025, 5, 10));
  });

  it('calls single.onSelectedDate with dateToVerify if selectedDate is different day', () => {
    const onSelectedDate = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 11),
      single: { selectedDate: date(2025, 5, 10), onSelectedDate },
    });
    expect(onSelectedDate).toHaveBeenCalledWith(date(2025, 5, 11));
  });

  it('calls single.onSelectedDate with null if same day and toggle is true', () => {
    const onSelectedDate = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 10),
      single: { selectedDate: date(2025, 5, 10), onSelectedDate, toggle: true },
    });
    expect(onSelectedDate).toHaveBeenCalledWith(null);
  });

  it('does not call single.onSelectedDate if same day and toggle is not true', () => {
    const onSelectedDate = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 10),
      single: { selectedDate: date(2025, 5, 10), onSelectedDate },
    });
    expect(onSelectedDate).not.toHaveBeenCalledWith(null);
    expect(onSelectedDate).not.toHaveBeenCalledWith(date(2025, 5, 10));
  });

  it('adds dateToVerify to multi.selectedDates if not already selected', () => {
    const onSelectedDates = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 12),
      multi: { selectedDates: [date(2025, 5, 10)], onSelectedDates },
    });
    expect(onSelectedDates).toHaveBeenCalledWith([
      date(2025, 5, 10),
      date(2025, 5, 12),
    ]);
  });

  it('removes dateToVerify from multi.selectedDates if already selected', () => {
    const onSelectedDates = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 10),
      multi: {
        selectedDates: [date(2025, 5, 10), date(2025, 5, 12)],
        onSelectedDates,
      },
    });
    expect(onSelectedDates).toHaveBeenCalledWith([date(2025, 5, 12)]);
  });

  it('range: resets and sets from if both from and to are set', () => {
    const onSelectedDate = vi.fn();
    const setLastHoveredDate = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 15),
      range: {
        lastHoveredDate: null,
        selectedDate: { from: date(2025, 5, 10), to: date(2025, 5, 12) },
        onSelectedDate,
        setLastHoveredDate,
      },
    });
    expect(setLastHoveredDate).toHaveBeenCalledWith(null);
    expect(onSelectedDate).toHaveBeenCalledWith({
      from: date(2025, 5, 15),
      to: null,
    });
  });

  it('range: sets from as dateToVerify and to as previous from if dateToVerify < from', () => {
    const onSelectedDate = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 8),
      range: {
        lastHoveredDate: null,
        selectedDate: { from: date(2025, 5, 10), to: null },
        onSelectedDate,
        setLastHoveredDate: vi.fn(),
      },
    });
    expect(onSelectedDate).toHaveBeenCalledWith({
      from: date(2025, 5, 8),
      to: date(2025, 5, 10),
    });
  });

  it('range: sets from as dateToVerify if from is null', () => {
    const onSelectedDate = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 10),
      range: {
        lastHoveredDate: null,
        selectedDate: { from: null, to: null },
        onSelectedDate,
        setLastHoveredDate: vi.fn(),
      },
    });
    expect(onSelectedDate).toHaveBeenCalledWith({
      from: date(2025, 5, 10),
      to: null,
    });
  });

  it('range: sets to as dateToVerify if from is set and to is null', () => {
    const onSelectedDate = vi.fn();
    onDayClick({
      dateToVerify: date(2025, 5, 12),
      range: {
        lastHoveredDate: null,
        selectedDate: { from: date(2025, 5, 10), to: null },
        onSelectedDate,
        setLastHoveredDate: vi.fn(),
      },
    });
    expect(onSelectedDate).toHaveBeenCalledWith({
      from: date(2025, 5, 10),
      to: date(2025, 5, 12),
    });
  });
});
