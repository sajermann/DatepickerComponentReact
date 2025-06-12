import { TMonthsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

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
      isNumber(selectedMonthByRange?.from) &&
      isNumber(selectedMonthByRange?.to) &&
      monthToVerify > selectedMonthByRange.from &&
      monthToVerify < selectedMonthByRange.to
    )
  );
}
