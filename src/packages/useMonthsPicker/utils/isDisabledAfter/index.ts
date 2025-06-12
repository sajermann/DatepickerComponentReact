import { TMonthsPickerDisabled } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledAfter({
  monthToVerify,
  disabledAfter,
}: { monthToVerify: number; disabledAfter?: TMonthsPickerDisabled['after'] }) {
  return (
    isNumber(monthToVerify) &&
    isNumber(disabledAfter) &&
    disabledAfter < monthToVerify
  );
}
