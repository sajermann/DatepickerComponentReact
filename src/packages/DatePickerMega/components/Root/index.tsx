import { ReactNode } from "react";
import { DatePickerMegaProvider } from "../../hooks";
import { TDate } from "../../types";
import { Container } from "../Container";

type TProps = {
  defaultDate?: Date;
  disabledDates?: Date[];
  disabledWeeks?: (0 | 1 | 2 | 3 | 4 | 5 | 6)[];
  onChange?: (data: TDate) => void;
  children: ReactNode;
  minDate?: Date;
  maxDate?: Date;
  intervalTime?: number;
  minTime?: {
    h: number;
    m: number;
  };
  maxTime?: {
    h: number;
    m: number;
  };
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
  minTime,
  maxTime,
}: TProps) {
  return (
    <DatePickerMegaProvider
      defaultDate={defaultDate}
      onChange={onChange}
      disabledDates={disabledDates}
      disabledWeeks={disabledWeeks}
      minDate={minDate}
      maxDate={maxDate}
      intervalTime={intervalTime}
      minTime={minTime}
      maxTime={maxTime}
    >
      <Container>{children}</Container>
    </DatePickerMegaProvider>
  );
}
