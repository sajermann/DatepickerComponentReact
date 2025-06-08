import { TMonthsPickerRange } from '../../types';

export function isDisabledByMinInterval({
  monthToVerify,
  selectedMonthByRange,
}: {
  monthToVerify: number;
  selectedMonthByRange?: TMonthsPickerRange;
}) {
  if (
    !selectedMonthByRange?.minInterval ||
    !selectedMonthByRange?.selectedMonth.from
  ) {
    return false;
  }

  if (
    selectedMonthByRange?.selectedMonth.from &&
    selectedMonthByRange?.selectedMonth.to
  ) {
    return false;
  }

  return (
    monthToVerify >
    selectedMonthByRange.selectedMonth.from + selectedMonthByRange.minInterval
  );
}
