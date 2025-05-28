import {
  addDays,
  eachDayOfInterval,
  format,
  isSameDay,
  setDefaultOptions,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "~/hooks/useTranslation";
import { delay } from "~/utils/delay";
import en from "../../i18n/en.json";
import ptBr from "../../i18n/pt-br.json";
import {
  TDate,
  TDatepickerCalendarProviderProps,
  TDisabled,
  THeaders,
  TMonth,
  TMulti,
  TSelectedRange,
  TSingle,
  TViewMode,
  TWeek,
  TYear,
} from "../../types";
import { allDatesIsSelectedsByDayOfWeek, capitalize } from "../../utils";
import { useDatePicker } from "../useDatepicker";

type DatepickerCalendarContextType = {
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
  disabled?: TDisabled;
  weekStartsOn?: TWeek;
  weeks: TDate[][];
  selectOnlyVisibleMonth?: boolean;
  headers: THeaders[];
  disabledPrev: boolean;
  disabledNext: boolean;
  viewMode: TViewMode;
  onToggleViewMode: () => void;
  months: TMonth[];
  onMonthClick: (month: number) => void;
  onClickArrow: (type: "next" | "prev") => void;
  years: TYear[];
  onYearClick: (year: number) => void;
  firstDateOfCurrentMonthOfView: Date;
};

export const DatepickerCalendarContext = createContext(
  {} as DatepickerCalendarContextType
);

export function DatepickerCalendarProvider(
  props: TDatepickerCalendarProviderProps
) {
  const { currentLanguage } = useTranslation([
    { lng: "en", resources: en },
    { lng: "pt-BR", resources: ptBr },
  ]);
  setDefaultOptions({
    locale: currentLanguage === "pt-BR" ? ptBR : undefined,
  });
  const {
    children,
    disabled,
    weekStartsOn,
    date,
    selectOnlyVisibleMonth,
    fixedWeeks = true,
  } = props;
  const [lastHoveredDate, setLastHoveredDate] = useState<Date | null>(null);

  const single = "single" in props ? props.single : undefined;
  const multi = "multi" in props ? props.multi : undefined;
  const range = "range" in props ? props.range : undefined;

  const rangeWithHover = range
    ? { ...range, lastHoveredDate, setLastHoveredDate }
    : undefined;

  const {
    weeks,
    months,
    years,
    handlePrevMonthOfView,
    handleNextMonthOfView,
    handlePrevYearOfView,
    handleNextYearOfView,
    handlePrevGroupYearsOfView,
    handleNextGroupYearsOfView,
    setMonthOfView,
    setYearOfView,
    disabledPrev,
    disabledNext,
    firstDateOfCurrentMonthOfView,
    headers,
    viewMode,
    setViewMode,
  } = useDatePicker({
    date,
    disabled,
    fixedWeeks,
    single,
    multi,
    range: rangeWithHover,
    selectOnlyVisibleMonth,
    weekStartsOn,
  });

  const onClickArrow = (type: "next" | "prev") => {
    const config = {
      days: {
        prev: handlePrevMonthOfView,
        next: handleNextMonthOfView,
      },
      months: {
        prev: handlePrevYearOfView,
        next: handleNextYearOfView,
      },
      years: {
        prev: handlePrevGroupYearsOfView,
        next: handleNextGroupYearsOfView,
      },
    };
    config[viewMode][type]();
  };

  const onMonthClick = (month: number) => {
    setMonthOfView(month);
    setViewMode("days");
  };

  const onYearClick = (year: number) => {
    setYearOfView(year);
    setViewMode("months");
  };

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        range?.selectedDate.from &&
        !range?.selectedDate.to
      ) {
        setLastHoveredDate(null);
        await delay(1);
        range.onSelectedDate({ from: null, to: null });
      }
    },
    [range, lastHoveredDate]
  );

  const onToggleViewMode = () => {
    setViewMode((prev) => {
      if (prev === "days") {
        return "months";
      }
      if (prev === "months") {
        return "years";
      }

      return "days";
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [range, lastHoveredDate]);

  const memoizedValue = useMemo<DatepickerCalendarContextType>(
    () => ({
      single,
      multi,
      range,
      disabled,
      weekStartsOn,
      weeks,
      headers,
      disabledNext,
      disabledPrev,
      selectOnlyVisibleMonth,
      viewMode,
      onToggleViewMode,
      months,
      onMonthClick,
      onClickArrow,
      years,
      onYearClick,
      firstDateOfCurrentMonthOfView,
    }),
    [
      single,
      multi,
      range,
      disabled,
      weekStartsOn,
      weeks,
      headers,
      disabledNext,
      disabledPrev,
      selectOnlyVisibleMonth,
      viewMode,
      months,
      years,
      firstDateOfCurrentMonthOfView,
    ]
  );

  return (
    <DatepickerCalendarContext.Provider value={memoizedValue}>
      {children}
    </DatepickerCalendarContext.Provider>
  );
}
