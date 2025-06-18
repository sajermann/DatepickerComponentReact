import { TYearsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledSameYear({
  yearToVerify,
  selectedYearByRange,
}: {
  yearToVerify: number;
  selectedYearByRange?: TYearsPickerRange;
}) {
  if (
    !selectedYearByRange ||
    !selectedYearByRange?.disabledSameYear ||
    !isNumber(selectedYearByRange.selectedYear.from) ||
    (isNumber(selectedYearByRange.selectedYear.from) &&
      isNumber(selectedYearByRange.selectedYear.to))
  ) {
    return false;
  }
  return yearToVerify === selectedYearByRange.selectedYear.from;
}
