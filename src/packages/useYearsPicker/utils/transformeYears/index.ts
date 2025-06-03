import { format, isSameYear } from 'date-fns';
import {
  isDisabledAfter,
  isDisabledBefore,
  isDisabledByMaxInterval,
  isDisabledByMinInterval,
  isDisabledCancelOnDisabledDate,
  isDisabledDates,
  isDisabledSameDate,
  isSelectedMulti,
  isSelectedRange,
  isSelectedSingle,
} from '..';

import {
  TDisabled,
  TMulti,
  TSelectedRange,
  TSelectedRangeWithHover,
  TSingle,
  TViewMode,
  TYear,
} from '../../../types';
import { onYearClick } from '../onYearClick';

type TProps = {
  dateToVerify: Date;
  startOfYear: Date;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
  // onYearClick?: (data: Omit<TYear, 'onClick'>) => void;
};

export function transformeYears({
  startOfYear,
  dateToVerify,
  disabled,
  single,
  multi,
  range,
  // onYearClick,
}: TProps): TYear {
  const isDisabled =
    isDisabledDates({ dateToVerify, disabled }) ||
    isDisabledBefore({ dateToVerify, disabled }) ||
    isDisabledAfter({ dateToVerify, disabled }) ||
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
    isYearOfView: year === startOfYear.getFullYear(),
  };

  return {
    ...finalResult,
    onClick: () => {
      onYearClick?.({ dateToVerify, single, multi, range });
    },
  };
}
