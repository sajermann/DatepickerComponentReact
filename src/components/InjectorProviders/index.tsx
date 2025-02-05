import { HashRouter } from 'react-router';
import { BreadcrumbsProvider } from '~/hooks/useBreadcrumbs';
import { FontSizeProvider } from '~/hooks/useFontSize';
import { Config } from './Config';
import '~/config/i18n';
import { Version } from './Version';

export function InjectorProviders({ children }: { children: React.ReactNode }) {
  return (
    <HashRouter>
      <BreadcrumbsProvider>
        <FontSizeProvider>
          <Version />
          <Config />
          {children}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </HashRouter>
  );
}
