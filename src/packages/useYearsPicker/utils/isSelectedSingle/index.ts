import { isNumber } from '../isNumber';

export function isSelectedSingle({
  yearToVerify,
  selectedYear,
}: { yearToVerify: number; selectedYear?: number | null }) {
  if (!isNumber(selectedYear)) return false;
  return yearToVerify === selectedYear;
}
