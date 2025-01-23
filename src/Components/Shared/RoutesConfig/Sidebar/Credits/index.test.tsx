/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/Components/Shared/InjectorProviders';
import { _Credits } from '.';

describe('Components/Shared/RoutesConfig/Sidebar/Credits', () => {
  it(`should render component`, async () => {
    const { queryByText } = render(
      <InjectorProviders>
        <_Credits />
      </InjectorProviders>,
    );

    expect(queryByText(/Bruno Sajermann/g)).toBeTruthy();
  });
});
