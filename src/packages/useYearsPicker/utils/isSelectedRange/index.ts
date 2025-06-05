import { TRange } from '../../types';

export function isSelectedRange({
  yearToVerify,
  selectedYearByRange,
}: { yearToVerify: number; selectedYearByRange?: TRange }) {
  return (
    yearToVerify === selectedYearByRange?.from ||
    yearToVerify === selectedYearByRange?.to ||
    !!(
      selectedYearByRange?.from &&
      selectedYearByRange?.to &&
      yearToVerify > selectedYearByRange.from &&
      yearToVerify < selectedYearByRange.to
    )
  );
}
