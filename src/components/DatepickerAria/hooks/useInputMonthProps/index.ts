import { isValid, parse } from 'date-fns';
import { ChangeEvent, FocusEvent } from 'react';
import { useDatepickerMega, useIsValidDate } from '..';
import { TDate } from '../../types';
import { adjustDay, focusNextInput, formatTwoNumbers } from '../../utils';
import { focusFirstInput } from '../../utils/focusFirstInput';

export function useInputMonthProps() {
  const { inputMonthRef, inputDayRef, inputYearRef, date, setDate, onChange } =
    useDatepickerMega();
  const { isDisabledDate } = useIsValidDate();

  const onBlur = (event: FocusEvent<HTMLInputElement, Element>) => {
    const { value } = event.target;

    if (inputMonthRef?.current && value === '0') {
      inputMonthRef.current.value = '';
      setDate(prev => {
        const newValues: TDate = {
          ...prev,
          month: null,
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
        focusFirstInput({
          currentInput: inputMonthRef.current,
          date: date.current,
        });
      }
      if (inputYearRef?.current?.value) {
        inputYearRef.current.value = '';
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

    if (inputMonthRef?.current) {
      inputMonthRef.current.value = formatTwoNumbers(value);
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
    if (valueTemp.length > 2) {
      valueTemp = valueTemp.substring(0, 2);
    }
    if (Number(valueTemp) > 12) {
      valueTemp = '12';
    }

    temp.target.value = valueTemp;

    const dateComplete =
      date.current.day && valueTemp && date.current.year
        ? parse(
            `${date.current.year}-${Number(valueTemp)}-${date.current.day}`,
            'yyyy-MM-dd',
            new Date(),
          )
        : null;

    setDate(prev => {
      const newValues: TDate = {
        ...prev,
        month: Number(valueTemp) || null,
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

    if (valueTemp.length > 1 && inputMonthRef?.current) {
      adjustDay({ date: date.current, dayRef: inputDayRef, setDate, onChange });
      focusNextInput({
        currentInput: inputMonthRef.current,
        date: date.current,
      });
    }
  };

  return {
    onBlur,
    onChange: onChangeInternal,
    ref: inputMonthRef,
  };
}
