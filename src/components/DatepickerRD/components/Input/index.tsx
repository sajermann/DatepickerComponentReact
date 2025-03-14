import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const input = tv({
  base: [
    'group outline-none focus:ring-1 border h-11 py-1 px-2 rounded w-29 text-center bg-transparent',
    'transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50',
  ],

  variants: {
    color: {
      primary: {
        inputPropsInternal:
          'focus:ring-blue-500 group-hover:border-blue-500 focus:border-blue-500',
      },
      error: {
        inputPropsInternal:
          'focus:ring-red-500 group-hover:border-red-500 focus:border-red-500',
      },

      normal: {
        inputPropsInternal: '',
      },
    },
  },

  defaultVariants: {
    color: 'normal',
  },
});

export function Input({
  isError,
  ...props
}: DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { isError?: boolean }) {
  return (
    <input
      {...props}
      className={input({
        class: props?.className,
        color: isError ? 'error' : 'primary',
      })}
    />
  );
}
