import { format, isSameMonth, isToday } from 'date-fns';
import {
  isDisabledAfter,
  isDisabledBefore,
  isDisabledByMaxInterval,
  isDisabledByMinInterval,
  isDisabledCancelOnDisabledDate,
  isDisabledDates,
  isDisabledSameDate,
  isDisabledVisibleMonth,
  isDisabledWeek,
  isHoveredRange,
  isSelectedMulti,
  isSelectedRange,
  isSelectedSingle,
  onDayClick,
} from '..';
import {
  TDate,
  TDisabled,
  TMulti,
  TSelectedRangeWithHover,
  TSingle,
} from '../../../../types';

type TProps = {
  dateToVerify: Date;
  firstDateOfCurrentMonthOfView: Date;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
  selectOnlyVisibleMonth?: boolean;
};

export function transformDates({
  firstDateOfCurrentMonthOfView,
  dateToVerify,
  disabled,
  single,
  multi,
  range,
  selectOnlyVisibleMonth,
}: TProps): TDate {
  const dayOfWeek = dateToVerify.getDay();
  const prevMonth = new Date(
    firstDateOfCurrentMonthOfView.getFullYear(),
    firstDateOfCurrentMonthOfView.getMonth() - 1,
    1,
  );
  const nextMonth = new Date(
    firstDateOfCurrentMonthOfView.getFullYear(),
    firstDateOfCurrentMonthOfView.getMonth() + 1,
    1,
  );

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
    }) ||
    isDisabledWeek({
      dateToVerify,
      disabledWeeks: disabled?.weeeks,
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
  return {
    date: dateToVerify,
    day: dateToVerify.getDay(),
    month: dateToVerify.getMonth(),
    year: dateToVerify.getFullYear(),
    isToday: isToday(dateToVerify),
    isPrevMonth: isSameMonth(dateToVerify, prevMonth),
    isCurrentMonth: isSameMonth(dateToVerify, firstDateOfCurrentMonthOfView),
    isNextMonth: isSameMonth(dateToVerify, nextMonth),
    isSunday: dayOfWeek === 0,
    isMonday: dayOfWeek === 1,
    isTuesday: dayOfWeek === 2,
    isWednesday: dayOfWeek === 3,
    isThursday: dayOfWeek === 4,
    isFriday: dayOfWeek === 5,
    isSaturday: dayOfWeek === 6,
    isSelected,
    isDisabled,
    isHoveredRange:
      !isSelected &&
      isHoveredRange({
        dateToVerify,
        selectedDateByRange: range?.selectedDate,
        lastHoveredDate: range?.lastHoveredDate,
      }),
    text: format(dateToVerify, 'd'),
    onClick: () => onDayClick({ dateToVerify, single, multi, range }),
    onMouseEnter: () => {
      if (!range?.selectedDate.from || range?.selectedDate.to) {
        return;
      }
      range.setLastHoveredDate(dateToVerify);
    },
  };
}
