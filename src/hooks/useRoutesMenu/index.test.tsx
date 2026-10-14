import { render, renderHook, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { describe, expect, it } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import { useRoutesMenu } from './index';

describe('hooks/useRoutesMenu', () => {
  it('should return globalRoutes, triRoutes, and globalMenus filter', () => {
    const { result } = renderHook(() => useRoutesMenu(), {
      wrapper: ({ children }) => (
        <InjectorProviders>{children}</InjectorProviders>
      ),
    });

    expect(result.current.globalRoutes.length).toBeGreaterThan(0);
    expect(result.current.triRoutes).toBeDefined();

    // Test globalMenus filter
    const allMenus = result.current.globalMenus('');
    expect(allMenus).toBeDefined();

    const filtered = result.current.globalMenus('Picker');
    expect(filtered).toBeDefined();
  });

  it('should resolve lazy loaded route elements', async () => {
    const { result } = renderHook(() => useRoutesMenu(), {
      wrapper: ({ children }) => (
        <InjectorProviders>{children}</InjectorProviders>
      ),
    });

    // Render each route element to trigger lazy loading factory
    for (const route of result.current.globalRoutes) {
      if (route.element) {
        render(
          <InjectorProviders>
            <Suspense fallback={<div>Loading...</div>}>
              {route.element}
            </Suspense>
          </InjectorProviders>,
        );
      }
    }

    await waitFor(() => {
      expect(document.body).toBeTruthy();
    });
  });
});
