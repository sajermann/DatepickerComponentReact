import { TYearsPickerDisabled } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledAfter({
  yearToVerify,
  disabled,
}: { yearToVerify: number; disabled?: TYearsPickerDisabled }) {
  return isNumber(disabled?.after) && disabled.after < yearToVerify;
}
