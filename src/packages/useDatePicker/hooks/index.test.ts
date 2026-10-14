import '~/config/i18n';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useDatePicker } from './index';

describe('packages/useDatePicker/hooks', () => {
  it('should initialize and handle month and year navigation in days view', () => {
    const baseDate = new Date(2025, 4, 15); // May 2025
    const { result } = renderHook(() => useDatePicker({ date: baseDate }));

    expect(result.current.viewMode).toBe('days');
    expect(result.current.firstDateOfCurrentMonthOfView.getMonth()).toBe(4);

    act(() => {
      result.current.handleNextMonthOfView();
    });
    expect(result.current.firstDateOfCurrentMonthOfView.getMonth()).toBe(5);

    act(() => {
      result.current.handlePrevMonthOfView();
    });
    expect(result.current.firstDateOfCurrentMonthOfView.getMonth()).toBe(4);

    act(() => {
      result.current.handleNextYearOfView();
    });
    expect(result.current.firstDateOfCurrentMonthOfView.getFullYear()).toBe(2026);

    act(() => {
      result.current.handlePrevYearOfView();
    });
    expect(result.current.firstDateOfCurrentMonthOfView.getFullYear()).toBe(2025);

    act(() => {
      result.current.handleNextGroupYearsOfView();
    });
    expect(result.current.firstDateOfCurrentMonthOfView.getFullYear()).toBe(2049);

    act(() => {
      result.current.handlePrevGroupYearsOfView();
    });
    expect(result.current.firstDateOfCurrentMonthOfView.getFullYear()).toBe(2025);
  });

  it('should switch viewModes and handle disabledPrev / disabledNext across days, months, and years', () => {
    const baseDate = new Date(2025, 4, 15);
    const disabled = {
      before: new Date(2025, 3, 1),
      after: new Date(2025, 5, 30),
    };

    const { result } = renderHook(() =>
      useDatePicker({ date: baseDate, disabled }),
    );

    // View: Days
    expect(result.current.disabledPrev).toBeDefined();
    expect(result.current.disabledNext).toBeDefined();

    // Switch to Months
    act(() => {
      result.current.setViewMode('months');
    });
    expect(result.current.viewMode).toBe('months');
    expect(result.current.disabledPrev).toBeDefined();
    expect(result.current.disabledNext).toBeDefined();

    // Switch to Years
    act(() => {
      result.current.setViewMode('years');
    });
    expect(result.current.viewMode).toBe('years');
    expect(result.current.disabledPrev).toBeDefined();
    expect(result.current.disabledNext).toBeDefined();
  });

  it('should handle selecting month and year via months / years callbacks', () => {
    const baseDate = new Date(2025, 4, 15);
    const { result } = renderHook(() => useDatePicker({ date: baseDate }));

    act(() => {
      result.current.months[6].onClick?.();
    });
    expect(result.current.firstDateOfCurrentMonthOfView.getMonth()).toBe(6);
    expect(result.current.viewMode).toBe('days');

    act(() => {
      result.current.years[0].onClick?.();
    });
    expect(result.current.viewMode).toBe('months');
  });
});
