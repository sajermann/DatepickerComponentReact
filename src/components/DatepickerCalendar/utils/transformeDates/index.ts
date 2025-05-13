import {
  isAfter,
  isBefore,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfDay,
} from 'date-fns';
import { RefObject } from 'react';
import { TDate, TDisabled, TRange } from '../../types';

type TProps = {
  dateToVerify: Date;
  startDate: Date;
  disabledDate?: TDisabled;
  selectedDate?: Date | null;
  selectedDates?: Date[];
  selectedDateByRange?: TRange;
  selectOnlyVisibleMonth?: boolean;
  disabledAfterFirstDisabledDates?: boolean;
  daysInHover?: Date[];
};

export function transformDate({
  startDate,
  dateToVerify,
  disabledDate,
  selectedDate,
  selectedDates,
  selectedDateByRange,
  selectOnlyVisibleMonth,
  disabledAfterFirstDisabledDates,
  daysInHover,
}: TProps): TDate {
  const dayOfWeek = dateToVerify.getDay();
  const prevMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth() - 1,
    1,
  );
  const nextMonth = new Date(
    startDate.getFullYear(),
    startDate.getMonth() + 1,
    1,
  );

  const isDisabled =
    isDisabledDates({ dateToVerify, disabledDate }) ||
    isDisabledBefore({ dateToVerify, disabledDate }) ||
    isDisabledAfter({ dateToVerify, disabledDate }) ||
    isDisabledVisibleMonth({
      dateToVerify,
      selectOnlyVisibleMonth,
      startDate,
    }) ||
    isDisabledCancelOnDisabledDate({
      dateToVerify,
      disabledDate,
      selectedDateByRange,
      disabledAfterFirstDisabledDates,
    });

  const isSelected =
    isSelectedSingle({ dateToVerify, selectedDate }) ||
    isSelectedMulti({ dateToVerify, selectedDates }) ||
    isSelectedRange({ dateToVerify, selectedDateByRange });
  return {
    date: dateToVerify,
    day: dateToVerify.getDay(),
    isToday: isToday(dateToVerify),
    isPrevMonth: isSameMonth(dateToVerify, prevMonth),
    isCurrentMonth: isSameMonth(dateToVerify, startDate),
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
        daysInHover,
        selectedDateByRange,
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
  daysInHover,
  dateToVerify,
  selectedDateByRange,
}: { dateToVerify: Date; daysInHover?: Date[]; selectedDateByRange?: TRange }) {
  if (selectedDateByRange?.from && selectedDateByRange?.to) {
    return false;
  }
  return !!daysInHover?.find(item => item.getTime() === dateToVerify.getTime());
}

function isDisabledDates({
  dateToVerify,
  disabledDate,
}: { dateToVerify: Date; disabledDate?: TDisabled }) {
  return !!disabledDate?.dates?.some(
    d => startOfDay(d).getTime() === startOfDay(dateToVerify).getTime(),
  );
}

function isDisabledBefore({
  dateToVerify,
  disabledDate,
}: { dateToVerify: Date; disabledDate?: TDisabled }) {
  return disabledDate?.before
    ? isBefore(startOfDay(dateToVerify), startOfDay(disabledDate.before))
    : false;
}

function isDisabledAfter({
  dateToVerify,
  disabledDate,
}: { dateToVerify: Date; disabledDate?: TDisabled }) {
  return disabledDate?.after
    ? isAfter(startOfDay(dateToVerify), startOfDay(disabledDate.after))
    : false;
}

function isDisabledVisibleMonth({
  dateToVerify,
  selectOnlyVisibleMonth,
  startDate,
}: { dateToVerify: Date; selectOnlyVisibleMonth?: boolean; startDate: Date }) {
  return !!(selectOnlyVisibleMonth && !isSameMonth(dateToVerify, startDate));
}

function isDisabledCancelOnDisabledDate({
  dateToVerify,
  disabledDate,
  selectedDateByRange,
  disabledAfterFirstDisabledDates,
}: {
  dateToVerify: Date;
  disabledDate?: TDisabled;
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

  const sortabledDates = disabledDate?.dates?.sort((a, b) => {
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

  if (
    selectedDateByRange.from &&
    !selectedDateByRange.to &&
    disabledAfterFirstDisabledDates &&
    sortabledDates &&
    sortabledDates.length &&
    isAfter(disabledDatesAfterDateToVerify[0], selectedDateByRange.from) &&
    isAfter(dateToVerify, disabledDatesAfterDateToVerify[0])
  ) {
    return true;
  }

  return false;
}
// preciso colocar o disabledDate.dates em sort pq se vou pegar a ultima precisa estar sortable
// preciso garantir que todas as datas entrando ou sendo verificadas esejam no horario 0
