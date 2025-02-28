import { lazy, useMemo } from 'react';
import { useLocation } from 'react-router';

import {
  _getMenus,
  _sortCustomName,
  _sortCustomOrder,
  getTriRoutes,
} from '~/hooks/useRoutesMenu/utils';
import { useTranslation } from '~/hooks/useTranslation';
import { Home } from '~/pages/Home';
import { TRoutesMenu } from '~/types/TRoutesMenu';
import { TTriRoutes } from './types';

const DatepickerPage = lazy(() =>
  import('~/pages/Datepicker').then(({ DatepickerPage: Datepicker }) => ({
    default: Datepicker,
  })),
);

const DatepickerAriaPage = lazy(() =>
  import('~/pages/DatepickerAria').then(
    ({ DatepickerAriaPage: DatepickerAria }) => ({
      default: DatepickerAria,
    }),
  ),
);

const NotFoundPage = lazy(() =>
  import('~/pages/NotFound').then(({ NotFoundPage: NotFound }) => ({
    default: NotFound,
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
          hide: {
            home: true,
            otherComponents: true,
          },
          order: 0,
        },
        {
          name: 'Datepicker Mega',
          path: '/datepicker-mega',
          description: 'Datepicker Mega',
          element: <DatepickerPage />,
          label: 'Datepicker Mega',
        },
        // {
        //   name: 'Datepicker Aria',
        //   path: '/datepicker-aria',
        //   description: 'Datepicker Aria',
        //   element: <DatepickerAriaPage />,
        //   label: 'Datepicker Aria',
        // },
        {
          name: 'NotFound',
          path: '*',
          element: <NotFoundPage />,
          label: translate('NOT_FOUND'),
          hide: {
            home: true,
            otherComponents: true,
          },
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
