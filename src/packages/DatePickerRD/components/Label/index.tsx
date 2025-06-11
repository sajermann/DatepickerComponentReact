import { LabelHTMLAttributes, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

type TLabel = React.DetailedHTMLProps<
  LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  isError?: boolean;
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

export function Label({ isError, className, ...rest }: TLabel) {
  const { labelPropsInternal } = label({
    color: isError ? 'error' : 'primary',
  });
  return (
    <label
      {...rest}
      className={labelPropsInternal({
        class: className,
      })}
    />
  );
}
