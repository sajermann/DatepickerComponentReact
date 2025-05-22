import { addMonths, startOfYear } from 'date-fns';
import { TDisabled, TMulti, TSelectedRange, TSingle } from '../../types';
import { transformMonths } from '../../utils';

type TProps = {
  firstDateOfCurrentMonthOfView: Date;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};
export function useMonths({
  firstDateOfCurrentMonthOfView,
  selectOnlyVisibleMonth,
  disabled,
  single,
  multi,
  range,
}: TProps) {
  const monthsToTransform = Array.from({ length: 12 }, (_, i) =>
    addMonths(startOfYear(firstDateOfCurrentMonthOfView), i),
  );

  const months = monthsToTransform.map(i =>
    transformMonths({
      dateToVerify: i,
      firstDateOfCurrentMonthOfView,
      disabled,
      single,
      multi,
      range,
      selectOnlyVisibleMonth,
    }),
  );
  return { months };
}
