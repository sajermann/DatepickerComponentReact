import { adjustDay } from '..';
import { TOnBlurMonth } from '../../types';

export const onBlurMonth = ({
  event,
  monthRef,
  dayRef,
  date,
  setDate,
  onChange,
}: TOnBlurMonth) => {
  const { value } = event.target;
  if (value === '0' && monthRef?.current) {
    monthRef.current.value = '';
  }
  adjustDay({ date, dayRef, setDate, onChange });
};
