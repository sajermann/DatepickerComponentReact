import { TDisabled } from '../../types';

export function isDisabledYears({
  yearToVerify,
  disabled,
}: { yearToVerify: number; disabled?: TDisabled }) {
  return !!disabled?.years?.some(y => y === yearToVerify);
}
