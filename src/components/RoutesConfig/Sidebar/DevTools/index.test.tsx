import { act, fireEvent, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InjectorProviders } from '~/components/InjectorProviders';
import * as useFileCoverageModule from './hooks/useFileCoverage';
import { DevTools } from './index';
import * as resolveRouteModule from './utils/resolveRouteToFile';

describe('components/RoutesConfig/Sidebar/DevTools', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('should render dev tools and copy test command on click with timeout', async () => {
    vi.useFakeTimers();
    const { container, getByText } = render(
      <InjectorProviders>
        <DevTools />
      </InjectorProviders>,
    );

    expect(getByText(/DEV_TOOLS|Dev Tools/i)).toBeInTheDocument();

    const copyBtn = container.querySelector('button[type="button"]');
    expect(copyBtn).toBeInTheDocument();
    if (copyBtn) {
      await act(async () => {
        fireEvent.click(copyBtn);
      });
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        expect.stringContaining('npm test --'),
      );
      // Advance timer for 2000ms reset
      act(() => {
        vi.advanceTimersByTime(2000);
      });
    }
    vi.useRealTimers();
  });

  it('should handle clipboard error gracefully', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.stubGlobal('navigator', {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error('Clipboard error')),
      },
    });

    const { container } = render(
      <InjectorProviders>
        <DevTools />
      </InjectorProviders>,
    );

    const copyBtn = container.querySelector('button[type="button"]');
    if (copyBtn) {
      await act(async () => {
        fireEvent.click(copyBtn);
      });
    }
    expect(errorSpy).toHaveBeenCalled();
  });

  it('should render coverage badge with high coverage (>= 90%)', () => {
    vi.spyOn(useFileCoverageModule, 'useFileCoverage').mockReturnValue({
      coverage: { pct: 95, covered: 95, total: 100 },
      loading: false,
    });

    const { getByText } = render(
      <InjectorProviders>
        <DevTools />
      </InjectorProviders>,
    );

    expect(getByText('Cov: 95%')).toBeInTheDocument();
  });

  it('should render coverage badge with medium coverage (>= 70%)', () => {
    vi.spyOn(useFileCoverageModule, 'useFileCoverage').mockReturnValue({
      coverage: { pct: 75, covered: 75, total: 100 },
      loading: false,
    });

    const { getByText } = render(
      <InjectorProviders>
        <DevTools />
      </InjectorProviders>,
    );

    expect(getByText('Cov: 75%')).toBeInTheDocument();
  });

  it('should render coverage badge with low coverage (< 70%)', () => {
    vi.spyOn(useFileCoverageModule, 'useFileCoverage').mockReturnValue({
      coverage: { pct: 45, covered: 45, total: 100 },
      loading: false,
    });

    const { getByText } = render(
      <InjectorProviders>
        <DevTools />
      </InjectorProviders>,
    );

    expect(getByText('Cov: 45%')).toBeInTheDocument();
  });

  it('should return null when route is not found', () => {
    vi.spyOn(resolveRouteModule, 'resolveRouteToFile').mockReturnValue(null as any);

    const { queryByText } = render(
      <InjectorProviders>
        <DevTools />
      </InjectorProviders>,
    );

    expect(queryByText(/DEV_TOOLS|Dev Tools/i)).not.toBeInTheDocument();
  });
});
