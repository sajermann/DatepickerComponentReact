import { formatTwoNumbers } from '..';
import { TChangeTimepicker, TDate } from '../../types';
import { convertHour24ToAmPm } from '../convertHour24ToAmPm';

export const onChangeTimepicker = ({
  date,
  onChange,
  setDate,
  hourRef,
  minuteRef,
  isAmPmMode,
  amPmRef,
}: TChangeTimepicker) => {
  setDate(prev => {
    const newValues: TDate = {
      ...prev,
      date,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      hour: date.getHours() ?? null,
      minute: date.getMinutes() ?? null,
      iso: date.toISOString() || null,
      clockType: date.getHours() > 11 ? 'pm' : 'am',
    };
    if (hourRef?.current) {
      hourRef.current.value = formatTwoNumbers(
        convertHour24ToAmPm({
          isAmPmMode,
          hour24: date.getHours(),
        }).toString() || '',
      );
    }
    if (minuteRef?.current) {
      minuteRef.current.value = formatTwoNumbers(
        newValues.minute?.toString() || '',
      );
    }
    if (amPmRef?.current) {
      amPmRef.current.value = newValues.clockType || '';
    }
    if (onChange) {
      onChange(newValues);
    }

    return newValues;
  });
};
