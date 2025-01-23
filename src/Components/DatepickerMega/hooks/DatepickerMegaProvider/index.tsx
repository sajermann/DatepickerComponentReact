import {
  ReactNode,
  RefObject,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { TDate } from '../../types';

type DatepickerMegaContextType = {
  date: RefObject<TDate>;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  inputDayRef: RefObject<HTMLInputElement | null>;
  inputMonthRef: RefObject<HTMLInputElement | null>;
  inputYearRef: RefObject<HTMLInputElement | null>;
  inputHourRef: RefObject<HTMLInputElement | null>;
  inputMinuteRef: RefObject<HTMLInputElement | null>;
  rootRef: RefObject<HTMLDivElement | null>;
  onChange?: (data: TDate) => void;
  defaultDate?: Date;
  isOpenCalendar: boolean;
  setIsOpenCalendar: (
    value: boolean | ((prevState: boolean) => boolean),
  ) => void;
  isAmPmMode?: boolean;
  setIsAmPmMode: (value: boolean | ((prevState: boolean) => boolean)) => void;
  disabledDates?: Date[];
  disabledWeeks?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
  minDate?: Date;
  maxDate?: Date;
  hasTrigger?: boolean;
  setHasTrigger: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

export const DatepickerMegaContext = createContext(
  {} as DatepickerMegaContextType,
);

type TDatepickerMegaProviderProps = {
  children: ReactNode;
  defaultDate?: Date;
  onChange?: (data: TDate) => void;
  disabledDates?: Date[];
  disabledWeeks?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
  minDate?: Date;
  maxDate?: Date;
};

export function DatepickerMegaProvider({
  children,
  defaultDate,
  onChange,
  disabledDates,
  disabledWeeks,
  minDate,
  maxDate,
}: TDatepickerMegaProviderProps) {
  const [isAmPmMode, setIsAmPmMode] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const [hasTrigger, setHasTrigger] = useState(false);
  const date = useRef<TDate>({
    date: null,
    day: null,
    month: null,
    hour: null,
    minute: null,
    year: null,
    iso: null,
    // clockType: isAmPm ? 'pm' : 'am',
    clockType: 'am',
  });

  const inputDayRef = useRef<HTMLInputElement>(null);
  const inputMonthRef = useRef<HTMLInputElement>(null);
  const inputYearRef = useRef<HTMLInputElement>(null);
  const inputHourRef = useRef<HTMLInputElement>(null);
  const inputMinuteRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const setDate = (value: TDate | ((prevState: TDate) => TDate)) => {
    if (typeof value === 'function') {
      const newState = value(date.current);
      date.current = newState;
    } else {
      date.current = value;
    }
  };

  useEffect(() => {
    setDate(prev => {
      const hourNew =
        isAmPmMode && prev.hour && prev.hour > 12 ? prev.hour - 12 : prev.hour;
      const values: TDate = {
        ...prev,
        hour: hourNew,
        clockType: prev.hour && prev.hour > 12 ? 'pm' : 'am',
      };
      if (inputHourRef.current && hourNew && hourNew > -1) {
        inputHourRef.current.value = hourNew.toString();
      }
      return values;
    });
  }, [isAmPmMode]);

  useEffect(() => {
    if (defaultDate) {
      setDate(prev => ({
        ...prev,
        year: defaultDate.getFullYear() || null,
        month: defaultDate.getMonth() + 1 || null,
        day: defaultDate.getDate() || null,
        date: defaultDate || null,
        iso: defaultDate.toISOString() || null,
      }));
    } else {
      setDate(prev => ({
        ...prev,
        year: null,
        month: null,
        day: null,
        date: null,
        iso: null,
      }));
    }
  }, [defaultDate]);

  const memoizedValue = useMemo<DatepickerMegaContextType>(
    () => ({
      date,
      setDate,
      inputDayRef,
      inputMonthRef,
      inputYearRef,
      inputHourRef,
      inputMinuteRef,
      rootRef,
      onChange,
      defaultDate,
      isOpenCalendar,
      setIsOpenCalendar,
      isAmPmMode,
      setIsAmPmMode,
      disabledDates,
      disabledWeeks,
      minDate,
      maxDate,
      hasTrigger,
      setHasTrigger,
    }),
    [
      date,
      isOpenCalendar,
      isAmPmMode,
      disabledDates,
      disabledWeeks,
      minDate,
      maxDate,
      hasTrigger,
    ],
  );

  return (
    <DatepickerMegaContext.Provider value={memoizedValue}>
      {children}
    </DatepickerMegaContext.Provider>
  );
}
