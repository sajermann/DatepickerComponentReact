import { TMonthsPickerRange } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledByMaxInterval({
  monthToVerify,
  selectedMonthByRange,
}: {
  monthToVerify: number;
  selectedMonthByRange?: Pick<
    TMonthsPickerRange,
    'maxInterval' | 'selectedMonth'
  >;
}) {
  if (
    !isNumber(selectedMonthByRange?.maxInterval) ||
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
    monthToVerify >
    selectedMonthByRange?.selectedMonth.from + selectedMonthByRange?.maxInterval
  );
}
