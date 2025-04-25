import { useDateSegment } from 'react-aria';
import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';

const input = tv({
  base: [
    'group ring-0 outline-none bg-transparent w-10 h-6 flex items-center justify-center',
    'focus:bg-blue-400 focus:text-white',
  ],
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
