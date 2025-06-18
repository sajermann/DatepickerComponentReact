import { TMonthsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledSameMonth({
  monthToVerify,
  selectedMonthByRange,
}: {
  monthToVerify: number;
  selectedMonthByRange?: TMonthsPickerRange;
}) {
  if (
    !selectedMonthByRange ||
    !selectedMonthByRange?.disabledSameMonth ||
    !isNumber(selectedMonthByRange.selectedMonth.from) ||
    (isNumber(selectedMonthByRange.selectedMonth.from) &&
      isNumber(selectedMonthByRange.selectedMonth.to))
  ) {
    return false;
  }
  return monthToVerify === selectedMonthByRange.selectedMonth.from;
}
