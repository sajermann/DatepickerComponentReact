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
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import {
  ReactNode,
  RefObject,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { date } from 'zod';
import {
  TDate,
  TDatepickerCalendarProviderProps,
  TDisabled,
  TSelectOptions,
} from '../../types';
import {
  allDatesIsSelectedsByDayOfWeek,
  dateIsInArray,
  handleToggleHeader,
  transformDate,
} from '../../utils';

type DatepickerCalendarContextType = {
  selectDate: TSelectOptions;
  disabledDate?: TDisabled;
  weekStartsOn?: number;
  startDate: TDate;
  endDate: TDate;
  weeks: TDate[][];
  headers: {
    text: string;
    isSelectedAllDays: boolean;
    onClick: () => void;
  }[];
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  onDayClick: (data: TDate) => void;
};

export const DatepickerCalendarContext = createContext(
  {} as DatepickerCalendarContextType,
);

export function DatepickerCalendarProvider({
  children,
  selectDate,
  disabledDate,
  weekStartsOn,
  date,
  fixedWeeks = true,
}: TDatepickerCalendarProviderProps) {
  const [startDateInternal, setStartDateInternal] = useState(
    startOfMonth(date || new Date()),
  );
  const endDateInternal = endOfMonth(startDateInternal);
  const startWeek = startOfWeek(startDateInternal, { weekStartsOn });
  const endWeek = endOfWeek(endDateInternal, { weekStartsOn });
  const days = fixedWeeks
    ? Array.from({ length: 42 }, (_, i) => addDays(startWeek, i))
    : eachDayOfInterval({ start: startWeek, end: endWeek });

  const daysTransformeds = days.map(i =>
    transformDate({
      dateToVerify: i,
      startDate: startDateInternal,
      disabledDate,
      selectedDate: selectDate.single?.selectedDate,
      selectedDates: selectDate.multi?.selectedDates,
      selectOnlyVisibleMonth: selectDate.selectOnlyVisibleMonth,
      selectedDateByRange: selectDate.range?.selectedDate,
    }),
  );

  const weeks: Array<TDate[]> = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(daysTransformeds.slice(i, i + 7));
  }

  const startDate = transformDate({
    dateToVerify: startDateInternal,
    startDate: startDateInternal,
    disabledDate,
    selectedDate: selectDate.single?.selectedDate,
    selectedDates: selectDate.multi?.selectedDates,
    selectOnlyVisibleMonth: selectDate.selectOnlyVisibleMonth,
    selectedDateByRange: selectDate.range?.selectedDate,
  });

  const endDate = transformDate({
    dateToVerify: endDateInternal,
    startDate: startDateInternal,
    disabledDate,
    selectedDate: selectDate.single?.selectedDate,
    selectedDates: selectDate.multi?.selectedDates,
    selectOnlyVisibleMonth: selectDate.selectOnlyVisibleMonth,
    selectedDateByRange: selectDate.range?.selectedDate,
  });

  const handlePrevMonth = () => {
    setStartDateInternal(addMonths(startDate.date, -1));
  };

  const handleNextMonth = () => {
    setStartDateInternal(addMonths(startDate.date, 1));
  };

  const headers = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(startOfWeek(new Date(), { weekStartsOn }), index);
    const dayName = format(day, 'EEEE');
    const dayOfWeek = (index + (weekStartsOn ?? 0)) % 7;
    return {
      text: dayName.slice(0, 3).toUpperCase(),
      isSelectedAllDays: allDatesIsSelectedsByDayOfWeek({
        dayOfWeek,
        weeks,
        selectOptions: selectDate,
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
    const { multi } = selectDate;
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
    const allSelected = daysToAddOrRemove.every(day =>
      selectedDates.some(date => isSameDay(date, day)),
    );

    if (allSelected) {
      const result = selectedDates.filter(item => item.getDay() !== dayOfWeek);
      multi.onSelectedDates(result);
      return;
    }
    // Else, add dates not is selecteds
    daysToAddOrRemove.forEach(day => {
      if (!selectedDates.some(date => isSameDay(date, day))) {
        selectedDates.push(day);
      }
    });

    multi.onSelectedDates(selectedDates);
  };

  const onDayClick = ({ date, isDisabled }: TDate) => {
    const { single, multi, range } = selectDate;
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
      const dateSelectedLocated = multi?.selectedDates.find(item =>
        isSameDay(item, date),
      );
      if (!dateSelectedLocated) {
        multi?.onSelectedDates([...multi.selectedDates, date]);
      } else {
        multi?.onSelectedDates(
          multi.selectedDates.filter(
            item => !isSameDay(item, dateSelectedLocated),
          ),
        );
      }
    }

    if (range) {
      let t: { from: Date | null; to: Date | null } = { from: null, to: null };

      if (range.selectedDate.from && range.selectedDate.to) {
        t = { from: date, to: null };
      } else if (
        range.selectedDate.from &&
        date.getTime() < range.selectedDate.from.getTime()
      ) {
        t = { from: date, to: range.selectedDate.from };
      } else if (!range.selectedDate.from) {
        t = { ...range.selectedDate, from: date };
      } else if (range.selectedDate.from && !range.selectedDate.to) {
        t = { ...range.selectedDate, to: date };
      } else {
        t = { from: null, to: null };
      }
      // handleSelectByRange({
      //   onSemiSelectedsChange,
      //   selectOptions,
      //   targetDateStart: t.start,
      //   targetDateEnd: t.end,
      //   startDate,
      //   disabled,
      // });
      console.log({ t });
      range.onSelectedDate(t);
    }
  };

  const memoizedValue = useMemo<DatepickerCalendarContextType>(
    () => ({
      selectDate,
      disabledDate,
      weekStartsOn,
      startDate,
      endDate,
      weeks,
      handlePrevMonth,
      handleNextMonth,
      headers,
      onDayClick,
    }),
    [
      selectDate,
      disabledDate,
      weekStartsOn,
      startDate,
      endDate,
      weeks,
      headers,
    ],
  );

  return (
    <DatepickerCalendarContext.Provider value={memoizedValue}>
      {children}
    </DatepickerCalendarContext.Provider>
  );
}
