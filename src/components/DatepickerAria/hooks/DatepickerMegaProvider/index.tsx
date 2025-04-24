import {
  CalendarDate,
  createCalendar,
  getLocalTimeZone,
  getWeeksInMonth,
  parseDate,
  today,
} from '@internationalized/date';

import {
  DOMAttributes,
  ReactNode,
  RefObject,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDateField, useDateSegment, useLocale } from 'react-aria';
import {
  DateFieldState,
  DateSegment,
  TimeFieldState,
  useDateFieldState,
  useTimeFieldState,
} from 'react-stately';

type DatepickerMegaContextType = {
  stateDate: DateFieldState;
  stateTime: DateFieldState;
  labelProps: DOMAttributes<any>;
  fieldProps: any;
  segmentDay: DateSegment;
  segmentMonth: DateSegment;
  segmentYear: DateSegment;
  segmentHour: DateSegment;
  segmentMinute: DateSegment;
  segmentDayPeriod: DateSegment;
  inputDayRef: RefObject<HTMLDivElement | null>;
  inputMonthRef: RefObject<HTMLDivElement | null>;
  inputYearRef: RefObject<HTMLDivElement | null>;
  inputHourRef: RefObject<HTMLDivElement | null>;
  inputMinuteRef: RefObject<HTMLDivElement | null>;
  inputDayPeriodRef: RefObject<HTMLDivElement | null>;
  rootRef: RefObject<HTMLDivElement | null>;
};

function dateToCalendarDate(date?: Date | null) {
  if (!date) return date;
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1, // CalendarDate espera mês de 1 a 12
    date.getDate(),
  );
}

export const DatepickerMegaContext = createContext(
  {} as DatepickerMegaContextType,
);

type TDatepickerMegaProviderProps = {
  children: ReactNode;
  defaultValue?: Date | null;
  value?: Date | null;
  onChange?: (data?: Date | null) => void;
};

export function DatepickerMegaProvider({
  children,
  defaultValue,
  value,
  onChange,
}: TDatepickerMegaProviderProps) {
  const { locale } = useLocale();

  const rootRef = useRef<HTMLDivElement>(null);
  const inputDayRef = useRef<HTMLDivElement>(null);
  const inputMonthRef = useRef<HTMLDivElement>(null);
  const inputYearRef = useRef<HTMLDivElement>(null);
  const inputHourRef = useRef<HTMLDivElement>(null);
  const inputMinuteRef = useRef<HTMLDivElement>(null);
  const inputDayPeriodRef = useRef<HTMLDivElement>(null);

  const stateDate = useDateFieldState({
    defaultValue: dateToCalendarDate(defaultValue),
    // value: today(getLocalTimeZone()),
    value: dateToCalendarDate(value),
    locale,
    createCalendar,
    onChange: e => onChange?.(e?.toDate(getLocalTimeZone())),
  });
  const stateTime = useTimeFieldState({
    locale,
  });

  const { labelProps, fieldProps } = useDateField({}, stateDate, rootRef);

  const segmentDay = stateDate.segments.find(
    item => item.type === 'day',
  ) as DateSegment;
  const segmentMonth = stateDate.segments.find(
    item => item.type === 'month',
  ) as DateSegment;
  const segmentYear = stateDate.segments.find(
    item => item.type === 'year',
  ) as DateSegment;

  const segmentHour = stateTime.segments.find(
    item => item.type === 'hour',
  ) as DateSegment;
  const segmentMinute = stateTime.segments.find(
    item => item.type === 'minute',
  ) as DateSegment;
  const segmentDayPeriod = stateTime.segments.find(
    item => item.type === 'dayPeriod',
  ) as DateSegment;

  const memoizedValue = useMemo<DatepickerMegaContextType>(
    () => ({
      stateDate,
      stateTime,
      labelProps,
      fieldProps,
      segmentDay,
      segmentMonth,
      segmentYear,
      segmentHour,
      segmentMinute,
      segmentDayPeriod,
      rootRef,
      inputDayRef,
      inputMonthRef,
      inputYearRef,
      inputHourRef,
      inputMinuteRef,
      inputDayPeriodRef,
    }),
    [
      stateDate,
      stateTime,
      labelProps,
      fieldProps,
      segmentDay,
      segmentMonth,
      segmentYear,
      segmentHour,
      segmentMinute,
      segmentDayPeriod,
    ],
  );

  return (
    <DatepickerMegaContext.Provider value={memoizedValue}>
      {children}
    </DatepickerMegaContext.Provider>
  );
}
