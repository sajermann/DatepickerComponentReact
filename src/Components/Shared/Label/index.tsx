/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { LabelHTMLAttributes, forwardRef } from 'react';
import { tv } from 'tailwind-variants';
import { removeProp } from '~/utils/removeProp';

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

export const Label = forwardRef<HTMLLabelElement, TLabel>((props, ref) => {
  const { labelPropsInternal } = label({
    color: props?.isError ? 'error' : 'primary',
  });
  return (
    <label
      {...removeProp(props, ['isError'])}
      ref={ref}
      className={labelPropsInternal({
        class: props?.className,
      })}
    />
  );
});
