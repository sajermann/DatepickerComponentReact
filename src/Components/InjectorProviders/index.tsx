import { BrowserRouter } from 'react-router';
import { BreadcrumbsProvider } from '~/hooks/useBreadcrumbs';
import { FontSizeProvider } from '~/hooks/useFontSize';
import { SwitchLanguage } from './SwitchLanguage';
import { SwitchTheme } from './SwitchTheme';

import '~/config/i18n';

export function InjectorProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <BreadcrumbsProvider>
        <FontSizeProvider>
          <div className="fixed top-4 right-4 flex flex-col gap-2 z-10">
            <SwitchTheme />
            <SwitchLanguage />
          </div>
          {/* {noLayout && children}
          {!noLayout && <Layout>{children}</Layout>} */}
          {children}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </BrowserRouter>
  );
}
