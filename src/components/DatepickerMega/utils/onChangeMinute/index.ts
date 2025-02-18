import { focusNextInput } from '..';
import { TChangeMinute } from '../../types';

export const onChangeMinute = ({
  event,
  setDate,
  onChange,
  minuteRef,
}: TChangeMinute) => {
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 2) {
    valueTemp = valueTemp.substring(0, 2);
  }
  if (Number(valueTemp) > 59) {
    valueTemp = '59';
  }

  temp.target.value = valueTemp;

  setDate(prev => {
    const date = prev.date || new Date();
    date.setMinutes(Number(valueTemp));
    const newValues = {
      ...prev,
      date,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      iso: date.toISOString(),
      minute: Number(valueTemp) || null,
    };
    if (onChange) {
      onChange(newValues);
    }

    if (valueTemp.length > 1 && minuteRef?.current) {
      focusNextInput({
        currentInput: minuteRef.current,
        date: newValues,
      });
    }

    return {
      ...newValues,
    };
  });
};
