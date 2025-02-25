export const convertHour24ToAmPm = ({
  isAmPmMode,
  hour24,
}: { isAmPmMode?: boolean; hour24: number }) => {
  let fixHour = hour24;
  console.log(`aqui dentro`, { fixHour, isAmPmMode });
  if (isAmPmMode && (hour24 === 0 || hour24 === 12)) {
    console.log(`aqui 1`);
    fixHour = 12;
  }
  if (isAmPmMode && hour24 !== null && hour24 > 0) {
    console.log(`aqui 2`);
    fixHour = hour24;
  }
  if (isAmPmMode && hour24 !== null && hour24 > 12) {
    console.log(`aqui 3`);
    fixHour = hour24 - 12;
  }

  return fixHour;
};
