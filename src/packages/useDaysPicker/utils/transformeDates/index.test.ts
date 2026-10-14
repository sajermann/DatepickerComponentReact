import { describe, expect, it, vi } from 'vitest';
import { transformDates } from './index';

describe('packages/useDaysPicker/utils/transformeDates', () => {
  const baseMonth = new Date(2025, 4, 1); // May 2025

  it('should transform current month dates correctly including weekdays and today', () => {
    // 2025-05-18 is Sunday (day 0)
    const sundayDate = new Date(2025, 4, 18);
    const result = transformDates({
      dateToVerify: sundayDate,
      firstDateOfCurrentMonthOfView: baseMonth,
    });

    expect(result.date).toBe(sundayDate);
    expect(result.day).toBe(0);
    expect(result.isSunday).toBe(true);
    expect(result.isMonday).toBe(false);
    expect(result.isCurrentMonth).toBe(true);
    expect(result.isPrevMonth).toBe(false);
    expect(result.isNextMonth).toBe(false);
    expect(result.text).toBe('18');
    expect(result.isSelected).toBe(false);
    expect(result.isDisabled).toBe(false);
  });

  it('should identify prev month, next month, and other weekdays', () => {
    // 2025-04-30 is Wednesday in prev month
    const prevMonthDate = new Date(2025, 3, 30);
    const resPrev = transformDates({
      dateToVerify: prevMonthDate,
      firstDateOfCurrentMonthOfView: baseMonth,
    });
    expect(resPrev.isPrevMonth).toBe(true);
    expect(resPrev.isCurrentMonth).toBe(false);
    expect(resPrev.isWednesday).toBe(true);

    // 2025-06-02 is Monday in next month
    const nextMonthDate = new Date(2025, 5, 2);
    const resNext = transformDates({
      dateToVerify: nextMonthDate,
      firstDateOfCurrentMonthOfView: baseMonth,
    });
    expect(resNext.isNextMonth).toBe(true);
    expect(resNext.isCurrentMonth).toBe(false);
    expect(resNext.isMonday).toBe(true);
  });

  it('should identify Tuesday, Thursday, Friday, Saturday', () => {
    // 2025-05-20: Tue, 2025-05-22: Thu, 2025-05-23: Fri, 2025-05-24: Sat
    const tue = transformDates({
      dateToVerify: new Date(2025, 4, 20),
      firstDateOfCurrentMonthOfView: baseMonth,
    });
    expect(tue.isTuesday).toBe(true);

    const thu = transformDates({
      dateToVerify: new Date(2025, 4, 22),
      firstDateOfCurrentMonthOfView: baseMonth,
    });
    expect(thu.isThursday).toBe(true);

    const fri = transformDates({
      dateToVerify: new Date(2025, 4, 23),
      firstDateOfCurrentMonthOfView: baseMonth,
    });
    expect(fri.isFriday).toBe(true);

    const sat = transformDates({
      dateToVerify: new Date(2025, 4, 24),
      firstDateOfCurrentMonthOfView: baseMonth,
    });
    expect(sat.isSaturday).toBe(true);
  });

  it('should handle single selection and onClick', () => {
    const onSelectedDate = vi.fn();
    const targetDate = new Date(2025, 4, 15);
    const result = transformDates({
      dateToVerify: targetDate,
      firstDateOfCurrentMonthOfView: baseMonth,
      single: {
        selectedDate: targetDate,
        onSelectedDate,
        toggle: true,
      },
    });

    expect(result.isSelected).toBe(true);
    result.onClick();
    expect(onSelectedDate).toHaveBeenCalledWith(null);
  });

  it('should handle multi selection', () => {
    const onSelectedDates = vi.fn();
    const targetDate = new Date(2025, 4, 15);
    const result = transformDates({
      dateToVerify: targetDate,
      firstDateOfCurrentMonthOfView: baseMonth,
      multi: {
        selectedDates: [targetDate],
        onSelectedDates,
      },
    });

    expect(result.isSelected).toBe(true);
    result.onClick();
    expect(onSelectedDates).toHaveBeenCalled();
  });

  it('should handle disabled dates and selectOnlyVisibleMonth', () => {
    const prevMonthDate = new Date(2025, 3, 30);
    const result = transformDates({
      dateToVerify: prevMonthDate,
      firstDateOfCurrentMonthOfView: baseMonth,
      selectOnlyVisibleMonth: true,
    });

    expect(result.isDisabled).toBe(true);
  });

  it('should handle range hover and mouse enter interactions', () => {
    const setLastHoveredDate = vi.fn();
    const fromDate = new Date(2025, 4, 10);
    const hoveredDate = new Date(2025, 4, 20);
    const targetDate = new Date(2025, 4, 15);

    const result = transformDates({
      dateToVerify: targetDate,
      firstDateOfCurrentMonthOfView: baseMonth,
      range: {
        selectedDate: { from: fromDate, to: null },
        lastHoveredDate: hoveredDate,
        setLastHoveredDate,
        onSelectedDate: vi.fn(),
      },
    });

    expect(result.isHoveredRange).toBe(true);

    result.onMouseEnter();
    expect(setLastHoveredDate).toHaveBeenCalledWith(targetDate);
  });

  it('should not update hover if range is completed or unselected', () => {
    const setLastHoveredDate = vi.fn();
    const targetDate = new Date(2025, 4, 15);

    const result = transformDates({
      dateToVerify: targetDate,
      firstDateOfCurrentMonthOfView: baseMonth,
      range: {
        selectedDate: {
          from: new Date(2025, 4, 10),
          to: new Date(2025, 4, 20),
        },
        lastHoveredDate: null,
        setLastHoveredDate,
        onSelectedDate: vi.fn(),
      },
    });

    result.onMouseEnter();
    expect(setLastHoveredDate).not.toHaveBeenCalled();
  });
});
