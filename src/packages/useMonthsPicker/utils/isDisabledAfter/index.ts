import { TMonthsPickerDisabled } from '../../types';

export function isDisabledAfter({
  monthToVerify,
  disabledAfter,
}: { monthToVerify: number; disabledAfter?: TMonthsPickerDisabled['after'] }) {
  return (
    disabledAfter !== undefined &&
    disabledAfter !== null &&
    disabledAfter < monthToVerify
  );
}
