import { addMonths, startOfYear } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
import {
  TDisabled,
  TMonth,
  TMulti,
  TSelectedRange,
  TSingle,
  TViewMode,
} from '../../../types';
import { transformMonths } from './utils';

type TProps = {
  firstDateOfCurrentMonthOfView: Date;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
  onMonthClick?: (data: Omit<TMonth, 'onClick'>) => void;
};
export function useMonths({
  firstDateOfCurrentMonthOfView,
  disabled,
  single,
  multi,
  range,
  onMonthClick,
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
      onMonthClick,
    }),
  );
  return { months };
}
