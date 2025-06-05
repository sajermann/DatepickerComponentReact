import { isSameDay } from 'date-fns';
import { TSelectedRange } from '~/packages/DatepickerCalendar';

export function isDisabledSameDate({
  dateToVerify,
  selectedDateByRange,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TSelectedRange;
}) {
  if (
    !selectedDateByRange ||
    !selectedDateByRange?.disabledSameDate ||
    !selectedDateByRange.selectedDate.from ||
    (selectedDateByRange.selectedDate.from &&
      selectedDateByRange.selectedDate.to)
  ) {
    return false;
  }
  return isSameDay(dateToVerify, selectedDateByRange.selectedDate.from);
}
