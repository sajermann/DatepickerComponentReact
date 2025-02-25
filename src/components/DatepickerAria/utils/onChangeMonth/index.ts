import { isValid, parse } from 'date-fns';
import { adjustDay, focusNextInput } from '..';
import { TChangeMonth } from '../../types';

export const onChangeMonth = ({
  event,
  setDate,
  onChange,
  monthRef,
  dayRef,
}: TChangeMonth) => {
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 2) {
    valueTemp = valueTemp.substring(0, 2);
  }
  if (Number(valueTemp) > 12) {
    valueTemp = '12';
  }

  temp.target.value = valueTemp;

  setDate(prev => {
    const dateComplete =
      prev.day && valueTemp && prev.year
        ? parse(
            `${prev.year}-${Number(valueTemp)}-${prev.day}`,
            'yyyy-MM-dd',
            new Date(),
          )
        : null;

    const newValues = {
      ...prev,
      month: Number(valueTemp) || null,
      date: isValid(dateComplete) && dateComplete ? dateComplete : null,
      iso:
        isValid(dateComplete) && dateComplete
          ? dateComplete.toISOString()
          : null,
    };
    if (onChange) {
      onChange(newValues);
    }

    if (valueTemp.length > 1 && monthRef?.current) {
      focusNextInput({
        currentInput: monthRef.current,
        date: newValues,
      });
      adjustDay({ date: newValues, dayRef, setDate, onChange });
    }

    return { ...newValues };
  });
};
