import { isValid, lastDayOfMonth } from 'date-fns';
import { TAdjustDay } from '../../types';
import { formatTwoNumbers } from '../formatTwoNumbers';

export const adjustDay = ({ date, dayRef, setDate, onChange }: TAdjustDay) => {
  if (!date.month) {
    return;
  }
  const today = new Date();
  const lastDayOfMonthSelected = lastDayOfMonth(
    new Date(date.year || today.getFullYear(), date.month - 1),
  );
  if (
    dayRef?.current &&
    Number(dayRef?.current?.value) > lastDayOfMonthSelected.getDate()
  ) {
    const lastDay = lastDayOfMonthSelected.getDate();
    dayRef.current.value = formatTwoNumbers(lastDay.toString());

    const dateComplete = new Date(`${date.year}-${date.month}-${lastDay}`);
    setDate(prev => {
      const newValues = {
        ...prev,
        day: lastDay,
        date: isValid(dateComplete) ? dateComplete : null,
        iso: isValid(dateComplete) ? dateComplete.toISOString() : null,
      };
      if (onChange) {
        onChange(newValues);
      }
      return { ...newValues };
    });
  }
};
