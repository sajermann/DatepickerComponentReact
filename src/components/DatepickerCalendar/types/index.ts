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
};

export type TSelectOptions = {
  selectOnlyVisibleMonth?: boolean;
  single?: {
    selectedDate: Date | null;
    onSelectedDate: (data: Date | null) => void;
    toggle?: boolean;
  };
  multi?: {
    selectedDates: Date[];
    onSelectedDates: (data: Date[]) => void;
    enableHeaderSelection?: boolean;
  };
  range?: {
    selectedDate: { from: Date | null; to: Date | null };
    onSelectedDate: (data: { from: Date | null; to: Date | null }) => void;
    cancelOnDisabledDate?: boolean;
  };
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

export type TDatepickerCalendarProviderProps = {
  children: ReactNode;
  selectDate: TSelectOptions;
  disabledDate?: TDisabled;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  date?: Date | null;
  fixedWeeks?: boolean;
};
