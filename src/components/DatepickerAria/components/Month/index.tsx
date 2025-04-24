import { tv } from 'tailwind-variants';

import { useDateSegment } from 'react-aria';
import { useDatepickerMega } from '../../hooks';

const input = tv({
  base: [
    'group ring-0 outline-none bg-transparent w-10 h-6 flex items-center justify-center',
    'focus:bg-blue-400 focus:text-white',
  ],
});

export function Month() {
  const { segmentMonth, stateDate, inputMonthRef } = useDatepickerMega();
  const { segmentProps } = useDateSegment(
    segmentMonth,
    stateDate,
    inputMonthRef,
  );

  return (
    <div {...segmentProps} ref={inputMonthRef} className={input()}>
      {segmentMonth.text}
    </div>
  );
}
