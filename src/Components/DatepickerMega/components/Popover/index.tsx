import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { managerClassNames } from '~/utils/managerClassNames';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverPortal = PopoverPrimitive.Portal;

const PopoverArrow = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>) => (
  <PopoverPrimitive.Arrow
    {...props}
    className={managerClassNames('dark:fill-white', className)}
  />
);

const PopoverContent = forwardRef<
  ElementRef<typeof PopoverPrimitive.Content>,
  ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={managerClassNames(
        [
          { 'data-[state=open]:animate-enter rounded-lg bg-transparent': true },
          { 'data-[state=closed]:animate-leave z-[1] backdrop-blur-md': true },
          { 'shadow-lg shadow-black/25 dark:shadow-white/25 p-1': true },
          { 'border h-full': true },
        ],
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverPortal,
  PopoverArrow,
};
