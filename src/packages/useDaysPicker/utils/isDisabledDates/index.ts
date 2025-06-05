import { startOfDay } from 'date-fns';
import { TDisabled } from '../../types';

export function isDisabledDates({
  dateToVerify,
  disabled,
}: { dateToVerify: Date; disabled?: TDisabled }) {
  return !!disabled?.dates?.some(
    d => startOfDay(d).getTime() === startOfDay(dateToVerify).getTime(),
  );
}
