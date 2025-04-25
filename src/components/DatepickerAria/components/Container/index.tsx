import { ReactNode, useRef } from 'react';
import { tv } from 'tailwind-variants';
import { useDatepickerMega } from '../../hooks';
import { Popover, PopoverAnchor } from '../Popover';

const rootContainer = tv({
  slots: {
    inputPropsInternal: [
      'group w-full bg-transparent',
      'transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50',
      'flex flex-col w-fit',
    ],
  },
  variants: {
    color: {
      primary: {
        inputPropsInternal:
          'focus:ring-blue-500 group-hover:border-blue-500 focus:border-blue-500 group-focus-within:border-blue-500',
      },
      error: {
        inputPropsInternal:
          'focus:ring-red-500 group-hover:border-red-500 focus:border-red-500 group-focus-within:border-red-500',
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

function WithoutPopover({ children }: { children: ReactNode }) {
  const { inputPropsInternal } = rootContainer({
    color: 'primary',
  });
  return <div className={inputPropsInternal()}>{children}</div>;
}

export function Container({ children }: { children: ReactNode }) {
  return (
    <Popover open={false}>
      <PopoverAnchor className="hover:cursor-default">
        <WithoutPopover>{children}</WithoutPopover>
      </PopoverAnchor>
    </Popover>
  );
}
