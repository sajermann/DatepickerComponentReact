import { addDays, isWithinInterval } from 'date-fns';
import { TSelectedRange } from '~/packages/DatepickerCalendar/types';

export function isDisabledByMinInterval({
  dateToVerify,
  selectedDateByRange,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TSelectedRange;
}) {
  if (
    !selectedDateByRange?.minInterval ||
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

  return isWithinInterval(dateToVerify, {
    start: selectedDateByRange.selectedDate.from,
    end: addDays(
      selectedDateByRange.selectedDate.from,
      selectedDateByRange.minInterval,
    ),
  });
}
