import { TMonthsPickerDisabled } from '../../types';

export function isDisabledMonths({
  monthToVerify,
  disabled,
}: { monthToVerify: number; disabled?: TMonthsPickerDisabled }) {
  return !!disabled?.months?.some(y => y === monthToVerify);
}
