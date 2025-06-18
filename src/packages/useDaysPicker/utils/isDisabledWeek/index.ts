import { TWeek } from '../../types';

export function isDisabledWeek({
  dateToVerify,
  disabledWeeks,
}: {
  dateToVerify: Date;
  disabledWeeks?: TWeek[];
}) {
  if (!disabledWeeks) return false;
  return disabledWeeks.includes(dateToVerify.getDay() as TWeek);
}
