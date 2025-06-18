/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { onMonthClick } from '.';

describe('package/useMonthsPicker/onMonthClick', () => {
  it(`should test single when toggle is true`, () => {
    const spy = vi.fn();
    onMonthClick({
      monthToVerify: 0,
      single: {
        selectedMonth: 0,
        toggle: true,
        onSelectedMonth: spy,
      },
    });
    expect(spy).toBeCalledWith(null);
  });

  it(`should test single when toggle is falsy`, () => {
    const spy = vi.fn();
    onMonthClick({
      monthToVerify: 1,
      single: {
        selectedMonth: null,
        onSelectedMonth: spy,
      },
    });
    expect(spy).toBeCalledWith(1);
  });

  it(`should test multi - insert month`, () => {
    const spy = vi.fn();
    onMonthClick({
      monthToVerify: 0,
      multi: {
        selectedMonths: [],
        onSelectedMonths: spy,
      },
    });
    expect(spy).toBeCalledWith([0]);
  });

  it(`should test multi - remove month`, () => {
    const spy = vi.fn();
    onMonthClick({
      monthToVerify: 0,
      multi: {
        selectedMonths: [0, 1],
        onSelectedMonths: spy,
      },
    });
    expect(spy).toBeCalledWith([1]);
  });

  it(`should test range - select from`, () => {
    const spySetLastHoveredMonth = vi.fn();
    const spyOnSelectedMonth = vi.fn();

    onMonthClick({
      monthToVerify: 0,
      range: {
        selectedMonth: {
          from: 0,
          to: 11,
        },
        onSelectedMonth: spyOnSelectedMonth,
        lastHoveredMonth: 11,
        setLastHoveredMonth: spySetLastHoveredMonth,
      },
    });
    expect(spySetLastHoveredMonth).toBeCalledWith(null);
    expect(spyOnSelectedMonth).toBeCalledWith({
      from: 0,
      to: null,
    });

    onMonthClick({
      monthToVerify: 5,
      range: {
        selectedMonth: {
          from: 7,
          to: null,
        },
        onSelectedMonth: spyOnSelectedMonth,
        lastHoveredMonth: 11,
        setLastHoveredMonth: spySetLastHoveredMonth,
      },
    });
    expect(spyOnSelectedMonth).toBeCalledWith({ from: 5, to: 7 });

    onMonthClick({
      monthToVerify: 5,
      range: {
        selectedMonth: {
          from: null,
          to: null,
        },
        onSelectedMonth: spyOnSelectedMonth,
        lastHoveredMonth: 11,
        setLastHoveredMonth: spySetLastHoveredMonth,
      },
    });
    expect(spyOnSelectedMonth).toBeCalledWith({ from: 5, to: null });

    onMonthClick({
      monthToVerify: 5,
      range: {
        selectedMonth: {
          from: 0,
          to: null,
        },
        onSelectedMonth: spyOnSelectedMonth,
        lastHoveredMonth: 11,
        setLastHoveredMonth: spySetLastHoveredMonth,
      },
    });
    expect(spyOnSelectedMonth).toBeCalledWith({ from: 5, to: null });
  });
});
