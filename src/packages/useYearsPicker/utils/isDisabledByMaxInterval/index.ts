import { TYearsPickerRange } from '../../types';

export function isDisabledByMaxInterval({
  yearToVerify,
  selectedYearByRange,
}: {
  yearToVerify: number;
  selectedYearByRange?: TYearsPickerRange;
}) {
  if (
    !selectedYearByRange?.maxInterval ||
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
    selectedYearByRange?.selectedYear.from + selectedYearByRange?.maxInterval
  );
}
