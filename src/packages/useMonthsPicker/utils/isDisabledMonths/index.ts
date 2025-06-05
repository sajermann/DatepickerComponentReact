import { TDisabled } from '../../types';

export function isDisabledMonths({
  monthToVerify,
  disabled,
}: { monthToVerify: number; disabled?: TDisabled }) {
  return !!disabled?.months?.some(y => y === monthToVerify);
}
