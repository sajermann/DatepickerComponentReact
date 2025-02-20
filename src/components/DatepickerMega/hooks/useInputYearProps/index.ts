import { isValid, parse } from 'date-fns';
import { ChangeEvent, FocusEvent } from 'react';
import { useDatepickerMega, useIsValidDate } from '..';
import { TDate } from '../../types';
import { adjustDay, focusNextInput } from '../../utils';
import { focusFirstInput } from '../../utils/focusFirstInput';

export function useInputYearProps() {
  const { inputDayRef, inputMonthRef, inputYearRef, date, setDate, onChange } =
    useDatepickerMega();
  const { isDisabledDate } = useIsValidDate();

  const onBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    const { value } = event.target;

    if (inputYearRef?.current && value === '0') {
      inputYearRef.current.value = '';
      setDate(prev => {
        const newValues: TDate = {
          ...prev,
          year: null,
          date: null,
          iso: null,
        };
        if (onChange) {
          onChange(newValues);
        }
        return newValues;
      });
    }

    if (isDisabledDate()) {
      if (inputDayRef?.current?.value) {
        inputDayRef.current.value = '';
      }
      if (inputMonthRef?.current?.value) {
        inputMonthRef.current.value = '';
      }
      if (inputYearRef?.current?.value) {
        inputYearRef.current.value = '';
        focusFirstInput({
          currentInput: inputYearRef.current,
          date: date.current,
        });
      }
      setDate(prev => {
        const newValues: TDate = {
          ...prev,
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

    adjustDay({
      date: date.current,
      dayRef: inputDayRef,
      setDate,
      onChange,
    });
  };

  const onChangeInternal = (event: ChangeEvent<HTMLInputElement>) => {
    const temp = { ...event };
    let valueTemp = temp.target.value;
    valueTemp = valueTemp.replace(/[^0-9]/g, '');
    if (valueTemp.length > 4) {
      valueTemp = valueTemp.substring(0, 4);
    }
    temp.target.value = valueTemp;

    const dateComplete =
      date.current.day && date.current.month && valueTemp
        ? parse(
            `${Number(valueTemp)}-${date.current.month}-${date.current.day}`,
            'yyyy-MM-dd',
            new Date(),
          )
        : null;
    if (dateComplete) {
      dateComplete.setHours(0, 0, 0, 0);
    }

    setDate(prev => {
      const newValues: TDate = {
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

      return { ...newValues };
    });

    if (valueTemp.length > 3 && inputYearRef?.current) {
      adjustDay({ date: date.current, dayRef: inputDayRef, setDate, onChange });
      focusNextInput({
        currentInput: inputYearRef.current,
        date: date.current,
      });
    }
  };

  return {
    onBlur,
    onChange: onChangeInternal,
    ref: inputYearRef,
  };
}
