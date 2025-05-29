import { isBefore, startOfDay } from 'date-fns';
import { TDisabled } from '~/packages/DatepickerCalendar';

export function isDisabledBefore({
  dateToVerify,
  disabled,
}: { dateToVerify: Date; disabled?: TDisabled }) {
  return disabled?.before
    ? isBefore(startOfDay(dateToVerify), startOfDay(disabled.before))
    : false;
}
