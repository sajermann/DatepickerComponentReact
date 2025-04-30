import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
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
import { transformDate } from '../../utils';

type DatepickerCalendarContextType = {
  selectDate: TSelectOptions;
  disabledDate?: TDisabled;
  weekStartsOn?: number;
};

export const DatepickerCalendarContext = createContext(
  {} as DatepickerCalendarContextType,
);

type TDatepickerCalendarProviderProps = {
  children: ReactNode;
  selectDate: TSelectOptions;
  disabledDate?: TDisabled;
  weekStartsOn?: number;
  date?: Date | null;
};

export function DatepickerCalendarProvider({
  children,
  selectDate,
  disabledDate,
  weekStartsOn,
  date,
}: TDatepickerCalendarProviderProps) {
  const startDateInternal = startOfMonth(date || new Date());
  const endDateInternal = endOfMonth(startDateInternal);
  const startWeek = startOfWeek(startDateInternal, { weekStartsOn: 0 });
  const endWeek = endOfWeek(endDateInternal, { weekStartsOn: 0 });
  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  const daysTransformeds = days.map(i =>
    transformDate({ date: i, disabledDate }),
  );

  const weeks: Array<TDate[]> = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(daysTransformeds.slice(i, i + 7));
  }

  const memoizedValue = useMemo<DatepickerCalendarContextType>(
    () => ({
      selectDate,
      disabledDate,
      weekStartsOn,
    }),
    [selectDate, disabledDate, weekStartsOn],
  );

  return (
    <DatepickerCalendarContext.Provider value={memoizedValue}>
      {children}
    </DatepickerCalendarContext.Provider>
  );
}
