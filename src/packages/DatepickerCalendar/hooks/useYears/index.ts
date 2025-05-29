import { add, eachYearOfInterval, startOfYear, subYears } from 'date-fns';
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

const ITEMS_BEFORE_DEFAULT = YEARS_TO_SHOW / 2;
const ITEMS_AFTER_DEFAULT = YEARS_TO_SHOW / 2 - 1;

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
  const yearsBefore = eachYearOfInterval({
    start: subYears(
      startOfYear(firstDateOfCurrentMonthOfView),
      ITEMS_BEFORE_DEFAULT,
    ),
    end: subYears(startOfYear(firstDateOfCurrentMonthOfView), 1),
  });
  const yearsAfter = eachYearOfInterval({
    start: startOfYear(firstDateOfCurrentMonthOfView),
    end: add(startOfYear(firstDateOfCurrentMonthOfView), {
      years: ITEMS_AFTER_DEFAULT,
    }),
  });
  const years = [...yearsBefore, ...yearsAfter].map(i =>
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
