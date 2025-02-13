import { focusNextInput } from '..';
import { TChangeHour } from '../../types';

export const onChangeHour = ({
  event,
  setDate,
  onChange,
  hourRef,
  isAmPm,
}: TChangeHour) => {
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 2) {
    valueTemp = valueTemp.substring(0, 2);
  }

  if (isAmPm && Number(valueTemp) > 12) {
    valueTemp = '12';
  }

  if (!isAmPm && Number(valueTemp) > 23) {
    valueTemp = '23';
  }

  temp.target.value = valueTemp;

  setDate(prev => {
    const date = prev.date || new Date();
    date.setSeconds(0);
    date.setMilliseconds(0);
    const hourStandard = Number(valueTemp);
    const hourAmPm =
      isAmPm && prev.clockType === 'am' ? hourStandard : hourStandard + 12;
    const adjustedHour = !isAmPm ? hourStandard : hourAmPm;
    date.setHours(adjustedHour);

    const newValues = {
      ...prev,
      date,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      iso: date.toISOString(),
      hour: adjustedHour || null,
    };
    if (onChange) {
      onChange(newValues);
    }
    return {
      ...newValues,
    };
  });

  if (valueTemp.length > 1 && hourRef?.current) {
    focusNextInput(hourRef.current);
  }
};
