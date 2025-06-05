import {
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfYear,
  isAfter,
  isBefore,
  startOfDay,
  startOfMonth,
  startOfYear,
  subMilliseconds,
} from 'date-fns';
import { useMemo, useState } from 'react';
import { useDaysPicker } from '~/packages/useDaysPicker';
import { useMonthsPicker } from '~/packages/useMonthsPicker';
import { useYearsPicker } from '~/packages/useYearsPicker';
import {
  TDisabled,
  TMulti,
  TSelectedRangeWithHover,
  TSingle,
  TViewMode,
  TWeek,
} from '../../types';
import { useHeaders } from '../useHeaders';

const YEARS_TO_SHOW = 24;

type TProps = {
  date?: Date | null;
  weekStartsOn?: TWeek;
  fixedWeeks?: boolean;
  selectOnlyVisibleMonth?: boolean;
  disabled?: TDisabled;
  single?: TSingle;
  multi?: TMulti;
  range?: TSelectedRangeWithHover;
};
export function useDatePicker({
  date,
  weekStartsOn,
  fixedWeeks,
  selectOnlyVisibleMonth,
  disabled,
  single,
  multi,
  range,
}: TProps) {
  const [firstDateOfCurrentMonthOfView, setFirstDateOfCurrentMonthOfView] =
    useState(startOfMonth(date || new Date()));
  const [viewMode, setViewMode] = useState<TViewMode>('days');
  const lastDateOfCurrentMonthOfView = endOfMonth(
    firstDateOfCurrentMonthOfView,
  );

  const { days, weeks } = useDaysPicker({
    firstDateOfCurrentMonthOfView,
    endDate: lastDateOfCurrentMonthOfView,
    disabled,
    fixedWeeks,
    multi,
    range,
    selectOnlyVisibleMonth,
    single,
    weekStartsOn,
  });

  const { months } = useMonthsPicker({
    single: {
      selectedMonth: startOfYear(firstDateOfCurrentMonthOfView).getFullYear(),
      onSelectedMonth: month => {
        setFirstDateOfCurrentMonthOfView(prev => {
          const newDate = new Date(prev.getTime());
          newDate.setMonth(month as number);
          return newDate;
        });
        setViewMode('days');
      },
    },
  });

  const { years } = useYearsPicker({
    year: startOfYear(firstDateOfCurrentMonthOfView).getFullYear(),
    single: {
      selectedYear: startOfYear(firstDateOfCurrentMonthOfView).getFullYear(),
      onSelectedYear: year => {
        setFirstDateOfCurrentMonthOfView(prev => {
          const newDate = new Date(prev.getTime());
          newDate.setFullYear(year as number);
          return newDate;
        });
        setViewMode('months');
      },
    },
  });

  const { headers } = useHeaders({
    weeks,
    disabled,
    multi,
    weekStartsOn,
  });

  const firstDateOfView = days.at(0);
  const lastDateOfView = days.at(-1);

  const handlePrevMonthOfView = () => {
    setFirstDateOfCurrentMonthOfView(
      addMonths(firstDateOfCurrentMonthOfView, -1),
    );
  };

  const handleNextMonthOfView = () => {
    setFirstDateOfCurrentMonthOfView(
      addMonths(firstDateOfCurrentMonthOfView, 1),
    );
  };

  const handlePrevYearOfView = () => {
    setFirstDateOfCurrentMonthOfView(
      addYears(firstDateOfCurrentMonthOfView, -1),
    );
  };

  const handleNextYearOfView = () => {
    setFirstDateOfCurrentMonthOfView(
      addYears(firstDateOfCurrentMonthOfView, 1),
    );
  };

  const handlePrevGroupYearsOfView = () => {
    setFirstDateOfCurrentMonthOfView(
      addYears(firstDateOfCurrentMonthOfView, -YEARS_TO_SHOW),
    );
  };

  const handleNextGroupYearsOfView = () => {
    setFirstDateOfCurrentMonthOfView(
      addYears(firstDateOfCurrentMonthOfView, YEARS_TO_SHOW),
    );
  };

  const disabledPrev: boolean = useMemo(() => {
    // if (viewMode === 'days') {
    //   return !!(
    //     firstDateOfView?.date &&
    //     disabled?.before &&
    //     isBefore(startOfDay(firstDateOfView.date), disabled.before)
    //   );
    // }

    // if (viewMode === 'months') {
    //   const dateToVerify = months.at(0)?.date;
    //   return !!(
    //     dateToVerify &&
    //     disabled?.before &&
    //     isBefore(
    //       subMilliseconds(startOfMonth(dateToVerify), 1),
    //       disabled.before,
    //     )
    //   );
    // }

    // if (viewMode === 'years') {
    //   const dateToVerify = years.at(0)?.date;
    //   return !!(
    //     dateToVerify &&
    //     disabled?.before &&
    //     isBefore(subMilliseconds(startOfYear(dateToVerify), 1), disabled.before)
    //   );
    // }
    return false;
  }, [months, years, disabled?.before, firstDateOfView?.date]);

  const disabledNext: boolean = useMemo(() => {
    // if (viewMode === 'days') {
    //   return !!(
    //     lastDateOfView?.date &&
    //     disabled?.after &&
    //     isAfter(endOfDay(lastDateOfView.date), disabled.after)
    //   );
    // }
    // if (viewMode === 'months') {
    //   const dateToVerify = months.at(-1)?.date;
    //   return !!(
    //     dateToVerify &&
    //     disabled?.after &&
    //     isAfter(endOfMonth(dateToVerify), disabled.after)
    //   );
    // }
    // if (viewMode === 'years') {
    //   const dateToVerify = years.at(-1)?.date;
    //   return !!(
    //     dateToVerify &&
    //     disabled?.after &&
    //     isAfter(endOfYear(dateToVerify), disabled.after)
    //   );
    // }
    return false;
  }, [months, years, disabled?.after, lastDateOfView?.date]);

  const memoizedValue = useMemo(
    () => ({
      days,
      weeks,
      months,
      years,
      handlePrevMonthOfView,
      handleNextMonthOfView,
      handlePrevYearOfView,
      handleNextYearOfView,
      handlePrevGroupYearsOfView,
      handleNextGroupYearsOfView,
      disabledPrev,
      disabledNext,
      firstDateOfCurrentMonthOfView,
      headers,
      viewMode,
      setViewMode,
    }),
    [
      days,
      weeks,
      months,
      years,
      disabledPrev,
      disabledNext,
      firstDateOfCurrentMonthOfView,
      headers,
      viewMode,
      setViewMode,
    ],
  );

  return memoizedValue;
}
