import { TRange } from '../../types';

export function isHoveredRange({
  yearToVerify,
  selectedYearByRange,
  lastHoveredYear,
}: {
  yearToVerify: number;
  selectedYearByRange?: TRange;
  lastHoveredYear?: number | null;
}) {
  if (
    (selectedYearByRange?.from && selectedYearByRange?.to) ||
    !lastHoveredYear ||
    !selectedYearByRange?.from
  ) {
    return false;
  }
  const start = selectedYearByRange.from;
  const end = lastHoveredYear;
  return yearToVerify > start && yearToVerify < end;
}
