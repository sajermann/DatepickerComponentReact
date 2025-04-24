import { useDateSegment } from 'react-aria';
import { useDatepickerMega } from '../../hooks';

export function AmPmToggle() {
  const { segmentDayPeriod, stateTime, inputDayPeriodRef } =
    useDatepickerMega();
  const { segmentProps } = useDateSegment(
    segmentDayPeriod,
    stateTime,
    inputDayPeriodRef,
  );

  return (
    <div {...segmentProps} ref={inputDayPeriodRef}>
      {segmentDayPeriod.text}
    </div>
  );
}
