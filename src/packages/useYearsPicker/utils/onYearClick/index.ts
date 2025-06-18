import {
  TYearsPickerMulti,
  TYearsPickerRangeWithHover,
  TYearsPickerSingle,
} from '../../types';
import { isNumber } from '../isNumber';

type TProps = {
  yearToVerify: number;
  single?: TYearsPickerSingle;
  multi?: TYearsPickerMulti;
  range?: TYearsPickerRangeWithHover;
};

export function onYearClick({ yearToVerify, single, multi, range }: TProps) {
  if (single) {
    if (yearToVerify === single.selectedYear && single.toggle) {
      single.onSelectedYear(null);
      return;
    }

    single.onSelectedYear(yearToVerify);
  }

  if (multi) {
    const yearSelectedLocated = multi?.selectedYears.find(
      item => item === yearToVerify,
    );
    if (!isNumber(yearSelectedLocated)) {
      multi?.onSelectedYears([...multi.selectedYears, yearToVerify]);
    } else {
      multi?.onSelectedYears(
        multi.selectedYears.filter(item => item !== yearSelectedLocated),
      );
    }
  }

  if (range) {
    let finalRangeYear: { from: number | null; to: number | null } = {
      from: null,
      to: null,
    };

    if (isNumber(range.selectedYear.from) && isNumber(range.selectedYear.to)) {
      range.setLastHoveredYear(null);
      finalRangeYear = { from: yearToVerify, to: null };
    } else if (
      isNumber(range.selectedYear.from) &&
      yearToVerify < range.selectedYear.from
    ) {
      finalRangeYear = { from: yearToVerify, to: range.selectedYear.from };
    } else if (!isNumber(range.selectedYear.from)) {
      finalRangeYear = { ...range.selectedYear, from: yearToVerify };
    } else if (
      isNumber(range.selectedYear.from) &&
      !isNumber(range.selectedYear.to)
    ) {
      finalRangeYear = { ...range.selectedYear, to: yearToVerify };
    } else {
      finalRangeYear = { from: null, to: null };
    }

    range.onSelectedYear(finalRangeYear);
  }
}
