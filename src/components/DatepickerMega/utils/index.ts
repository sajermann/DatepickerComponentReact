import { DPDay, DPMonth, DPTime, DPYear } from '@rehookify/datepicker';
/* eslint-disable no-param-reassign */
import { isValid, lastDayOfMonth, parse } from 'date-fns';
import { RefObject } from 'react';
import { managerClassNames } from '~/utils/managerClassNames';
import {
  TAdjustDay,
  TChangeDatepicker,
  TChangeDay,
  TChangeHour,
  TChangeMinute,
  TChangeMonth,
  TChangeYear,
  TClickToggleAmPm,
  TDate,
  TOnBlurDay,
  TOnBlurMonth,
  TOnBlurYear,
} from '../types';

export const focusNextInput = (currentInput: HTMLInputElement) => {
  if (!currentInput.parentElement) {
    return;
  }
  const inputs = Array.from(
    currentInput.parentElement.querySelectorAll('input'),
  );
  const currentIndex = inputs.indexOf(currentInput);

  if (currentIndex < inputs.length - 1) {
    inputs[currentIndex + 1].focus();
  }
};

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
    dayRef.current.value = lastDay.toString();

    const dateComplete = new Date(`${date.year}-${date.month}-${lastDay}`);
    console.log({ dateComplete });
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

export const formatTwoNumbers = (value: string) => {
  console.log({ value });
  if (Number(value) < 10 && Number(value) > -1) {
    return `0${Number(value)}`;
  }
  return value;
};

export const onBlurDay = ({ event, dayRef }: TOnBlurDay) => {
  const { value } = event.target;
  if (value === '0' && dayRef?.current) {
    dayRef.current.value = '';
  }
};

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

