import { TYearsPickerDisabled } from '../../types';

export function isDisabledYears({
  yearToVerify,
  disabled,
}: { yearToVerify: number; disabled?: TYearsPickerDisabled }) {
  return !!disabled?.years?.some(y => y === yearToVerify);
}
