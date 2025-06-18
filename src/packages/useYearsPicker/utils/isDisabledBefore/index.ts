import { TYearsPickerDisabled } from '../../types';
import { isNumber } from '../isNumber';

export function isDisabledBefore({
  yearToVerify,
  disabled,
}: { yearToVerify: number; disabled?: TYearsPickerDisabled }) {
  return isNumber(disabled?.before) && disabled.before > yearToVerify;
}
