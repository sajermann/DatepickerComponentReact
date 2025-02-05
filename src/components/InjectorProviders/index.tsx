import { HashRouter } from 'react-router';
import { BreadcrumbsProvider } from '~/hooks/useBreadcrumbs';
import { FontSizeProvider } from '~/hooks/useFontSize';
import { Config } from './Config';

import '~/config/i18n';

export function InjectorProviders({ children }: { children: React.ReactNode }) {
  return (
    <HashRouter>
      <BreadcrumbsProvider>
        <FontSizeProvider>
          <Config />
          {children}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </HashRouter>
  );
}
