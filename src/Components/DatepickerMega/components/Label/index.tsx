import { LabelHTMLAttributes } from 'react';
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

export function Label(props: TLabel) {
  const { labelPropsInternal } = label({
    color: props?.isError ? 'error' : 'primary',
  });
  return (
    <label
      {...removeProp(props, ['isError'])}
      className={labelPropsInternal({
        class: props?.className,
      })}
    />
  );
}
