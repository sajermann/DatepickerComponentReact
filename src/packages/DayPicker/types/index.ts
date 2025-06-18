import { ReactNode } from 'react';

export type TDate = {
  date: Date;
  day: number;
  month: number;
  year: number;
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
  onClick: () => void;
  onMouseEnter: () => void;
  text: string;
};

export type TMonth = {
  date: Date;
  month: number;
  year: number;
  isJanuary: boolean;
  isFebruary: boolean;
  isMarch: boolean;
  isApril: boolean;
  isMay: boolean;
  isJune: boolean;
  isJuly: boolean;
  isAugust: boolean;
  isSeptember: boolean;
  isOctober: boolean;
  isNovember: boolean;
  isDecember: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isToday: boolean;
  isMonthOfView: boolean;
  text: string;
  onClick: () => void;
};

export type TYear = {
  date: Date;
  year: number;
  isSelected: boolean;
  isDisabled: boolean;
  isToday: boolean;
  text: string;
  isYearOfView: boolean;
  onClick: () => void;
};

export type TSelectedRange = {
  selectedDate: { from: Date | null; to: Date | null };
  onSelectedDate: (data: { from: Date | null; to: Date | null }) => void;
  disabledAfterFirstDisabledDates?: boolean;
  disabledSameDate?: boolean;
  maxInterval?: number;
  minInterval?: number;
};

export type TSelectedRangeWithHover = TSelectedRange & {
  lastHoveredDate: Date | null;
  setLastHoveredDate: (date: Date | null) => void;
};

export type TDisabled = {
  dates?: Date[];
  before?: Date;
  after?: Date;
  weeeks?: TWeek[];
};

export type TRange = { from: Date | null; to: Date | null };

export type TSelectionByRange = {
  start: Date | null;
  end: Date | null;
};

export type TWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type TBaseProps = {
  children?: ReactNode;
  disabled?: TDisabled;
  weekStartsOn?: TWeek;
  date?: Date | null;
  fixedWeeks?: boolean;
  selectOnlyVisibleMonth?: boolean;
};

export type TDayPickerSingleProviderProps = TBaseProps & {
  single: TSingle;
};

export type TDayPickerMultiProviderProps = TBaseProps & {
  multi: TMulti;
};

export type TDayPickerRangeProviderProps = TBaseProps & {
  range: TSelectedRange;
};

export type TDayPickerProviderProps = TBaseProps &
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

export type TViewMode = 'days' | 'months' | 'years';

export type THeaders = {
  text: string;
  isSelectedAllDays: boolean;
  onClick: () => void;
  isDisabled: boolean;
};
