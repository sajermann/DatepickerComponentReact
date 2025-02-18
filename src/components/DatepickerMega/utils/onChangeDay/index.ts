import { isValid, lastDayOfMonth, parse } from 'date-fns';
import { TChangeDay } from '../../types';
import { focusNextInput } from '../focusNextInput';

export const onChangeDay = ({
  event,
  date,
  setDate,
  onChange,
  dayRef,
}: TChangeDay) => {
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 2) {
    valueTemp = valueTemp.substring(0, 2);
  }
  if (Number(valueTemp) > 31) {
    valueTemp = '31';
  }

  if (date.month) {
    const today = new Date();
    const lastDayOfMonthSelected = lastDayOfMonth(
      new Date(date.year || today.getFullYear(), date.month - 1),
    );

    if (lastDayOfMonthSelected.getDate() < Number(valueTemp)) {
      valueTemp = String(lastDayOfMonthSelected.getDate());
    }
  }

  temp.target.value = valueTemp;

  const dateComplete =
    valueTemp && date.month && date.year
      ? parse(
          `${date.year}-${date.month}-${Number(valueTemp)}`,
          'yyyy-MM-dd',
          new Date(),
        )
      : null;

  setDate(prev => {
    const newValues = {
      ...prev,
      day: Number(valueTemp) || null,
      date: isValid(dateComplete) && dateComplete ? dateComplete : null,
      iso:
        isValid(dateComplete) && dateComplete
          ? dateComplete.toISOString()
          : null,
    };
    if (onChange) {
      onChange(newValues);
    }

    if (valueTemp.length > 1 && dayRef?.current) {
      console.log(`1`);
      focusNextInput({
        currentInput: dayRef.current,
        date: newValues,
      });
    }

    return {
      ...newValues,
    };
  });
};
