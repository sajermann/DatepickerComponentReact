import { lazy, useMemo } from 'react';
import { useLocation } from 'react-router';

import {
  _getMenus,
  _sortCustomName,
  _sortCustomOrder,
  getTriRoutes,
} from '~/Hooks/UseRoutesMenu/Utils';
import { useTranslation } from '~/Hooks/UseTranslation';
import { Home } from '~/Pages/Home';
import { TRoutesMenu } from '~/Types/TRoutesMenu';
import { TTriRoutes } from './Types';

const NotFoundPage = lazy(() =>
  import('~/Pages/NotFound').then(({ NotFoundPage: NotFound }) => ({
    default: NotFound,
  })),
);

const DatepickerPage = lazy(() =>
  import('~/Pages/Datepicker').then(({ DatepickerPage: Datepicker }) => ({
    default: Datepicker,
  })),
);

export function useRoutesMenu() {
  const { translate, currentLanguage } = useTranslation();
  const location = useLocation();
  const globalRoutes: TRoutesMenu[] = useMemo(
    (): TRoutesMenu[] =>
      [
        {
          name: 'Home',
          path: '/',
          element: <Home />,
          label: 'Home',
          hideTriRoutes: true,
          order: 0,
        },
        {
          name: 'Datepicker Mega',
          path: '/datepicker-mega',
          description: 'Datepicker Mega',
          element: <DatepickerPage />,
          label: 'Datepicker Mega',
        },
        {
          name: 'Cegundo',
          path: '/datepicker-mega',
          description: 'Cegundo',
          element: <DatepickerPage />,
          label: 'Cegundo',
          order: 2,
        },
        {
          name: 'Primeiro',
          path: '/datepicker-mega',
          description: 'Primeiro',
          element: <DatepickerPage />,
          label: 'Primeiro',
          order: 1,
        },
        {
          name: 'Zero',
          path: '/datepicker-mega',
          description: 'Zero',
          element: <DatepickerPage />,
          label: 'Zero',
          order: 0,
        },
        {
          name: 'NotFound',
          path: '*',
          element: <NotFoundPage />,
          label: translate('NOT_FOUND'),
          hideTriRoutes: true,
          hideMenu: true,
        },
      ]
        .sort(_sortCustomName)
        .sort(_sortCustomOrder),
    [currentLanguage],
  );

  const triRoutes: TTriRoutes = useMemo(
    () => getTriRoutes(globalRoutes, location.pathname),
    [currentLanguage, location.pathname],
  );

  return {
    globalRoutes,
    triRoutes,
    globalMenus: (filterValue: string) => _getMenus(globalRoutes, filterValue),
  };
}
