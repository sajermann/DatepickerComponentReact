import { isSameDay, isSameMonth } from 'date-fns';

import { TDate, TDisabled, TSelectOptions } from '../../types';
import { dateIsInArray } from '../dateIsInArray';

type PropsAllDatesIsSelecteds = {
  dayOfWeek: number;
  weeks: Array<TDate[]>;
  startDate: Date;
  disabled?: TDisabled;
  selectOptions: TSelectOptions;
};
export function allDatesIsSelectedsByDayOfWeek({
  dayOfWeek,
  weeks,
  startDate,
  disabled,
  selectOptions,
}: PropsAllDatesIsSelecteds) {
  const { multi } = selectOptions;
  if (!multi) return false;
  const daysToAddOrRemove: Date[] = [];

  for (const item of weeks) {
    // Verify if is same month and if date is not disabled
    if (
      isSameMonth(item[dayOfWeek].date, startDate) &&
      !dateIsInArray(item[dayOfWeek].date, disabled?.dates)
    ) {
      daysToAddOrRemove.push(item[dayOfWeek].date);
    }
  }

  const result = daysToAddOrRemove.every(item =>
    multi.selectedDates.some(date => isSameDay(date, item)),
  );

  return result;
}
