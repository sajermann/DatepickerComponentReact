import { SetStateAction } from 'react';
/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { onChangeInputByType } from '.';
import { TPlaygroundParams } from '../../types';

describe('pages/MonthPicker/components/Playground/utils/onChangeInputByType', () => {
  it('updates single and deletes multi and range', () => {
    const setPlaygroundParams = vi.fn((fn: any) =>
      fn({
        single: { a: 1 },
        multi: { b: 2 },
        range: { c: 3 },
      }),
    );

    onChangeInputByType({
      type: 'single',
      value: 42,
      prop: 'foo',
      setPlaygroundParams,
    });

    expect(setPlaygroundParams).toHaveBeenCalled();
    const newState = setPlaygroundParams.mock.calls[0][0]({
      single: { a: 1 },
      multi: { b: 2 },
      range: { c: 3 },
    });
    expect(newState).toEqual({
      single: { a: 1, foo: 42 },
    });
  });

  it('updates multi and deletes single and range', () => {
    const setPlaygroundParams = vi.fn((fn: any) =>
      fn({
        single: { a: 1 },
        multi: { b: 2 },
        range: { c: 3 },
      }),
    );

    onChangeInputByType({
      type: 'multi',
      value: 'bar',
      prop: 'baz',
      setPlaygroundParams,
    });

    expect(setPlaygroundParams).toHaveBeenCalled();
    const newState = setPlaygroundParams.mock.calls[0][0]({
      single: { a: 1 },
      multi: { b: 2 },
      range: { c: 3 },
    });
    expect(newState).toEqual({
      multi: { b: 2, baz: 'bar' },
    });
  });

  it('updates range and deletes single and multi', () => {
    const setPlaygroundParams = vi.fn((fn: any) =>
      fn({
        single: { a: 1 },
        multi: { b: 2 },
        range: { c: 3 },
      }),
    );

    onChangeInputByType({
      type: 'range',
      value: true,
      prop: 'active',
      setPlaygroundParams,
    });

    expect(setPlaygroundParams).toHaveBeenCalled();
    const newState = setPlaygroundParams.mock.calls[0][0]({
      single: { a: 1 },
      multi: { b: 2 },
      range: { c: 3 },
    });
    expect(newState).toEqual({
      range: { c: 3, active: true },
    });
  });

  it('creates the type object if it does not exist', () => {
    const setPlaygroundParams = vi.fn((fn: any) => fn({}));

    onChangeInputByType({
      type: 'single',
      value: 123,
      prop: 'foo',
      setPlaygroundParams,
    });

    expect(setPlaygroundParams).toHaveBeenCalled();
    const newState = setPlaygroundParams.mock.calls[0][0]({});
    expect(newState).toEqual({
      single: { foo: 123 },
    });
  });

  it('preserves unrelated keys', () => {
    const setPlaygroundParams = vi.fn((fn: any) =>
      fn({ unrelated: 'keep me', multi: { b: 2 } }),
    );

    onChangeInputByType({
      type: 'multi',
      value: 'x',
      prop: 'y',
      setPlaygroundParams,
    });

    expect(setPlaygroundParams).toHaveBeenCalled();
    const newState = setPlaygroundParams.mock.calls[0][0]({
      unrelated: 'keep me',
      multi: { b: 2 },
    });
    expect(newState).toEqual({
      unrelated: 'keep me',
      multi: { b: 2, y: 'x' },
    });
  });
});
