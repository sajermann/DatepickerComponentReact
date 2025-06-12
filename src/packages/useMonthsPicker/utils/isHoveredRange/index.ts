import { TMonthsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

export function isHoveredRange({
  monthToVerify,
  selectedMonthByRange,
  lastHoveredMonth,
}: {
  monthToVerify: number;
  selectedMonthByRange?: TMonthsPickerRange['selectedMonth'];
  lastHoveredMonth?: number | null;
}) {
  if (
    (isNumber(selectedMonthByRange?.from) &&
      isNumber(selectedMonthByRange?.to)) ||
    !isNumber(lastHoveredMonth) ||
    !isNumber(selectedMonthByRange?.from)
  ) {
    return false;
  }
  const start = selectedMonthByRange.from;
  const end = lastHoveredMonth;
  return monthToVerify > start && monthToVerify < end;
}
