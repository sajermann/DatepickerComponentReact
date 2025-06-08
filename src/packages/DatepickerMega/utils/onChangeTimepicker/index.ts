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
      // let fixHour = date.getHours();
      // if (isAmPmMode && (newValues.hour === 0 || newValues.hour === 12)) {
      //   console.log(`aqui 1`);
      //   fixHour = 12;
      // }
      // if (isAmPmMode && newValues.hour !== null && newValues.hour > 0) {
      //   console.log(`aqui 2`);
      //   fixHour = newValues.hour;
      // }
      // if (isAmPmMode && newValues.hour !== null && newValues.hour > 12) {
      //   console.log(`aqui 3`);
      //   fixHour = newValues.hour - 12;
      // }
      // hourRef.current.value = formatTwoNumbers(fixHour.toString() || '');

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
    if (amPmRef.current) {
      amPmRef.current.value = newValues.clockType || '';
    }
    if (onChange) {
      onChange(newValues);
    }

    return newValues;
  });
};
