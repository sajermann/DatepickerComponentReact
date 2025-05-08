import { isAfter, isBefore, isSameMonth, isToday, startOfDay } from 'date-fns';
import { TDate, TDisabled } from '../../types';

type TProps = {
  dateToVerify: Date;
  startDate: Date;
  disabledDate?: TDisabled;
  selectedDate?: Date | null;
  selectedDates?: Date[];
  selectOnlyVisibleMonth?: boolean;
};

export function transformDate({
  startDate,
  dateToVerify,
  disabledDate,
  selectedDate,
  selectedDates,
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

  const t =
    disabledDate?.dates?.some(
      d => startOfDay(d).getTime() === startOfDay(dateToVerify).getTime(),
    ) ||
    (disabledDate?.before
      ? isBefore(startOfDay(dateToVerify), startOfDay(disabledDate.before))
      : false) ||
    (disabledDate?.after
      ? isAfter(startOfDay(dateToVerify), startOfDay(disabledDate.after))
      : false) ||
    (selectOnlyVisibleMonth && !isSameMonth(dateToVerify, startDate));

  // if (dateToVerify.getDate() === 2 && dateToVerify.getMonth() === 4) {
  //   console.log({
  //     dateToVerify,
  //     isDisabled: t,
  //     a: startOfDay(dateToVerify),
  //     b: startOfDay(disabledDate?.before),
  //     c: isAfter(startOfDay(dateToVerify), startOfDay(disabledDate?.before)),
  //   });
  // }

  // if (dateToVerify.getDate() === 12 && dateToVerify.getMonth() === 4) {
  //   console.log({
  //     dateToVerify,
  //     isDisabled: t,
  //     a: startOfDay(dateToVerify),
  //     b: startOfDay(disabledDate?.after),
  //     c: isAfter(startOfDay(dateToVerify), startOfDay(disabledDate.after)),
  //   });
  // }

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
      dateToVerify.getTime() === selectedDate?.getTime() ||
      !!selectedDates?.some(item => item.getTime() === dateToVerify.getTime()),
    isDisabled: t,
  };
}
