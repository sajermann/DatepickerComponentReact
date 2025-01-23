/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import * as useLocationMock from 'react-router';
import { describe, expect, it, vi } from 'vitest';
import { RoutesConfig } from '.';
import { InjectorProviders } from '../InjectorProviders';

describe('Components/RoutesConfig', () => {
  vi.mock('react-router', async () => {
    const mod = await vi.importActual<any>('react-router');
    return {
      ...mod,
    };
  });
  it(`should render component`, async () => {
    vi.spyOn(useLocationMock, 'useLocation').mockImplementation(
      () =>
        ({
          pathname: '/test',
        }) as any,
    );
    const { getByText } = render(
      <InjectorProviders noLayout>
        <RoutesConfig />
      </InjectorProviders>,
    );
    expect(getByText(/Welcome/g)).toBeTruthy();
  });
});
