/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { Credits } from '.';

describe('Components/shared/RoutesConfig/Sidebar/Credits', () => {
  it(`should render component`, async () => {
    const { queryByText } = render(
      <InjectorProviders>
        <Credits />
      </InjectorProviders>,
    );

    expect(queryByText(/Bruno Sajermann/g)).toBeTruthy();
  });
});
