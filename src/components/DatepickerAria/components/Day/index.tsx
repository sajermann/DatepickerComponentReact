import { tv } from 'tailwind-variants';

import { useDateSegment } from 'react-aria';
import { useDatepickerMega } from '../../hooks';

const input = tv({
  base: [
    'group ring-0 outline-none bg-transparent w-10 h-6 flex items-center justify-center',
    'focus:bg-blue-400 focus:text-white',
  ],
});

export function Day() {
  const { segmentDay, stateDate, inputDayRef } = useDatepickerMega();
  const { segmentProps } = useDateSegment(segmentDay, stateDate, inputDayRef);

  return (
    <div {...segmentProps} ref={inputDayRef} className={input()}>
      {segmentDay.text}
    </div>
  );
}
