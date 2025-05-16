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
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
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
import { date } from "zod";
import { delay } from "~/utils/delay";
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
  dateIsInArray,
  handleToggleHeader,
  transformDates,
  transformeYears,
} from "../../utils";
import { transformMonths } from "../../utils/transformeMonths";

type DatepickerCalendarContextType = {
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
  disabled?: TDisabled;
  weekStartsOn?: number;
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
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
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
  const [startDateInternal, setStartDateInternal] = useState(
    startOfMonth(date || new Date())
  );
  const [daysInHover, setDaysInHover] = useState<Date[]>([]);
  const [viewMode, setViewMode] = useState<TViewMode>("days");

  const endDateInternal = endOfMonth(startDateInternal);
  const startWeek = startOfWeek(startDateInternal, { weekStartsOn });
  const endWeek = endOfWeek(endDateInternal, { weekStartsOn });
  const days = fixedWeeks
    ? Array.from({ length: 42 }, (_, i) => addDays(startWeek, i))
    : eachDayOfInterval({ start: startWeek, end: endWeek });

  const daysTransformeds = days.map((i) =>
    transformDates({
      dateToVerify: i,
      startDate: startDateInternal,
      disabled,
      daysInHover,
      single,
      multi,
      range,
      selectOnlyVisibleMonth,
    })
  );

  const weeks: Array<TDate[]> = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(daysTransformeds.slice(i, i + 7));
  }

  const months = Array.from({ length: 12 }, (_, i) =>
    addMonths(startOfYear(startDateInternal), i)
  );

  const monthsTransformeds = months.map((i) =>
    transformMonths({
      dateToVerify: i,
      startDate: startDateInternal,
      disabled,
      daysInHover,
      single,
      multi,
      range,
      selectOnlyVisibleMonth,
    })
  );

  const years = Array.from({ length: 12 }, (_, i) =>
    addYears(startOfYear(startDateInternal), i)
  );

  const yearsTransformeds = years.map((i) =>
    transformeYears({
      dateToVerify: i,
      startDate: startDateInternal,
      disabled,
      daysInHover,
      single,
      multi,
      range,
      selectOnlyVisibleMonth,
    })
  );

  console.log({ years });

  const startDate = transformDates({
    dateToVerify: startDateInternal,
    startDate: startDateInternal,
    disabled,
    daysInHover,
    single,
    multi,
    range,
    selectOnlyVisibleMonth,
  });

  const endDate = transformDates({
    dateToVerify: endDateInternal,
    startDate: startDateInternal,
    disabled,
    daysInHover,
    single,
    multi,
    range,
    selectOnlyVisibleMonth,
  });

  const handlePrevMonth = () => {
    setStartDateInternal(addMonths(startDate.date, -1));
  };

  const handleNextMonth = () => {
    setStartDateInternal(addMonths(startDate.date, 1));
  };

  const handlePrevYear = () => {
    setStartDateInternal(addYears(startDate.date, -1));
  };
  const handleNextYear = () => {
    setStartDateInternal(addYears(startDate.date, 1));
  };

  const handlePrevGroupYears = () => {
    setStartDateInternal(addYears(startDate.date, -12));
  };
  const handleNextGroupYears = () => {
    setStartDateInternal(addYears(startDate.date, 12));
  };

  const onClickArrow = (type: "next" | "prev") => {
    const config = {
      days: {
        prev: handlePrevMonth,
        next: handleNextMonth,
      },
      months: {
        prev: handlePrevYear,
        next: handleNextYear,
      },
      years: {
        prev: handlePrevGroupYears,
        next: handleNextGroupYears,
      },
    };
    config[viewMode][type]();
  };

  const onMonthClick = (month: number) => {
    setStartDateInternal((prev) => {
      const newDate = new Date(prev.getTime());
      newDate.setMonth(month);
      return newDate;
    });
    setViewMode("days");
  };

  const onYearClick = (year: number) => {
    setStartDateInternal((prev) => {
      const newDate = new Date(prev.getTime());
      newDate.setFullYear(year);
      return newDate;
    });
    setViewMode("months");
  };

  const headers = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(startOfWeek(new Date(), { weekStartsOn }), index);
    const dayName = format(day, "EEEE");
    const dayOfWeek = (index + (weekStartsOn ?? 0)) % 7;
    return {
      text: dayName.slice(0, 3).toUpperCase(),
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

  const disabledPrevMonth = useMemo(
    () => !!(disabled?.before && isBefore(startDateInternal, disabled.before)),
    [disabled?.before, startDateInternal]
  );

  const disabledNextMonth = useMemo(
    () => !!(disabled?.after && isAfter(endDateInternal, disabled.after)),
    [disabled?.after, endDateInternal]
  );

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
      handlePrevMonth,
      handleNextMonth,
      headers,
      onDayClick,
      onDayHover,
      disabledNextMonth,
      disabledPrevMonth,
      selectOnlyVisibleMonth,
      viewMode,
      onToggleViewMode,
      months: monthsTransformeds,
      onMonthClick,
      onClickArrow,
      years: yearsTransformeds,
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
      monthsTransformeds,
      years,
    ]
  );

  return (
    <DatepickerCalendarContext.Provider value={memoizedValue}>
      {children}
    </DatepickerCalendarContext.Provider>
  );
}
