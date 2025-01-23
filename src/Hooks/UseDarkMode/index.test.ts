/**
 * @vitest-environment jsdom
 */
import { it, describe, expect } from 'vitest';
import { useDarkModeZustand } from '.';

describe('Store/UseDarkModeZustand', () => {
	it(`should change state`, async () => {
		useDarkModeZustand.setState({
			darkMode: false,
		});

		expect(useDarkModeZustand.getState().darkMode).toBeFalsy();

		useDarkModeZustand.getState().toggleDarkMode();

		expect(useDarkModeZustand.getState().darkMode).toBeTruthy();
	});
});
