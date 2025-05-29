import { isSameMonth } from 'date-fns';

export function isDisabledVisibleMonth({
  dateToVerify,
  selectOnlyVisibleMonth,
  firstDateOfCurrentMonthOfView,
}: {
  dateToVerify: Date;
  selectOnlyVisibleMonth?: boolean;
  firstDateOfCurrentMonthOfView: Date;
}) {
  return !!(
    selectOnlyVisibleMonth &&
    !isSameMonth(dateToVerify, firstDateOfCurrentMonthOfView)
  );
}
