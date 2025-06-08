import {
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfYear,
  isAfter,
  isBefore,
  isSameYear,
  startOfDay,
  startOfMonth,
  startOfYear,
  subMilliseconds,
  subYears,
} from 'date-fns';
import { useMemo, useState } from 'react';
import { useDaysPicker } from '~/packages/useDaysPicker';
import { useMonthsPicker } from '~/packages/useMonthsPicker';
import { useYearsPicker } from '~/packages/useYearsPicker';

import { TUseDatePickerProps, TViewMode } from '..';
import { useHeaders } from './useHeaders';

const YEARS_TO_SHOW = 24;

export function useDatePicker({
  date,
  weekStartsOn,
  fixedWeeks,
  selectOnlyVisibleMonth,
  disabled,
  single,
  multi,
  range,
}: TUseDatePickerProps) {
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

  const getDisabledBeforeMonths = () => {
    if (!disabled?.before) {
      return undefined;
    }
    if (isSameYear(disabled.before, firstDateOfCurrentMonthOfView)) {
      return disabled.before.getMonth();
    }
    if (firstDateOfCurrentMonthOfView.getTime() < disabled.before.getTime()) {
      return 12;
    }
  };

  const getDisabledAfterMonths = () => {
    if (!disabled?.after) {
      return undefined;
    }
    if (isSameYear(disabled.after, firstDateOfCurrentMonthOfView)) {
      return disabled.after.getMonth();
    }
    if (firstDateOfCurrentMonthOfView.getTime() > disabled.after.getTime()) {
      return -1;
    }
  };

  const { months } = useMonthsPicker({
    single: {
      selectedMonth: firstDateOfCurrentMonthOfView.getMonth(),
      onSelectedMonth: month => {
        setFirstDateOfCurrentMonthOfView(prev => {
          const newDate = new Date(prev.getTime());
          newDate.setMonth(month as number);
          return newDate;
        });
        setViewMode('days');
      },
    },
    disabled: {
      before: getDisabledBeforeMonths(),
      after: getDisabledAfterMonths(),
    },
  });

  const { years } = useYearsPicker({
    yearToShow: YEARS_TO_SHOW,
    year: firstDateOfCurrentMonthOfView.getFullYear(),
    single: {
      selectedYear: firstDateOfCurrentMonthOfView.getFullYear(),
      onSelectedYear: year => {
        setFirstDateOfCurrentMonthOfView(prev => {
          const newDate = new Date(prev.getTime());
          newDate.setFullYear(year as number);
          return newDate;
        });
        setViewMode('months');
      },
    },
    disabled: {
      before: disabled?.before?.getFullYear(),
      after: disabled?.after?.getFullYear(),
      years: disabled?.dates?.map(date => date.getFullYear()),
    },
  });

  const { headers } = useHeaders({
    weeks,
    disabledWeks: disabled?.weeeks,
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
    if (!firstDateOfView?.date || !disabled?.before) return false;
    if (viewMode === 'days') {
      return firstDateOfView.date.getTime() - 1 < disabled.before.getTime();
    }

    if (viewMode === 'months') {
      const prevYear = subYears(firstDateOfCurrentMonthOfView, 1).getFullYear();
      const disabledYear = disabled.before.getFullYear();
      return prevYear < disabledYear;
    }

    if (viewMode === 'years') {
      const prevYearGroup = subYears(
        firstDateOfView.date,
        YEARS_TO_SHOW / 2 + 1,
      ).getFullYear();
      const disabledYear = disabled.before.getFullYear();
      return prevYearGroup >= disabledYear;
    }
    return false;
  }, [viewMode, disabled?.before, firstDateOfView?.date]);

  const disabledNext: boolean = useMemo(() => {
    if (!lastDateOfView?.date || !disabled?.after) return false;

    if (viewMode === 'days') {
      return lastDateOfView.date.getTime() + 1 > disabled.after.getTime();
    }

    if (viewMode === 'months') {
      const nextYear = addYears(firstDateOfCurrentMonthOfView, 1).getFullYear();
      const disabledYear = disabled.after.getFullYear();
      return nextYear > disabledYear;
    }

    if (viewMode === 'years') {
      const nextYearGroup = addYears(
        lastDateOfView.date,
        YEARS_TO_SHOW / 2 - 1,
      ).getFullYear();
      const disabledYear = disabled.after.getFullYear();
      return nextYearGroup >= disabledYear;
    }
    return false;
  }, [viewMode, disabled?.after, lastDateOfView?.date]);

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
