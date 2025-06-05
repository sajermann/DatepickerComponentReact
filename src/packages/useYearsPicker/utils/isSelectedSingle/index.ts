export function isSelectedSingle({
  yearToVerify,
  selectedYear,
}: { yearToVerify: number; selectedYear?: number | null }) {
  if (!selectedYear) return false;
  return yearToVerify === selectedYear;
}
