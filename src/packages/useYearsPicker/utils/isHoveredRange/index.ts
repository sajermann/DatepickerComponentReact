import { TYearsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

export function isHoveredRange({
  yearToVerify,
  selectedYearByRange,
  lastHoveredYear,
}: {
  yearToVerify: number;
  selectedYearByRange?: TYearsPickerRange['selectedYear'];
  lastHoveredYear?: number | null;
}) {
  if (
    (isNumber(selectedYearByRange?.from) &&
      isNumber(selectedYearByRange?.to)) ||
    !isNumber(lastHoveredYear) ||
    !isNumber(selectedYearByRange?.from)
  ) {
    return false;
  }
  const start = selectedYearByRange.from;
  const end = lastHoveredYear;
  return yearToVerify > start && yearToVerify < end;
}
