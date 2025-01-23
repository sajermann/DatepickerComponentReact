/**
 * @vitest-environment jsdom
 */
import { render } from '@testing-library/react';
import * as useLocationMock from 'react-router';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/Components/Shared/InjectorProviders';
import * as useBreadcrumbsMock from '~/Hooks/UseBreadcrumbs';

import Breadcrumbs from '.';

describe('Components/Breadcrumbs', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();

    vi.mock('react-router', async () => {
      const mod = await vi.importActual<any>('react-router');
      return {
        ...mod,
        useLocation: () => ({
          pathname: '/',
        }),
      };
    });
  });

  it(`must render null`, async () => {
    vi.spyOn(useBreadcrumbsMock, 'useBreadcrumbs').mockImplementation(() => ({
      breadcrumbs: [
        {
          label: `Test`,
          link: ``,
        },
      ],
      setBreadcrumbs: vi.fn(),
    }));
    vi.spyOn(useLocationMock, 'useLocation').mockImplementation(
      () =>
        ({
          pathname: '/',
        }) as any,
    );
    const { queryAllByText } = render(
      <InjectorProviders>
        <Breadcrumbs />
      </InjectorProviders>,
    );
    const result = queryAllByText('Test');
    expect(result.length).toBe(0);
  });

  it(`must render null`, async () => {
    vi.spyOn(useBreadcrumbsMock, 'useBreadcrumbs').mockImplementation(() => ({
      breadcrumbs: [
        {
          label: `Test`,
          link: `link-test`,
        },
        {
          label: `Test 1`,
          link: `link-test-1`,
        },
      ],
      setBreadcrumbs: vi.fn(),
    }));
    vi.spyOn(useLocationMock, 'useLocation').mockImplementation(
      () =>
        ({
          pathname: 'test-route',
        }) as any,
    );
    const { queryAllByText } = render(
      <InjectorProviders>
        <Breadcrumbs />
      </InjectorProviders>,
    );
    const result = queryAllByText('Test');
    expect(result.length).toBe(1);
  });
});
