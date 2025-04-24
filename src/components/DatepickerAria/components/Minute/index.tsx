import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useDateSegment } from 'react-aria';
import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';
import { onChangeMinute } from '../../utils';

const input = tv({
  base: 'group ring-0 outline-none bg-transparent w-9 h-8 p-1 flex text-center',
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
