export type * from '~/packages/useMonthsPicker';
export type * from '~/packages/useYearsPicker';

export type TUseDatePickerProps = {
  date?: Date | null;
  weekStartsOn?: TWeek;
  fixedWeeks?: boolean;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
};

export type TDisabled = {
  dates?: Date[];
  before?: Date;
  after?: Date;
  weeeks?: TWeek[];
};

export type TWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

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

export type TViewMode = 'days' | 'months' | 'years';

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
