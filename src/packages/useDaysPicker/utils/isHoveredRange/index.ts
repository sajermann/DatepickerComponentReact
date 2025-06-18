import { isWithinInterval } from 'date-fns';
import { TRange } from '../../types';

export function isHoveredRange({
  dateToVerify,
  selectedDateByRange,
  lastHoveredDate,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TRange;
  lastHoveredDate?: Date | null;
}) {
  if (
    (selectedDateByRange?.from && selectedDateByRange?.to) ||
    !lastHoveredDate ||
    !selectedDateByRange?.from
  ) {
    return false;
  }
  const start = selectedDateByRange.from;
  const end = lastHoveredDate;
  return isWithinInterval(dateToVerify, { start, end });
}
