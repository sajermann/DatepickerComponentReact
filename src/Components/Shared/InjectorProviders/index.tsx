import { BrowserRouter } from 'react-router';
import { BreadcrumbsProvider } from '~/Hooks/UseBreadcrumbs';
import { FontSizeProvider } from '~/Hooks/UseFontSize';
import { Layout } from '../Layout';

import '~/Config/i18n';

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
