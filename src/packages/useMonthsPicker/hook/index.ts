import { TUseMonthsPickerProps } from '../types';
import { transformMonths } from '../utils';

export function useMonthsPicker({
  disabled,
  single,
  multi,
  range,
}: TUseMonthsPickerProps) {
  const monthsToTransform = Array.from({ length: 12 }, (_, i) => i);
  const months = monthsToTransform.map(i =>
    transformMonths({
      monthToVerify: i,
      disabled,
      single,
      multi,
      range,
    }),
  );
  return { months };
}
