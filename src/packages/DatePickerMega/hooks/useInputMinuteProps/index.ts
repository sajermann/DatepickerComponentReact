import { isValid } from 'date-fns';
import { ChangeEvent } from 'react';
import { useDatePickerMega, useIsValidDate } from '..';
import { TDate } from '../../types';
import { focusNextInput, formatTwoNumbers } from '../../utils';
import { focusFirstInput } from '../../utils/focusFirstInput';

export function useInputMinuteProps() {
  const { inputMinuteRef, inputHourRef, setDate, onChange, date } =
    useDatePickerMega();
  const { isDisabledTime } = useIsValidDate();

  const onBlur = () => {
    if (isDisabledTime()) {
      if (inputMinuteRef?.current?.value) {
        console.log(isDisabledTime(), inputMinuteRef, date);
        inputMinuteRef.current.value = '';
        focusFirstInput({
          currentInput: inputMinuteRef.current,
          date: date.current,
        });
      }
      if (inputHourRef?.current?.value) {
        inputHourRef.current.value = '';
      }
      setDate(prev => {
        const newValues: TDate = {
          ...prev,
          hour: null,
          minute: null,
          day: null,
          month: null,
          year: null,
          date: null,
          iso: null,
        };
        if (onChange) {
          onChange(newValues);
        }
        return newValues;
      });
      return;
    }

    if (inputMinuteRef?.current) {
      inputMinuteRef.current.value = formatTwoNumbers(
        inputMinuteRef.current.value,
      );
    }
  };

  const onChangeInternal = (event: ChangeEvent<HTMLInputElement>) => {
    const temp = { ...event };
    let valueTemp = temp.target.value;
    valueTemp = valueTemp.replace(/[^0-9]/g, '');

    if (valueTemp === '') {
      setDate(prev => {
        const t = {
          ...prev,
          minute: null,
          date: null,
          day: null,
          month: null,
          year: null,
          iso: null,
        };
        if (onChange) {
          onChange(t);
        }
        return t;
      });
      return;
    }

    if (valueTemp.length > 2) {
      valueTemp = valueTemp.substring(0, 2);
    }
    if (Number(valueTemp) > 59) {
      valueTemp = '59';
    }

    temp.target.value = valueTemp;

    // no hour, no date
    if (typeof date.current.hour === 'object') {
      setDate(prev => {
        const t = {
          ...prev,
          minute: Number(valueTemp),
          date: null,
          day: null,
          month: null,
          year: null,
          iso: null,
        };
        if (onChange) {
          onChange(t);
        }

        if (valueTemp.length > 1 && inputMinuteRef?.current) {
          focusNextInput({
            currentInput: inputMinuteRef.current,
          });
        }
        return t;
      });

      return;
    }

    setDate(prev => {
      const dateTemp = prev.date || new Date();
      dateTemp.setSeconds(0);
      dateTemp.setMilliseconds(0);

      if (typeof prev.hour === 'number') {
        dateTemp.setHours(prev.hour);
      }

      if (date) {
        dateTemp.setMinutes(Number(valueTemp));
      }
      const newValues = {
        ...prev,
        day: isValid(dateTemp) && dateTemp ? dateTemp.getDate() : null,
        month: isValid(dateTemp) && dateTemp ? dateTemp.getMonth() + 1 : null,
        year: isValid(dateTemp) && dateTemp ? dateTemp.getFullYear() : null,
        date: isValid(dateTemp) && dateTemp ? dateTemp : null,
        iso: isValid(dateTemp) && dateTemp ? dateTemp.toISOString() : null,
        minute: dateTemp.getMinutes(),
      };
      if (onChange) {
        onChange(newValues);
      }

      if (valueTemp.length > 1 && inputMinuteRef?.current) {
        focusNextInput({
          currentInput: inputMinuteRef.current,
        });
      }

      return {
        ...newValues,
      };
    });
  };

  return {
    onBlur,
    onChange: onChangeInternal,
    ref: inputMinuteRef,
  };
}
