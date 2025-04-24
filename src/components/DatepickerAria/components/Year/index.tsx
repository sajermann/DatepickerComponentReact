import { tv } from 'tailwind-variants';

import { useDateSegment } from 'react-aria';
import { useDatepickerMega } from '../../hooks';

const input = tv({
  base: [
    'group ring-0 outline-none bg-transparent w-10 h-6 flex items-center justify-center',
    'focus:bg-blue-400 focus:text-white',
  ],
});

export function Year() {
  const { segmentYear, stateDate, inputYearRef } = useDatepickerMega();
  const { segmentProps } = useDateSegment(segmentYear, stateDate, inputYearRef);

  return (
    <div {...segmentProps} ref={inputYearRef} className={input()}>
      {segmentYear.text}
    </div>
  );
}
