import { addDays, eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import {
  TDate,
  TDisabled,
  TMulti,
  TSelectedRange,
  TSelectedRangeWithHover,
  TSingle,
} from '../../types';
import { transformDates } from './utils';

type TProps = {
  firstDateOfCurrentMonthOfView: Date;
  endDate: Date;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  fixedWeeks?: boolean;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
};
export function useWeeks({
  firstDateOfCurrentMonthOfView,
  endDate,
  weekStartsOn,
  fixedWeeks,
  selectOnlyVisibleMonth,
  disabled,
  single,
  multi,
  range,
}: TProps) {
  const startWeek = startOfWeek(firstDateOfCurrentMonthOfView, {
    weekStartsOn,
  });
  const endWeek = endOfWeek(endDate, { weekStartsOn });
  const days = fixedWeeks
    ? Array.from({ length: 42 }, (_, i) => addDays(startWeek, i))
    : eachDayOfInterval({ start: startWeek, end: endWeek });

  const daysTransformeds = days.map(i =>
    transformDates({
      dateToVerify: i,
      firstDateOfCurrentMonthOfView,
      disabled,
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

  console.log({ weeks, days });

  return { weeks };
}
