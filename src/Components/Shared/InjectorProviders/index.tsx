import { BrowserRouter } from 'react-router';
import { BreadcrumbsProvider } from '~/hooks/useBreadcrumbs';
import { FontSizeProvider } from '~/hooks/useFontSize';
import { Layout } from '../Layout';

import '~/config/i18n';

export function InjectorProviders({
  children,
  noLayout,
}: {
  children: React.ReactNode;
  noLayout?: true;
}) {
  return (
    <BrowserRouter>
      <BreadcrumbsProvider>
        <FontSizeProvider>
          {noLayout && children}
          {!noLayout && <Layout>{children}</Layout>}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </BrowserRouter>
  );
}
