import { isAfter, isBefore, isSameMonth, isToday, startOfDay } from 'date-fns';
import { TDate, TDisabled } from '../../types';

export function transformDate({
  date,
  disabledDate,
}: { date: Date; disabledDate?: TDisabled }): TDate {
  const dayOfWeek = date.getDay();
  const today = date || new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  const t =
    disabledDate?.dates?.some(
      d => startOfDay(d).getTime() === startOfDay(date).getTime(),
    ) ||
    (disabledDate?.datesBefore
      ? isBefore(startOfDay(date), startOfDay(disabledDate.datesBefore))
      : false) ||
    (disabledDate?.datesAfter
      ? isAfter(startOfDay(date), startOfDay(disabledDate.datesAfter))
      : false);
  return {
    date: date,
    day: date.getDay(),
    isToday: isToday(date),
    isPrevMonth: isSameMonth(date, prevMonth),
    isCurrentMonth: isSameMonth(date, today),
    isNextMonth: isSameMonth(date, nextMonth),
    isSunday: dayOfWeek === 0,
    isMonday: dayOfWeek === 1,
    isTuesday: dayOfWeek === 2,
    isWednesday: dayOfWeek === 3,
    isThursday: dayOfWeek === 4,
    isFriday: dayOfWeek === 5,
    isSaturday: dayOfWeek === 6,
    isSelected: false,
    isDisabled: t,
  };
}
