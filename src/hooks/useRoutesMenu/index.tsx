import { lazy, useMemo } from "react";
import { useLocation } from "react-router";

import {
  _getMenus,
  _sortCustomName,
  _sortCustomOrder,
  getTriRoutes,
} from "~/hooks/useRoutesMenu/utils";
import { useTranslation } from "~/hooks/useTranslation";
import { Home } from "~/pages/Home";
import { TRoutesMenu } from "~/types/TRoutesMenu";
import { TTriRoutes } from "./types";

const DatepickerPage = lazy(() =>
  import("~/pages/DatepickerMega").then(
    ({ DatepickerMegaPage: DatepickerMega }) => ({
      default: DatepickerMega,
    })
  )
);

const DatepickerRDPage = lazy(() =>
  import("~/pages/DatepickerRD").then(({ DatepickerRDPage: DatepickerRD }) => ({
    default: DatepickerRD,
  }))
);

const DatepickerCalendarPage = lazy(() =>
  import("~/pages/DatepickerCalendar").then(
    ({ DatepickerCalendarPage: DatepickerCalendar }) => ({
      default: DatepickerCalendar,
    })
  )
);

const YearPickerPage = lazy(() =>
  import("~/pages/YearPicker").then(({ YearPickerPage: YearPicker }) => ({
    default: YearPicker,
  }))
);

const MonthPickerPage = lazy(() =>
  import("~/pages/MonthPicker").then(({ MonthPickerPage: MonthPicker }) => ({
    default: MonthPicker,
  }))
);

const NotFoundPage = lazy(() =>
  import("~/pages/NotFound").then(({ NotFoundPage: NotFound }) => ({
    default: NotFound,
  }))
);

export function useRoutesMenu() {
  const { translate, currentLanguage } = useTranslation();
  const location = useLocation();
  const globalRoutes: TRoutesMenu[] = useMemo(
    (): TRoutesMenu[] =>
      [
        {
          name: "Home",
          path: "/",
          element: <Home />,
          label: "Home",
          hide: {
            home: true,
            otherComponents: true,
          },
          order: 0,
        },
        {
          name: "Year Picker",
          path: "/year-picker",
          description: "Year Picker",
          element: <YearPickerPage />,
          label: "Year Picker",
        },
        {
          name: "Month Picker",
          path: "/month-picker",
          description: "Month Picker",
          element: <MonthPickerPage />,
          label: "Month Picker",
        },
        {
          name: "Datepicker Mega",
          path: "/datepicker-mega",
          description: "Datepicker Mega",
          element: <DatepickerPage />,
          label: "Datepicker Mega",
          order: 1,
        },
        {
          name: "Datepicker RD",
          path: "/datepicker-rd",
          description: "Datepicker RD",
          element: <DatepickerRDPage />,
          label: "Datepicker RD",
        },
        {
          name: "Datepicker Calendar",
          path: "/datepicker-calendar",
          description: "Datepicker Calendar",
          element: <DatepickerCalendarPage />,
          label: "Datepicker Calendar",
        },
        {
          name: "NotFound",
          path: "*",
          element: <NotFoundPage />,
          label: translate("NOT_FOUND"),
          hide: {
            home: true,
            otherComponents: true,
          },
        },
      ]
        .sort(_sortCustomName)
        .sort(_sortCustomOrder),
    [currentLanguage]
  );

  const triRoutes: TTriRoutes = useMemo(
    () => getTriRoutes(globalRoutes, location.pathname),
    [currentLanguage, location.pathname]
  );

  return {
    globalRoutes,
    triRoutes,
    globalMenus: (filterValue: string) => _getMenus(globalRoutes, filterValue),
  };
}
