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
import {
  TDisabled,
  TMulti,
  TSelectedRangeWithHover,
  TSingle,
  TViewMode,
  TWeek,
} from '../../types';
import { useHeaders } from '../useHeaders';
import { useMonths } from '../useMonths';
import { useWeeks } from '../useWeeks';
import { useYears } from '../useYears';

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

  const { weeks } = useWeeks({
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

  const { months } = useMonths({
    firstDateOfCurrentMonthOfView,
    disabled,
    multi,
    range,
    selectOnlyVisibleMonth,
    single,
    onMonthClick: ({ month }) => {
      setFirstDateOfCurrentMonthOfView(prev => {
        const newDate = new Date(prev.getTime());
        newDate.setMonth(month);
        return newDate;
      });
      setViewMode('days');
    },
  });

  const { years } = useYears({
    firstDateOfCurrentMonthOfView: firstDateOfCurrentMonthOfView,
    disabled,
    multi,
    range,
    selectOnlyVisibleMonth,
    single,
    onYearClick: ({ year }) => {
      setFirstDateOfCurrentMonthOfView(prev => {
        const newDate = new Date(prev.getTime());
        newDate.setFullYear(year);
        return newDate;
      });
      setViewMode('months');
    },
  });

  const { headers } = useHeaders({
    weeks,
    disabled,
    multi,
    weekStartsOn,
  });

  const firstDateOfView = weeks.at(0)?.at(0);
  const lastDateOfView = weeks.at(-1)?.at(-1);

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
    if (viewMode === 'days') {
      return !!(
        firstDateOfView?.date &&
        disabled?.before &&
        isBefore(startOfDay(firstDateOfView.date), disabled.before)
      );
    }

    if (viewMode === 'months') {
      const dateToVerify = months.at(0)?.date;
      return !!(
        dateToVerify &&
        disabled?.before &&
        isBefore(
          subMilliseconds(startOfMonth(dateToVerify), 1),
          disabled.before,
        )
      );
    }

    if (viewMode === 'years') {
      const dateToVerify = years.at(0)?.date;
      return !!(
        dateToVerify &&
        disabled?.before &&
        isBefore(subMilliseconds(startOfYear(dateToVerify), 1), disabled.before)
      );
    }
    return false;
  }, [months, years, disabled?.before, firstDateOfView?.date]);

  const disabledNext: boolean = useMemo(() => {
    if (viewMode === 'days') {
      return !!(
        lastDateOfView?.date &&
        disabled?.after &&
        isAfter(endOfDay(lastDateOfView.date), disabled.after)
      );
    }
    if (viewMode === 'months') {
      const dateToVerify = months.at(-1)?.date;
      return !!(
        dateToVerify &&
        disabled?.after &&
        isAfter(endOfMonth(dateToVerify), disabled.after)
      );
    }
    if (viewMode === 'years') {
      const dateToVerify = years.at(-1)?.date;
      return !!(
        dateToVerify &&
        disabled?.after &&
        isAfter(endOfYear(dateToVerify), disabled.after)
      );
    }
    return false;
  }, [months, years, disabled?.after, lastDateOfView?.date]);

  const memoizedValue = useMemo(
    () => ({
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
