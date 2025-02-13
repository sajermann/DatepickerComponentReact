import { TClickToggleAmPm, TDate } from '../../types';

export const onClickToggleAmPm = ({
  setDate,
  onChange,
  amPmRef,
}: TClickToggleAmPm) => {
  setDate(prev => {
    if (prev.date) {
      if (prev.clockType === 'pm') {
        prev.date.setHours(prev.date.getHours() - 12);
        prev.hour = prev.date.getHours();
      } else {
        prev.date.setHours(prev.date.getHours() + 12);
        prev.hour = prev.date.getHours();
      }
      prev.iso = prev.date.toISOString();
    }
    const newValues: TDate = {
      ...prev,
      clockType: prev.clockType === 'am' ? 'pm' : 'am',
    };
    if (amPmRef.current) {
      amPmRef.current.value = newValues.clockType || '';
    }

    if (onChange) {
      onChange(newValues);
    }
    return {
      ...newValues,
    };
  });
};
