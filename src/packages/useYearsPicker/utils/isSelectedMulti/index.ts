export function isSelectedMulti({
  yearToVerify,
  selectedYears,
}: { yearToVerify: number; selectedYears?: number[] }) {
  return !!selectedYears?.some(item => item === yearToVerify);
}
