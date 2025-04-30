import { isAfter, isBefore, isSameMonth } from 'date-fns';
import { TDisabled } from '~/Types/TCalendarPick';
import { dateIsInArray } from '../dateIsInArray';

type PropsCanSelectDay = {
  date: Date;
  disabled?: TDisabled;
  startDate: Date;
  skipVerificationSameMonth?: true;
};
export function canSelectDay({
  date,
  disabled,
  startDate,
  skipVerificationSameMonth,
}: PropsCanSelectDay) {
  if (dateIsInArray(date, disabled?.dates)) return false;

  if (!skipVerificationSameMonth && !isSameMonth(date, startDate)) return false;

  if (disabled?.datesBefore && !isBefore(date, disabled?.datesBefore)) {
    return false;
  }

  if (disabled?.datesAfter && !isAfter(date, disabled?.datesAfter)) {
    return false;
  }

  return true;
}
