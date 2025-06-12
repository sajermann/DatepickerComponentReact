/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { onYearClick } from '.';

describe('package/useYearsPicker/onYearClick', () => {
  it(`should test single when toggle is true`, () => {
    const spy = vi.fn();
    onYearClick({
      yearToVerify: 0,
      single: {
        selectedYear: 0,
        toggle: true,
        onSelectedYear: spy,
      },
    });
    expect(spy).toBeCalledWith(null);
  });

  it(`should test single when toggle is falsy`, () => {
    const spy = vi.fn();
    onYearClick({
      yearToVerify: 1,
      single: {
        selectedYear: null,
        onSelectedYear: spy,
      },
    });
    expect(spy).toBeCalledWith(1);
  });

  it(`should test multi - insert year`, () => {
    const spy = vi.fn();
    onYearClick({
      yearToVerify: 0,
      multi: {
        selectedYears: [],
        onSelectedYears: spy,
      },
    });
    expect(spy).toBeCalledWith([0]);
  });

  it(`should test multi - remove year`, () => {
    const spy = vi.fn();
    onYearClick({
      yearToVerify: 0,
      multi: {
        selectedYears: [0, 1],
        onSelectedYears: spy,
      },
    });
    expect(spy).toBeCalledWith([1]);
  });

  it(`should test range - select from`, () => {
    const spySetLastHoveredYear = vi.fn();
    const spyOnSelectedYear = vi.fn();

    onYearClick({
      yearToVerify: 0,
      range: {
        selectedYear: {
          from: 0,
          to: 11,
        },
        onSelectedYear: spyOnSelectedYear,
        lastHoveredYear: 11,
        setLastHoveredYear: spySetLastHoveredYear,
      },
    });
    expect(spySetLastHoveredYear).toBeCalledWith(null);
    expect(spyOnSelectedYear).toBeCalledWith({
      from: 0,
      to: null,
    });

    onYearClick({
      yearToVerify: 5,
      range: {
        selectedYear: {
          from: 7,
          to: null,
        },
        onSelectedYear: spyOnSelectedYear,
        lastHoveredYear: 11,
        setLastHoveredYear: spySetLastHoveredYear,
      },
    });
    expect(spyOnSelectedYear).toBeCalledWith({ from: 5, to: 7 });

    onYearClick({
      yearToVerify: 5,
      range: {
        selectedYear: {
          from: null,
          to: null,
        },
        onSelectedYear: spyOnSelectedYear,
        lastHoveredYear: 11,
        setLastHoveredYear: spySetLastHoveredYear,
      },
    });
    expect(spyOnSelectedYear).toBeCalledWith({ from: 5, to: null });

    onYearClick({
      yearToVerify: 5,
      range: {
        selectedYear: {
          from: 0,
          to: null,
        },
        onSelectedYear: spyOnSelectedYear,
        lastHoveredYear: 11,
        setLastHoveredYear: spySetLastHoveredYear,
      },
    });
    expect(spyOnSelectedYear).toBeCalledWith({ from: 5, to: null });
  });
});
