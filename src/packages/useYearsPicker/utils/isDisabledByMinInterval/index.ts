import { TYearsPickerRange } from '../../types';

export function isDisabledByMinInterval({
  yearToVerify,
  selectedYearByRange,
}: {
  yearToVerify: number;
  selectedYearByRange?: TYearsPickerRange;
}) {
  if (
    !selectedYearByRange?.minInterval ||
    !selectedYearByRange?.selectedYear.from
  ) {
    return false;
  }

  if (
    selectedYearByRange?.selectedYear.from &&
    selectedYearByRange?.selectedYear.to
  ) {
    return false;
  }

  return (
    yearToVerify >
    selectedYearByRange.selectedYear.from + selectedYearByRange.minInterval
  );
}
