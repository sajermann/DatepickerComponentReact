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
  });

  const endDate = transformDate({
    dateToVerify: endDateInternal,
    startDate: startDateInternal,
    disabledDate,
    selectedDate: selectDate.single?.selectedDate,
    selectedDates: selectDate.multi?.selectedDates,
    selectOnlyVisibleMonth: selectDate.selectOnlyVisibleMonth,
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
        startDate: startDate.date,
        weeks,
        disabled: disabledDate,
        selectOptions: selectDate,
      }),
      onClick: () =>
        onHeaderClick({
          dayOfWeek,
          startDate: startDate.date,
          weeks,
        }),
    };
  });

  type PropsHandleToggleHeader = {
    dayOfWeek: number;
    weeks: Array<TDate[]>;
    startDate: Date;
  };

  const onHeaderClick = ({
    dayOfWeek,
    weeks,
    startDate,
  }: PropsHandleToggleHeader) => {
    const { multi } = selectDate;
    if (!multi) return;
    const daysToAddOrRemove: Date[] = [];

    for (const item of weeks) {
      // Verify if is same month and if date is not disabled
      if (
        isSameMonth(item[dayOfWeek].date, startDate) &&
        !item[dayOfWeek].isDisabled
      ) {
        daysToAddOrRemove.push(item[dayOfWeek].date);
      }
    }

    console.log({ multi, daysToAddOrRemove });

    const updatedDates = [...multi.selectedDates];
    // Verify if all dates of week is selecteds
    const allSelected = daysToAddOrRemove.every(day =>
      updatedDates.some(date => isSameDay(date, day)),
    );
    if (allSelected) {
      // Is all dates of week is selecteds then remove all
      multi.onSelectedDates(
        updatedDates.filter(item => {
          if (
            item.getDay() === dayOfWeek &&
            item.getMonth() === startDate.getMonth() &&
            item.getFullYear() === startDate.getFullYear()
          ) {
            return false;
          }
          return item;
        }),
      );
      return;
    }
    // Else, add dates not is selecteds
    daysToAddOrRemove.forEach(day => {
      if (!updatedDates.some(date => isSameDay(date, day))) {
        updatedDates.push(day);
      }
    });

    multi.onSelectedDates(updatedDates);
  };

  const onDayClick = ({ date, isDisabled }: TDate) => {
    const { single, multi } = selectDate;
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
