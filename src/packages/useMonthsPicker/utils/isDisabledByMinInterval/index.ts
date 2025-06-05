import { TSelectedRange } from '../../types';

export function isDisabledByMinInterval({
  monthToVerify,
  selectedMonthByRange,
}: {
  monthToVerify: number;
  selectedMonthByRange?: TSelectedRange;
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
