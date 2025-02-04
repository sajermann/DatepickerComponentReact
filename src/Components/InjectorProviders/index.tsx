import { HashRouter } from 'react-router';
import { BreadcrumbsProvider } from '~/hooks/useBreadcrumbs';
import { FontSizeProvider } from '~/hooks/useFontSize';
import { SwitchLanguage } from './SwitchLanguage';
import { SwitchTheme } from './SwitchTheme';

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
          <div className="fixed top-2 right-2 flex flex-col gap-2 z-10 border p-4 rounded shadow-lg shadow-black/25 dark:shadow-white/25 backdrop-blur-md">
            <SwitchTheme />
            <SwitchLanguage />
          </div>
          {children}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </HashRouter>
  );
}
