import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';
import { useInputHourProps } from '../../hooks/useInputHourProps';

const input = tv({
  base: 'group ring-0 outline-none bg-transparent w-8 h-8 p-1 flex  text-center',
});

export function Hour({
  placeholder = 'hh',
  ...props
}: Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref' | 'onChange' | 'onBlur'
>) {
  const inputProps = useInputHourProps();

  return (
    <input
      {...props}
      placeholder={placeholder}
      className={input({ class: props?.className })}
      {...inputProps}
    />
  );
}
