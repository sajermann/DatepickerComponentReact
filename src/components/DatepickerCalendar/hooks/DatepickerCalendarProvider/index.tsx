import {
  addDays,
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  setDefaultOptions,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  ReactNode,
  RefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  TMonth,
  TMulti,
  TSelectOptions,
  TSelectedRange,
  TSingle,
  TViewMode,
  TYear,
} from "../../types";
import {
  allDatesIsSelectedsByDayOfWeek,
  capitalize,
  dateIsInArray,
  handleToggleHeader,
  transformDates,
  transformeYears,
} from "../../utils";
import { transformMonths } from "../../utils/transformeMonths";
import { useDatePicker } from "../useDatepicker";

type DatepickerCalendarContextType = {
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
  disabled?: TDisabled;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  startDate: TDate;
  endDate: TDate;
  weeks: TDate[][];
  selectOnlyVisibleMonth?: boolean;
  headers: {
    text: string;
    isSelectedAllDays: boolean;
    onClick: () => void;
  }[];
  disabledPrevMonth: boolean;
  disabledNextMonth: boolean;
  onDayClick: (data: TDate) => void;
  onDayHover: (data: TDate) => void;
  viewMode: TViewMode;
  onToggleViewMode: () => void;
  months: TMonth[];
  onMonthClick: (month: number) => void;
  onClickArrow: (type: "next" | "prev") => void;
  years: TYear[];
  onYearClick: (year: number) => void;
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
  const single = "single" in props ? props.single : undefined;
  const multi = "multi" in props ? props.multi : undefined;
  const range = "range" in props ? props.range : undefined;

  const [daysInHover, setDaysInHover] = useState<Date[]>([]);
  const [viewMode, setViewMode] = useState<TViewMode>("days");

  const {
    weeks,
    months,
    years,
    startDate,
    endDate,
    handlePrevMonthOfView,
    handleNextMonthOfView,
    handlePrevYearOfView,
    handleNextYearOfView,
    handlePrevGroupYearsOfView,
    handleNextGroupYearsOfView,
    setMonthOfView,
    setYearOfView,
    disabledPrevMonth,
    disabledNextMonth,
  } = useDatePicker({
    date,
    daysInHover,
    disabled,
    fixedWeeks,
    single,
    multi,
    range,
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

  const headers = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(startOfWeek(new Date(), { weekStartsOn }), index);
    const dayName = capitalize(format(day, "EEEE").slice(0, 3));
    const dayOfWeek = (index + (weekStartsOn ?? 0)) % 7;
    return {
      text: dayName,
      isSelectedAllDays: allDatesIsSelectedsByDayOfWeek({
        dayOfWeek,
        weeks,
        multi,
      }),
      onClick: () =>
        onHeaderClick({
          dayOfWeek,
          weeks,
        }),
    };
  });

  const onHeaderClick = ({
    dayOfWeek,
    weeks,
  }: {
    dayOfWeek: number;
    weeks: Array<TDate[]>;
  }) => {
    if (!multi) return;
    const daysToAddOrRemove: Date[] = [];

    for (const item of weeks) {
      // Verify if is same month and if date is not disabled
      if (!item[dayOfWeek].isDisabled) {
        daysToAddOrRemove.push(item[dayOfWeek].date);
      }
    }

    const selectedDates = [...multi.selectedDates];
    // Verify if all dates of week is selecteds
    const allSelected = daysToAddOrRemove.every((day) =>
      selectedDates.some((date) => isSameDay(date, day))
    );

    if (allSelected) {
      const result = selectedDates.filter(
        (item) => item.getDay() !== dayOfWeek
      );
      multi.onSelectedDates(result);
      return;
    }
    // Else, add dates not is selecteds
    daysToAddOrRemove.forEach((day) => {
      if (!selectedDates.some((date) => isSameDay(date, day))) {
        selectedDates.push(day);
      }
    });

    multi.onSelectedDates(selectedDates);
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
        setDaysInHover([]);
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

      // if (finalRangeDate.from && finalRangeDate.to) {
      //   const t = eachDayOfInterval({
      //     start: finalRangeDate.from,
      //     end: finalRangeDate.to,
      //   });
      //   const result = disabledDate?.dates?.some((item) =>
      //     t.find((tt) => tt.getTime() === startOfDay(item).getTime())
      //   );
      //   console.log({ result, t, b: disabledDate?.dates });
      // }

      range.onSelectedDate(finalRangeDate);
    }
  };

  const onDayHover = ({ date }: TDate) => {
    if (!range?.selectedDate.from || range?.selectedDate.to) {
      return;
    }

    const daysInHoverInternal = eachDayOfInterval({
      start: date < range.selectedDate.from ? date : range.selectedDate.from,
      end: date < range.selectedDate.from ? range.selectedDate.from : date,
    });

    setDaysInHover(daysInHoverInternal);
  };

  const handleKeyDown = useCallback(
    async (event: KeyboardEvent) => {
      if (event.key === "Escape" && range?.selectedDate.from) {
        setDaysInHover([]);
        await delay(1);
        range.onSelectedDate({ from: null, to: null });
      }
    },
    [range, daysInHover]
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
  }, [range, daysInHover]);

  const memoizedValue = useMemo<DatepickerCalendarContextType>(
    () => ({
      single,
      multi,
      range,
      disabled,
      weekStartsOn,
      startDate,
      endDate,
      weeks,
      headers,
      onDayClick,
      onDayHover,
      disabledNextMonth,
      disabledPrevMonth,
      selectOnlyVisibleMonth,
      viewMode,
      onToggleViewMode,
      months,
      onMonthClick,
      onClickArrow,
      years,
      onYearClick,
    }),
    [
      single,
      multi,
      range,
      disabled,
      weekStartsOn,
      startDate,
      endDate,
      weeks,
      headers,
      disabledNextMonth,
      disabledPrevMonth,
      selectOnlyVisibleMonth,
      viewMode,
      months,
      years,
    ]
  );

  return (
    <DatepickerCalendarContext.Provider value={memoizedValue}>
      {children}
    </DatepickerCalendarContext.Provider>
  );
}
