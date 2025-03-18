import { enUS, ptBR } from 'date-fns/locale';
import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useTranslation } from '~/hooks/useTranslation';
import { IDatepickerProps } from '../../types';
import { formatDataTemp } from '../../utils';
import { Input } from '../Input';

import './index.css';

const LANGUAGE_OPTION = {
  'pt-BR': ptBR,
  en: enUS,
};

export function Datepicker({
  customDefaultValue,
  dateFormat = 'dd/MM/yyyy',
  withoutDay,
  excludeDateIntervals,
  excludeDates,
  isError,
  ref,
  ...rest
}: IDatepickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(
    customDefaultValue || null,
  );
  const { currentLanguage } = useTranslation();

  function onChangeInternal(date: Date | null) {
    setStartDate(date);

    const dataVerify = date ? date.toISOString() : '';

    if (rest.onChange) {
      const t = {
        target: {
          value: dataVerify,
          id: rest.id,
        },
      } as ChangeEvent<HTMLInputElement>;
      rest.onChange(t);
    }
  }

  useEffect(() => {
    if (rest.value === '' || rest.value === undefined) {
      setStartDate(null);
    } else {
      setStartDate(new Date(rest.value as string));
    }
  }, [rest.value]);

  useEffect(() => {
    if (customDefaultValue) {
      onChangeInternal(customDefaultValue);
    }
  }, []);

  const result = formatDataTemp(rest.value as string, withoutDay, dateFormat);

  return (
    <DatePicker
      autoComplete="off"
      id={rest.id}
      disabled={rest.disabled}
      placeholderText={rest.placeholder}
      fixedHeight
      selected={startDate}
      onChange={onChangeInternal}
      locale={LANGUAGE_OPTION[currentLanguage as 'pt-BR' | 'en']}
      dateFormat={dateFormat}
      closeOnScroll
      shouldCloseOnSelect
      showMonthYearPicker={withoutDay}
      excludeDateIntervals={excludeDateIntervals}
      excludeDates={excludeDates}
      customInput={
        <Input
          {...rest}
          ref={ref}
          id="root-portal"
          value={result}
          tabIndex={-1}
          isError={isError}
        />
      }
      portalId="root-portal"
      // portalId="root-portal"
      // withPortal
      // popperModifiers={[
      //   {
      //     name: 'myModifier',
      //     fn(state) {
      //       console.log(`sajermann`, { state });
      //       // Do something with the state
      //       if (state.x < 0) {
      //         return { ...state, x: 10 };
      //       }
      //       return state;
      //     },
      //   },
      // ]}
    />
  );
}
