import { TMonthsPickerRange } from '../../types';

export function isSelectedRange({
  monthToVerify,
  selectedMonthByRange,
}: {
  monthToVerify: number;
  selectedMonthByRange?: TMonthsPickerRange['selectedMonth'];
}) {
  return (
    monthToVerify === selectedMonthByRange?.from ||
    monthToVerify === selectedMonthByRange?.to ||
    !!(
      selectedMonthByRange?.from &&
      selectedMonthByRange?.to &&
      monthToVerify > selectedMonthByRange.from &&
      monthToVerify < selectedMonthByRange.to
    )
  );
}
