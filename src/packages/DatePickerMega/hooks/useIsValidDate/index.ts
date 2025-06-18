import { isValid, startOfDay } from 'date-fns';
import { useDatePickerMega } from '..';

export function useIsValidDate() {
  const {
    disabledDates,
    date,
    disabledWeeks,
    minDate,
    maxDate,
    minTime,
    maxTime,
  } = useDatePickerMega();

  const isValidDate = (dateToVerify: Date | null) => {
    if (!dateToVerify || !isValid(dateToVerify)) return false;
    const t = disabledDates?.find(d => d.valueOf() === dateToVerify.valueOf());
    return !t;
  };

  const isDisabledDate = () => {
    if (!date?.current?.date) return false;
    const isDisabled = disabledDates?.find(
      d => startOfDay(d).valueOf() === date.current.date?.valueOf(),
    );
    const isDisabledWeeks = disabledWeeks?.find(
      d => d === date.current.date?.getDay(),
    );

    const isMinDate =
      minDate && date.current.date?.valueOf() < startOfDay(minDate).valueOf();
    const isMaxDate =
      maxDate && date.current.date?.valueOf() > startOfDay(maxDate).valueOf();

    return !!(
      isDisabled !== undefined ||
      isDisabledWeeks !== undefined ||
      isMinDate ||
      isMaxDate
    );
  };

  const isDisabledTime = () => {
    if (!date.current.date) return false;
    const isDisabled = disabledDates?.find(
      d => d.valueOf() === date.current.date?.valueOf(),
    );

    const dateMin = new Date(date.current.date.toISOString());
    if (typeof minTime?.h === 'number') {
      dateMin.setHours(minTime?.h);
    }

    if (typeof minTime?.m === 'number') {
      dateMin.setMinutes(minTime?.m);
    }

    const dateMax = new Date(date.current.date.toISOString());
    if (typeof maxTime?.h === 'number') {
      dateMax.setHours(maxTime?.h);
    }

    if (typeof maxTime?.m === 'number') {
      dateMax.setMinutes(maxTime?.m);
    }

    const isMinTime =
      minTime && date.current.date?.valueOf() < dateMin.valueOf();
    const isMaxTime =
      maxTime && date.current.date?.valueOf() > dateMax.valueOf();

    return isDisabled !== undefined || isMinTime || isMaxTime;
  };

  return {
    isValidDate,
    isDisabledDate,
    isDisabledTime,
  };
}
