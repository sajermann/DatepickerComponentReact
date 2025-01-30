import { BrowserRouter } from 'react-router';
import { BreadcrumbsProvider } from '~/hooks/useBreadcrumbs';
import { FontSizeProvider } from '~/hooks/useFontSize';

import '~/config/i18n';
import { useDarkModeZustand } from '~/hooks/useDarkMode';
import { useTranslation } from '~/hooks/useTranslation';
import { Icons } from '../Icons';

export function InjectorProviders({ children }: { children: React.ReactNode }) {
  const { darkMode, toggleDarkMode } = useDarkModeZustand();
  const { currentLanguage, changeLanguage } = useTranslation();
  const isEnLang = currentLanguage === 'en-US';
  return (
    <BrowserRouter>
      <BreadcrumbsProvider>
        <FontSizeProvider>
          <div className="fixed right-4 flex flex-col gap-2">
            <button onClick={toggleDarkMode}>{darkMode ? 'D' : 'L'}</button>
            <button
              onClick={() => {
                const lang = isEnLang ? 'pt-BR' : 'en-US';
                changeLanguage(lang);
              }}
            >
              <div className="w-7">
                {isEnLang ? (
                  <Icons nameIcon="eua" />
                ) : (
                  <Icons nameIcon="brazil" />
                )}
              </div>
            </button>
          </div>
          {/* {noLayout && children}
          {!noLayout && <Layout>{children}</Layout>} */}
          {children}
        </FontSizeProvider>
      </BreadcrumbsProvider>
    </BrowserRouter>
  );
}
