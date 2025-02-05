/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { Config } from '.';

describe('Components/shared/RoutesConfig/Sidebar/Credits', () => {
  it(`should render component`, async () => {
    const { queryByText } = render(
      <InjectorProviders>
        <Config />
      </InjectorProviders>,
    );

    expect(queryByText(/Settings/g)).toBeTruthy();
  });
});
