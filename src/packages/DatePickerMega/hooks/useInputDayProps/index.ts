import { isValid, lastDayOfMonth, parse } from 'date-fns';
import { ChangeEvent } from 'react';
import { useDatePickerMega, useIsValidDate } from '..';
import { TDate } from '../../types';
import { focusFirstInput, focusNextInput, formatTwoNumbers } from '../../utils';

export function useInputDayProps() {
  const { inputDayRef, inputMonthRef, inputYearRef, date, setDate, onChange } =
    useDatePickerMega();
  const { isDisabledDate } = useIsValidDate();

  const onBlur = () => {
    if (inputDayRef?.current?.value === '0') {
      inputDayRef.current.value = '';
      setDate(prev => {
        const newValues: TDate = {
          ...prev,
          day: null,
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
        focusFirstInput({
          currentInput: inputDayRef.current,
          date: date.current,
        });
      }
      if (inputMonthRef?.current?.value) {
        inputMonthRef.current.value = '';
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

    if (inputDayRef?.current) {
      inputDayRef.current.value = formatTwoNumbers(inputDayRef.current.value);
    }
  };

  const onChangeInternal = (event: ChangeEvent<HTMLInputElement>) => {
    const temp = { ...event };
    let valueTemp = temp.target.value;
    valueTemp = valueTemp.replace(/[^0-9]/g, '');
    if (valueTemp.length > 2) {
      valueTemp = valueTemp.substring(0, 2);
    }
    if (Number(valueTemp) > 31) {
      valueTemp = '31';
    }

    if (date.current.month) {
      const today = new Date();
      const lastDayOfMonthSelected = lastDayOfMonth(
        new Date(
          date.current.year || today.getFullYear(),
          date.current.month - 1,
        ),
      );

      if (lastDayOfMonthSelected.getDate() < Number(valueTemp)) {
        valueTemp = String(lastDayOfMonthSelected.getDate());
      }
    }

    temp.target.value = valueTemp;

    const dateComplete =
      valueTemp && date.current.month && date.current.year
        ? parse(
            `${date.current.year}-${date.current.month}-${Number(valueTemp)}`,
            'yyyy-MM-dd',
            new Date(),
          )
        : null;

    setDate(prev => {
      const newValues: TDate = {
        ...prev,
        day: Number(valueTemp) || null,
        date: isValid(dateComplete) && dateComplete ? dateComplete : null,
        iso:
          isValid(dateComplete) && dateComplete
            ? dateComplete.toISOString()
            : null,
      };
      if (onChange) {
        onChange(newValues);
      }
      return {
        ...newValues,
      };
    });

    // TODO: Quando digita nos inputs, se a data estiver bloqueada, deveria zerar os inputs
    // e ir para o primeiro input

    if (valueTemp.length > 1 && inputDayRef?.current) {
      focusNextInput({
        currentInput: inputDayRef.current,
      });
    }
  };

  return {
    onBlur,
    onChange: onChangeInternal,
    ref: inputDayRef,
  };
}
