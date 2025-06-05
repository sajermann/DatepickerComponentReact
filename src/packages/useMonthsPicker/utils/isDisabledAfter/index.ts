import { TDisabled } from '../../types';

export function isDisabledAfter({
  monthToVerify,
  disabled,
}: { monthToVerify: number; disabled?: TDisabled }) {
  return disabled?.after && disabled.after < monthToVerify;
}
