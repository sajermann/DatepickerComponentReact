import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ComponentPropsWithoutRef } from 'react';
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

const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  collisionPadding = 5,
  ...props
}: ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={managerClassNames(
        [
          'data-[state=open]:animate-enter rounded-lg bg-transparent',
          'data-[state=closed]:animate-leave z-[1] backdrop-blur-md',
          'shadow-lg shadow-black/25 dark:shadow-white/25 p-1 border h-full',
        ],
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverPortal,
  PopoverArrow,
};
