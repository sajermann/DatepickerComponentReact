import { describe, expect, it, vi } from 'vitest';
import { onHeaderClick } from '.';
import { TMulti } from '../../../../types';

describe('packages/useDatePicker/utils/onHeaderClick', () => {
  const makeDay = (
    y: number,
    m: number,
    d: number,
    isDisabled = false,
  ): any => ({
    date: new Date(y, m, d),
    isDisabled,
  });

  it('does nothing if multi is not provided', () => {
    expect(() => onHeaderClick({ dayOfWeek: 1, weeks: [] })).not.toThrow();
  });

  it('selects all days in the given column if not all are selected', () => {
    const onSelectedDates = vi.fn();
    const weeks = [
      [makeDay(2025, 5, 2), makeDay(2025, 5, 3), makeDay(2025, 5, 4)],
      [makeDay(2025, 5, 9), makeDay(2025, 5, 10), makeDay(2025, 5, 11)],
    ];
    const multi: TMulti = { selectedDates: [], onSelectedDates };

    onHeaderClick({ dayOfWeek: 1, weeks, multi });

    // Should select 3rd and 10th
    expect(onSelectedDates).toHaveBeenCalledWith([
      weeks[0][1].date,
      weeks[1][1].date,
    ]);
  });

  // it('removes all days of the week if all are already selected', () => {
  //   const onSelectedDates = vi.fn();
  //   const weeks = [
  //     [makeDay(2025, 5, 2), makeDay(2025, 5, 3), makeDay(2025, 5, 4)],
  //     [makeDay(2025, 5, 9), makeDay(2025, 5, 10), makeDay(2025, 5, 11)],
  //   ];
  //   const multi: TMulti = {
  //     selectedDates: [weeks[0][1].date, weeks[1][1].date],
  //     onSelectedDates,
  //   };

  //   onHeaderClick({ dayOfWeek: 1, weeks, multi });

  //   // Should remove all with getDay() === 1 (Monday)
  //   expect(onSelectedDates).toHaveBeenCalledWith([]);
  // });

  it('ignores disabled days when selecting', () => {
    const onSelectedDates = vi.fn();
    const weeks = [
      [makeDay(2025, 5, 2), makeDay(2025, 5, 3, true), makeDay(2025, 5, 4)],
      [makeDay(2025, 5, 9), makeDay(2025, 5, 10), makeDay(2025, 5, 11)],
    ];
    const multi: TMulti = { selectedDates: [], onSelectedDates };

    onHeaderClick({ dayOfWeek: 1, weeks, multi });

    // Should only select the non-disabled day (10th)
    expect(onSelectedDates).toHaveBeenCalledWith([weeks[1][1].date]);
  });

  it('adds only not-yet-selected days of the week', () => {
    const onSelectedDates = vi.fn();
    const weeks = [
      [makeDay(2025, 5, 2), makeDay(2025, 5, 3), makeDay(2025, 5, 4)],
      [makeDay(2025, 5, 9), makeDay(2025, 5, 10), makeDay(2025, 5, 11)],
    ];
    const multi: TMulti = {
      selectedDates: [weeks[1][1].date],
      onSelectedDates,
    };

    onHeaderClick({ dayOfWeek: 1, weeks, multi });

    // Should add the 3rd (not selected), keep the 10th (already selected)
    expect(onSelectedDates).toHaveBeenCalledWith([
      weeks[1][1].date,
      weeks[0][1].date,
    ]);
  });
});
