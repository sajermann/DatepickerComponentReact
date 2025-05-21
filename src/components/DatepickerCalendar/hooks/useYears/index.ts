import { addYears, startOfYear } from 'date-fns';
import { TDisabled, TMulti, TSelectedRange, TSingle } from '../../types';
import { transformeYears } from '../../utils';

const YEARS_TO_SHOW = 24;

type TProps = {
  startDate: Date;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  daysInHover: Date[];
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};
export function useYears({
  startDate,
  selectOnlyVisibleMonth,
  disabled,
  daysInHover,
  single,
  multi,
  range,
}: TProps) {
  const yearsToTransform = Array.from({ length: YEARS_TO_SHOW }, (_, i) =>
    addYears(startOfYear(startDate), i),
  );

  const years = yearsToTransform.map(i =>
    transformeYears({
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
  return { years };
}
