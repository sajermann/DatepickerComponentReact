import { TYearsPickerDisabled } from '../../types';

export function isDisabledBefore({
  yearToVerify,
  disabled,
}: { yearToVerify: number; disabled?: TYearsPickerDisabled }) {
  return (
    disabled?.before !== undefined &&
    disabled?.before !== null &&
    disabled.before > yearToVerify
  );
}
