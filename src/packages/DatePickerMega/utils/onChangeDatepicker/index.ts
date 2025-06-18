import { formatTwoNumbers } from '..';
import { TChangeDatepicker } from '../../types';

export function onChangeDatepicker({
  dates,
  onChange,
  setDate,
  dayRef,
  monthRef,
  yearRef,
}: TChangeDatepicker) {
  setDate(prev => {
    const newValues = {
      ...prev,
      year: dates[0].getFullYear() || null,
      month: dates[0].getMonth() + 1 || null,
      day: dates[0].getDate() || null,
      date: dates[0] || null,
      iso: dates[0].toISOString() || null,
    };
    if (dayRef?.current) {
      dayRef.current.value = formatTwoNumbers(newValues.day?.toString() || '');
    }
    if (monthRef?.current) {
      monthRef.current.value = formatTwoNumbers(
        newValues.month?.toString() || '',
      );
    }
    if (yearRef?.current) {
      yearRef.current.value = newValues.year?.toString() || '';
    }
    if (onChange) {
      onChange(newValues);
    }

    return newValues;
  });
}
