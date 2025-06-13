import { isValid } from 'date-fns';
import { ChangeEvent } from 'react';
import { useDatePickerMega, useIsValidDate } from '..';
import { TDate } from '../../types';
import { focusFirstInput, focusNextInput, formatTwoNumbers } from '../../utils';

export function useInputHourProps() {
  const { inputHourRef, inputMinuteRef, isAmPmMode, date, setDate, onChange } =
    useDatePickerMega();
  const { isDisabledTime } = useIsValidDate();

  const onBlur = () => {
    if (isDisabledTime()) {
      if (inputHourRef?.current?.value) {
        inputHourRef.current.value = '';
        focusFirstInput({
          currentInput: inputHourRef.current,
          date: date.current,
        });
      }
      if (inputMinuteRef?.current?.value) {
        inputMinuteRef.current.value = '';
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

    if (inputHourRef?.current) {
      inputHourRef.current.value = formatTwoNumbers(inputHourRef.current.value);
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
          hour: null,
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

    if (isAmPmMode && Number(valueTemp) > 12) {
      valueTemp = '12';
    }

    if (!isAmPmMode && Number(valueTemp) > 23) {
      valueTemp = '23';
    }

    temp.target.value = valueTemp;

    // no minute, no date
    if (typeof date.current.minute === 'object') {
      setDate(prev => {
        const t = {
          ...prev,
          hour: Number(valueTemp),
          date: null,
          day: null,
          month: null,
          year: null,
          iso: null,
        };
        if (onChange) {
          onChange(t);
        }

        if (valueTemp.length > 1 && inputHourRef?.current) {
          focusNextInput({
            currentInput: inputHourRef.current,
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

      const hourStandard = valueTemp === '' ? null : Number(valueTemp);
      const hourAmPm =
        isAmPmMode && prev.clockType === 'am'
          ? hourStandard
          : hourStandard !== null
            ? hourStandard + 12
            : null;
      const adjustedHour = !isAmPmMode ? hourStandard : hourAmPm;

      if (adjustedHour !== null) {
        dateTemp.setHours(adjustedHour);
        dateTemp.setMinutes(Number(date.current.minute));
      }

      const newValues = {
        ...prev,
        day: isValid(dateTemp) && dateTemp ? dateTemp.getDate() : null,
        month: isValid(dateTemp) && dateTemp ? dateTemp.getMonth() + 1 : null,
        year: isValid(dateTemp) && dateTemp ? dateTemp.getFullYear() : null,
        date: isValid(dateTemp) && dateTemp ? dateTemp : null,
        iso: isValid(dateTemp) && dateTemp ? dateTemp.toISOString() : null,
        hour: adjustedHour,
      };
      if (onChange) {
        onChange(newValues);
      }

      if (valueTemp.length > 1 && inputHourRef?.current) {
        focusNextInput({
          currentInput: inputHourRef.current,
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
    ref: inputHourRef,
  };
}
