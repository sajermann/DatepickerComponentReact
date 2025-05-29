import { addYears, startOfYear } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import {
  TDisabled,
  TMulti,
  TSelectedRange,
  TSingle,
  TViewMode,
} from '../../types';
import { transformeYears } from './utils';

const YEARS_TO_SHOW = 24;

type TProps = {
  firstDateOfCurrentMonthOfView: Date;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
  setFirstDateOfCurrentMonthOfView: Dispatch<SetStateAction<Date>>;
  setViewMode: Dispatch<SetStateAction<TViewMode>>;
};
export function useYears({
  firstDateOfCurrentMonthOfView,
  selectOnlyVisibleMonth,
  disabled,
  single,
  multi,
  range,
  setFirstDateOfCurrentMonthOfView,
  setViewMode,
}: TProps) {
  const yearsToTransform = Array.from({ length: YEARS_TO_SHOW }, (_, i) =>
    addYears(startOfYear(firstDateOfCurrentMonthOfView), i),
  );

  const years = yearsToTransform.map(i =>
    transformeYears({
      dateToVerify: i,
      firstDateOfCurrentMonthOfView,
      disabled,
      single,
      multi,
      range,
      selectOnlyVisibleMonth,
      setFirstDateOfCurrentMonthOfView,
      setViewMode,
    }),
  );
  return { years };
}
