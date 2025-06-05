export function isSelectedSingle({
  monthToVerify,
  selectedMonth,
}: { monthToVerify: number; selectedMonth?: number | null }) {
  if (!selectedMonth) return false;
  return monthToVerify === selectedMonth;
}
