import {
  addMonths,
  addYears,
  endOfMonth,
  isAfter,
  isBefore,
  startOfMonth,
} from 'date-fns';
import { useMemo, useState } from 'react';
import { TDisabled, TMulti, TSelectedRange, TSingle } from '../../types';
import { transformDates } from '../../utils';
import { useMonths } from '../useMonths';
import { useWeeks } from '../useWeeks';
import { useYears } from '../useYears';

const YEARS_TO_SHOW = 24;

type TProps = {
  date?: Date | null;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  fixedWeeks?: boolean;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  daysInHover: Date[];
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRange;
};
export function useDatePicker({
  date,
  weekStartsOn,
  fixedWeeks,
  selectOnlyVisibleMonth,
  disabled,
  daysInHover,
  single,
  multi,
  range,
}: TProps) {
  const [startDateOfView, setStartDateOfView] = useState(
    startOfMonth(date || new Date()),
  );
  const endDateOfView = endOfMonth(startDateOfView);

  const startDate = transformDates({
    dateToVerify: startDateOfView,
    startDate: startDateOfView,
    disabled,
    daysInHover,
    single,
    multi,
    range,
    selectOnlyVisibleMonth,
  });

  const endDate = transformDates({
    dateToVerify: endDateOfView,
    startDate: startDateOfView,
    disabled,
    daysInHover,
    single,
    multi,
    range,
    selectOnlyVisibleMonth,
  });

  const { weeks } = useWeeks({
    daysInHover,
    startDate: startDateOfView,
    endDate: endDateOfView,
    disabled,
    fixedWeeks,
    multi,
    range,
    selectOnlyVisibleMonth,
    single,
    weekStartsOn,
  });

  const { months } = useMonths({
    daysInHover,
    startDate: startDateOfView,
    disabled,
    multi,
    range,
    selectOnlyVisibleMonth,
    single,
  });

  const { years } = useYears({
    daysInHover,
    startDate: startDateOfView,
    disabled,
    multi,
    range,
    selectOnlyVisibleMonth,
    single,
  });

  const setMonthOfView = (month: number) => {
    setStartDateOfView(prev => {
      const newDate = new Date(prev.getTime());
      newDate.setMonth(month);
      return newDate;
    });
  };

  const setYearOfView = (year: number) => {
    setStartDateOfView(prev => {
      const newDate = new Date(prev.getTime());
      newDate.setFullYear(year);
      return newDate;
    });
  };

  const handlePrevMonthOfView = () => {
    setStartDateOfView(addMonths(startDate.date, -1));
  };

  const handleNextMonthOfView = () => {
    setStartDateOfView(addMonths(startDate.date, 1));
  };

  const handlePrevYearOfView = () => {
    setStartDateOfView(addYears(startDate.date, -1));
  };

  const handleNextYearOfView = () => {
    setStartDateOfView(addYears(startDate.date, 1));
  };

  const handlePrevGroupYearsOfView = () => {
    setStartDateOfView(addYears(startDate.date, -YEARS_TO_SHOW));
  };

  const handleNextGroupYearsOfView = () => {
    setStartDateOfView(addYears(startDate.date, YEARS_TO_SHOW));
  };

  const disabledPrevMonth = useMemo(
    () => !!(disabled?.before && isBefore(startDateOfView, disabled.before)),
    [disabled?.before, startDateOfView],
  );

  // TODO: Arrumar as setas desabilitadas nas views
  const disabledNextMonth = useMemo(
    () => !!(disabled?.after && isAfter(endDateOfView, disabled.after)),
    [disabled?.after, endDateOfView],
  );

  return {
    weeks,
    months,
    years,
    startDate,
    endDate,
    handlePrevMonthOfView,
    handleNextMonthOfView,
    handlePrevYearOfView,
    handleNextYearOfView,
    handlePrevGroupYearsOfView,
    handleNextGroupYearsOfView,
    setMonthOfView,
    setYearOfView,
    disabledPrevMonth,
    disabledNextMonth,
  };
}
