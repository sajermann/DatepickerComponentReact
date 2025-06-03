import {
  add,
  eachYearOfInterval,
  startOfYear as startOfYearFNS,
  subYears,
} from 'date-fns';
import {
  TDisabled,
  TMulti,
  TSelectedRange,
  TSelectedRangeWithHover,
  TSingle,
  TYear,
} from '../types';
import { transformeYears } from './utils';

const YEARS_TO_SHOW = 24;

type TProps = {
  date?: Date | null;
  yearToShow?: number;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
  onYearClick?: (data: Omit<TYear, 'onClick'>) => void;
};
export function useYearsPicker({
  date,
  disabled,
  single,
  multi,
  range,
  onYearClick,
  yearToShow = YEARS_TO_SHOW,
}: TProps) {
  const ITEMS_BEFORE_DEFAULT = yearToShow / 2;
  const ITEMS_AFTER_DEFAULT = yearToShow / 2 - 1;

  const startOfYear = startOfYearFNS(date || new Date());
  const yearsBefore = eachYearOfInterval({
    start: subYears(startOfYear, ITEMS_BEFORE_DEFAULT),
    end: subYears(startOfYear, 1),
  });
  const yearsAfter = eachYearOfInterval({
    start: startOfYear,
    end: add(startOfYear, {
      years: ITEMS_AFTER_DEFAULT,
    }),
  });
  const years = [...yearsBefore, ...yearsAfter].map(i =>
    transformeYears({
      dateToVerify: i,
      startOfYear,
      disabled,
      single,
      multi,
      range,
      // onYearClick,
    }),
  );
  return { years };
}
