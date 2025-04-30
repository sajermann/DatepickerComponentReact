export type TDate = {
  date: Date | null;
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
  single?: {
    selectedDate: Date | null;
    onSelectedDate: (data: Date | null) => void;
    toggle?: boolean;
  };
  multi?: {
    selectedDates: Date[];
    onSelectedDates: (data: Date[]) => void;
    enableRangeSelection?: boolean;
    enableHeaderSelection?: boolean;
  };
};

export type TDisabled = {
  dates?: Date[];
  datesBefore?: Date;
  datesAfter?: Date;
};

export type TSelectionByRange = {
  start: Date | null;
  end: Date | null;
};
