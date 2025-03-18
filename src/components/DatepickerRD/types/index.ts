import { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react';

export type TDateFormat = 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/yyyy';

export type TInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TInputDatepicker = TInput & {
  withoutDay?: boolean;
  dateFormat?: TDateFormat;
  isError?: boolean;
};

export interface IDatepickerProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  withoutDay?: boolean;
  customDefaultValue?: Date;
  dateFormat?: TDateFormat;
  excludeDateIntervals?: Array<{ start: Date; end: Date }>;
  excludeDates?: Array<Date>;
  isError?: boolean;
  customRef?: Ref<HTMLInputElement>;
}
