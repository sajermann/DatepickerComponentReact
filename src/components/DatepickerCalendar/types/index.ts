import { ReactNode } from 'react';

export type TDate = {
  date: Date;
  day: number;
  isPrevMonth: boolean;
  isCurrentMonth: boolean;
  isNextMonth: boolean;
  isToday: boolean;
  isSunday: boolean;
  isMonday: boolean;
  isTuesday: boolean;
  isWednesday: boolean;
  isThursday: boolean;
  isFriday: boolean;
  isSaturday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isHoveredRange: boolean;
};

export type TSelectedRange = {
  selectedDate: { from: Date | null; to: Date | null };
  onSelectedDate: (data: { from: Date | null; to: Date | null }) => void;
  disabledAfterFirstDisabledDates?: boolean;
  disabledSameDate?: boolean;
  maxInterval?: number;
  minInterval?: number;
};

export type TDisabled = {
  dates?: Date[];
  before?: Date;
  after?: Date;
};

export type TRange = { from: Date | null; to: Date | null };

export type TSelectionByRange = {
  start: Date | null;
  end: Date | null;
};

export type TBaseProps = {
  children: ReactNode;
  disabled?: TDisabled;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  date?: Date | null;
  fixedWeeks?: boolean;
  selectOnlyVisibleMonth?: boolean;
};

export type TDatepickerCalendarSingleProviderProps = TBaseProps & {
  single: TSingle;
};

export type TDatepickerCalendarMultiProviderProps = TBaseProps & {
  multi: TMulti;
};

export type TDatepickerCalendarRangeProviderProps = TBaseProps & {
  range: TSelectedRange;
};

export type TDatepickerCalendarProviderProps = TBaseProps &
  (
    | { single: TSingle; multi?: never; range?: never }
    | { multi: TMulti; single?: never; range?: never }
    | { range: TSelectedRange; single?: never; multi?: never }
  );

export type TSingle = {
  selectedDate: Date | null;
  onSelectedDate: (data: Date | null) => void;
  toggle?: boolean;
};

export type TMulti = {
  selectedDates: Date[];
  onSelectedDates: (data: Date[]) => void;
  enableHeaderSelection?: boolean;
};

export type TSelectOptions = {
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};
