import { endOfYear, isBefore, startOfDay } from 'date-fns';
import { TDisabled } from '~/packages/DatepickerCalendar';

export function isDisabledBefore({
  dateToVerify,
  disabled,
}: { dateToVerify: Date; disabled?: TDisabled }) {
  return disabled?.before
    ? isBefore(endOfYear(dateToVerify), startOfDay(disabled.before))
    : false;
}
