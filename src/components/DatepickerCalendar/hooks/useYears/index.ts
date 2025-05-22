import { addYears, startOfYear } from 'date-fns';
import { TDisabled, TMulti, TSelectedRange, TSingle } from '../../types';
import { transformeYears } from '../../utils';

const YEARS_TO_SHOW = 24;

type TProps = {
  firstDateOfCurrentMonthOfView: Date;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  daysInHover: Date[];
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};
export function useYears({
  firstDateOfCurrentMonthOfView,
  selectOnlyVisibleMonth,
  disabled,
  daysInHover,
  single,
  multi,
  range,
}: TProps) {
  const yearsToTransform = Array.from({ length: YEARS_TO_SHOW }, (_, i) =>
    addYears(startOfYear(firstDateOfCurrentMonthOfView), i),
  );

  const years = yearsToTransform.map(i =>
    transformeYears({
      dateToVerify: i,
      firstDateOfCurrentMonthOfView,
      disabled,
      daysInHover,
      single,
      multi,
      range,
      selectOnlyVisibleMonth,
    }),
  );
  return { years };
}
