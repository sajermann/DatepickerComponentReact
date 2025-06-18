/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { onChangeInputProp } from '.';

describe('pages/YearPicker/components/Playground/utils/onChangeInputProp', () => {
  it('updates the prop in the state with the given value', () => {
    const setPlaygroundParams = vi.fn((fn: any) => fn({ foo: 1, bar: 2 }));

    onChangeInputProp({
      value: 42,
      prop: 'foo',
      setPlaygroundParams,
    });

    expect(setPlaygroundParams).toHaveBeenCalled();
    const newState = setPlaygroundParams.mock.calls[0][0]({ foo: 1, bar: 2 });
    expect(newState).toEqual({ foo: 42, bar: 2 });
  });

  it('adds the prop if it does not exist in the previous state', () => {
    const setPlaygroundParams = vi.fn((fn: any) => fn({ bar: 2 }));

    onChangeInputProp({
      value: 'new',
      prop: 'baz',
      setPlaygroundParams,
    });

    expect(setPlaygroundParams).toHaveBeenCalled();
    const newState = setPlaygroundParams.mock.calls[0][0]({ bar: 2 });
    expect(newState).toEqual({ bar: 2, baz: 'new' });
  });

  it('works with undefined previous state', () => {
    const setPlaygroundParams = vi.fn((fn: any) => fn(undefined as any));

    onChangeInputProp({
      value: true,
      prop: 'active',
      setPlaygroundParams,
    });

    expect(setPlaygroundParams).toHaveBeenCalled();
    const newState = setPlaygroundParams.mock.calls[0][0](undefined as any);
    expect(newState).toEqual({ active: true });
  });
});
