import { useDatepickerMega, useIsValidDate } from '..';
import { TDate } from '../../types';

export function useButtonAmPmProps() {
  const { inputAmPmRef, inputHourRef, inputMinuteRef, setDate, onChange } =
    useDatepickerMega();
  const { isDisabledTime } = useIsValidDate();

  const onClick = () => {
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
      let newValues: TDate = {
        ...prev,
        clockType: prev.clockType === 'am' ? 'pm' : 'am',
      };
      if (inputAmPmRef.current) {
        inputAmPmRef.current.value = newValues.clockType || '';
      }

      if (isDisabledTime()) {
        if (inputHourRef?.current?.value) {
          inputHourRef.current.value = '';
        }
        if (inputMinuteRef?.current?.value) {
          inputMinuteRef.current.value = '';
        }

        newValues = {
          ...newValues,
          hour: null,
          minute: null,
          day: null,
          month: null,
          year: null,
          date: null,
          iso: null,
        };
      }

      if (onChange) {
        onChange(newValues);
      }
      return {
        ...newValues,
      };
    });
  };

  return {
    onClick,
    ref: inputAmPmRef,
  };
}
