import { TYearsPickerDisabled, TYearsPickerRange } from '../../types';

export function isDisabledCancelOnDisabledDate({
  yearToVerify,
  disabled,
  selectedYearByRange,
  disabledAfterFirstDisabledYears,
}: {
  yearToVerify: number;
  disabled?: TYearsPickerDisabled;
  selectedYearByRange?: TYearsPickerRange['selectedYear'];
  disabledAfterFirstDisabledYears?: boolean;
}) {
  if (!selectedYearByRange || !selectedYearByRange.from) {
    return false;
  }

  if (
    selectedYearByRange.from &&
    !selectedYearByRange.to &&
    yearToVerify < selectedYearByRange.from
  ) {
    return true;
  }

  const sortabledYears = disabled?.years?.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }

    return 0;
  });

  const disabledDatesAfterDateToVerify =
    sortabledYears?.filter(
      item => selectedYearByRange?.from && item > selectedYearByRange.from,
    ) || [];

  if (
    selectedYearByRange.from &&
    !selectedYearByRange.to &&
    disabledAfterFirstDisabledYears &&
    sortabledYears &&
    sortabledYears.length &&
    disabledDatesAfterDateToVerify[0] > selectedYearByRange.from &&
    yearToVerify > disabledDatesAfterDateToVerify[0]
  ) {
    return true;
  }

  return false;
}
