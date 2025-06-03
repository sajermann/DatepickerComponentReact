import { format, isSameMonth } from 'date-fns';
import {
  isDisabledAfter,
  isDisabledBefore,
  isDisabledByMaxInterval,
  isDisabledByMinInterval,
  isDisabledCancelOnDisabledDate,
  isDisabledDates,
  isDisabledSameDate,
  isDisabledVisibleMonth,
  isSelectedMulti,
  isSelectedRange,
  isSelectedSingle,
} from '..';
import {
  TDisabled,
  TMonth,
  TMulti,
  TSelectedRange,
  TSingle,
  TViewMode,
} from '../../../../types';
import { capitalize } from '../../../../utils/capitalize';

type TProps = {
  dateToVerify: Date;
  firstDateOfCurrentMonthOfView: Date;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
  selectOnlyVisibleMonth?: boolean;
  onMonthClick?: (data: Omit<TMonth, 'onClick'>) => void;
};

export function transformMonths({
  firstDateOfCurrentMonthOfView,
  dateToVerify,
  disabled,
  single,
  multi,
  range,
  selectOnlyVisibleMonth,
  onMonthClick,
}: TProps): TMonth {
  const monthOfYear = dateToVerify.getMonth();

  const isDisabled =
    isDisabledDates({ dateToVerify, disabled }) ||
    isDisabledBefore({ dateToVerify, disabled }) ||
    isDisabledAfter({ dateToVerify, disabled }) ||
    isDisabledVisibleMonth({
      dateToVerify,
      selectOnlyVisibleMonth,
      firstDateOfCurrentMonthOfView,
    }) ||
    isDisabledCancelOnDisabledDate({
      dateToVerify,
      disabled,
      selectedDateByRange: range?.selectedDate,
      disabledAfterFirstDisabledDates: range?.disabledAfterFirstDisabledDates,
    }) ||
    isDisabledSameDate({
      dateToVerify,
      selectedDateByRange: range,
    }) ||
    isDisabledByMinInterval({
      dateToVerify,
      selectedDateByRange: range,
    }) ||
    isDisabledByMaxInterval({
      dateToVerify,
      selectedDateByRange: range,
    });

  const isSelected =
    isSelectedSingle({
      dateToVerify,
      selectedDate: single?.selectedDate,
    }) ||
    isSelectedMulti({
      dateToVerify,
      selectedDates: multi?.selectedDates,
    }) ||
    isSelectedRange({
      dateToVerify,
      selectedDateByRange: range?.selectedDate,
    });

  const date = dateToVerify;

  const month = dateToVerify.getMonth();

  const finalResult = {
    date,
    month,
    year: date.getFullYear(),
    isJanuary: monthOfYear === 0,
    isFebruary: monthOfYear === 1,
    isMarch: monthOfYear === 2,
    isApril: monthOfYear === 3,
    isMay: monthOfYear === 4,
    isJune: monthOfYear === 5,
    isJuly: monthOfYear === 6,
    isAugust: monthOfYear === 7,
    isSeptember: monthOfYear === 8,
    isOctober: monthOfYear === 9,
    isNovember: monthOfYear === 10,
    isDecember: monthOfYear === 11,
    isToday: isSameMonth(date, new Date()),
    isSelected,
    isDisabled,
    text: capitalize(format(date, 'MMM')),
    isMonthOfView: month === firstDateOfCurrentMonthOfView.getMonth(),
  };
  return {
    ...finalResult,
    onClick: () => onMonthClick?.({ ...finalResult }),
  };
}
