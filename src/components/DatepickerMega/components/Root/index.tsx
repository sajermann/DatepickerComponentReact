import { ReactNode } from 'react';
import { DatepickerMegaProvider } from '../../hooks';
import { TDate } from '../../types';
import { Container } from '../Container';

type TProps = {
  defaultDate?: Date;
  disabledDates?: Date[];
  disabledWeeks?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
  onChange?: (data: TDate) => void;
  children: ReactNode;
  minDate?: Date;
  maxDate?: Date;
  intervalTime?: number;
};

export function Root({
  children,
  defaultDate,
  onChange,
  disabledDates,
  disabledWeeks,
  minDate,
  maxDate,
  intervalTime,
}: TProps) {
  return (
    <DatepickerMegaProvider
      defaultDate={defaultDate}
      onChange={onChange}
      disabledDates={disabledDates}
      disabledWeeks={disabledWeeks}
      minDate={minDate}
      maxDate={maxDate}
      intervalTime={intervalTime}
    >
      <Container>{children}</Container>
    </DatepickerMegaProvider>
  );
}
