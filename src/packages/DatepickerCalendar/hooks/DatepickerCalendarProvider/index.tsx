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
  onDayClick: (data: TDate) => void;
  onDayHover: (data: TDate) => void;
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

  const rangeWithHover = range ? { ...range, lastHoveredDate } : undefined;

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

  const onDayClick = ({ date }: TDate) => {
    if (single) {
      if (
        single.selectedDate === null ||
        !isSameDay(date, single.selectedDate)
      ) {
        single.onSelectedDate(date);
        return;
      }
      if (isSameDay(date, single.selectedDate) && single.toggle) {
        single.onSelectedDate(null);
      }
    }

    if (multi) {
      const dateSelectedLocated = multi?.selectedDates.find((item) =>
        isSameDay(item, date)
      );
      if (!dateSelectedLocated) {
        multi?.onSelectedDates([...multi.selectedDates, date]);
      } else {
        multi?.onSelectedDates(
          multi.selectedDates.filter(
            (item) => !isSameDay(item, dateSelectedLocated)
          )
        );
      }
    }

    if (range) {
      let finalRangeDate: { from: Date | null; to: Date | null } = {
        from: null,
        to: null,
      };

      if (range.selectedDate.from && range.selectedDate.to) {
        setLastHoveredDate(null);
        finalRangeDate = { from: date, to: null };
      } else if (
        range.selectedDate.from &&
        date.getTime() < range.selectedDate.from.getTime()
      ) {
        finalRangeDate = { from: date, to: range.selectedDate.from };
      } else if (!range.selectedDate.from) {
        finalRangeDate = { ...range.selectedDate, from: date };
      } else if (range.selectedDate.from && !range.selectedDate.to) {
        finalRangeDate = { ...range.selectedDate, to: date };
      } else {
        finalRangeDate = { from: null, to: null };
      }

      range.onSelectedDate(finalRangeDate);
    }
  };

  const onDayHover = ({ date }: TDate) => {
    if (!range?.selectedDate.from || range?.selectedDate.to) {
      return;
    }
    setLastHoveredDate(date);
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
      onDayClick,
      onDayHover,
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
