/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IsLoading } from '.';
import { InjectorProviders } from '../../InjectorProviders';

describe('Components/RoutesConfig/IsLoading', () => {
  it(`should render component`, async () => {
    const { getByText } = render(
      <InjectorProviders>
        <IsLoading />
      </InjectorProviders>,
    );
    expect(getByText(/Loading.../g)).toBeTruthy();
  });
});
