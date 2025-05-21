import { addMonths, startOfYear } from 'date-fns';
import { TDisabled, TMulti, TSelectedRange, TSingle } from '../../types';
import { transformMonths } from '../../utils';

type TProps = {
  startDate: Date;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  daysInHover: Date[];
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};
export function useMonths({
  startDate,
  selectOnlyVisibleMonth,
  disabled,
  daysInHover,
  single,
  multi,
  range,
}: TProps) {
  const monthsToTransform = Array.from({ length: 12 }, (_, i) =>
    addMonths(startOfYear(startDate), i),
  );

  const months = monthsToTransform.map(i =>
    transformMonths({
      dateToVerify: i,
      startDate,
      disabled,
      daysInHover,
      single,
      multi,
      range,
      selectOnlyVisibleMonth,
    }),
  );
  return { months };
}
