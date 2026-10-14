import { describe, expect, it, vi } from 'vitest';
import { transformeYears } from './index';

describe('packages/useYearsPicker/utils/transformeYears', () => {
  it('should transform years correctly', () => {
    const currentYear = new Date().getFullYear();
    const resultCurrent = transformeYears({ yearToVerify: currentYear });
    expect(resultCurrent.year).toBe(currentYear);
    expect(resultCurrent.isThisYear).toBe(true);
    expect(resultCurrent.isSelected).toBe(false);
    expect(resultCurrent.isDisabled).toBe(false);
    expect(resultCurrent.text).toBe(String(currentYear));

    const resultOther = transformeYears({ yearToVerify: 1999 });
    expect(resultOther.isThisYear).toBe(false);
  });

  it('should handle single selection', () => {
    const onSelectedYear = vi.fn();
    const result = transformeYears({
      yearToVerify: 2025,
      single: {
        selectedYear: 2025,
        onSelectedYear,
      },
    });

    expect(result.isSelected).toBe(true);
    result.onClick();
    expect(onSelectedYear).toHaveBeenCalledWith(2025);
  });

  it('should handle multi selection', () => {
    const onSelectedYears = vi.fn();
    const result = transformeYears({
      yearToVerify: 2026,
      multi: {
        selectedYears: [2024, 2026],
        onSelectedYears,
      },
    });

    expect(result.isSelected).toBe(true);
    result.onClick();
    expect(onSelectedYears).toHaveBeenCalled();
  });

  it('should handle disabled years', () => {
    const result = transformeYears({
      yearToVerify: 2020,
      disabled: {
        years: [2020],
      },
    });

    expect(result.isDisabled).toBe(true);
  });

  it('should handle range hover and focus interactions', () => {
    const setLastHoveredYear = vi.fn();
    const onSelectedYear = vi.fn();

    const result = transformeYears({
      yearToVerify: 2025,
      range: {
        selectedYear: { from: 2020, to: null },
        lastHoveredYear: 2030,
        setLastHoveredYear,
        onSelectedYear,
      },
    });

    expect(result.isHoveredRange).toBe(true);

    result.onMouseEnter();
    expect(setLastHoveredYear).toHaveBeenCalledWith(2025);

    result.onFocus();
    expect(setLastHoveredYear).toHaveBeenCalledWith(2026);
  });

  it('should not update hover if range is completed or unselected', () => {
    const setLastHoveredYear = vi.fn();

    const result = transformeYears({
      yearToVerify: 2025,
      range: {
        selectedYear: { from: 2020, to: 2030 },
        lastHoveredYear: null,
        setLastHoveredYear,
        onSelectedYear: vi.fn(),
      },
    });

    result.onMouseEnter();
    result.onFocus();
    expect(setLastHoveredYear).not.toHaveBeenCalled();
  });
});
