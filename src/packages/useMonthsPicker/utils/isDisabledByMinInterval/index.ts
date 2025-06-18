import { TMonthsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledByMinInterval({
  monthToVerify,
  selectedMonthByRange,
}: {
  monthToVerify: number;
  selectedMonthByRange?: TMonthsPickerRange;
}) {
  if (
    !isNumber(selectedMonthByRange?.minInterval) ||
    !isNumber(selectedMonthByRange?.selectedMonth.from)
  ) {
    return false;
  }

  if (
    isNumber(selectedMonthByRange?.selectedMonth.from) &&
    isNumber(selectedMonthByRange?.selectedMonth.to)
  ) {
    return false;
  }

  return (
    monthToVerify <
    selectedMonthByRange.selectedMonth.from + selectedMonthByRange.minInterval
  );
}