export const onChangeDay = ({
  event,
  date,
  setDate,
  onChange,
  dayRef,
}: TChangeDay) => {
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 2) {
    valueTemp = valueTemp.substring(0, 2);
  }
  if (Number(valueTemp) > 31) {
    valueTemp = '31';
  }

  if (date.month) {
    const today = new Date();
    const lastDayOfMonthSelected = lastDayOfMonth(
      new Date(date.year || today.getFullYear(), date.month - 1),
    );

    if (lastDayOfMonthSelected.getDate() < Number(valueTemp)) {
      valueTemp = String(lastDayOfMonthSelected.getDate());
    }
  }

  temp.target.value = valueTemp;

  const dateComplete =
    valueTemp && date.month && date.year
      ? parse(
          `${date.year}-${date.month}-${Number(valueTemp)}`,
          'yyyy-MM-dd',
          new Date(),
        )
      : null;

  setDate(prev => {
    const newValues = {
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
  console.log({ dayRef, valueTemp });
  if (valueTemp.length > 1 && dayRef?.current) {
    focusNextInput(dayRef.current);
  }
};

export const onChangeMonth = ({
  event,
  setDate,
  onChange,
  monthRef,
  dayRef,
}: TChangeMonth) => {
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

  setDate(prev => {
    const dateComplete =
      prev.day && valueTemp && prev.year
        ? parse(
            `${prev.year}-${Number(valueTemp)}-${prev.day}`,
            'yyyy-MM-dd',
            new Date(),
          )
        : null;

    const newValues = {
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

    if (valueTemp.length > 1 && monthRef?.current) {
      focusNextInput(monthRef.current);
      adjustDay({ date: newValues, dayRef, setDate, onChange });
    }

    return { ...newValues };
  });
};

export const onChangeYear = ({
  event,
  setDate,
  onChange,
  dayRef,
  yearRef,
}: TChangeYear) => {
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 4) {
    valueTemp = valueTemp.substring(0, 4);
  }
  temp.target.value = valueTemp;

  setDate(prev => {
    const dateComplete =
      prev.day && prev.month && valueTemp
        ? parse(
            `${Number(valueTemp)}-${prev.month}-${prev.day}`,
            'yyyy-MM-dd',
            new Date(),
          )
        : null;

    if (dateComplete) {
      dateComplete.setHours(0, 0, 0, 0);
    }

    const newValues = {
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

    if (valueTemp.length > 3 && yearRef?.current) {
      focusNextInput(yearRef.current);
      adjustDay({ date: newValues, dayRef, setDate, onChange });
    }

    return { ...newValues };
  });
};

export const onChangeHour = ({
  event,
  setDate,
  onChange,
  hourRef,
  isAmPm,
}: TChangeHour) => {
  console.log({ event, setDate, onChange, hourRef, isAmPm });
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 2) {
    valueTemp = valueTemp.substring(0, 2);
  }

  if (isAmPm && Number(valueTemp) > 12) {
    valueTemp = '12';
  }

  if (!isAmPm && Number(valueTemp) > 23) {
    valueTemp = '23';
  }

  temp.target.value = valueTemp;

  setDate(prev => {
    const hourStandard = Number(valueTemp);
    const hourAmPm =
      isAmPm && prev.clockType === 'am' ? hourStandard : hourStandard + 12;
    const adjustedHour = !isAmPm ? hourStandard : hourAmPm;

    console.log({ adjustedHour });
    if (prev.date) {
      prev.date.setHours(adjustedHour);
      prev.iso = prev.date.toISOString();
    }
    const newValues = {
      ...prev,
      hour: adjustedHour || null,
    };
    if (onChange) {
      onChange(newValues);
    }
    return {
      ...newValues,
    };
  });

  if (valueTemp.length > 1 && hourRef?.current) {
    focusNextInput(hourRef.current);
  }
};

export const onChangeMinute = ({
  event,
  setDate,
  onChange,
  minuteRef,
}: TChangeMinute) => {
  const temp = { ...event };
  let valueTemp = temp.target.value;
  valueTemp = valueTemp.replace(/[^0-9]/g, '');
  if (valueTemp.length > 2) {
    valueTemp = valueTemp.substring(0, 2);
  }
  if (Number(valueTemp) > 59) {
    valueTemp = '59';
  }

  temp.target.value = valueTemp;

  setDate(prev => {
    if (prev.date) {
      prev.date.setMinutes(Number(valueTemp));
      prev.iso = prev.date.toISOString();
    }
    const newValues = {
      ...prev,
      minute: Number(valueTemp) || null,
    };
    if (onChange) {
      onChange(newValues);
    }
    return {
      ...newValues,
    };
  });

  if (valueTemp.length > 1 && minuteRef?.current) {
    focusNextInput(minuteRef.current);
  }
};

export const onClickToggleAmPm = ({ setDate, onChange }: TClickToggleAmPm) => {
  setDate(prev => {
    if (prev.date) {
      console.log('TESTAR MEIO DIA TA DANDO RUIm', prev.hour, prev.clockType);
      if (prev.clockType === 'pm') {
        prev.date.setHours(prev.date.getHours() - 12);
        // esse if ta zuando os horarios 0
        if (prev?.hour) {
          prev.hour = prev.hour - 12;
        }
      } else {
        prev.date.setHours(prev.date.getHours() + 12);
        if (prev?.hour) {
          prev.hour = prev.hour + 12;
        }
      }

      prev.iso = prev.date.toISOString();
    }
    const newValues: TDate = {
      ...prev,
      clockType: prev.clockType === 'am' ? 'pm' : 'am',
    };

    if (onChange) {
      onChange(newValues);
    }
    return {
      ...newValues,
    };
  });
};

export const onChangeDatepicker = ({
  dates,
  onChange,
  setDate,
  dayRef,
  monthRef,
  yearRef,
}: TChangeDatepicker) => {
  setDate(prev => {
    const newValues = {
      ...prev,
      year: dates[0].getFullYear() || null,
      month: dates[0].getMonth() + 1 || null,
      day: dates[0].getDate() || null,
      date: dates[0] || null,
      iso: dates[0].toISOString() || null,
    };
    if (dayRef?.current) {
      dayRef.current.value = formatTwoNumbers(newValues.day?.toString() || '');
    }
    if (monthRef?.current) {
      monthRef.current.value = formatTwoNumbers(
        newValues.month?.toString() || '',
      );
    }
    if (yearRef?.current) {
      yearRef.current.value = newValues.year?.toString() || '';
    }
    if (onChange) {
      onChange(newValues);
    }

    return newValues;
  });
};

type TChangeTimepicker = {
  date: Date;
  onChange?: (data: TDate) => void;
  setDate: (value: TDate | ((prevState: TDate) => TDate)) => void;
  hourRef: RefObject<HTMLInputElement | null>;
  minuteRef: RefObject<HTMLInputElement | null>;
  isAmPmMode?: boolean;
};

export const onChangeTimepicker = ({
  date,
  onChange,
  setDate,
  hourRef,
  minuteRef,
  isAmPmMode,
}: TChangeTimepicker) => {
  setDate(prev => {
    const newValues = {
      ...prev,
      date,
      hour: date.getHours() ?? null,
      minute: date.getMinutes() ?? null,
      iso: date.toISOString() || null,
      clockType: date.getHours() > 11 ? 'pm' : 'am',
    };
    if (hourRef?.current) {
      let fixHour = 0;
      if (isAmPmMode && (newValues.hour === 0 || newValues.hour === 12)) {
        console.log(`aqui 1`);
        fixHour = 12;
      }
      if (isAmPmMode && newValues.hour > 0) {
        console.log(`aqui 2`);
        fixHour = newValues.hour;
      }
      if (isAmPmMode && newValues.hour > 12) {
        console.log(`aqui 3`);
        fixHour = newValues.hour - 12;
      }
      console.log({ fixHour, hour: newValues.hour, isAmPmMode });
      hourRef.current.value = formatTwoNumbers(fixHour.toString() || '');
    }
    if (minuteRef?.current) {
      minuteRef.current.value = formatTwoNumbers(
        newValues.minute?.toString() || '',
      );
    }
    if (onChange) {
      onChange(newValues);
    }

    return newValues;
  });
};

export const getDayClassName = (
  className: string,
  { selected, disabled, inCurrentMonth, now }: DPDay,
) =>
  managerClassNames(className, {
    'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
    'opacity-25 cursor-not-allowed': disabled,
    'opacity-50': !inCurrentMonth,
    'border border-slate-500': now,
  });

export const getMonthClassName = (
  className: string,
  { active, now, disabled, selected }: DPMonth,
) =>
  managerClassNames(className, {
    'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
    'border border-slate-500': now && !selected,
    'border border-dashed border-slate-500': active && !selected,
    'opacity-25 cursor-not-allowed': disabled,
  });

export const getYearClassName = (
  className: string,
  { selected, now, disabled, active }: DPYear,
) =>
  managerClassNames(className, {
    'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
    'border border-slate-500': now && !selected,
    'border border-dashed border-slate-500': active && !selected,
    'opacity-25 cursor-not-allowed': disabled,
  });

export const getTimesClassName = (
  className: string,
  { selected, disabled, now }: DPTime,
) =>
  managerClassNames(className, [
    {
      'bg-slate-700 text-white hover:bg-slate-700 opacity-100': selected,
      'opacity-25 cursor-not-allowed': disabled,
      'border border-slate-500': now,
    },
  ]);
