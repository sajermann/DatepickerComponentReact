import { isSameDay } from 'date-fns';

import { TDate, TMulti } from '../../../../../types';

type TProps = {
  dayOfWeek: number;
  weeks: Array<TDate[]>;
  multi?: TMulti;
};

export function onHeaderClick({ dayOfWeek, weeks, multi }: TProps) {
  if (!multi) return;
  const daysToAddOrRemove: Date[] = [];

  for (const item of weeks) {
    // Verify if is same month and if date is not disabled
    if (!item[dayOfWeek].isDisabled) {
      daysToAddOrRemove.push(item[dayOfWeek].date);
    }
  }

  const selectedDates = [...multi.selectedDates];
  // Verify if all dates of week is selecteds
  const allSelected = daysToAddOrRemove.every(day =>
    selectedDates.some(date => isSameDay(date, day)),
  );

  if (allSelected) {
    const result = selectedDates.filter(item => item.getDay() !== dayOfWeek);
    multi.onSelectedDates(result);
    return;
  }
  // Else, add dates not is selecteds
  daysToAddOrRemove.forEach(day => {
    if (!selectedDates.some(date => isSameDay(date, day))) {
      selectedDates.push(day);
    }
  });

  multi.onSelectedDates(selectedDates);
}
