import { TMonthsPickerRange } from '../../types';

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
    !selectedMonthByRange.selectedMonth.from ||
    (selectedMonthByRange.selectedMonth.from &&
      selectedMonthByRange.selectedMonth.to)
  ) {
    return false;
  }
  return monthToVerify === selectedMonthByRange.selectedMonth.from;
}
