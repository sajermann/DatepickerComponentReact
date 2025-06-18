import { TWeek } from '~/packages/DayPicker';

export type TPlaygroundParams = {
  weekStartsOn?: TWeek;
  selectOnlyVisibleMonth?: boolean;
  disabledDates?: Date[];
  date?: Date | null;
  fixedWeeks?: boolean;
  single?: {
    selectedDate: Date | null;
    toggle?: boolean;
  };
  multi?: {
    selectedDates: Date[];
    enableHeaderSelection?: boolean;
  };
  range?: {
    selectedDate: { from: Date | null; to: Date | null };
    disabledAfterFirstDisabledDates?: boolean;
    disabledSameDate?: boolean;
    maxInterval?: number;
    minInterval?: number;
  };
  disabledAfter?: Date;
  disabledBefore?: Date;
  disabledWeeks: TWeek[];
};
