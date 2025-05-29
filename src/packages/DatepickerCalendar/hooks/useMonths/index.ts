import { addMonths, startOfYear } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import {
  TDisabled,
  TMulti,
  TSelectedRange,
  TSingle,
  TViewMode,
} from '../../types';
import { transformMonths } from './utils';

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
export function useMonths({
  firstDateOfCurrentMonthOfView,
  selectOnlyVisibleMonth,
  disabled,
  single,
  multi,
  range,
  setFirstDateOfCurrentMonthOfView,
  setViewMode,
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
      setFirstDateOfCurrentMonthOfView,
      setViewMode,
    }),
  );
  return { months };
}
