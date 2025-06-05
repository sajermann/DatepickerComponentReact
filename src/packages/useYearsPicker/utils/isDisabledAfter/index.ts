import { TDisabled } from '../../types';

export function isDisabledAfter({
  yearToVerify,
  disabled,
}: { yearToVerify: number; disabled?: TDisabled }) {
  return disabled?.after && disabled.after < yearToVerify;
}
