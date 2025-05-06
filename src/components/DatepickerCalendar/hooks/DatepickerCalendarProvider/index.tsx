import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
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
import { TDate, TDisabled, TSelectOptions } from '../../types';
import {
  allDatesIsSelectedsByDayOfWeek,
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
};

export const DatepickerCalendarContext = createContext(
  {} as DatepickerCalendarContextType,
);

type TDatepickerCalendarProviderProps = {
  children: ReactNode;
  selectDate: TSelectOptions;
  disabledDate?: TDisabled;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  date?: Date | null;
};

export function DatepickerCalendarProvider({
  children,
  selectDate,
  disabledDate,
  weekStartsOn,
  date,
}: TDatepickerCalendarProviderProps) {
  const [startDateInternal, setStartDateInternal] = useState(
    startOfMonth(date || new Date()),
  );
  const endDateInternal = endOfMonth(startDateInternal);
  const startWeek = startOfWeek(startDateInternal, {
    weekStartsOn,
  });
  const endWeek = endOfWeek(endDateInternal, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  const daysTransformeds = days.map(i =>
    transformDate({ date: i, disabledDate }),
  );

  const weeks: Array<TDate[]> = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(daysTransformeds.slice(i, i + 7));
  }

  const startDate = transformDate({ date: startDateInternal, disabledDate });
  const endDate = transformDate({ date: endDateInternal, disabledDate });

  const handlePrevMonth = () => {
    setStartDateInternal(addMonths(startDate.date, -1));
  };

  const handleNextMonth = () => {
    setStartDateInternal(addMonths(startDate.date, 1));
  };

  const headers = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(startOfWeek(new Date()), index);
    const dayName = format(day, 'EEEE');
    return {
      text: dayName.slice(0, 3).toUpperCase(),
      isSelectedAllDays: allDatesIsSelectedsByDayOfWeek({
        dayOfWeek: index,
        startDate: startDate.date,
        weeks,
        disabled: disabledDate,
        selectOptions: selectDate,
      }),
      onClick: () =>
        handleToggleHeader({
          dayOfWeek: index,
          startDate: startDate.date,
          weeks,
          disabled: disabledDate,
          selectOptions: selectDate,
        }),
    };
  });

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
