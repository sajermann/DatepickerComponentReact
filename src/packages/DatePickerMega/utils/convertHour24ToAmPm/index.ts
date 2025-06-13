export const convertHour24ToAmPm = ({
  isAmPmMode,
  hour24,
}: { isAmPmMode?: boolean; hour24: number }) => {
  let fixHour = hour24;
  if (isAmPmMode && (hour24 === 0 || hour24 === 12)) {
    fixHour = 12;
  }
  if (isAmPmMode && hour24 !== null && hour24 > 0) {
    fixHour = hour24;
  }
  if (isAmPmMode && hour24 !== null && hour24 > 12) {
    fixHour = hour24 - 12;
  }

  return fixHour;
};
