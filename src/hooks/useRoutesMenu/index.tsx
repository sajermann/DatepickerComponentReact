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

const DatePickerPage = lazy(() =>
  import("~/pages/DatePickerMega").then(
    ({ DatePickerMegaPage: DatePickerMega }) => ({
      default: DatePickerMega,
    })
  )
);

const DatePickerRDPage = lazy(() =>
  import("~/pages/DatePickerRD").then(({ DatePickerRDPage: DatePickerRD }) => ({
    default: DatePickerRD,
  }))
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

const DayPickerPage = lazy(() =>
  import("~/pages/DayPicker").then(({ DayPickerPage: DayPicker }) => ({
    default: DayPicker,
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
          name: "Day Picker",
          path: "/day-picker",
          description: "Day Picker",
          element: <DayPickerPage />,
          label: "Day Picker",
        },
        {
          name: "Datepicker Mega",
          path: "/datepicker-mega",
          description: "Datepicker Mega",
          element: <DatePickerPage />,
          label: "Datepicker Mega",
          order: 1,
        },
        {
          name: "Datepicker RD",
          path: "/datepicker-rd",
          description: "Datepicker RD",
          element: <DatePickerRDPage />,
          label: "Datepicker RD",
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
