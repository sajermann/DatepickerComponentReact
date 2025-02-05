/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { it, describe } from 'vitest';
import { InjectorProviders } from '~/Components/InjectorProviders';
import { NotFoundPage } from '.';

describe('Pages/NotFoundPage', () => {
	it(`should render component`, async () => {
		const { getByText } = render(
			<InjectorProviders>
				<NotFoundPage />
			</InjectorProviders>,
		);

		expect(getByText('Not Found Page')).toBeTruthy();
	});
});
