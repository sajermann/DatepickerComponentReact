import {
  isAfter,
  isBefore,
  isSameMonth,
  isToday,
  isWithinInterval,
  startOfDay,
} from 'date-fns';
import { TDate, TDisabled, TRange } from '../../types';

type TProps = {
  dateToVerify: Date;
  startDate: Date;
  disabledDate?: TDisabled;
  selectedDate?: Date | null;
  selectedDates?: Date[];
  selectedDateByRange?: TRange;
  selectOnlyVisibleMonth?: boolean;
};

export function transformDate({
  startDate,
  dateToVerify,
  disabledDate,
  selectedDate,
  selectedDates,
  selectedDateByRange,
  selectOnlyVisibleMonth,
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

  const t = !!(
    disabledDate?.dates?.some(
      d => startOfDay(d).getTime() === startOfDay(dateToVerify).getTime(),
    ) ||
    (disabledDate?.before
      ? isBefore(startOfDay(dateToVerify), startOfDay(disabledDate.before))
      : false) ||
    (disabledDate?.after
      ? isAfter(startOfDay(dateToVerify), startOfDay(disabledDate.after))
      : false) ||
    (selectOnlyVisibleMonth && !isSameMonth(dateToVerify, startDate))
  ); // se os disableds estiverem estranho é pq coloquei !!() nessa funcao
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
    isSelected:
      isDisableSingle({ dateToVerify, selectedDate }) ||
      isDisableMulti({ dateToVerify, selectedDates }) ||
      isDisableRange({ dateToVerify, selectedDateByRange }),
    isDisabled: t,
  };
}

function isDisableSingle({
  dateToVerify,
  selectedDate,
}: { dateToVerify: Date; selectedDate?: Date | null }) {
  return dateToVerify.getTime() === selectedDate?.getTime();
}

function isDisableMulti({
  dateToVerify,
  selectedDates,
}: { dateToVerify: Date; selectedDates?: Date[] }) {
  return !!selectedDates?.some(
    item => item.getTime() === dateToVerify.getTime(),
  );
}

function isDisableRange({
  dateToVerify,
  selectedDateByRange,
}: { dateToVerify: Date; selectedDateByRange?: TRange }) {
  return (
    dateToVerify.getTime() === selectedDateByRange?.from?.getTime() ||
    dateToVerify.getTime() === selectedDateByRange?.to?.getTime() ||
    (selectedDateByRange?.from &&
      selectedDateByRange?.to &&
      isWithinInterval(dateToVerify, {
        start: selectedDateByRange.from,
        end: selectedDateByRange.to,
      }))
  );
}
