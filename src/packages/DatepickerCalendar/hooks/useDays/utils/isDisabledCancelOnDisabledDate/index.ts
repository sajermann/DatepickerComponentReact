import { eachDayOfInterval, isAfter, isBefore } from 'date-fns';
import { TDisabled, TRange, TWeek } from '~/packages/DatepickerCalendar';

export function isDisabledCancelOnDisabledDate({
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
