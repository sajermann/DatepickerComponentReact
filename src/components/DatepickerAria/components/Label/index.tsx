import { LabelHTMLAttributes, useRef } from 'react';
import { useDateField } from 'react-aria';
import { tv } from 'tailwind-variants';
import { removeProp } from '~/utils/removeProp';
import { useDatepickerMega } from '../../hooks';

type TLabel = {
  isError?: boolean;
  children?: React.ReactNode;
  className?: string;
};

const label = tv({
  slots: {
    labelPropsInternal: [
      'text-sm text-gray-500',
      'transition-all duration-500',
    ],
  },
  variants: {
    color: {
      primary: {
        labelPropsInternal:
          'group-hover:text-blue-500 group-focus-within:text-blue-500',
      },
      error: {
        labelPropsInternal: 'text-red-500',
      },
      normal: {
        labelPropsInternal: '',
      },
    },
  },

  defaultVariants: {
    color: 'normal',
  },
});

export function Label({ className, children, isError }: TLabel) {
  const { labelProps } = useDatepickerMega();

  const { labelPropsInternal } = label({
    color: isError ? 'error' : 'primary',
  });
  return (
    <label
      {...labelProps}
      className={labelPropsInternal({
        class: className,
      })}
      // biome-ignore lint/correctness/noChildrenProp: <explanation>
      children={children}
    />
  );
}
