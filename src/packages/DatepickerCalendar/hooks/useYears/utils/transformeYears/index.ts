import { format, isSameYear } from 'date-fns';
import { Dispatch, SetStateAction } from 'react';
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
  TMulti,
  TSelectedRange,
  TSingle,
  TViewMode,
  TYear,
} from '../../../../types';

type TProps = {
  dateToVerify: Date;
  firstDateOfCurrentMonthOfView: Date;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
  selectOnlyVisibleMonth?: boolean;
  onYearClick?: (data: Omit<TYear, 'onClick'>) => void;
};

export function transformeYears({
  firstDateOfCurrentMonthOfView,
  dateToVerify,
  disabled,
  single,
  multi,
  range,
  selectOnlyVisibleMonth,
  onYearClick,
}: TProps): TYear {
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
  const year = dateToVerify.getFullYear();
  const finalResult = {
    date: dateToVerify,
    year,
    isToday: isSameYear(dateToVerify, new Date()),
    isSelected,
    isDisabled,
    text: format(dateToVerify, 'yyyy'),
    isYearOfView: year === firstDateOfCurrentMonthOfView.getFullYear(),
    onClick: () => {},
  };
  return {
    ...finalResult,
    onClick: () => onYearClick?.({ ...finalResult }),
  };
}
