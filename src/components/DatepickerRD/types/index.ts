import { DetailedHTMLProps, InputHTMLAttributes, Ref } from 'react';

export type TDateFormat = 'dd/MM/yyyy' | 'yyyy-MM-dd' | 'MM/yyyy' | 'yyyy';

export type TInput = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export interface IDatepickerProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  showMonthYearPicker?: boolean;
  showYearPicker?: boolean;
  customDefaultValue?: Date;
  dateFormat?: TDateFormat;
  excludeDateIntervals?: Array<{ start: Date; end: Date }>;
  excludeDates?: Array<Date>;
  isError?: boolean;
  customRef?: Ref<HTMLInputElement>;
}
