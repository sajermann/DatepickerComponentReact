import { isSameDay, isSameMonth } from 'date-fns';
import { TDisabled, TSelectOptions } from '~/Types/TCalendarPick';
import { dateIsInArray } from '../dateIsInArray';

type PropsAllDatesIsSelecteds = {
  dayOfWeek: number;
  weeks: Array<Date[]>;
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
      isSameMonth(item[dayOfWeek], startDate) &&
      !dateIsInArray(item[dayOfWeek], disabled?.dates)
    ) {
      daysToAddOrRemove.push(item[dayOfWeek]);
    }
  }

  const result = daysToAddOrRemove.every(item =>
    multi.selectedDates.some(date => isSameDay(date, item)),
  );

  return result;
}
