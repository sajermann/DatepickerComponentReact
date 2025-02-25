import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';
import { onChangeHour } from '../../utils';

const input = tv({
  base: 'group ring-0 outline-none bg-transparent w-8 h-8 p-1 flex  text-center',
});

export function Hour({
  placeholder = 'hh',
  ...props
}: Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref'
>) {
  const { inputHourRef, setDate, onChange, isAmPmMode } = useDatepickerMega();

  return (
    <input
      {...props}
      ref={inputHourRef}
      placeholder={placeholder}
      className={input({ class: props?.className })}
      onChange={event => {
        props?.onChange?.(event);
        onChangeHour({
          event,
          setDate,
          onChange,
          hourRef: inputHourRef,
          isAmPm: isAmPmMode,
        });
      }}
    />
  );
}
