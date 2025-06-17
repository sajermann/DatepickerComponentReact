/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getInputs } from '.';
import { TPlaygroundParams } from '../../types';

describe('pages/MonthPicker/components/Playground/utils/getInputs', () => {
  const setPlaygroundParams = vi.fn();
  const setMonthDisabledToInclude = vi.fn();
  const translate = vi.fn(str => `translated:${str}`);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns an array of inputs with correct types and labels', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      monthDisabledToInclude: null,
      setMonthDisabledToInclude,
      translate,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].type).toBe('select');
    expect(result[0].label).toBe('Mode');
  });

  it('hides Toggle, Disabled After First Disabled Months, Disabled Same Month, Min/Max Interval when not in correct mode', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      monthDisabledToInclude: null,
      setMonthDisabledToInclude,
      translate,
    });
    // Toggle only visible if single
    expect(result.find(i => i.label === 'Toggle')?.hide).toBe(true);
    // Range options only visible if range
    expect(
      result.find(i => i.label === 'Disabled After First Disabled Months')
        ?.hide,
    ).toBe(true);
    expect(result.find(i => i.label === 'Disabled Same Month')?.hide).toBe(
      true,
    );
    expect(result.find(i => i.label === 'Min Interval')?.hide).toBe(true);
    expect(result.find(i => i.label === 'Max Interval')?.hide).toBe(true);
  });

  it('shows Toggle when playgroundParams.single is present', () => {
    const playgroundParams: TPlaygroundParams = {
      single: { selectedMonth: null, toggle: true },
    };
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      monthDisabledToInclude: null,
      setMonthDisabledToInclude,
      translate,
    });
    expect(result.find(i => i.label === 'Toggle')?.hide).toBe(false);
  });

  it('shows range options when playgroundParams.range is present', () => {
    const playgroundParams: TPlaygroundParams = {
      range: { selectedMonth: { from: 1, to: 2 } },
    };
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      monthDisabledToInclude: null,
      setMonthDisabledToInclude,
      translate,
    });
    expect(
      result.find(i => i.label === 'Disabled After First Disabled Months')
        ?.hide,
    ).toBe(false);
    expect(result.find(i => i.label === 'Disabled Same Month')?.hide).toBe(
      false,
    );
    expect(result.find(i => i.label === 'Min Interval')?.hide).toBe(false);
    expect(result.find(i => i.label === 'Max Interval')?.hide).toBe(false);
  });

  it('calls setMonthDisabledToInclude and setPlaygroundParams on onInclude', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      monthDisabledToInclude: 5,
      setMonthDisabledToInclude,
      translate,
    });
    const monthsDisabledInput: any = result.find(
      i => i.label === 'Months Disabled',
    );
    expect(monthsDisabledInput).toBeDefined();

    // Call onInclude
    monthsDisabledInput?.onInclude?.();
    expect(setPlaygroundParams).toHaveBeenCalled();
    expect(setMonthDisabledToInclude).toHaveBeenCalledWith(null);
  });

  it('does not call setPlaygroundParams or setMonthDisabledToInclude if monthDisabledToInclude is null', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      monthDisabledToInclude: null,
      setMonthDisabledToInclude,
      translate,
    });
    const monthsDisabledInput: any = result.find(
      i => i.label === 'Months Disabled',
    );
    expect(monthsDisabledInput).toBeDefined();

    // Call onInclude
    monthsDisabledInput?.onInclude?.();
    expect(setPlaygroundParams).not.toHaveBeenCalled();
    expect(setMonthDisabledToInclude).not.toHaveBeenCalled();
  });

  it('sets tooltip on Months Disabled input', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      monthDisabledToInclude: null,
      setMonthDisabledToInclude,
      translate,
    });
    const monthsDisabledInput = result.find(i => i.label === 'Months Disabled');
    expect(monthsDisabledInput?.tooltip).toBe(
      'translated:DISABLED_DATES_TOOLTIP',
    );
  });
});
