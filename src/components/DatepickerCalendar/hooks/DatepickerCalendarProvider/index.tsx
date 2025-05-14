import {
  addDays,
  addMonths,
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
  TMulti,
  TSelectOptions,
  TSelectedRange,
  TSingle,
} from "../../types";
import {
  allDatesIsSelectedsByDayOfWeek,
  dateIsInArray,
  handleToggleHeader,
  transformDate,
} from "../../utils";

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

  const endDateInternal = endOfMonth(startDateInternal);
  const startWeek = startOfWeek(startDateInternal, { weekStartsOn });
  const endWeek = endOfWeek(endDateInternal, { weekStartsOn });
  const days = fixedWeeks
    ? Array.from({ length: 42 }, (_, i) => addDays(startWeek, i))
    : eachDayOfInterval({ start: startWeek, end: endWeek });

  const daysTransformeds = days.map((i) =>
    transformDate({
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

  const startDate = transformDate({
    dateToVerify: startDateInternal,
    startDate: startDateInternal,
    disabled,
    daysInHover,
    single,
    multi,
    range,
    selectOnlyVisibleMonth,
  });

  const endDate = transformDate({
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

  const onDayClick = ({ date, isDisabled }: TDate) => {
    if (isDisabled) {
      return;
    }

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
    ]
  );

  return (
    <DatepickerCalendarContext.Provider value={memoizedValue}>
      {children}
    </DatepickerCalendarContext.Provider>
  );
}
