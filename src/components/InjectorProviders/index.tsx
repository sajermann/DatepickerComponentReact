import { HashRouter } from 'react-router';
import { BreadcrumbsProvider } from '~/hooks/useBreadcrumbs';
import { FontSizeProvider } from '~/hooks/useFontSize';
import { Config } from './Config';

const BASENAME =
  import.meta.env.VITE_MODE === 'production'
    ? import.meta.env.VITE_URL_BASENAME
    : undefined;

import '~/config/i18n';

export function InjectorProviders({ children }: { children: React.ReactNode }) {
  return (
    <HashRouter basename={BASENAME}>
      <BreadcrumbsProvider>
        <FontSizeProvider>
          <Config />
          {children}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </HashRouter>
  );
}
