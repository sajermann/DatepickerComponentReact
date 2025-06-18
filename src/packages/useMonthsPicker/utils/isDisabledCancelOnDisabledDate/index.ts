import { TMonthsPickerDisabled, TMonthsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledCancelOnDisabledDate({
  monthToVerify,
  disabled,
  selectedMonthByRange,
  disabledAfterFirstDisabledMonths,
}: {
  monthToVerify: number;
  disabled?: TMonthsPickerDisabled;
  selectedMonthByRange?: TMonthsPickerRange['selectedMonth'];
  disabledAfterFirstDisabledMonths?: boolean;
}) {
  if (!selectedMonthByRange || !isNumber(selectedMonthByRange.from)) {
    return false;
  }

  if (
    isNumber(selectedMonthByRange.from) &&
    !isNumber(selectedMonthByRange.to) &&
    monthToVerify < selectedMonthByRange.from
  ) {
    return true;
  }

  const sortabledMonths = disabled?.months?.sort((a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }

    return 0;
  });

  const disabledDatesAfterDateToVerify =
    sortabledMonths?.filter(
      item =>
        isNumber(selectedMonthByRange?.from) &&
        item > selectedMonthByRange.from,
    ) || [];

  if (
    isNumber(selectedMonthByRange.from) &&
    !isNumber(selectedMonthByRange.to) &&
    disabledAfterFirstDisabledMonths &&
    sortabledMonths &&
    sortabledMonths.length &&
    disabledDatesAfterDateToVerify[0] > selectedMonthByRange.from &&
    monthToVerify > disabledDatesAfterDateToVerify[0]
  ) {
    return true;
  }

  return false;
}
