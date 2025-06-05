import { TDisabled } from '../../types';

export function isDisabledBefore({
  monthToVerify,
  disabled,
}: { monthToVerify: number; disabled?: TDisabled }) {
  return disabled?.before && disabled.before > monthToVerify;
}
