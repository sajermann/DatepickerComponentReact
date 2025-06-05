import { TUseYearsPickerProps } from '../types';
import { transformeYears } from '../utils';

const YEARS_TO_SHOW = 24;

export function useYearsPicker({
  year,
  disabled,
  single,
  multi,
  range,
  yearToShow = YEARS_TO_SHOW,
}: TUseYearsPickerProps) {
  const ITEMS_BEFORE_DEFAULT = yearToShow / 2;
  const ITEMS_AFTER_DEFAULT = yearToShow / 2 - 1;
  const yearFixed = year || new Date().getFullYear();
  const yearsBefore: number[] = [];
  for (let item = ITEMS_BEFORE_DEFAULT; item > 0; item -= 1) {
    yearsBefore.push(yearFixed - item);
  }
  const yearsAfter: number[] = [];
  for (let item = 0; item <= ITEMS_AFTER_DEFAULT; item += 1) {
    yearsBefore.push(yearFixed + item);
  }

  const years = [...yearsBefore, ...yearsAfter].map(i =>
    transformeYears({
      yearToVerify: i,
      disabled,
      single,
      multi,
      range,
    }),
  );
  return { years };
}
