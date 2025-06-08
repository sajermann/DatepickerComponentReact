import { TYearsPickerDisabled } from '../../types';

export function isDisabledAfter({
  yearToVerify,
  disabled,
}: { yearToVerify: number; disabled?: TYearsPickerDisabled }) {
  return (
    disabled?.after !== undefined &&
    disabled?.after !== null &&
    disabled.after < yearToVerify
  );
}
