export function isSelectedSingle({
  dateToVerify,
  selectedDate,
}: { dateToVerify: Date; selectedDate?: Date | null }) {
  return dateToVerify.getTime() === selectedDate?.getTime();
}
