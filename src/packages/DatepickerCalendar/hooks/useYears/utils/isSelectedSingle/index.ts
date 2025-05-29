import { isSameYear } from 'date-fns';

export function isSelectedSingle({
  dateToVerify,
  selectedDate,
}: { dateToVerify: Date; selectedDate?: Date | null }) {
  if (!selectedDate) return false;
  return isSameYear(dateToVerify, selectedDate);
}
