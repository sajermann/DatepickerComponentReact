import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router';
import { useRoutesMenu } from '../UseRoutesMenu';
import { useTranslation } from '../UseTranslation';
import { _getBreadcrumbs } from './Utils';
import { TBreadcrumb, TBreadcrumbsContextType } from './types';

const BreadcrumbsContext = createContext<TBreadcrumbsContextType>(
  {} as TBreadcrumbsContextType,
);

export function useBreadcrumbs() {
  return useContext(BreadcrumbsContext);
}

export function BreadcrumbsProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<TBreadcrumb[]>([]);
  const { currentLanguage } = useTranslation();
  const location = useLocation();
  const { globalRoutes: options } = useRoutesMenu();

  useEffect(() => {
    const results = location.pathname.split('/');
    const final = _getBreadcrumbs(results, options);
    setBreadcrumbs(final);
  }, [location.pathname, currentLanguage]);

  const memoizedValue = useMemo(
    () => ({
      breadcrumbs,
      setBreadcrumbs,
    }),
    [breadcrumbs],
  );

  return (
    <BreadcrumbsContext.Provider value={memoizedValue}>
      {children}
    </BreadcrumbsContext.Provider>
  );
}
