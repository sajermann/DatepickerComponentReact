import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';
import { useInputMinuteProps } from '../../hooks/useInputMinuteProps';

const input = tv({
  base: 'group ring-0 outline-none bg-transparent w-9 h-8 p-1 flex text-center',
});

export function Minute({
  placeholder = 'mm',
  ...props
}: Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref' | 'onChange' | 'onBlur'
>) {
  const inputProps = useInputMinuteProps();
  return (
    <input
      {...props}
      placeholder={placeholder}
      className={input({ class: props?.className })}
      {...inputProps}
    />
  );
}
