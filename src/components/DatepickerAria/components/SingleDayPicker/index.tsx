import { useRef } from 'react';
import { useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';
import { useDatepickerMega } from '../../hooks';
import { Calendar } from '../Calendar';
import { PopoverArrow, PopoverContent, PopoverPortal } from '../Popover';

export function SingleDayPicker() {
  const { setIsOpenCalendar } = useDatepickerMega();
  const state = useDatePickerState({
    firstDayOfWeek: 'sun',
  });

  const ref = useRef(null);
  const { calendarProps } = useDatePicker(
    {
      onChange(value) {
        console.log(`SAjermann`, { value });
      },
      shouldForceLeadingZeros: true,
    },
    state,
    ref,
  );

  return (
    <PopoverPortal>
      <PopoverContent onInteractOutside={() => setIsOpenCalendar(false)}>
        <PopoverArrow />
        <Calendar {...calendarProps} firstDayOfWeek={'sun'} />
      </PopoverContent>
    </PopoverPortal>
  );
}
