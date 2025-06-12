import { addDays } from 'date-fns';
import { TSelectedRange } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledByMaxInterval({
  dateToVerify,
  selectedDateByRange,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TSelectedRange;
}) {
  if (
    !isNumber(selectedDateByRange?.maxInterval) ||
    !selectedDateByRange?.selectedDate.from
  ) {
    return false;
  }

  if (
    selectedDateByRange?.selectedDate.from &&
    selectedDateByRange?.selectedDate.to
  ) {
    return false;
  }

  return (
    dateToVerify.getTime() >
    addDays(
      selectedDateByRange.selectedDate.from,
      selectedDateByRange.maxInterval,
    ).getTime()
  );
}
