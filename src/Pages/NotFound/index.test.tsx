/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/shared/InjectorProviders';
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
