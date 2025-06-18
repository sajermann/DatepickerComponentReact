/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getInputs } from '.';
import { TPlaygroundParams } from '../../types';
import * as utils from '../../utils';

// Mocks para funções externas

describe('pages/YearPicker/components/Playground/utils/getInputs', () => {
  const setPlaygroundParams = vi.fn();
  const setYearDisabledToInclude = vi.fn();
  const setIsNecessaryReload = vi.fn();
  const translate = vi.fn(str => `translated:${str}`);

  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('returns an array of inputs with correct types and labels', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      yearDisabledToInclude: null,
      setYearDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result[0].type).toBe('select');
    expect(result[0].label).toBe('Mode');
  });

  it('hides Toggle, Disabled After First Disabled Years, Disabled Same Year, Min/Max Interval when not in correct mode', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      yearDisabledToInclude: null,
      setYearDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    // Toggle only visible if single
    expect(result.find(i => i.label === 'Toggle')?.hide).toBe(true);
    // Range options only visible if range
    expect(
      result.find(i => i.label === 'Disabled After First Disabled Years')?.hide,
    ).toBe(true);
    expect(result.find(i => i.label === 'Disabled Same Year')?.hide).toBe(true);
    expect(result.find(i => i.label === 'Min Interval')?.hide).toBe(true);
    expect(result.find(i => i.label === 'Max Interval')?.hide).toBe(true);
  });

  it('shows Toggle when playgroundParams.single is present', () => {
    const playgroundParams: TPlaygroundParams = {
      single: { selectedYear: null, toggle: true },
    };
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      yearDisabledToInclude: null,
      setYearDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    expect(result.find(i => i.label === 'Toggle')?.hide).toBe(false);
  });

  it('shows range options when playgroundParams.range is present', () => {
    const playgroundParams: TPlaygroundParams = {
      range: { selectedYear: { from: 1, to: 2 } },
    };
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      yearDisabledToInclude: null,
      setYearDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    expect(
      result.find(i => i.label === 'Disabled After First Disabled Years')?.hide,
    ).toBe(false);
    expect(result.find(i => i.label === 'Disabled Same Year')?.hide).toBe(
      false,
    );
    expect(result.find(i => i.label === 'Min Interval')?.hide).toBe(false);
    expect(result.find(i => i.label === 'Max Interval')?.hide).toBe(false);
  });

  it('calls setYearDisabledToInclude and setPlaygroundParams on onInclude', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      yearDisabledToInclude: 5,
      setYearDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    const yearsDisabledInput: any = result.find(
      i => i.label === 'Years Disabled',
    );
    expect(yearsDisabledInput).toBeDefined();

    // Call onInclude
    yearsDisabledInput?.onInclude?.();
    expect(setPlaygroundParams).toHaveBeenCalled();
    expect(setYearDisabledToInclude).toHaveBeenCalledWith(null);
  });

  it('does not call setPlaygroundParams or setYearDisabledToInclude if yearDisabledToInclude is null', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      yearDisabledToInclude: null,
      setYearDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    const yearsDisabledInput: any = result.find(
      i => i.label === 'Years Disabled',
    );
    expect(yearsDisabledInput).toBeDefined();

    // Call onInclude
    yearsDisabledInput?.onInclude?.();
    expect(setPlaygroundParams).not.toHaveBeenCalled();
    expect(setYearDisabledToInclude).not.toHaveBeenCalled();
  });

  it('sets tooltip on Years Disabled input', () => {
    const playgroundParams: TPlaygroundParams = {};
    const result = getInputs({
      playgroundParams,
      setPlaygroundParams,
      yearDisabledToInclude: null,
      setYearDisabledToInclude,
      translate,
      setIsNecessaryReload,
    });
    const yearsDisabledInput = result.find(i => i.label === 'Years Disabled');
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
    const setYearDisabledToInclude = vi.fn();
    const translate = vi.fn(str => `translated:${str}`);

    // PlaygroundParams para mostrar todos os campos
    const playgroundParams: any = {
      single: { toggle: true },
      range: { selectedYear: { from: 1, to: 2 } },
    };

    // yearDisabledToInclude para ativar o onInclude
    const yearDisabledToInclude = 5;

    const inputs = getInputs({
      playgroundParams,
      setPlaygroundParams: spySetPlaygroundParams,
      yearDisabledToInclude,
      setYearDisabledToInclude,
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

    // Simula onInclude do último input (Years Disabled)
    const yearsDisabledInput: any = inputs.find(
      i => i.label === 'Years Disabled',
    );
    yearsDisabledInput?.onInclude?.();

    // Verifica se todos os mocks foram chamados
    expect(spyOnChangeInputByType).toHaveBeenCalled();
    expect(spyOnChangeInputProp).toHaveBeenCalled();
    expect(setYearDisabledToInclude).toHaveBeenCalledWith(Number('true')); // chamado pelo onChange
    expect(spySetPlaygroundParams).toHaveBeenCalled(); // chamado pelo onInclude

    // Verifica se o tooltip do último input foi traduzido
    expect(yearsDisabledInput?.tooltip).toBe(
      'translated:DISABLED_DATES_TOOLTIP',
    );
  });
});
