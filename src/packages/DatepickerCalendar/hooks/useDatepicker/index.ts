import {
  addDays,
  addMonths,
  addYears,
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMilliseconds,
} from 'date-fns';
import { useMemo, useState } from 'react';
import {
  TDate,
  TDisabled,
  TMulti,
  TSelectedRange,
  TSelectedRangeWithHover,
  TSingle,
  TViewMode,
  TWeek,
} from '../../types';
import {
  allDatesIsSelectedsByDayOfWeek,
  capitalize,
  transformDates,
} from '../../utils';
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
  });

  const { years } = useYears({
    firstDateOfCurrentMonthOfView: firstDateOfCurrentMonthOfView,
    disabled,
    multi,
    range,
    selectOnlyVisibleMonth,
    single,
  });

  const firstDateOfView = weeks.at(0)?.at(0);
  const lastDateOfView = weeks.at(-1)?.at(-1);

  const setMonthOfView = (month: number) => {
    setFirstDateOfCurrentMonthOfView(prev => {
      const newDate = new Date(prev.getTime());
      newDate.setMonth(month);
      return newDate;
    });
  };

  const setYearOfView = (year: number) => {
    setFirstDateOfCurrentMonthOfView(prev => {
      const newDate = new Date(prev.getTime());
      newDate.setFullYear(year);
      return newDate;
    });
  };

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

  const headers = Array.from({ length: 7 }, (_, index) => {
    const day = addDays(startOfWeek(new Date(), { weekStartsOn }), index);
    const dayName = capitalize(format(day, 'EEEE').slice(0, 3));
    const dayOfWeek = (index + (weekStartsOn ?? 0)) % 7;
    return {
      text: dayName,
      isSelectedAllDays: allDatesIsSelectedsByDayOfWeek({
        dayOfWeek,
        weeks,
        multi,
      }),
      onClick: () =>
        onHeaderClick({
          dayOfWeek,
          weeks,
        }),
      isDisabled: !!disabled?.weeeks?.includes(index as TWeek),
    };
  });

  const onHeaderClick = ({
    dayOfWeek,
    weeks,
  }: {
    dayOfWeek: number;
    weeks: Array<TDate[]>;
  }) => {
    if (!multi) return;
    const daysToAddOrRemove: Date[] = [];

    for (const item of weeks) {
      // Verify if is same month and if date is not disabled
      if (!item[dayOfWeek].isDisabled) {
        daysToAddOrRemove.push(item[dayOfWeek].date);
      }
    }

    const selectedDates = [...multi.selectedDates];
    // Verify if all dates of week is selecteds
    const allSelected = daysToAddOrRemove.every(day =>
      selectedDates.some(date => isSameDay(date, day)),
    );

    if (allSelected) {
      const result = selectedDates.filter(item => item.getDay() !== dayOfWeek);
      multi.onSelectedDates(result);
      return;
    }
    // Else, add dates not is selecteds
    daysToAddOrRemove.forEach(day => {
      if (!selectedDates.some(date => isSameDay(date, day))) {
        selectedDates.push(day);
      }
    });

    multi.onSelectedDates(selectedDates);
  };

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
      setMonthOfView,
      setYearOfView,
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
