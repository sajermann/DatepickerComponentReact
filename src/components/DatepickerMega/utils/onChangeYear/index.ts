import { isValid, parse } from 'date-fns';
import { adjustDay, focusNextInput } from '..';
import { TChangeYear } from '../../types';

export const onChangeYear = ({
  event,
  setDate,
  onChange,
  dayRef,
  yearRef,
}: TChangeYear) => {
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 4) {
    valueTemp = valueTemp.substring(0, 4);
  }
  temp.target.value = valueTemp;

  setDate(prev => {
    const dateComplete =
      prev.day && prev.month && valueTemp
        ? parse(
            `${Number(valueTemp)}-${prev.month}-${prev.day}`,
            'yyyy-MM-dd',
            new Date(),
          )
        : null;

    if (dateComplete) {
      dateComplete.setHours(0, 0, 0, 0);
    }

    const newValues = {
      ...prev,
      year: Number(valueTemp) || null,
      date: isValid(dateComplete) && dateComplete ? dateComplete : null,
      iso:
        isValid(dateComplete) && dateComplete
          ? dateComplete.toISOString()
          : null,
    };
    if (onChange) {
      onChange(newValues);
    }

    if (valueTemp.length > 3 && yearRef?.current) {
      focusNextInput(yearRef.current);
      adjustDay({ date: newValues, dayRef, setDate, onChange });
    }

    return { ...newValues };
  });
};
