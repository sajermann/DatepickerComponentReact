import { TRange } from '../../types';

export function isHoveredRange({
  monthToVerify,
  selectedMonthByRange,
  lastHoveredMonth,
}: {
  monthToVerify: number;
  selectedMonthByRange?: TRange;
  lastHoveredMonth?: number | null;
}) {
  if (
    (selectedMonthByRange?.from && selectedMonthByRange?.to) ||
    !lastHoveredMonth ||
    !selectedMonthByRange?.from
  ) {
    return false;
  }
  const start = selectedMonthByRange.from;
  const end = lastHoveredMonth;
  return monthToVerify > start && monthToVerify < end;
}
