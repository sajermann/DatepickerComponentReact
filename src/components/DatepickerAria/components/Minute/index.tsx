import { useDateSegment } from 'react-aria';
import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';

const input = tv({
  base: [
    'group ring-0 outline-none bg-transparent w-10 h-6 flex items-center justify-center',
    'focus:bg-blue-400 focus:text-white',
  ],
});

export function Minute() {
  const { segmentMinute, stateTime, inputMinuteRef } = useDatepickerMega();
  const { segmentProps } = useDateSegment(
    segmentMinute,
    stateTime,
    inputMinuteRef,
  );

  return (
    <div {...segmentProps} ref={inputMinuteRef} className={input()}>
      {segmentMinute.text}
    </div>
  );
}
