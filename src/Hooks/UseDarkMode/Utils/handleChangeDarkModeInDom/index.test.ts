/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from 'vitest';
import { _handleChangeDarkModeInDom } from '.';

describe('Utils/HandleChangeDarkModeInDom', () => {
  it(`should remove dark mode`, async () => {
    const spy = vi.fn();
    const mock = {
      classList: {
        remove: spy,
      },
    };

    vi.spyOn(document, 'querySelector').mockImplementation(
      (() => mock) as unknown as any,
    );

    _handleChangeDarkModeInDom(false);
    expect(spy).toBeCalledWith('dark');
  });

  it(`should add dark mode`, async () => {
    const spy = vi.fn();
    const mock = {
      classList: {
        add: spy,
      },
    };

    vi.spyOn(document, 'querySelector').mockImplementation(
      (() => mock) as unknown as any,
    );

    _handleChangeDarkModeInDom(true);
    expect(spy).toBeCalledWith('dark');
  });
});
