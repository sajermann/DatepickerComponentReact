import { TSelectedRange } from '../../types';

export function isDisabledByMaxInterval({
  monthToVerify,
  selectedMonthByRange,
}: {
  monthToVerify: number;
  selectedMonthByRange?: TSelectedRange;
}) {
  if (
    !selectedMonthByRange?.maxInterval ||
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
    selectedMonthByRange?.selectedMonth.from + selectedMonthByRange?.maxInterval
  );
}
