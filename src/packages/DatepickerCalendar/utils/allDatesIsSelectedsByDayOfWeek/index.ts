import { isSameDay } from 'date-fns';

import { TDate, TMulti } from '../../types';

type PropsAllDatesIsSelecteds = {
  dayOfWeek: number;
  weeks: Array<TDate[]>;
  multi?: TMulti;
};
export function allDatesIsSelectedsByDayOfWeek({
  dayOfWeek,
  weeks,
  multi,
}: PropsAllDatesIsSelecteds) {
  if (!multi || !multi.selectedDates.length) return false;
  const daysToAddOrRemove: Date[] = [];

  for (const item of weeks) {
    if (!item[dayOfWeek].isDisabled) {
      daysToAddOrRemove.push(item[dayOfWeek].date);
    }
  }
  if (!daysToAddOrRemove.length) return false;
  const result = daysToAddOrRemove.every(dayToVerify =>
    multi.selectedDates.some(selectedDate => {
      return isSameDay(selectedDate, dayToVerify);
    }),
  );

  return result;
}
