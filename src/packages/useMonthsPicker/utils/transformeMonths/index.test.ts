import '~/config/i18n';
import { describe, expect, it, vi } from 'vitest';
import { transformMonths } from './index';

describe('packages/useMonthsPicker/utils/transformeMonths', () => {
  it('should transform months correctly for January to December', () => {
    for (let month = 0; month < 12; month++) {
      const result = transformMonths({ monthToVerify: month });
      expect(result.month).toBe(month);
      expect(result.isJanuary).toBe(month === 0);
      expect(result.isFebruary).toBe(month === 1);
      expect(result.isMarch).toBe(month === 2);
      expect(result.isApril).toBe(month === 3);
      expect(result.isMay).toBe(month === 4);
      expect(result.isJune).toBe(month === 5);
      expect(result.isJuly).toBe(month === 6);
      expect(result.isAugust).toBe(month === 7);
      expect(result.isSeptember).toBe(month === 8);
      expect(result.isOctober).toBe(month === 9);
      expect(result.isNovember).toBe(month === 10);
      expect(result.isDecember).toBe(month === 11);
      expect(result.isSelected).toBe(false);
      expect(result.isDisabled).toBe(false);
      expect(typeof result.text).toBe('string');
    }
  });

  it('should handle single selection', () => {
    const onSelectedMonth = vi.fn();
    const result = transformMonths({
      monthToVerify: 4,
      single: {
        selectedMonth: 4,
        onSelectedMonth,
      },
    });

    expect(result.isSelected).toBe(true);
    result.onClick();
    expect(onSelectedMonth).toHaveBeenCalledWith(4);
  });

  it('should handle multi selection', () => {
    const onSelectedMonths = vi.fn();
    const result = transformMonths({
      monthToVerify: 2,
      multi: {
        selectedMonths: [2, 5],
        onSelectedMonths,
      },
    });

    expect(result.isSelected).toBe(true);
    result.onClick();
    expect(onSelectedMonths).toHaveBeenCalled();
  });

  it('should handle disabled months', () => {
    const result = transformMonths({
      monthToVerify: 1,
      disabled: {
        months: [1],
      },
    });

    expect(result.isDisabled).toBe(true);
  });

  it('should handle range hover and focus interactions', () => {
    const setLastHoveredMonth = vi.fn();
    const onSelectedMonth = vi.fn();

    const result = transformMonths({
      monthToVerify: 4,
      range: {
        selectedMonth: { from: 2, to: null },
        lastHoveredMonth: 6,
        setLastHoveredMonth,
        onSelectedMonth,
      },
    });

    expect(result.isHoveredRange).toBe(true);

    result.onMouseEnter();
    expect(setLastHoveredMonth).toHaveBeenCalledWith(4);

    result.onFocus();
    expect(setLastHoveredMonth).toHaveBeenCalledWith(5);
  });

  it('should not update hover if range is complete or unselected', () => {
    const setLastHoveredMonth = vi.fn();

    const result = transformMonths({
      monthToVerify: 6,
      range: {
        selectedMonth: { from: 2, to: 8 },
        lastHoveredMonth: null,
        setLastHoveredMonth,
        onSelectedMonth: vi.fn(),
      },
    });

    result.onMouseEnter();
    result.onFocus();
    expect(setLastHoveredMonth).not.toHaveBeenCalled();
  });
});
