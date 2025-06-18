import { isAfter, startOfDay } from 'date-fns';
import { TDisabled } from '../../types';

export function isDisabledAfter({
  dateToVerify,
  disabled,
}: { dateToVerify: Date; disabled?: TDisabled }) {
  return disabled?.after
    ? isAfter(startOfDay(dateToVerify), startOfDay(disabled.after))
    : false;
}
