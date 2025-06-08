import { TYearsPickerRange } from '../../types';

export function isDisabledSameYear({
  yearToVerify,
  selectedDateByRange,
}: {
  yearToVerify: number;
  selectedDateByRange?: TYearsPickerRange;
}) {
  if (
    !selectedDateByRange ||
    !selectedDateByRange?.disabledSameYear ||
    !selectedDateByRange.selectedYear.from ||
    (selectedDateByRange.selectedYear.from &&
      selectedDateByRange.selectedYear.to)
  ) {
    return false;
  }
  return yearToVerify === selectedDateByRange.selectedYear.from;
}
