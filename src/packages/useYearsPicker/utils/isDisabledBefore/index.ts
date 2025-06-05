import { TDisabled } from '../../types';

export function isDisabledBefore({
  yearToVerify,
  disabled,
}: { yearToVerify: number; disabled?: TDisabled }) {
  return disabled?.before && disabled.before > yearToVerify;
}
