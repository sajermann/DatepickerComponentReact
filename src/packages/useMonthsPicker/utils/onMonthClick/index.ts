import {
  TMonthsPickerMulti,
  TMonthsPickerRangeWithHover,
  TMonthsPickerSingle,
} from '../../types';

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
    if (!monthSelectedLocated) {
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

    if (range.selectedMonth.from && range.selectedMonth.to) {
      range.setLastHoveredMonth(null);
      finalRangeMonth = { from: monthToVerify, to: null };
    } else if (
      range.selectedMonth.from &&
      monthToVerify < range.selectedMonth.from
    ) {
      finalRangeMonth = { from: monthToVerify, to: range.selectedMonth.from };
    } else if (!range.selectedMonth.from) {
      finalRangeMonth = { ...range.selectedMonth, from: monthToVerify };
    } else if (range.selectedMonth.from && !range.selectedMonth.to) {
      finalRangeMonth = { ...range.selectedMonth, to: monthToVerify };
    } else {
      finalRangeMonth = { from: null, to: null };
    }

    range.onSelectedMonth(finalRangeMonth);
  }
}
