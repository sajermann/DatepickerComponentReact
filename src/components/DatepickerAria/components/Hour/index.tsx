import { useDateSegment } from 'react-aria';
import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';

const input = tv({
  base: 'group ring-0 outline-none bg-transparent w-8 h-8 p-1 flex  text-center',
});

export function Hour() {
  const { segmentHour, stateTime, inputHourRef } = useDatepickerMega();
  const { segmentProps } = useDateSegment(segmentHour, stateTime, inputHourRef);

  return (
    <div {...segmentProps} ref={inputHourRef} className={input()}>
      {segmentHour.text}
    </div>
  );
}
