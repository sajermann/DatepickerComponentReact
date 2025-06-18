import { addDays } from 'date-fns';
/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getInputs } from '.';
import { TPlaygroundParams } from '../../types';
import * as utils from '../../utils';

describe('pages/DayPicker/components/Playground/utils/getInputs', () => {
  const setPlaygroundParams = vi.fn();
  const setDateDisabledToInclude = vi.fn();
  const setIsNecessaryReload = vi.fn();
  const translate = vi.fn(str => `translated:${str}`);

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('returns an array of inputs with correct types and labels', () => {
    const playgroundParams = {} as TPlaygroundParams;
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      dateDisabledToInclude: null,
      setDateDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].type).toBe('select');
    expect(result[0].label).toBe('Mode');
  });

  it('hides Toggle, Disabled After First Disabled Dates, Disabled Same Date, Min/Max Interval when not in correct mode', () => {
    const playgroundParams = {} as TPlaygroundParams;
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      dateDisabledToInclude: null,
      setDateDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    // Toggle only visible if single
    expect(result.find(i => i.label === 'Toggle')?.hide).toBe(true);
    // Range options only visible if range
    expect(
      result.find(i => i.label === 'Disabled After First Disabled Dates')?.hide,
    ).toBe(true);
    expect(result.find(i => i.label === 'Disabled Same Date')?.hide).toBe(true);
    expect(result.find(i => i.label === 'Min Interval')?.hide).toBe(true);
    expect(result.find(i => i.label === 'Max Interval')?.hide).toBe(true);
  });

  it('shows Toggle when playgroundParams.single is present', () => {
    const playgroundParams: TPlaygroundParams = {
      single: { selectedDate: null, toggle: true },
      disabledWeeks: [],
    };
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      dateDisabledToInclude: null,
      setDateDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    expect(result.find(i => i.label === 'Toggle')?.hide).toBe(false);
  });

  it('shows range options when playgroundParams.range is present', () => {
    const playgroundParams: TPlaygroundParams = {
      range: { selectedDate: { from: new Date(), to: addDays(new Date(), 1) } },
      disabledWeeks: [],
    };
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      dateDisabledToInclude: null,
      setDateDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    expect(
      result.find(i => i.label === 'Disabled After First Disabled Dates')?.hide,
    ).toBe(false);
    expect(result.find(i => i.label === 'Disabled Same Date')?.hide).toBe(
      false,
    );
    expect(result.find(i => i.label === 'Min Interval')?.hide).toBe(false);
    expect(result.find(i => i.label === 'Max Interval')?.hide).toBe(false);
  });

  it('calls setDateDisabledToInclude and setPlaygroundParams on onInclude', () => {
    const playgroundParams = {} as TPlaygroundParams;
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      dateDisabledToInclude: new Date(),
      setDateDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    const yearsDisabledInput: any = result.find(
      i => i.label === 'Dates Disabled',
    );
    expect(yearsDisabledInput).toBeDefined();

    // Call onInclude
    yearsDisabledInput?.onInclude?.();
    expect(setPlaygroundParams).toHaveBeenCalled();
    expect(setDateDisabledToInclude).toHaveBeenCalledWith(null);
  });

  it('does not call setPlaygroundParams or setDateDisabledToInclude if yearDisabledToInclude is null', () => {
    const playgroundParams = {} as TPlaygroundParams;
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      dateDisabledToInclude: null,
      setDateDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    const yearsDisabledInput: any = result.find(
      i => i.label === 'Dates Disabled',
    );
    expect(yearsDisabledInput).toBeDefined();

    // Call onInclude
    yearsDisabledInput?.onInclude?.();
    expect(setPlaygroundParams).not.toHaveBeenCalled();
    expect(setDateDisabledToInclude).not.toHaveBeenCalled();
  });

  it('sets tooltip on Dates Disabled input', () => {
    const playgroundParams = {} as TPlaygroundParams;
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      dateDisabledToInclude: null,
      setDateDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    const yearsDisabledInput = result.find(i => i.label === 'Dates Disabled');
    expect(yearsDisabledInput?.tooltip).toBe(
      'translated:DISABLED_DATES_TOOLTIP',
    );
  });

  it('calls all onChange and onInclude callbacks', async () => {
    const spyOnChangeInputByType = vi.fn();
    const spyOnChangeInputProp = vi.fn();
    vi.spyOn(utils, 'onChangeInputByType').mockImplementation(
      spyOnChangeInputByType,
    );
    vi.spyOn(utils, 'onChangeInputProp').mockImplementation(
      spyOnChangeInputProp,
    );

    const spySetPlaygroundParams = vi.fn();
    const setDateDisabledToInclude = vi.fn();
    const translate = vi.fn(str => `translated:${str}`);

    // PlaygroundParams para mostrar todos os campos
    const playgroundParams: any = {
      single: { toggle: true },
      range: { selectedDate: { from: new Date(), to: addDays(new Date(), 1) } },
    };

    // yearDisabledToInclude para ativar o onInclude
    const dateDisabledToInclude = new Date();

    const inputs = getInputs({
      playgroundParams,
      setPlaygroundParams: spySetPlaygroundParams,
      dateDisabledToInclude,
      setDateDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });

    // Simula todos os onChange
    for (const input of inputs) {
      if (typeof input.onChange === 'function') {
        // Simula evento de select/input
        input.onChange({
          target: {
            value: 'true', // para selects booleanos
          },
        } as any);
      }
    }

    // Simula onInclude do último input (Dates Disabled)
    const datesDisabledInput: any = inputs.find(
      i => i.label === 'Dates Disabled',
    );
    datesDisabledInput?.onInclude?.();

    // Verifica se todos os mocks foram chamados
    expect(spyOnChangeInputByType).toHaveBeenCalled();
    expect(spyOnChangeInputProp).toHaveBeenCalled();
    expect(spySetPlaygroundParams).toHaveBeenCalled(); // chamado pelo onInclude

    // Verifica se o tooltip do último input foi traduzido
    expect(datesDisabledInput?.tooltip).toBe(
      'translated:DISABLED_DATES_TOOLTIP',
    );
  });
});
