/**
 * @vitest-environment jsdom
 */
import { fireEvent, render, waitFor } from '@testing-library/react';
import { it, describe } from 'vitest';
import { InjectorProviders } from '~/Components/InjectorProviders';

import { CalendarPickerPage } from '.';

describe('Pages/CalendarPickerPage', () => {
	it(`must render checkbox`, async () => {
		const { getAllByText } = render(
			<InjectorProviders>
				<CalendarPickerPage />
			</InjectorProviders>
		);
	});
});
