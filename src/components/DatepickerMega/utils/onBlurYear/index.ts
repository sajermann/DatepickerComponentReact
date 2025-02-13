import { adjustDay } from '..';
import { TOnBlurYear } from '../../types';

export const onBlurYear = ({
  event,
  dayRef,
  yearRef,
  date,
  setDate,
  onChange,
}: TOnBlurYear) => {
  const { value } = event.target;
  if (value === '0' && yearRef?.current) {
    yearRef.current.value = '';
  }
  adjustDay({ date, dayRef, setDate, onChange });
};
