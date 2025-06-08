import { TMonthsPickerDisabled } from '../../types';

export function isDisabledBefore({
  monthToVerify,
  disabledBefore,
}: {
  monthToVerify: number;
  disabledBefore?: TMonthsPickerDisabled['before'];
}) {
  return (
    disabledBefore !== undefined &&
    disabledBefore !== null &&
    disabledBefore > monthToVerify
  );
}
