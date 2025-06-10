export function isSelectedSingle({
  monthToVerify,
  selectedMonth,
}: { monthToVerify: number; selectedMonth?: number | null }) {
  return monthToVerify === selectedMonth;
}
