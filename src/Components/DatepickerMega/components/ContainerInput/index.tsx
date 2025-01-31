import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const container = tv({
  slots: {
    containerPropsInternal: ['group flex flex-col gap-1'],
  },
});

type TContainerInput = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export function ContainerInput(props: TContainerInput) {
  const { containerPropsInternal } = container({});

  return (
    <div
      {...props}
      className={containerPropsInternal({
        class: props.className,
      })}
    />
  );
}
