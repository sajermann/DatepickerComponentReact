import {
  addDays,
  eachDayOfInterval,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfDay,
} from 'date-fns';
import {
  TDate,
  TDisabled,
  TMulti,
  TRange,
  TSelectedRange,
  TSingle,
  TWeek,
} from '../../types';

type TProps = {
  dateToVerify: Date;
  firstDateOfCurrentMonthOfView: Date;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
  selectOnlyVisibleMonth?: boolean;
  lastHoveredDate: Date | null;
};

export function transformDates({
  firstDateOfCurrentMonthOfView,
  dateToVerify,
  disabled,
  single,
  multi,
  range,
  selectOnlyVisibleMonth,
  lastHoveredDate,
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
        lastHoveredDate,
      }),
  };
}

function isSelectedSingle({
  dateToVerify,
  selectedDate,
}: { dateToVerify: Date; selectedDate?: Date | null }) {
  return dateToVerify.getTime() === selectedDate?.getTime();
}

function isSelectedMulti({
  dateToVerify,
  selectedDates,
}: { dateToVerify: Date; selectedDates?: Date[] }) {
  return !!selectedDates?.some(
    item => item.getTime() === dateToVerify.getTime(),
  );
}

function isSelectedRange({
  dateToVerify,
  selectedDateByRange,
}: { dateToVerify: Date; selectedDateByRange?: TRange }) {
  return (
    dateToVerify.getTime() === selectedDateByRange?.from?.getTime() ||
    dateToVerify.getTime() === selectedDateByRange?.to?.getTime() ||
    !!(
      selectedDateByRange?.from &&
      selectedDateByRange?.to &&
      isWithinInterval(dateToVerify, {
        start: selectedDateByRange.from,
        end: selectedDateByRange.to,
      })
    )
  );
}

function isHoveredRange({
  dateToVerify,
  selectedDateByRange,
  lastHoveredDate,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TRange;
  lastHoveredDate: Date | null;
}) {
  if (
    (selectedDateByRange?.from && selectedDateByRange?.to) ||
    !lastHoveredDate ||
    !selectedDateByRange?.from
  ) {
    return false;
  }
  const start = selectedDateByRange.from;
  const end = lastHoveredDate;
  return isWithinInterval(dateToVerify, { start, end });
}

function isDisabledDates({
  dateToVerify,
  disabled,
}: { dateToVerify: Date; disabled?: TDisabled }) {
  return !!disabled?.dates?.some(
    d => startOfDay(d).getTime() === startOfDay(dateToVerify).getTime(),
  );
}

function isDisabledBefore({
  dateToVerify,
  disabled,
}: { dateToVerify: Date; disabled?: TDisabled }) {
  return disabled?.before
    ? isBefore(startOfDay(dateToVerify), startOfDay(disabled.before))
    : false;
}

function isDisabledAfter({
  dateToVerify,
  disabled,
}: { dateToVerify: Date; disabled?: TDisabled }) {
  return disabled?.after
    ? isAfter(startOfDay(dateToVerify), startOfDay(disabled.after))
    : false;
}

function isDisabledVisibleMonth({
  dateToVerify,
  selectOnlyVisibleMonth,
  firstDateOfCurrentMonthOfView,
}: {
  dateToVerify: Date;
  selectOnlyVisibleMonth?: boolean;
  firstDateOfCurrentMonthOfView: Date;
}) {
  return !!(
    selectOnlyVisibleMonth &&
    !isSameMonth(dateToVerify, firstDateOfCurrentMonthOfView)
  );
}

function isDisabledCancelOnDisabledDate({
  dateToVerify,
  disabled,
  selectedDateByRange,
  disabledAfterFirstDisabledDates,
}: {
  dateToVerify: Date;
  disabled?: TDisabled;
  selectedDateByRange?: TRange;
  disabledAfterFirstDisabledDates?: boolean;
}) {
  if (!selectedDateByRange || !selectedDateByRange.from) {
    return false;
  }

  if (
    selectedDateByRange.from &&
    !selectedDateByRange.to &&
    isBefore(dateToVerify, selectedDateByRange.from)
  ) {
    return true;
  }

  const sortabledDates = disabled?.dates?.sort((a, b) => {
    if (a.getTime() < b.getTime()) {
      return -1;
    }
    if (a.getTime() > b.getTime()) {
      return 1;
    }

    return 0;
  });

  const disabledDatesAfterDateToVerify =
    sortabledDates?.filter(
      item => item.getTime() > (selectedDateByRange.from as Date).getTime(),
    ) || [];

  const eachDay = eachDayOfInterval({
    start: selectedDateByRange.from,
    end: dateToVerify,
  });

  const disabledByDisabledWeeks =
    eachDay.some(day => disabled?.weeeks?.includes(day.getDay() as TWeek)) &&
    !selectedDateByRange.to &&
    disabledAfterFirstDisabledDates;

  if (
    disabledByDisabledWeeks ||
    (selectedDateByRange.from &&
      !selectedDateByRange.to &&
      disabledAfterFirstDisabledDates &&
      sortabledDates &&
      sortabledDates.length &&
      isAfter(disabledDatesAfterDateToVerify[0], selectedDateByRange.from) &&
      isAfter(dateToVerify, disabledDatesAfterDateToVerify[0]))
  ) {
    return true;
  }

  return false;
}

function isDisabledSameDate({
  dateToVerify,
  selectedDateByRange,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TSelectedRange;
}) {
  if (
    !selectedDateByRange ||
    !selectedDateByRange?.disabledSameDate ||
    !selectedDateByRange.selectedDate.from ||
    (selectedDateByRange.selectedDate.from &&
      selectedDateByRange.selectedDate.to)
  ) {
    return false;
  }
  return isSameDay(dateToVerify, selectedDateByRange.selectedDate.from);
}

function isDisabledByMinInterval({
  dateToVerify,
  selectedDateByRange,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TSelectedRange;
}) {
  if (
    !selectedDateByRange?.minInterval ||
    !selectedDateByRange?.selectedDate.from
  ) {
    return false;
  }

  if (
    selectedDateByRange?.selectedDate.from &&
    selectedDateByRange?.selectedDate.to
  ) {
    return false;
  }

  return isWithinInterval(dateToVerify, {
    start: selectedDateByRange.selectedDate.from,
    end: addDays(
      selectedDateByRange.selectedDate.from,
      selectedDateByRange.minInterval,
    ),
  });
}

function isDisabledByMaxInterval({
  dateToVerify,
  selectedDateByRange,
}: {
  dateToVerify: Date;
  selectedDateByRange?: TSelectedRange;
}) {
  if (
    !selectedDateByRange?.maxInterval ||
    !selectedDateByRange?.selectedDate.from
  ) {
    return false;
  }

  if (
    selectedDateByRange?.selectedDate.from &&
    selectedDateByRange?.selectedDate.to
  ) {
    return false;
  }

  return isAfter(
    dateToVerify,
    addDays(
      selectedDateByRange.selectedDate.from,
      selectedDateByRange.maxInterval,
    ),
  );
}

function isDisabledWeek({
  dateToVerify,
  disabledWeeks,
}: {
  dateToVerify: Date;
  disabledWeeks?: TWeek[];
}) {
  if (!disabledWeeks) return false;
  return disabledWeeks.includes(dateToVerify.getDay() as TWeek);
}
