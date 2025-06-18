import { TYearsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledByMinInterval({
  yearToVerify,
  selectedYearByRange,
}: {
  yearToVerify: number;
  selectedYearByRange?: TYearsPickerRange;
}) {
  if (
    !isNumber(selectedYearByRange?.minInterval) ||
    !isNumber(selectedYearByRange?.selectedYear.from)
  ) {
    return false;
  }

  if (
    isNumber(selectedYearByRange?.selectedYear.from) &&
    isNumber(selectedYearByRange?.selectedYear.to)
  ) {
    return false;
  }

  return (
    yearToVerify <
    selectedYearByRange.selectedYear.from + selectedYearByRange.minInterval
  );
}
