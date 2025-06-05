import { addDays, isAfter } from 'date-fns';
import { TSelectedRange } from '../../types';

export function isDisabledByMaxInterval({
  dateToVerify,
  selectedDateByRange,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TSelectedRange;
}) {
  if (
    !selectedDateByRange?.maxInterval ||
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

  return isAfter(
    dateToVerify,
    addDays(
      selectedDateByRange.selectedDate.from,
      selectedDateByRange.maxInterval,
    ),
  );
}
