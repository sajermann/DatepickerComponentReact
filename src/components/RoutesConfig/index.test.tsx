/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import * as useLocationMock from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '../InjectorProviders';
import { RoutesConfig } from '.';

vi.mock('react-router', async () => {
  const mod = await vi.importActual<any>('react-router');
  return {
    ...mod,
  };
});

describe('Components/RoutesConfig', () => {
  it(`should render component`, async () => {
    vi.spyOn(useLocationMock, 'useLocation').mockImplementation(
      () =>
        ({
          pathname: '/test',
        }) as any,
    );
    const { getByText } = render(
      <InjectorProviders>
        <RoutesConfig />
      </InjectorProviders>,
    );
    expect(getByText(/Welcome/)).toBeTruthy();
  });
});
