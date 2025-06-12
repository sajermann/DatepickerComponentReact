import {
  TMonthsPickerMulti,
  TMonthsPickerRangeWithHover,
  TMonthsPickerSingle,
} from '../../types';
import { isNumber } from '../isNumber';

type TProps = {
  monthToVerify: number;
  single?: TMonthsPickerSingle;
  multi?: TMonthsPickerMulti;
  range?: TMonthsPickerRangeWithHover;
};

export function onMonthClick({ monthToVerify, single, multi, range }: TProps) {
  if (single) {
    if (monthToVerify === single.selectedMonth && single.toggle) {
      single.onSelectedMonth(null);
      return;
    }
    single.onSelectedMonth(monthToVerify);
  }

  if (multi) {
    const monthSelectedLocated = multi?.selectedMonths.find(
      item => item === monthToVerify,
    );
    if (!isNumber(monthSelectedLocated)) {
      multi?.onSelectedMonths([...multi.selectedMonths, monthToVerify]);
    } else {
      multi?.onSelectedMonths(
        multi.selectedMonths.filter(item => item !== monthSelectedLocated),
      );
    }
  }

  if (range) {
    let finalRangeMonth: { from: number | null; to: number | null } = {
      from: null,
      to: null,
    };

    if (
      typeof range.selectedMonth.from === 'number' &&
      typeof range.selectedMonth.to === 'number'
    ) {
      range.setLastHoveredMonth(null);
      finalRangeMonth = { from: monthToVerify, to: null };
    } else if (
      typeof range.selectedMonth.from === 'number' &&
      monthToVerify < range.selectedMonth.from
    ) {
      finalRangeMonth = { from: monthToVerify, to: range.selectedMonth.from };
    } else if (typeof range.selectedMonth.from !== 'number') {
      finalRangeMonth = { ...range.selectedMonth, from: monthToVerify };
    } else if (
      typeof range.selectedMonth.from === 'number' &&
      typeof range.selectedMonth.to !== 'number'
    ) {
      finalRangeMonth = { ...range.selectedMonth, to: monthToVerify };
    }

    range.onSelectedMonth(finalRangeMonth);
  }
}
