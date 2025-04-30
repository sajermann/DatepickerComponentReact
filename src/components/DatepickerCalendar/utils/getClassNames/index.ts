import { isAfter, isBefore, isSameDay, isSameMonth, isToday } from 'date-fns';
import { TDisabled, TSelectOptions } from '~/Types/TCalendarPick';
import { dateIsInArray } from '../dateIsInArray';

type PropsGetClassNames = {
  date: Date;
  disabled?: TDisabled;
  startDate: Date;
  endDate: Date;
  selectOptions: TSelectOptions;
  semiSelecteds: Date[];
};
export function getClassNames({
  date,
  endDate,
  startDate,
  disabled,
  selectOptions,
  semiSelecteds,
}: PropsGetClassNames) {
  const { single, multi } = selectOptions;
  const classToReturn: string[] = ['border'];
  if (isToday(date)) {
    classToReturn.push('bg-primary-700');
  }
  // Verify Selection By Range is Active
  if (dateIsInArray(date, semiSelecteds)) {
    classToReturn.push('bg-primary-100');
  }

  // Verify if date is selected
  if (
    dateIsInArray(date, multi?.selectedDates) ||
    isSameDay(date, single?.selectedDate as Date)
  ) {
    classToReturn.push('bg-primary-500');
  }
  // Verify if date is disabled
  if (
    (disabled?.dates && dateIsInArray(date, disabled?.dates)) ||
    isBefore(date, disabled?.datesBefore as Date) ||
    isAfter(date, disabled?.datesAfter as Date)
  ) {
    classToReturn.push('isDisabled bg-gray-500');
  }
  if (isSameMonth(date, startDate)) {
    classToReturn.push('currentMonth');
  }
  if (date < startDate) {
    classToReturn.push('prevMonth text-red-500 text-opacity-25');
  }
  if (date > endDate) {
    classToReturn.push('nextMonth');
    classToReturn.push('prevMonth text-red-500 text-opacity-25');
  }

  return classToReturn.join(' ');
}
