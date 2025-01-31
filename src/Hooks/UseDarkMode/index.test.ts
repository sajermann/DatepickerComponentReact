/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest';
import { useDarkMode } from '.';

describe('hooks/useDarkMode', () => {
  it(`should change state`, async () => {
    useDarkMode.setState({
      darkMode: false,
    });

    expect(useDarkMode.getState().darkMode).toBeFalsy();

    useDarkMode.getState().toggleDarkMode();

    expect(useDarkMode.getState().darkMode).toBeTruthy();
  });
});
