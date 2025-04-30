import { ReactNode } from 'react';
import { DatepickerCalendarProvider } from '../../hooks';
import { TDisabled, TSelectOptions } from '../../types';

type TProps = {
  children: ReactNode;
  defaultDate?: Date;
  selectDate: TSelectOptions;
  disabledDate?: TDisabled;
  weekStartsOn?: number;
};

export function Root({
  children,
  selectDate,
  disabledDate,
  weekStartsOn,
}: TProps) {
  return (
    <DatepickerCalendarProvider
      selectDate={selectDate}
      disabledDate={disabledDate}
      weekStartsOn={weekStartsOn}
    >
      {children}
    </DatepickerCalendarProvider>
  );
}
