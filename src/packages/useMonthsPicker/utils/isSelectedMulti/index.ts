export function isSelectedMulti({
  monthToVerify,
  selectedMonths,
}: { monthToVerify: number; selectedMonths?: number[] }) {
  return !!selectedMonths?.some(item => item === monthToVerify);
}
