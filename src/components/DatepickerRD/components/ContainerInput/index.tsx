import { DetailedHTMLProps, HTMLAttributes, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const container = tv({
  slots: {
    containerPropsInternal: ['group flex flex-col gap-1 w-fit border'],
  },
});

type TContainerInput = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export function ContainerInput({ className, ...rest }: TContainerInput) {
  const { containerPropsInternal } = container({});

  return (
    <div
      {...rest}
      className={containerPropsInternal({
        class: className,
      })}
    />
  );
}
