import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfWeek,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { TDate, TDisabled, TMulti, TSelectedRange, TSingle } from '../../types';
import { transformDates, transformMonths } from '../../utils';

type TProps = {
  startDate: Date;
  endDate: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  fixedWeeks?: boolean;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  daysInHover: Date[];
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};
export function useWeeks({
  startDate,
  endDate,
  weekStartsOn,
  fixedWeeks,
  selectOnlyVisibleMonth,
  disabled,
  daysInHover,
  single,
  multi,
  range,
}: TProps) {
  const startWeek = startOfWeek(startDate, { weekStartsOn });
  const endWeek = endOfWeek(endDate, { weekStartsOn });
  const days = fixedWeeks
    ? Array.from({ length: 42 }, (_, i) => addDays(startWeek, i))
    : eachDayOfInterval({ start: startWeek, end: endWeek });

  const daysTransformeds = days.map(i =>
    transformDates({
      dateToVerify: i,
      startDate,
      disabled,
      daysInHover,
      single,
      multi,
      range,
      selectOnlyVisibleMonth,
    }),
  );

  const weeks: Array<TDate[]> = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(daysTransformeds.slice(i, i + 7));
  }
  return { weeks };
}
